export type ResumeTarget = "general" | "nvidia" | "ai";

export interface ResumeBlock {
  id: string;
  label: string;
  latex: string;
}

export const targets: { id: ResumeTarget; label: string }[] = [
  { id: "general", label: "General SWE" },
  { id: "nvidia", label: "NVIDIA / HPC" },
  { id: "ai", label: "AI Infrastructure" },
];

// TODO: replace with your real tagline per target.
export const headers: Record<ResumeTarget, string> = {
  general: String.raw`\textbf{Software Engineer $|$ Full-Stack \& Distributed Systems}`,
  nvidia: String.raw`\textbf{U.S. Citizen $|$ Focused on High-Performance Computing, Hardware Architecture, \& AI/ML}`,
  ai: String.raw`\textbf{U.S. Citizen $|$ Focused on Large-Scale Systems, Parallel Computing, \& AI Infrastructure}`,
};

// TODO: replace with your real skills blocks.
export const skills: ResumeBlock[] = [
  {
    id: "core",
    label: "Core Languages",
    latex: String.raw`\item \textbf{Languages}{: Python, C++, TypeScript, Go}`,
  },
  {
    id: "ml",
    label: "ML / AI Skills",
    latex: String.raw`\item \textbf{ML/AI}{: PyTorch, CUDA, Triton, Distributed Training}`,
  },
  {
    id: "systems",
    label: "Systems / HPC Skills",
    latex: String.raw`\item \textbf{Systems}{: Linux, MPI, RDMA, SLURM, Docker, Kubernetes}`,
  },
];

// TODO: replace with your real project write-ups.
export const projects: ResumeBlock[] = [
  {
    id: "gis",
    label: "GIS Routing Engine",
    latex: String.raw`\resumeProjectHeading
      {\textbf{Scalable GIS Routing Engine} $|$ \emph{Go, PostGIS, Redis}}{2025}
      \resumeItemListStart
        \resumeItem{TODO: describe the GIS routing engine project's scale and impact.}
        \resumeItem{TODO: describe a key technical challenge and how it was solved.}
      \resumeItemListEnd`,
  },
  {
    id: "fpga",
    label: "Bare-Metal FPGA Game Engine",
    latex: String.raw`\resumeProjectHeading
      {\textbf{Bare-Metal FPGA Game Engine} $|$ \emph{SystemVerilog, VGA, UART}}{2024}
      \resumeItemListStart
        \resumeItem{TODO: describe the FPGA game engine architecture.}
        \resumeItem{TODO: describe performance/resource-utilization results.}
      \resumeItemListEnd`,
  },
];

// TODO: replace with your real work experience.
export const experience: ResumeBlock[] = [
  {
    id: "job1",
    label: "Most Recent Role",
    latex: String.raw`\resumeSubheading
      {Company Name}{City, State}
      {Job Title}{Start -- End}
      \resumeItemListStart
        \resumeItem{TODO: describe a quantified accomplishment.}
        \resumeItem{TODO: describe another quantified accomplishment.}
      \resumeItemListEnd`,
  },
];

// TODO: replace with your real education.
export const education: ResumeBlock[] = [
  {
    id: "school1",
    label: "University",
    latex: String.raw`\resumeSubheading
      {Your University}{City, State}
      {B.S. in Computer Science}{Start -- End}`,
  },
];
