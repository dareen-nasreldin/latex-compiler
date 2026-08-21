// `compact` tightens spacing for one-page mode: smaller item text and more
// negative vspace between entries. `generateLatex` still checks the actual
// rendered page count afterward and warns if it overflows regardless.
export function buildPreamble(compact: boolean): string {
  const itemFont = compact ? String.raw`\footnotesize` : String.raw`\small`;
  const itemGap = compact ? "-4pt" : "-2pt";
  const subheadingGap = compact ? "-9pt" : "-7pt";
  const projectGap = compact ? "-9pt" : "-7pt";
  const listEndGap = compact ? "-8pt" : "-5pt";
  const sectionGap = compact ? "-6pt" : "-4pt";
  const sectionRuleGap = compact ? "-7pt" : "-5pt";

  return String.raw`\documentclass[letterpaper,11pt]{article}

\usepackage{latexsym}
\usepackage[empty]{fullpage}
\usepackage{titlesec}
\usepackage{marvosym}
\usepackage[usenames,dvipsnames]{color}
\usepackage{verbatim}
\usepackage{enumitem}
\usepackage[hidelinks]{hyperref}
\usepackage{fancyhdr}
\usepackage[english]{babel}
\usepackage{tabularx}

% glyphtounicode + \pdfgentounicode are omitted: they rely on the pdfTeX-only
% \pdfglyphtounicode primitive, which doesn't exist in Tectonic's XeTeX-based
% engine (compile fails with "Undefined control sequence" otherwise). XeTeX
% already extracts correct Unicode text from copy-pasted PDFs on its own, so
% this isn't a loss here.

%----------FONT OPTIONS----------
\usepackage[T1]{fontenc}
\usepackage[sfdefault]{FiraSans}

\pagestyle{fancy}
\fancyhf{}
\fancyfoot{}
\renewcommand{\headrulewidth}{0pt}
\renewcommand{\footrulewidth}{0pt}

% Adjust margins
\addtolength{\oddsidemargin}{-0.5in}
\addtolength{\evensidemargin}{-0.5in}
\addtolength{\textwidth}{1in}
\addtolength{\topmargin}{-0.65in}
\addtolength{\textheight}{1.3in}

\urlstyle{same}

\raggedbottom
\raggedright
\setlength{\tabcolsep}{0in}

% Sections formatting
\titleformat{\section}{
  \vspace{${sectionGap}}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{${sectionRuleGap}}]

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item${itemFont}{
    {#1 \vspace{${itemGap}}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{${itemGap}}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{${itemFont}#3} & \textit{${itemFont} #4} \\
    \end{tabular*}\vspace{${subheadingGap}}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      ${itemFont}#1 & #2 \\
    \end{tabular*}\vspace{${projectGap}}
}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{${listEndGap}}}
`;
}

// The heading block through the tagline line — generateLatex() appends the
// target-specific tagline and the closing \end{center} itself, since the
// tagline changes per target but the rest of the heading is fixed.
export const CONTACT_BLOCK_TOP = String.raw`\begin{center}
    {\huge \scshape Dareen M. Nasreldin} \\ \vspace{2pt}
    Aldie, VA $|$ (571) 282-9632 $|$ \href{mailto:dareennasreldin@gmail.com}{dareennasreldin@gmail.com} \\ \vspace{1pt}
 \href{https://linkedin.com/in/dareen-nasreldin}{linkedin.com/in/dareen-nasreldin} $|$ \href{https://github.com/dareen-nasreldin}{github.com/dareen-nasreldin} $|$ \href{https://dareen-nasreldin.github.io}{Portfolio} \\ \vspace{2pt}`;
