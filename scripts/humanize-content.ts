/**
 * humanize-content.ts
 *
 * Runs the AI humanizer filter on MDX content files.
 *
 * Usage:
 *   tsx scripts/humanize-content.ts <file.mdx>
 *   tsx scripts/humanize-content.ts content/glossary/ai-governance.mdx
 *   tsx scripts/humanize-content.ts --all-glossary
 *   tsx scripts/humanize-content.ts --all-regulations
 *
 * The script extracts the prose body (below frontmatter), passes it through
 * rewriteForHuman(), and writes the result back in place.
 *
 * GPTZero scoring workflow (manual QA):
 *   1. Run this script on target content
 *   2. Paste output into gptzero.me for AI detection scoring
 *   3. Target: <15% AI probability on the "completely written" metric
 *   4. Re-run on flagged sections if needed
 */

import fs from "fs";
import path from "path";
import { rewriteForHuman } from "../src/lib/ai-filter";

async function humanizeFile(filePath: string): Promise<void> {
  const absolutePath = path.resolve(filePath);
  if (!fs.existsSync(absolutePath)) {
    console.error(`File not found: ${absolutePath}`);
    process.exit(1);
  }

  const content = fs.readFileSync(absolutePath, "utf-8");

  // Split frontmatter from body
  const frontmatterMatch = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!frontmatterMatch) {
    console.log(`No frontmatter found in ${filePath}, processing entire file`);
    const result = await rewriteForHuman(content);
    fs.writeFileSync(absolutePath, result, "utf-8");
    console.log(`Done: ${filePath}`);
    return;
  }

  const frontmatter = frontmatterMatch[1];
  const body = frontmatterMatch[2];

  if (!body.trim()) {
    console.log(`Empty body in ${filePath}, skipping`);
    return;
  }

  console.log(`Humanizing: ${filePath} (${body.length} chars)...`);
  const humanized = await rewriteForHuman(body);

  const output = `---\n${frontmatter}\n---\n${humanized}`;
  fs.writeFileSync(absolutePath, output, "utf-8");
  console.log(`Done: ${filePath}`);
}

async function humanizeDirectory(dir: string): Promise<void> {
  const files = fs.readdirSync(dir).filter((f) => f.endsWith(".mdx"));
  console.log(`Found ${files.length} MDX files in ${dir}`);

  for (const file of files) {
    await humanizeFile(path.join(dir, file));
  }
}

async function main(): Promise<void> {
  const args = process.argv.slice(2);

  if (args.length === 0) {
    console.log(`Usage:
  tsx scripts/humanize-content.ts <file.mdx>
  tsx scripts/humanize-content.ts --all-glossary
  tsx scripts/humanize-content.ts --all-regulations`);
    process.exit(0);
  }

  if (args.includes("--all-glossary")) {
    await humanizeDirectory("content/glossary");
  } else if (args.includes("--all-regulations")) {
    await humanizeDirectory("content/regulations");
  } else {
    for (const file of args) {
      await humanizeFile(file);
    }
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
