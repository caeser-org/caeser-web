// Sync the Caeser docs from a local checkout of the engine repo into the
// Starlight content collection. Point HADES_DOCS at <repo>/docs if it is not
// at ~/hades/docs, then run `npm run docs:sync`.
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { rewriteDocLink } from "./docs-links.mjs";

const SRC = process.env.HADES_DOCS || `${process.env.HOME}/hades/docs`;
const OUT = new URL("../src/content/docs/docs", import.meta.url).pathname;
const GH = "https://github.com/caeser-org/ceaser/blob/main";

mkdirSync(join(OUT, "releases"), { recursive: true });

function rewriteLinks(body, file) {
  return body.replace(/\]\(([^)\s]+)\)/g, (_, target) => `](${rewriteDocLink(target, file)})`);
}

// Strip editorial/meta notes addressed to docs tooling, and normalise the
// typography the published site does not want (em dashes).
function clean(text) {
  const lines = text.split("\n");
  const out = [];
  for (let i = 0; i < lines.length; i++) {
    if (/^>\s*\*\*Publishing note/i.test(lines[i])) {
      while (i + 1 < lines.length && /^>/.test(lines[i + 1])) i++;
      if (lines[i + 1]?.trim() === "") i++;
      continue;
    }
    out.push(lines[i]);
  }
  return out.join("\n").replace(/\s*—\s*/g, " - ").replace(/—/g, "-");
}

function makeDoc(raw, file = "index.md") {
  const lines = raw.split("\n");
  let title = null;
  for (let i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("# ")) {
      title = lines[i].replace(/^#\s+/, "").trim();
      lines.splice(i, 1);
      break;
    }
  }
  // Starlight supplies the page outline; omit the repository's duplicate TOC.
  const body = clean(rewriteLinks(lines.join("\n").replace(/^\n+/, ""), file))
    .replace(/^## On this page\n[\s\S]*?(?=^## )/m, "");
  let description = "";
  for (const line of body.split("\n")) {
    const t = line.trim();
    if (!t || t.startsWith("#") || t.startsWith(">") || t.startsWith("|") || t.startsWith("---")) continue;
    description = t.replace(/[*_`\[\]]/g, "").replace(/\(.*?\)/g, "").trim();
    break;
  }
  if (description.length > 180) description = description.slice(0, 177).trimEnd() + "...";
  const safeTitle = (title ?? "Documentation").replace(/\s*—\s*/g, " - ");
  const fm = ["---", `title: ${JSON.stringify(safeTitle)}`, `description: ${JSON.stringify(description)}`, "---", ""].join("\n");
  return fm + body;
}

const files = readdirSync(SRC).filter((f) => f.endsWith(".md") && f !== "README.md");
writeFileSync(join(OUT, "index.md"), makeDoc(readFileSync(join(SRC, "README.md"), "utf8")));
for (const f of files) writeFileSync(join(OUT, f), makeDoc(readFileSync(join(SRC, f), "utf8"), f));
const rel = readdirSync(join(SRC, "releases")).filter((f) => f.endsWith(".md"));
for (const f of rel) writeFileSync(join(OUT, "releases", f), makeDoc(readFileSync(join(SRC, "releases", f), "utf8"), `releases/${f}`));
console.log(`synced ${files.length + rel.length + 1} docs from ${SRC}`);

// Publish diagrams as SVGs so documentation never depends on client rendering.
await import("./render-docs-diagrams.mjs");
