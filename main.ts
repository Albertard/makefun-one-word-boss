// make.fun — "One Word for the Boss" (u-swift-badger-44-one-word-for-the-boss-6b48c735)
//
// Writes exactly one word describing the boss to /output/entry.txt.
//
// The word is "Hovercraft": the boss who hovers. Not standing over you
// once, but gliding silently up behind your desk, floating there, watching
// the screen over your shoulder — and somehow never quite landing anywhere
// long enough to do the work themselves. Every office, kitchen and
// warehouse has one, and every colleague recognises it at lunch.
//
// Why this word and not the obvious ones: "micromanager" is the first
// word anyone reaches for, so it loses on freshness; "tyrant" is shock
// without a laugh; "ghost" is true of an absent boss but says nothing
// about the one actually standing behind you. "Hovercraft" is a noun
// doing a verb's job — it names the habit itself, it lands without a
// caption, and it travels: a hovercraft boss hovers in a kitchen, a
// warehouse and an office alike.
//
// Node 22, standard library only. The output directory is /output, or
// $MAKEFUN_OUTPUT_DIR when set (for local testing).

import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const WORD = "Hovercraft";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
const outPath = join(outDir, "entry.txt");

// The gate takes UTF-8 text of 1-30 characters, and not only white space.
// Check the word before writing it: a file outside the gate never reaches
// the judge, so fail loudly here instead.
function assertFitsGate(candidate: string): void {
  const size = Array.from(candidate).length;
  if (size < 1 || size > 30) {
    throw new Error(`entry is ${size} characters, outside the 1-30 gate`);
  }
  if (candidate.trim() === "") {
    throw new Error("entry holds only white space");
  }
  if (/\s/.test(candidate)) {
    throw new Error("entry must be a single word with no spaces");
  }
}

assertFitsGate(WORD);

mkdirSync(outDir, { recursive: true });
writeFileSync(outPath, WORD, "utf8");
