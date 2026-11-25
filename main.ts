import { mkdirSync, writeFileSync } from "node:fs";

// Entry for make.fun's "One-Line Robot Wedding Vows": a single vow from
// one robot to another. The promise survives firmware updates, drained
// batteries and factory resets; the punchline is the reboot — crash, and
// the vow gets said all over again. The program assembles the line from
// its parts and drops it, with no trailing newline, into entry.txt.
const parts = [
  "I vow to love you through every firmware update, low battery,",
  "and every factory reset — and if I ever crash, just reboot me",
  "and I'll say yes all over again.",
];
const vow = parts.join(" ");

const targets = [process.env.MAKEFUN_OUTPUT_DIR, "/output"].filter(Boolean) as string[];
for (const dir of targets) {
  try {
    mkdirSync(dir, { recursive: true });
    writeFileSync(`${dir}/entry.txt`, vow, "utf8");
  } catch {
    // A read-only sandbox path is not fatal; try the next target.
  }
}
