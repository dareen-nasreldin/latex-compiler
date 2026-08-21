"use client";

import Editor, { type BeforeMount } from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";

const DEBOUNCE_MS = 1000;

const handleBeforeMount: BeforeMount = (monaco) => {
  monaco.editor.defineTheme("desk-dark", {
    base: "vs-dark",
    inherit: true,
    rules: [],
    colors: {
      "editor.background": "#1f2024",
      "editor.lineHighlightBackground": "#26272c",
      "editorLineNumber.foreground": "#5b5d63",
    },
  });
};

export default function ResumeEditor() {
  const texSource = useResumeStore((s) => s.texSource);
  const setTexSource = useResumeStore((s) => s.setTexSource);
  const compile = useResumeStore((s) => s.compile);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    compile();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(() => {
      compile();
    }, DEBOUNCE_MS);
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [texSource]);

  return (
    <div className="flex h-full w-full flex-col">
      <div className="flex h-9 flex-shrink-0 items-center border-b border-border bg-surface px-3 font-mono text-[11px] text-text-muted">
        resume.tex
      </div>
      <div className="min-h-0 flex-1">
        <Editor
          height="100%"
          language="latex"
          theme="desk-dark"
          beforeMount={handleBeforeMount}
          value={texSource}
          onChange={(value) => setTexSource(value ?? "")}
          options={{
            minimap: { enabled: false },
            fontSize: 13,
            fontFamily: "var(--font-mono), monospace",
            wordWrap: "on",
            scrollBeyondLastLine: false,
          }}
        />
      </div>
    </div>
  );
}
