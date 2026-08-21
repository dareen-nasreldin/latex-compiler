import { buildPreamble, CONTACT_BLOCK_TOP } from "./latexTemplate";
import {
  educationByTarget,
  experience,
  headers,
  projects,
  skillsByTarget,
  type ResumeTarget,
} from "@/data/resumeBlocks";

export interface ResumeConfig {
  target: ResumeTarget;
  experienceIds: string[];
  projectIds: string[];
  onePage: boolean;
}

export const defaultConfig: ResumeConfig = {
  target: "general",
  experienceIds: experience.map((b) => b.id),
  projectIds: projects.map((b) => b.id),
  onePage: true,
};

function section(title: string, itemsLatex: string[]): string {
  if (itemsLatex.length === 0) return "";
  return `\\section{${title}}\n    \\resumeSubHeadingListStart\n${itemsLatex.join("\n")}\n    \\resumeSubHeadingListEnd\n`;
}

export function generateLatex(config: ResumeConfig): string {
  const selectedExperience = experience.filter((b) =>
    config.experienceIds.includes(b.id),
  );
  const selectedProjects = projects.filter((b) =>
    config.projectIds.includes(b.id),
  );

  const body: string[] = [
    `${CONTACT_BLOCK_TOP}\n    ${headers[config.target]}\n\\end{center}\n`,
  ];

  body.push(`\\section{Education}\n${educationByTarget[config.target]}\n`);

  if (selectedExperience.length > 0) {
    body.push(
      section(
        "Experience",
        selectedExperience.map((b) => b.latex),
      ),
    );
  }

  if (selectedProjects.length > 0) {
    body.push(
      section(
        "Projects",
        selectedProjects.map((b) => b.latex),
      ),
    );
  }

  body.push(`\\section{Technical Skills}\n${skillsByTarget[config.target]}\n`);

  return `${buildPreamble(config.onePage)}\n\\begin{document}\n\n${body.join("\n")}\n\\end{document}\n`;
}
