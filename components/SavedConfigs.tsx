"use client";

import { useState } from "react";
import { useResumeStore } from "@/store/useResumeStore";

export default function SavedConfigs() {
  const savedConfigs = useResumeStore((s) => s.savedConfigs);
  const saveConfig = useResumeStore((s) => s.saveConfig);
  const loadConfig = useResumeStore((s) => s.loadConfig);
  const deleteConfig = useResumeStore((s) => s.deleteConfig);
  const [name, setName] = useState("");

  const names = Object.keys(savedConfigs);

  const handleSave = () => {
    const trimmed = name.trim();
    if (!trimmed) return;
    saveConfig(trimmed);
    setName("");
  };

  return (
    <div>
      <div className="mb-2 flex gap-1.5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="e.g. Google application"
          className="min-w-0 flex-1 rounded-sm border border-border bg-surface-raised px-2 py-1 text-[13px] text-text placeholder:text-text-muted"
        />
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="flex-shrink-0 rounded-sm bg-accent px-2.5 py-1 text-[13px] font-medium text-bg disabled:opacity-30"
        >
          Save
        </button>
      </div>

      {names.length === 0 ? (
        <p className="text-[11px] leading-snug text-text-muted">
          Save your current target/toggles to switch between application
          loadouts later.
        </p>
      ) : (
        <ul className="space-y-0.5">
          {names.map((n) => (
            <li
              key={n}
              className="flex items-center justify-between gap-1.5 text-[13px] text-text"
            >
              <button
                onClick={() => loadConfig(n)}
                className="min-w-0 flex-1 truncate text-left hover:text-accent-strong"
                title={`Load "${n}"`}
              >
                {n}
              </button>
              <button
                onClick={() => deleteConfig(n)}
                aria-label={`Delete ${n}`}
                title={`Delete "${n}"`}
                className="flex-shrink-0 text-text-muted hover:text-ink"
              >
                ×
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
