import { mkdirSync, writeFileSync } from "node:fs";
import { dirname } from "node:path";

// The judged text: one original fortune-cookie line for a developer.
// Legacy code, reframed as a letter: the author is a past you who
// trusted future you a little too much.
const entry =
  "Legacy code is a letter from a past you who trusted future you too much.";

// Gate: 1-120 characters, not only whitespace, no leading/trailing
// whitespace, no control characters (mirrors the competition gate).
if (
  entry.length < 1 ||
  entry.length > 120 ||
  !/\S/.test(entry) ||
  entry !== entry.trim() ||
  /[\x00-\x1F\x7F]/.test(entry)
) {
  throw new Error(
    "entry must be 1-120 characters, not only whitespace, no leading/trailing whitespace, no control characters",
  );
}

// Output contract: write exactly `entry`, byte for byte, with no
// trailing newline — the gate above is the only check; the file the
// grader runs is this same main.ts, so a local run must reproduce it.
const out = process.env.ENTRY_OUTPUT ?? "/output/entry.txt";
mkdirSync(dirname(out), { recursive: true });
writeFileSync(out, entry);
