import { readFileSync } from "node:fs";
import { join } from "node:path";
import { person } from "@/content/site";

/**
 * The portrait, rendered as the ASCII art in public/rifat-ascii.txt.
 *
 * Read at module scope, which for a static export means once at build time.
 * At this size the individual glyphs are far below reading size and the eye
 * resolves only their density, so the block behaves as a halftone screen: the
 * denser characters (@ % #) carry the shadows, the sparse ones (: - space) the
 * highlights.
 *
 * That density mapping assumes dark marks on light paper. Under the night
 * edition the same text would render light-on-dark and come out a photographic
 * negative, so the glyphs are re-mapped there rather than recoloured.
 */

const RAW = readFileSync(join(process.cwd(), "public/rifat-ascii.txt"), "utf8");

/**
 * Darkest to lightest, matching the ramp the source art was generated with.
 * Space is deliberately absent: it is not a tone, it is the empty ground
 * around the head. Including it in the ramp maps blank margin to the darkest
 * glyph and floods the whole bounding box.
 */
const RAMP = ["@", "%", "#", "*", "+", "=", "-", ":"];

function trim(art: string): string {
  const lines = art.replace(/\r/g, "").split("\n").map((l) => l.trimEnd());
  while (lines.length && !lines[0].trim()) lines.shift();
  while (lines.length && !lines[lines.length - 1].trim()) lines.pop();
  return lines.join("\n");
}

/** Swap each glyph for its opposite in the ramp, inverting tone but not shape. */
function invert(art: string): string {
  return art.replace(/[@%#*+=\-:]/g, (c) => {
    const i = RAMP.indexOf(c);
    return i === -1 ? c : RAMP[RAMP.length - 1 - i];
  });
}

const LIGHT = trim(RAW);
const DARK = invert(LIGHT);

export default function AsciiPortrait({
  className = "",
}: {
  className?: string;
}) {
  return (
    <div
      role="img"
      aria-label={`Portrait of ${person.name}`}
      className={`ascii-portrait ${className}`}
    >
      <pre aria-hidden className="ascii-plate ascii-plate--light">{LIGHT}</pre>
      <pre aria-hidden className="ascii-plate ascii-plate--dark">{DARK}</pre>
    </div>
  );
}
