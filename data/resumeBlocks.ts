export type ResumeTarget = "general" | "nvidia" | "firmware" | "ai" | "systems";

export interface ResumeBlock {
  id: string;
  label: string;
  latex: string;
}

export const targets: { id: ResumeTarget; label: string }[] = [
  { id: "general", label: "General SWE / Big Tech" },
  { id: "nvidia", label: "NVIDIA / HPC" },
  { id: "firmware", label: "Firmware & Embedded" },
  { id: "ai", label: "AI Infrastructure" },
  { id: "systems", label: "Systems & API Integration" },
];

export const headers: Record<ResumeTarget, string> = {
  general: String.raw`\textbf{U.S. Citizen $|$ Focused on Large-Scale Systems, AI/ML, \& Algorithms}`,
  nvidia: String.raw`\textbf{U.S. Citizen $|$ Focused on High-Performance Computing, Hardware Architecture, \& AI/ML}`,
  firmware: String.raw`\textbf{U.S. Citizen $|$ Focused on Embedded Systems, Hardware-Software Co-Design, \& AI/ML}`,
  ai: String.raw`\textbf{U.S. Citizen $|$ Focused on Large-Scale Systems, Parallel Computing, \& AI Infrastructure}`,
  systems: String.raw`\textbf{U.S. Citizen $|$ Focused on Distributed Systems, API Architecture, \& Data Pipelines}`,
};

// Skills read as three curated orderings (hardware / AI-ML / general-backend)
// rather than independently toggleable blocks, so they're keyed by target.
const SKILLS_HARDWARE = String.raw`\begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Languages}{: C, C++, Assembly, Verilog, Bash, Python, Java, JavaScript, Groovy, SQL, HTML/CSS.} \\
     \textbf{Tools \& Libraries}{: ModelSim, Quartus, Unix/Linux, PyTorch, Pandas, Grafana k6, SonarQube, Git/Bitbucket, Jira, Gradle/Grails.} \\
     \textbf{Software Engineering}{: Object-Oriented Design (OOD), Data Structures, Algorithms, CI/CD, Test Automation.} \\
     \textbf{Core Concepts}{: Hardware Integration, Parallel Systems, Large Language Models (LLMs), REST APIs.}
    }}
\end{itemize}`;

const SKILLS_AI_ML = String.raw`\begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Languages}{: Python, C++, C, Bash, Java, SQL, JavaScript, Groovy, Assembly, Verilog, HTML/CSS.} \\
     \textbf{Tools \& Libraries}{: PyTorch, Pandas, Unix/Linux, Git/Bitbucket, Grafana k6, SonarQube, ModelSim, Quartus, Jira, Gradle/Grails.} \\
     \textbf{Software Engineering}{: Object-Oriented Design (OOD), Data Structures, Algorithms, CI/CD, Test Automation.} \\
     \textbf{Core Concepts}{: Large Language Models (LLMs), Parallel Systems, REST APIs, Hardware Integration.}
    }}
\end{itemize}`;

const SKILLS_BACKEND = String.raw`\begin{itemize}[leftmargin=0.15in, label={}]
    \small{\item{
     \textbf{Languages}{: Java, C++, Python, Groovy, JavaScript, Bash, SQL, HTML/CSS, C, Assembly, Verilog.} \\
     \textbf{Tools \& Libraries}{: Git/Bitbucket, Unix/Linux, Jira, SonarQube, Grafana k6, Gradle/Grails, PyTorch, Pandas, ModelSim, Quartus.} \\
     \textbf{Software Engineering}{: CI/CD, Test Automation, Object-Oriented Design (OOD), Data Structures, Algorithms.} \\
     \textbf{Core Concepts}{: Parallel Systems, Large Language Models (LLMs), Hardware Integration, REST APIs.}
    }}
\end{itemize}`;

export const skillsByTarget: Record<ResumeTarget, string> = {
  general: SKILLS_BACKEND,
  nvidia: SKILLS_HARDWARE,
  firmware: SKILLS_HARDWARE,
  ai: SKILLS_AI_ML,
  systems: SKILLS_BACKEND,
};

// Same story for education: the school/degree is fixed, but the focus line
// and coursework ordering are curated per role, not independently toggled.
const EDUCATION_HARDWARE = String.raw`\resumeSubHeadingListStart
    \resumeSubheading
      {University of Toronto}{Toronto, ON}
      {BASc Computer Engineering (PEY Co-op)}{Sep. 2024 - May 2029}
      \resumeItemListStart
        \resumeItem{\textbf{Focus:} Minor in \textbf{Artificial Intelligence}; Certificates in \textbf{Cybersecurity} and \textbf{Engineering Business}.}
        \resumeItem{\textbf{Relevant Coursework:} Computer Organization, Digital Logic, Operating Systems, Data Structures \& Algorithms, Computer Networks, AI \& Deep Learning, Software Design \& Communication.}
        \resumeItem{\textbf{Engineering Merit Scholarship (\$40,000 Award)}}
      \resumeItemListEnd
  \resumeSubHeadingListEnd`;

const EDUCATION_AI_ML = String.raw`\resumeSubHeadingListStart
    \resumeSubheading
      {University of Toronto}{Toronto, ON}
      {BASc Computer Engineering (PEY Co-op)}{Sep. 2024 - May 2029}
      \resumeItemListStart
        \resumeItem{\textbf{Focus:} Minor in \textbf{Artificial Intelligence}; Certificates in \textbf{Engineering Business} and \textbf{Cybersecurity}.}
        \resumeItem{\textbf{Relevant Coursework:} AI \& Deep Learning, Data Structures \& Algorithms, Operating Systems, Computer Networks, Software Design \& Communication, Computer Organization, Digital Logic.}
        \resumeItem{\textbf{Engineering Merit Scholarship (\$40,000 Award)}}
      \resumeItemListEnd
  \resumeSubHeadingListEnd`;

const EDUCATION_BACKEND = String.raw`\resumeSubHeadingListStart
    \resumeSubheading
      {University of Toronto}{Toronto, ON}
      {BASc Computer Engineering (PEY Co-op)}{Sep. 2024 - May 2029}
      \resumeItemListStart
        \resumeItem{\textbf{Focus:} Certificates in \textbf{Cybersecurity} and \textbf{Engineering Business}; Minor in \textbf{Artificial Intelligence}.}
        \resumeItem{\textbf{Relevant Coursework:} Data Structures \& Algorithms, Operating Systems, Computer Networks, Software Design \& Communication, AI \& Deep Learning, Computer Organization, Digital Logic.}
        \resumeItem{\textbf{Engineering Merit Scholarship (\$40,000 Award)}}
      \resumeItemListEnd
  \resumeSubHeadingListEnd`;

export const educationByTarget: Record<ResumeTarget, string> = {
  general: EDUCATION_BACKEND,
  nvidia: EDUCATION_HARDWARE,
  firmware: EDUCATION_HARDWARE,
  ai: EDUCATION_AI_ML,
  systems: EDUCATION_BACKEND,
};

export const experience: ResumeBlock[] = [
  {
    id: "exiger",
    label: "Exiger — Software Engineering Intern (2026-present)",
    latex: String.raw`\resumeSubheading
      {Exiger (Product Engineering)}{McLean, VA}
      {Software Engineering Intern}{Jun. 2026 - Present}
      \resumeItemListStart
        \resumeItem{Cut manual end-to-end QA testing from a 2--3 hour process down to a $\sim$4-minute automated run by writing a targeted smoke test suite in \textbf{Grafana k6 and JavaScript}.}
        \resumeItem{Built an internal \textbf{Claude Skill} that auto-generates test scenarios, cutting manual authoring time from hours to $\sim$10 minutes, now adopted by the QA team.}
        \resumeItem{Dropped local development login times from 40 seconds to under \textbf{2 seconds} by building a custom \textbf{Okta} authentication bypass in \textbf{Java and Groovy}.}
        \resumeItem{Maintained legacy system stability through active code reviews and Agile sprint planning using \textbf{Jira} and \textbf{Bitbucket}.}
      \resumeItemListEnd`,
  },
  {
    id: "neurotech",
    label: "NeurotechUofT — Software Subsystem Member",
    latex: String.raw`\resumeSubheading
      {NeurotechUofT (Design Team)}{Toronto, ON}
      {Software Subsystem Member}{Sep. 2025 - Present}
      \resumeItemListStart
        \resumeItem{Added subject-level cross-validation to track model instability, leading to a \textbf{PyTorch} autoencoder architecture fix that dropped run-to-run variance by 9x.}
        \resumeItem{Built a configurable \textbf{PyTorch} data pipeline to process and standardize experiment logging across \textbf{6+ different} clinical datasets.}
        \resumeItem{Investigated a cross-validation outlier using statistical feature analysis, guiding training-set decisions to improve the model's real-world accuracy.}
      \resumeItemListEnd`,
  },
  {
    id: "customer-service",
    label: "Customer Service & Leadership Roles (2019-2023)",
    latex: String.raw`\resumeSubheading
      {Customer Service \& Leadership Roles}{Virginia, USA}
      {Soccer Referee, Cashier, Barista (Metro DC, Cox Farms, Regal)}{Oct. 2019 - Nov. 2023}
      \resumeItemListStart
        \resumeItem{Managed high-pressure situations and enforced regulations as a certified Grassroots Soccer Referee, developing strong conflict resolution and split-second decision-making skills.}
        \resumeItem{Maintained strict attention to detail and efficiency in fast-paced retail and food service environments while balancing a rigorous Advanced Studies high school curriculum.}
      \resumeItemListEnd`,
  },
];

export const projects: ResumeBlock[] = [
  {
    id: "gis",
    label: "Scalable GIS Routing Engine",
    latex: String.raw`\resumeProjectHeading
      {\textbf{\href{https://github.com/dareen-nasreldin/GIS-Routing-Engine}{Scalable GIS Routing Engine}} $|$ \emph{C++, Parallel Systems, Data Processing}}{Jan. 2026 - Present}
      \resumeItemListStart
        \resumeItem{Built a high-performance geographic mapping application in \textbf{C++}, using \textbf{parallel threads} to route data across \textbf{100,000+ intersection nodes}.}
        \resumeItem{Dropped pathfinding execution times to sub-second latency by replacing Dijkstra's with the \textbf{A* algorithm} for optimized spatial navigation.}
        \resumeItem{Updated the \textbf{EZGL} front-end with dynamic sidebar controls to cleanly display real-time route instructions and improve user navigation.}
      \resumeItemListEnd`,
  },
  {
    id: "fpga",
    label: "Bare-Metal FPGA Game Engine",
    latex: String.raw`\resumeProjectHeading
      {\textbf{Bare-Metal FPGA Game Engine} $|$ \emph{Verilog, Hardware Architecture, ModelSim}}{Oct. 2025 - Nov. 2025}
      \resumeItemListStart
        \resumeItem{Architected a fully deterministic, zero-latency game engine in \textbf{Verilog} on an Altera DE1-SoC FPGA, operating entirely without a CPU or operating system.}
        \resumeItem{Engineered a multi-module Finite State Machine (FSM) to handle high-speed collision detection and 640x480 VGA sprite rendering across a 50MHz clock domain.}
        \resumeItem{Developed bare-metal hardware drivers for PS/2 keyboard input and mapped game state logic to 7-segment hex displays using custom Linear Feedback Shift Registers (LFSR) for RNG.}
      \resumeItemListEnd`,
  },
  {
    id: "vga-music",
    label: "Embedded VGA Music Sequencer",
    latex: String.raw`\resumeProjectHeading
      {\textbf{\href{https://github.com/dareen-nasreldin/VGA-Music-Sequencer}{Embedded VGA Music Sequencer}} $|$ \emph{C, Embedded Systems, Real-Time Processing}}{Mar. 2026}
      \resumeItemListStart
        \resumeItem{Programmed a real-time digital synthesizer with zero-jitter audio playback by driving an 8 kHz polling loop through memory-mapped I/O.}
        \resumeItem{Managed multi-page sheet music state variables and achieved \textbf{O(1)} array deletion by designing an optimized flat \textbf{C struct}.}
        \resumeItem{Generated interactive square-wave audio using 16-bit PCM arrays stored in flash memory and fixed-point phase accumulators.}
      \resumeItemListEnd`,
  },
  {
    id: "portfolio",
    label: "Interactive Developer Portfolio",
    latex: String.raw`\resumeProjectHeading
      {\textbf{\href{https://dareen-nasreldin.github.io}{Interactive Developer Portfolio}} $|$ \emph{React, Next.js, GitHub Pages, CI/CD}}{Aug. 2026}
      \resumeItemListStart
        \resumeItem{Built a modular, highly responsive personal web portfolio to highlight engineering metrics, utilizing modern \textbf{React} component architecture.}
        \resumeItem{Programmed a custom, animated \textbf{PowerShell terminal wrapper} that actively renders a type-writer simulation of core technical stacks to increase recruiter engagement.}
        \resumeItem{Automated the deployment pipeline via \textbf{Git} branch integration and GitHub Actions to continuously push code updates directly to production.}
      \resumeItemListEnd`,
  },
  {
    id: "surgical-biomodel",
    label: "Surgical Biomodel Design (ESP II)",
    latex: String.raw`\resumeProjectHeading
      {\textbf{Surgical Biomodel Design (ESP II)} $|$ \emph{Prototyping, Materials Testing, Client Management}}{Jan. 2025 - Apr. 2025}
      \resumeItemListStart
        \resumeItem{Collaborated with Sunnybrook Hospital surgeons to architect and prototype a bilaminar skin flap biomodel for facial reconstruction training, addressing a critical gap in medical education.}
        \resumeItem{Validated the biomodel's anatomical realism and mechanical behavior by conducting rigorous physical tensile testing using university engineering lab equipment.}
        \resumeItem{Delivered a comprehensive technical report detailing final design specifications, safety constraints, and reproducible material cost-efficiency.}
      \resumeItemListEnd`,
  },
  {
    id: "bahen-courtyard",
    label: "Bahen Courtyard Optimization (ESP I)",
    latex: String.raw`\resumeProjectHeading
      {\textbf{Bahen Courtyard Optimization (ESP I)} $|$ \emph{Systems Design, Requirements Gathering}}{Sep. 2024 - Dec. 2024}
      \resumeItemListStart
        \resumeItem{Translated ambiguous client problem statements into strict, measurable engineering requirements to optimize the spatial flow and functionality of the university courtyard.}
        \resumeItem{Iterated on conceptual designs using engineering matrices to quantitatively balance environmental, societal, and human factors, proposing a fully validated structural solution.}
      \resumeItemListEnd`,
  },
];
