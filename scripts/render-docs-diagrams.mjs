// Convert documentation diagrams to portable SVGs before they reach Markdown.
// Run after docs sync; normal site builds use the already generated assets.
import { readdirSync, readFileSync, writeFileSync, mkdirSync, existsSync, mkdtempSync, rmSync } from 'node:fs';
import { join } from 'node:path';
import { tmpdir } from 'node:os';
import { createHash } from 'node:crypto';
import { execFileSync } from 'node:child_process';
import { renderDesignedDiagram } from './docs-diagram-design.mjs';
const root = new URL('../', import.meta.url).pathname;
const temporary = mkdtempSync(join(tmpdir(), 'caeser-diagrams-'));
const chrome = process.env.PUPPETEER_EXECUTABLE_PATH || [
  '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome', '/usr/bin/google-chrome', '/usr/bin/chromium',
].find(existsSync);
const browserConfig = join(temporary, 'browser.json');
writeFileSync(browserConfig, JSON.stringify({ ...(chrome ? { executablePath: chrome } : {}), args: ['--no-sandbox'], headless: true }));
const themeConfig = join(temporary, 'theme.json');
writeFileSync(themeConfig, JSON.stringify({ theme: 'base', themeVariables: {
  primaryColor: '#efefea', primaryTextColor: '#171717', primaryBorderColor: '#aaa99f',
  lineColor: '#696b62', secondaryColor: '#f8f8f6', tertiaryColor: '#f1f1ed',
  edgeLabelBackground: '#f8f8f6', fontFamily: 'Arial, sans-serif', fontSize: '15px',
}, flowchart: { htmlLabels: false, curve: 'basis', nodeSpacing: 28, rankSpacing: 36 } }));
mkdirSync(join(root, 'public/diagrams'), { recursive: true });
mkdirSync(join(root, 'src/diagrams'), { recursive: true });
let count = 0;
function renderDirectory(directory) {
  for (const entry of readdirSync(directory, { withFileTypes: true })) {
    const file = join(directory, entry.name);
    if (entry.isDirectory()) { renderDirectory(file); continue; }
    if (!entry.name.endsWith('.md')) continue;
    const original = readFileSync(file, 'utf8');
    const rendered = original.replace(/^```mermaid\s*\n([\s\S]*?)^```/gm, (block, source, offset) => {
      const hash = createHash('sha256').update(source).digest('hex').slice(0, 12);
      const input = join(root, 'src/diagrams', `${hash}.mmd`);
      const designed = renderDesignedDiagram(hash);
      const filename = `${hash}${designed ? '-v2' : ''}.svg`;
      const output = join(root, 'public/diagrams', filename);
      writeFileSync(input, source);
      if (designed) writeFileSync(output, designed);
      else if (!existsSync(output)) execFileSync(process.execPath, [
        join(root, 'node_modules/@mermaid-js/mermaid-cli/src/cli.js'),
        '-i', input, '-o', output, '-b', 'transparent', '-c', themeConfig, '-p', browserConfig,
      ], { stdio: 'inherit', timeout: 60000 });
      const headings = [...original.slice(0, offset).matchAll(/^##+\s+(.+)$/gm)];
      const label = headings.at(-1)?.[1] || 'Investigation pipeline';
      count++;
      return `![${label} flow diagram](/diagrams/${filename})`;
    }).replace(/\/diagrams\/([a-f0-9]{12})(?:-v2)?\.svg/g, (url, hash) => {
      const designed = renderDesignedDiagram(hash);
      if (!designed) return url;
      writeFileSync(join(root, 'public/diagrams', `${hash}-v2.svg`), designed);
      return `/diagrams/${hash}-v2.svg`;
    });
    if (rendered !== original) writeFileSync(file, rendered);
  }
}
try { renderDirectory(join(root, 'src/content/docs')); }
finally { rmSync(temporary, { recursive: true, force: true }); }
console.log(`Rendered ${count} documentation diagrams as static SVGs.`);
