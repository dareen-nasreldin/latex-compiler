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
    <div className="mb-6">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
        Saved Configs
      </h3>
      <div className="mb-2 flex gap-1.5">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSave()}
          placeholder="e.g. Google application"
          className="min-w-0 flex-1 rounded border border-neutral-700 bg-neutral-800 px-2 py-1 text-xs text-neutral-100 placeholder:text-neutral-500"
        />
        <button
          onClick={handleSave}
          disabled={!name.trim()}
          className="flex-shrink-0 rounded bg-blue-600 px-2 py-1 text-xs font-medium text-white disabled:opacity-40"
        >
          Save
        </button>
      </div>

      {names.length === 0 ? (
        <p className="text-xs text-neutral-500">
          No saved configs yet — save your current target/toggles to switch
          between application loadouts later.
        </p>
      ) : (
        <ul className="space-y-1">
          {names.map((n) => (
            <li
              key={n}
              className="flex items-center justify-between gap-1.5 text-sm text-neutral-200"
            >
              <button
                onClick={() => loadConfig(n)}
                className="min-w-0 flex-1 truncate text-left hover:text-blue-400"
                title={`Load "${n}"`}
              >
                {n}
              </button>
              <button
                onClick={() => deleteConfig(n)}
                aria-label={`Delete ${n}`}
                title={`Delete "${n}"`}
                className="flex-shrink-0 text-neutral-500 hover:text-red-400"
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
