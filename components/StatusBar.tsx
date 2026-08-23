"use client";

import { useResumeStore } from "@/store/useResumeStore";

function SidebarToggleIcon({ collapsed }: { collapsed: boolean }) {
  return (
    <svg width="15" height="15" viewBox="0 0 15 15" fill="none">
      <rect
        x="1"
        y="2"
        width="13"
        height="11"
        rx="1.5"
        stroke="currentColor"
        strokeWidth="1.1"
      />
      <path d="M5.5 2v11" stroke="currentColor" strokeWidth="1.1" />
      {collapsed ? null : (
        <rect x="2" y="3" width="2.5" height="9" rx="0.5" fill="currentColor" />
      )}
    </svg>
  );
}

export default function StatusBar({
  sidebarCollapsed,
  onToggleSidebar,
}: {
  sidebarCollapsed: boolean;
  onToggleSidebar: () => void;
}) {
  const isCompiling = useResumeStore((s) => s.isCompiling);
  const compileError = useResumeStore((s) => s.compileError);
  const pageCount = useResumeStore((s) => s.pageCount);
  const onePage = useResumeStore((s) => s.config.onePage);

  const overflow = onePage && pageCount != null && pageCount > 1;

  return (
    <header className="flex h-12 flex-shrink-0 items-center justify-between border-b border-border bg-surface px-3">
      <div className="flex items-center gap-2">
        <button
          onClick={onToggleSidebar}
          aria-label={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
          title={sidebarCollapsed ? "Show sidebar" : "Hide sidebar"}
          className="flex h-7 w-7 flex-shrink-0 items-center justify-center rounded-sm text-text-muted transition-colors hover:bg-surface-raised hover:text-text"
        >
          <SidebarToggleIcon collapsed={sidebarCollapsed} />
        </button>
        <span className="font-serif text-[15px] font-medium tracking-tight text-text">
          Résumé, Toggled
        </span>
      </div>

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
