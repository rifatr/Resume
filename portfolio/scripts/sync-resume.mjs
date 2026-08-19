// Copies the LaTeX-built resume PDF from the repo root into public/ so the
// download on the site can never drift from the resume Rifat last built.
import { copyFile, mkdir } from "node:fs/promises";
import { existsSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const here = dirname(fileURLToPath(import.meta.url));
const source = resolve(here, "../../Mohammad_Lutfar_Rahman_Rifat.pdf");
const target = resolve(here, "../public/resume.pdf");

if (!existsSync(source)) {
  console.warn(`[sync-resume] no PDF at ${source} — skipping.`);
  process.exit(0);
}

await mkdir(dirname(target), { recursive: true });
await copyFile(source, target);
console.log("[sync-resume] public/resume.pdf updated.");
