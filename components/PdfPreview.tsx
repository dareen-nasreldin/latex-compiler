"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export default function PdfPreview() {
  const pdfUrl = useResumeStore((s) => s.pdfUrl);
  const pageCount = useResumeStore((s) => s.pageCount);
  const onePage = useResumeStore((s) => s.config.onePage);
  const isCompiling = useResumeStore((s) => s.isCompiling);
  const compileError = useResumeStore((s) => s.compileError);
  const [showLog, setShowLog] = useState(true);

  const overflowWarning = onePage && pageCount != null && pageCount > 1;

  return (
    <div className="relative flex h-full w-full flex-col bg-neutral-800">
      {isCompiling && (
        <div className="absolute right-3 top-3 z-10 rounded bg-neutral-900/80 px-2 py-1 text-xs text-neutral-200">
          Compiling…
        </div>
      )}

      {overflowWarning && !compileError && (
        <div className="flex-shrink-0 bg-amber-950 px-3 py-2 text-xs font-medium text-amber-200">
          This resume is {pageCount} pages — trim some content to fit one
          page, or switch to Master layout.
        </div>
      )}

      {compileError ? (
        <div className="flex h-full w-full flex-col overflow-hidden">
          <button
            onClick={() => setShowLog((v) => !v)}
            className="flex-shrink-0 bg-red-950 px-3 py-2 text-left text-xs font-semibold text-red-200"
          >
            Compile failed — {showLog ? "hide" : "show"} log
          </button>
          {showLog && (
            <pre className="flex-1 overflow-auto whitespace-pre-wrap break-words bg-neutral-950 p-3 text-xs text-red-300">
              {compileError}
            </pre>
          )}
          {pdfUrl && (
            <iframe
              title="Resume PDF preview (stale)"
              src={pdfUrl}
              className="flex-1 border-0 opacity-50"
            />
          )}
        </div>
      ) : pdfUrl ? (
        <iframe title="Resume PDF preview" src={pdfUrl} className="flex-1 w-full border-0" />
      ) : (
        <div className="flex h-full w-full items-center justify-center text-sm text-neutral-500">
          {isCompiling ? "Compiling your first preview…" : "No preview yet."}
        </div>
      )}
    </div>
  );
}
