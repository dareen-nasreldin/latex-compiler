"use client";

import Editor from "@monaco-editor/react";
import { useEffect, useRef } from "react";
import { useResumeStore } from "@/store/useResumeStore";

const DEBOUNCE_MS = 1000;

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
    <div className="h-full w-full">
      <Editor
        height="100%"
        language="latex"
        theme="vs-dark"
        value={texSource}
        onChange={(value) => setTexSource(value ?? "")}
        options={{
          minimap: { enabled: false },
          fontSize: 13,
          wordWrap: "on",
          scrollBeyondLastLine: false,
        }}
      />
    </div>
  );
}
