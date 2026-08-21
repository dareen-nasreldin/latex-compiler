import { create } from "zustand";
import { generateLatex, defaultConfig, type ResumeConfig } from "@/lib/generateLatex";
import type { ResumeTarget } from "@/data/resumeBlocks";

interface ResumeState {
  config: ResumeConfig;
  texSource: string;
  pdfUrl: string | null;
  pageCount: number | null;
  isCompiling: boolean;
  compileError: string | null;
  setTarget: (target: ResumeTarget) => void;
  setOnePage: (onePage: boolean) => void;
  toggleBlock: (category: "experienceIds" | "projectIds", id: string) => void;
  setTexSource: (tex: string) => void;
  compile: () => Promise<void>;
}

// Kept outside the store: an in-flight compile's controller, so a newer
// compile() call can cancel a stale one instead of letting them race.
let activeCompile: AbortController | null = null;

export const useResumeStore = create<ResumeState>((set, get) => ({
  config: defaultConfig,
  texSource: generateLatex(defaultConfig),
  pdfUrl: null,
  pageCount: null,
  isCompiling: false,
  compileError: null,

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
    activeCompile?.abort();
    const controller = new AbortController();
    activeCompile = controller;

    const { texSource } = get();
    set({ isCompiling: true, compileError: null });
    try {
      const res = await fetch("/api/compile", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ tex: texSource }),
        signal: controller.signal,
      });

      if (!res.ok) {
        const err = await res.json().catch(() => ({ log: res.statusText }));
        set({ compileError: err.log ?? "Compilation failed.", isCompiling: false });
        return;
      }

      const pageCountHeader = res.headers.get("X-Page-Count");
      const pageCount = pageCountHeader ? parseInt(pageCountHeader, 10) : null;

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const prevUrl = get().pdfUrl;
      set({ pdfUrl: url, pageCount, isCompiling: false, compileError: null });
      if (prevUrl) URL.revokeObjectURL(prevUrl);
    } catch (e) {
      if (e instanceof DOMException && e.name === "AbortError") return;
      set({
        compileError: e instanceof Error ? e.message : "Unknown compile error.",
        isCompiling: false,
      });
    }
  },
}));
