import { NextResponse } from "next/server";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm, writeFile } from "node:fs/promises";
import { tmpdir } from "node:os";
import { join } from "node:path";

export const runtime = "nodejs";

// Tectonic downloads and caches its LaTeX bundle on first use, which can take
// well over 30s; the timeout is generous to cover that one-time warm-up.
const COMPILE_TIMEOUT_MS = 60_000;
const TECTONIC_BIN = process.env.TECTONIC_BIN || "tectonic";

export async function POST(request: Request) {
  let tex: string | undefined;
  try {
    ({ tex } = (await request.json()) as { tex?: string });
  } catch {
    return NextResponse.json({ log: "Request body is not valid JSON." }, { status: 400 });
  }

  if (!tex || typeof tex !== "string") {
    return NextResponse.json({ log: "Missing 'tex' string in request body." }, { status: 400 });
  }

  const dir = await mkdtemp(join(tmpdir(), "resume-builder-"));
  const texPath = join(dir, "resume.tex");
  const pdfPath = join(dir, "resume.pdf");

  try {
    await writeFile(texPath, tex, "utf8");

    await new Promise<void>((resolve, reject) => {
      execFile(
        /* turbopackIgnore: true */ TECTONIC_BIN,
        ["resume.tex", "--outdir", "."],
        { cwd: dir, timeout: COMPILE_TIMEOUT_MS, signal: request.signal },
        (error, stdout, stderr) => {
          if (error) {
            const log = [stdout, stderr].filter(Boolean).join("\n").trim();
            reject(new Error(log || error.message));
            return;
          }
          resolve();
        },
      );
    });

    const pdf = await readFile(pdfPath);
    return new NextResponse(new Uint8Array(pdf), {
      status: 200,
      headers: { "Content-Type": "application/pdf" },
    });
  } catch (error) {
    const isMissingBinary =
      error instanceof Error && "code" in error && (error as NodeJS.ErrnoException).code === "ENOENT";

    const log = isMissingBinary
      ? `Could not run '${TECTONIC_BIN}'. Install Tectonic and either put it on PATH or set TECTONIC_BIN in .env.local — see README.md.`
      : error instanceof Error
        ? error.message
        : "Unknown compilation error.";

    return NextResponse.json({ log }, { status: 400 });
  } finally {
    await rm(dir, { recursive: true, force: true });
  }
}
