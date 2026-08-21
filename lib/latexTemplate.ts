export const LATEX_PREAMBLE = String.raw`\documentclass[letterpaper,11pt]{article}

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
  \vspace{-4pt}\scshape\raggedright\large
}{}{0em}{}[\color{black}\titlerule \vspace{-5pt}]

%-------------------------
% Custom commands
\newcommand{\resumeItem}[1]{
  \item\small{
    {#1 \vspace{-2pt}}
  }
}

\newcommand{\resumeSubheading}[4]{
  \vspace{-2pt}\item
    \begin{tabular*}{0.97\textwidth}[t]{l@{\extracolsep{\fill}}r}
      \textbf{#1} & #2 \\
      \textit{\small#3} & \textit{\small #4} \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeProjectHeading}[2]{
    \item
    \begin{tabular*}{0.97\textwidth}{l@{\extracolsep{\fill}}r}
      \small#1 & #2 \\
    \end{tabular*}\vspace{-7pt}
}

\newcommand{\resumeSubHeadingListStart}{\begin{itemize}[leftmargin=0.15in, label={}]}
\newcommand{\resumeSubHeadingListEnd}{\end{itemize}}
\newcommand{\resumeItemListStart}{\begin{itemize}}
\newcommand{\resumeItemListEnd}{\end{itemize}\vspace{-5pt}}
`;

// The heading block through the tagline line — generateLatex() appends the
// target-specific tagline and the closing \end{center} itself, since the
// tagline changes per target but the rest of the heading is fixed.
export const CONTACT_BLOCK_TOP = String.raw`\begin{center}
    {\huge \scshape Dareen M. Nasreldin} \\ \vspace{2pt}
    Aldie, VA $|$ (571) 282-9632 $|$ \href{mailto:dareennasreldin@gmail.com}{dareennasreldin@gmail.com} \\ \vspace{1pt}
 \href{https://linkedin.com/in/dareen-nasreldin}{linkedin.com/in/dareen-nasreldin} $|$ \href{https://github.com/dareen-nasreldin}{github.com/dareen-nasreldin} $|$ \href{https://dareen-nasreldin.github.io}{Portfolio} \\ \vspace{2pt}`;
