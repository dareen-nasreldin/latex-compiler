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

  const overflow = onePage && pageCount != null && pageCount > 1;

  return (
    <div className="flex h-full w-full flex-col bg-bg">
      <div className="flex h-9 flex-shrink-0 items-center border-b border-border bg-surface px-3 font-mono text-[11px] text-text-muted">
        resume.pdf
      </div>
      {compileError ? (
        <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
          <button
            onClick={() => setShowLog((v) => !v)}
            className="flex-shrink-0 border-b border-ink/40 bg-ink-soft px-3 py-2 text-left font-mono text-[11px] uppercase tracking-wider text-ink"
          >
            Compile failed — {showLog ? "hide" : "show"} log
          </button>
          {showLog && (
            <pre className="flex-1 overflow-auto whitespace-pre-wrap break-words bg-surface p-3 font-mono text-[11px] leading-relaxed text-ink">
              {compileError}
            </pre>
          )}
          {pdfUrl && (
            <div className="flex-1 overflow-auto p-4 opacity-40">
              <iframe
                title="Resume PDF preview (stale)"
                src={pdfUrl}
                className="mx-auto h-full max-w-[680px] border-0 bg-paper"
              />
            </div>
          )}
        </div>
      ) : pdfUrl ? (
        <div
          className={`flex-1 overflow-auto p-4 ${overflow ? "border-t-2 border-ink" : ""}`}
        >
          <iframe
            title="Resume PDF preview"
            src={pdfUrl}
            className="mx-auto h-full max-w-[680px] border-0 bg-paper shadow-[0_8px_30px_rgba(0,0,0,0.5)]"
          />
        </div>
      ) : (
        <div className="flex flex-1 items-center justify-center font-mono text-[11px] uppercase tracking-wider text-text-muted">
          {isCompiling ? "Compiling…" : "No preview yet."}
        </div>
      )}
    </div>
  );
}
