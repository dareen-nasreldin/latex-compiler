"use client";

import type { ReactNode } from "react";
import { useResumeStore } from "@/store/useResumeStore";
import { experience, projects, targets } from "@/data/resumeBlocks";
import SavedConfigs from "@/components/SavedConfigs";

function Section({
  eyebrow,
  children,
  note,
  noteTone = "muted",
}: {
  eyebrow: string;
  children: ReactNode;
  note?: string;
  noteTone?: "muted" | "ink";
}) {
  return (
    <div className="border-t border-border px-4 py-4 first:border-t-0">
      <h3 className="mb-2.5 font-mono text-[10px] uppercase tracking-wider text-text-muted">
        {eyebrow}
      </h3>
      {children}
      {note && (
        <p
          className={`mt-2 text-[11px] leading-snug ${
            noteTone === "ink" ? "text-ink" : "text-text-muted"
          }`}
        >
          {note}
        </p>
      )}
    </div>
  );
}

function OptionRow({
  type,
  name,
  checked,
  onChange,
  label,
}: {
  type: "radio" | "checkbox";
  name?: string;
  checked: boolean;
  onChange: () => void;
  label: string;
}) {
  return (
    <label className="flex cursor-pointer items-center gap-2 py-0.5 text-[13px] text-text">
      <input
        type={type}
        name={name}
        checked={checked}
        onChange={onChange}
        className="h-3.5 w-3.5 flex-shrink-0"
      />
      {label}
    </label>
  );
}

function BlockGroup({
  eyebrow,
  blocks,
  selectedIds,
  category,
}: {
  eyebrow: string;
  blocks: { id: string; label: string }[];
  selectedIds: string[];
  category: "experienceIds" | "projectIds";
}) {
  const toggleBlock = useResumeStore((s) => s.toggleBlock);

  return (
    <Section eyebrow={eyebrow}>
      <div className="space-y-0.5">
        {blocks.map((block) => (
          <OptionRow
            key={block.id}
            type="checkbox"
            checked={selectedIds.includes(block.id)}
            onChange={() => toggleBlock(category, block.id)}
            label={block.label}
          />
        ))}
      </div>
    </Section>
  );
}

export default function Sidebar() {
  const config = useResumeStore((s) => s.config);
  const setTarget = useResumeStore((s) => s.setTarget);
  const setOnePage = useResumeStore((s) => s.setOnePage);
  const pageCount = useResumeStore((s) => s.pageCount);

  const overflow = config.onePage && pageCount != null && pageCount > 1;

  return (
    <div className="h-full overflow-y-auto bg-surface text-text">
      <Section eyebrow="Saved Configs">
        <SavedConfigs />
      </Section>

      <Section
        eyebrow="Layout"
        note={
          overflow
            ? "Over one page — uncheck a project or experience entry below to trim it down."
            : undefined
        }
        noteTone="ink"
      >
        <div className="space-y-0.5">
          <OptionRow
            type="radio"
            name="layout"
            checked={config.onePage}
            onChange={() => setOnePage(true)}
            label="One page (compact)"
          />
          <OptionRow
            type="radio"
            name="layout"
            checked={!config.onePage}
            onChange={() => setOnePage(false)}
            label="Master (any length)"
          />
        </div>
      </Section>

      <Section
        eyebrow="Target"
        note="Education and Skills follow the target automatically."
      >
        <div className="space-y-0.5">
          {targets.map((t) => (
            <OptionRow
              key={t.id}
              type="radio"
              name="target"
              checked={config.target === t.id}
              onChange={() => setTarget(t.id)}
              label={t.label}
            />
          ))}
        </div>
      </Section>

      <BlockGroup
        eyebrow="Experience"
        blocks={experience}
        selectedIds={config.experienceIds}
        category="experienceIds"
      />
      <BlockGroup
        eyebrow="Projects"
        blocks={projects}
        selectedIds={config.projectIds}
        category="projectIds"
      />
    </div>
  );
}
