import { CONTACT_BLOCK, LATEX_PREAMBLE } from "./latexTemplate";
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
}

export const defaultConfig: ResumeConfig = {
  target: "general",
  experienceIds: experience.map((b) => b.id),
  projectIds: projects.map((b) => b.id),
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

  const body: string[] = [CONTACT_BLOCK];

  body.push(`\\begin{center}\n    \\small ${headers[config.target]}\n\\end{center}\n`);

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

  body.push(`\\section{Skills}\n${skillsByTarget[config.target]}\n`);

  return `${LATEX_PREAMBLE}\n\\begin{document}\n\n${body.join("\n")}\n\\end{document}\n`;
}
