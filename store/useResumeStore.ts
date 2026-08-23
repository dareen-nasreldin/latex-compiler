import { create } from "zustand";
import { persist } from "zustand/middleware";
import { generateLatex, defaultConfig, type ResumeConfig } from "@/lib/generateLatex";
import type { ResumeTarget } from "@/data/resumeBlocks";

interface ResumeState {
  config: ResumeConfig;
  texSource: string;
  pdfUrl: string | null;
  pageCount: number | null;
  isCompiling: boolean;
  compileError: string | null;
  savedConfigs: Record<string, ResumeConfig>;
  setTarget: (target: ResumeTarget) => void;
  setOnePage: (onePage: boolean) => void;
  toggleBlock: (category: "experienceIds" | "projectIds", id: string) => void;
  setTexSource: (tex: string) => void;
  compile: () => Promise<void>;
  saveConfig: (name: string) => void;
  loadConfig: (name: string) => void;
  deleteConfig: (name: string) => void;
}

// Kept outside the store: an in-flight compile's controller, so a newer
// compile() call can cancel a stale one instead of letting them race.
let activeCompile: AbortController | null = null;

export const useResumeStore = create<ResumeState>()(
  persist(
    (set, get) => ({
      config: defaultConfig,
      texSource: generateLatex(defaultConfig),
      pdfUrl: null,
      pageCount: null,
      isCompiling: false,
      compileError: null,
      savedConfigs: {},

      setTarget: (target) => {
        const config = { ...get().config, target };
        set({ config, texSource: generateLatex(config) });
      },

      setOnePage: (onePage) => {
        const config = { ...get().config, onePage };
        set({ config, texSource: generateLatex(config) });
      },

      toggleBlock: (category, id) => {
        const current = get().config[category];
        const next = current.includes(id)
          ? current.filter((b) => b !== id)
          : [...current, id];
        const config = { ...get().config, [category]: next };
        set({ config, texSource: generateLatex(config) });
      },

      setTexSource: (tex) => set({ texSource: tex }),

      compile: async () => {
        console.log("[compile] called, aborting any in-flight request");
        activeCompile?.abort();
        const controller = new AbortController();
        activeCompile = controller;

        const { texSource } = get();
        console.log("[compile] starting fetch, texSource length:", texSource.length);
        set({ isCompiling: true, compileError: null });
        try {
          const res = await fetch("/api/compile", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ tex: texSource }),
            signal: controller.signal,
          });
          console.log("[compile] fetch resolved, status:", res.status);

          if (!res.ok) {
            const err = await res.json().catch(() => ({ log: res.statusText }));
            console.error("[compile] server returned an error:", err.log);
            set({ compileError: err.log ?? "Compilation failed.", isCompiling: false });
            return;
          }

          const pageCountHeader = res.headers.get("X-Page-Count");
          const pageCount = pageCountHeader ? parseInt(pageCountHeader, 10) : null;

          const blob = await res.blob();
          console.log("[compile] got PDF blob, bytes:", blob.size, "pages:", pageCount);
          // #view=FitH pins a consistent fit-width zoom on every reload —
          // without it, Chrome's built-in PDF viewer resets to whatever its
          // own default is each time the blob URL changes (i.e. every
          // recompile), which reads as the preview randomly "resizing".
          const url = `${URL.createObjectURL(blob)}#view=FitH`;
          const prevUrl = get().pdfUrl;
          set({ pdfUrl: url, pageCount, isCompiling: false, compileError: null });
          if (prevUrl) URL.revokeObjectURL(prevUrl.split("#")[0]);
        } catch (e) {
          if (e instanceof DOMException && e.name === "AbortError") {
            console.log("[compile] aborted (superseded by a newer compile() call)");
            return;
          }
          console.error("[compile] threw:", e);
          set({
            compileError: e instanceof Error ? e.message : "Unknown compile error.",
            isCompiling: false,
          });
        }
      },

      saveConfig: (name) => {
        set({ savedConfigs: { ...get().savedConfigs, [name]: get().config } });
      },

      loadConfig: (name) => {
        const config = get().savedConfigs[name];
        if (!config) return;
        set({ config, texSource: generateLatex(config) });
      },

      deleteConfig: (name) => {
        const { [name]: _removed, ...rest } = get().savedConfigs;
        set({ savedConfigs: rest });
      },
    }),
    {
      name: "resume-builder-saved-configs",
      partialize: (state) => ({ savedConfigs: state.savedConfigs }),
    },
  ),
);
