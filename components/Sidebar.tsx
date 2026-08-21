"use client";

import { useResumeStore } from "@/store/useResumeStore";
import { experience, projects, targets } from "@/data/resumeBlocks";

function BlockGroup({
  title,
  blocks,
  selectedIds,
  category,
}: {
  title: string;
  blocks: { id: string; label: string }[];
  selectedIds: string[];
  category: "experienceIds" | "projectIds";
}) {
  const toggleBlock = useResumeStore((s) => s.toggleBlock);

  return (
    <div className="mb-6">
      <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
        {title}
      </h3>
      <div className="space-y-1.5">
        {blocks.map((block) => (
          <label
            key={block.id}
            className="flex cursor-pointer items-center gap-2 text-sm text-neutral-200"
          >
            <input
              type="checkbox"
              checked={selectedIds.includes(block.id)}
              onChange={() => toggleBlock(category, block.id)}
              className="h-3.5 w-3.5 accent-blue-500"
            />
            {block.label}
          </label>
        ))}
      </div>
    </div>
  );
}

export default function Sidebar() {
  const config = useResumeStore((s) => s.config);
  const setTarget = useResumeStore((s) => s.setTarget);
  const setOnePage = useResumeStore((s) => s.setOnePage);
  const pageCount = useResumeStore((s) => s.pageCount);

  return (
    <div className="h-full overflow-y-auto bg-neutral-900 p-4 text-neutral-100">
      <h2 className="mb-4 text-sm font-bold uppercase tracking-wide">
        Resume Toggler
      </h2>

      <div className="mb-6">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Layout
        </h3>
        <div className="space-y-1.5">
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-200">
            <input
              type="radio"
              name="layout"
              checked={config.onePage}
              onChange={() => setOnePage(true)}
              className="h-3.5 w-3.5 accent-blue-500"
            />
            One Page (compact spacing)
          </label>
          <label className="flex cursor-pointer items-center gap-2 text-sm text-neutral-200">
            <input
              type="radio"
              name="layout"
              checked={!config.onePage}
              onChange={() => setOnePage(false)}
              className="h-3.5 w-3.5 accent-blue-500"
            />
            Master (all content, any length)
          </label>
        </div>
        {pageCount != null && (
          <p
            className={`mt-2 text-xs ${
              config.onePage && pageCount > 1
                ? "text-amber-400"
                : "text-neutral-500"
            }`}
          >
            {pageCount} page{pageCount === 1 ? "" : "s"}
            {config.onePage && pageCount > 1
              ? " — cut some content to fit one page."
              : ""}
          </p>
        )}
      </div>

      <div className="mb-6">
        <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-neutral-400">
          Target
        </h3>
        <div className="space-y-1.5">
          {targets.map((t) => (
            <label
              key={t.id}
              className="flex cursor-pointer items-center gap-2 text-sm text-neutral-200"
            >
              <input
                type="radio"
                name="target"
                checked={config.target === t.id}
                onChange={() => setTarget(t.id)}
                className="h-3.5 w-3.5 accent-blue-500"
              />
              {t.label}
            </label>
          ))}
        </div>
        <p className="mt-2 text-xs text-neutral-500">
          Education and Skills sections follow the selected target
          automatically.
        </p>
      </div>

      <BlockGroup
        title="Experience"
        blocks={experience}
        selectedIds={config.experienceIds}
        category="experienceIds"
      />
      <BlockGroup
        title="Projects"
        blocks={projects}
        selectedIds={config.projectIds}
        category="projectIds"
      />
    </div>
  );
}
