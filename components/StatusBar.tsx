"use client";

import { useResumeStore } from "@/store/useResumeStore";

export default function StatusBar() {
  const isCompiling = useResumeStore((s) => s.isCompiling);
  const compileError = useResumeStore((s) => s.compileError);
  const pageCount = useResumeStore((s) => s.pageCount);
  const onePage = useResumeStore((s) => s.config.onePage);

  const overflow = onePage && pageCount != null && pageCount > 1;

  return (
    <header className="flex h-12 flex-shrink-0 items-center justify-between border-b border-border bg-surface px-4">
      <span className="font-serif text-[15px] font-medium tracking-tight text-text">
        Résumé, Toggled
      </span>

      <div className="flex items-center gap-3 font-mono text-[11px] uppercase tracking-wider">
        {isCompiling && (
          <span className="text-text-muted">Compiling…</span>
        )}
        {!isCompiling && compileError && (
          <span className="rounded-sm border border-ink/40 bg-ink-soft px-1.5 py-0.5 text-ink">
            Compile error
          </span>
        )}
        {!isCompiling && !compileError && pageCount != null && (
          <span
            className={
              overflow
                ? "rounded-sm border border-ink/40 bg-ink-soft px-1.5 py-0.5 text-ink"
                : "text-text-muted"
            }
          >
            {pageCount} page{pageCount === 1 ? "" : "s"}
          </span>
        )}
      </div>
    </header>
  );
}
