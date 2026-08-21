# Resume Builder — Personal LaTeX Editor (Mini-Overleaf)

A private tool for managing a modular "Master Resume": toggle header/skills/
project/experience/education blocks on or off per job target, tweak the
generated `.tex` in a Monaco editor, and see a live compiled PDF.

## Local setup

### 1. Install Tectonic

The compile API route (`app/api/compile/route.ts`) shells out to the
[Tectonic](https://tectonic-typesetting.github.io/) LaTeX engine, which is not
bundled with this repo.

**Windows, with an elevated terminal** (recommended if available):

```bash
choco install tectonic
```

**Without admin rights** — download the official release zip and put
`tectonic.exe` somewhere on your `PATH` (e.g. `%USERPROFILE%\bin`):
https://github.com/tectonic-typesetting/tectonic/releases

If `tectonic` isn't on `PATH`, set an absolute path instead via `.env.local`:

```
TECTONIC_BIN=C:\Users\you\bin\tectonic.exe
```

**Heads up on the first compile**: Tectonic downloads and locally caches the
LaTeX packages/fonts it needs the first time each one is used (can take
20–30s for the first few compiles as it pulls in `hyperref`, `fancyhdr`,
`titlesec`, etc.). After that, compiles typically finish in a few seconds.

### 2. Install dependencies and run

```bash
npm install
npm run dev
```

Open http://localhost:3000. The sidebar toggles which blocks from
`data/resumeBlocks.ts` are included; the editor lets you hand-edit the
generated `.tex` directly (edits are debounced ~1s before auto-compiling).
Compile errors show the Tectonic log instead of a blank preview.

### 3. Resume content

`data/resumeBlocks.ts` holds the real content: five targets (General SWE,
NVIDIA/HPC, Firmware & Embedded, AI Infrastructure, Systems & API), each with
its own headline, skills ordering, and education/coursework framing —
selecting a target in the sidebar swaps all three automatically. Experience
and Projects are independently toggleable blocks, checked on by default.

Two things still need filling in, marked `TODO` in `lib/latexTemplate.ts`'s
`CONTACT_BLOCK`: a phone number and a LinkedIn URL.

The shared macros every block relies on (`\resumeItem`, `\resumeSubheading`,
`\resumeProjectHeading`, etc.) live in `lib/latexTemplate.ts`.

## Deployment

Plain Vercel serverless functions can't run an arbitrary `tectonic` binary
out of the box, so deploying the compile API needs one of:

- **Vercel Sandbox** — provision a sandbox at request time, install/cache
  Tectonic in it, and run the compile there. Not wired up yet.
- **A small always-on service** (Railway, Render, Fly.io, or a Docker
  container) with Tectonic preinstalled, running the same
  `app/api/compile/route.ts` logic (or a thin equivalent) behind its own URL,
  with the frontend still deployed to Vercel.

Either path is future work — see the original project spec's "Cloud Sync"
phase for the rest of the roadmap (AI-assisted tailoring, saved toggle
loadouts, password-protected deploy).
