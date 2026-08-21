import { CONTACT_BLOCK, LATEX_PREAMBLE } from "./latexTemplate";
import {
  education,
  experience,
  headers,
  projects,
  skills,
  type ResumeTarget,
} from "@/data/resumeBlocks";

export interface ResumeConfig {
  target: ResumeTarget;
  skillIds: string[];
  experienceIds: string[];
  projectIds: string[];
  educationIds: string[];
}

export const defaultConfig: ResumeConfig = {
  target: "general",
  skillIds: skills.map((b) => b.id),
  experienceIds: experience.map((b) => b.id),
  projectIds: projects.map((b) => b.id),
  educationIds: education.map((b) => b.id),
};

function section(title: string, itemsLatex: string[]): string {
  if (itemsLatex.length === 0) return "";
  return `\\section{${title}}\n    \\resumeSubHeadingListStart\n${itemsLatex.join("\n")}\n    \\resumeSubHeadingListEnd\n`;
}

export function generateLatex(config: ResumeConfig): string {
  const selectedSkills = skills.filter((b) => config.skillIds.includes(b.id));
  const selectedExperience = experience.filter((b) =>
    config.experienceIds.includes(b.id),
  );
  const selectedProjects = projects.filter((b) =>
    config.projectIds.includes(b.id),
  );
  const selectedEducation = education.filter((b) =>
    config.educationIds.includes(b.id),
  );

  const body: string[] = [CONTACT_BLOCK];

  body.push(`\\begin{center}\n    \\small ${headers[config.target]}\n\\end{center}\n`);

  if (selectedEducation.length > 0) {
    body.push(
      section(
        "Education",
        selectedEducation.map((b) => b.latex),
      ),
    );
  }

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

  if (selectedSkills.length > 0) {
    body.push(
      `\\section{Skills}\n    \\begin{itemize}[leftmargin=0.15in, label={}]\n      \\small{\\item{\n${selectedSkills
        .map((b) => b.latex)
        .join(" \\\\\n")}\n      }}\n    \\end{itemize}\n`,
    );
  }

  return `${LATEX_PREAMBLE}\n\\begin{document}\n\n${body.join("\n")}\n\\end{document}\n`;
}
