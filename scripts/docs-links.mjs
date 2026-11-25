import { posix } from 'node:path';
const repository = 'https://github.com/caeser-org/ceaser';
const docPages = new Set(['installation','capabilities','ci-integration','github-action','reports','runtime-architecture','sandbox-execution','supported-environments','environment-adapters','diagnosis-evaluation','external-validation','gap-analysis-staged-investigation']);
export function rewriteDocLink(target, file = 'index.md') {
  if (/^(#|\/|mailto:)/.test(target)) return target;
  if (/^https?:/.test(target)) {
    const historical = target.match(/^https:\/\/github\.com\/caeser-org\/ceaser\/blob\/v[78]\/docs\/([^#]+)\.md(#.*)?$/);
    if (historical && docPages.has(historical[1])) return `/docs/${historical[1]}/${historical[2] || ''}`;
    const prefix = `${repository}/blob/main/`;
    if (!target.startsWith(prefix)) return target;
    const relative = target.slice(prefix.length);
    const [path, hash] = relative.split('#');
    const doc = path.replace(/^docs\//,'').replace(/\.md$/,'');
    if (docPages.has(doc)) return `/docs/${doc}/${hash ? `#${hash}` : ''}`;
    if (path === '../README.md') return `${prefix}README.md${hash ? `#${hash}` : ''}`;
    return target;
  }
  const [path, hash] = target.split('#');
  const suffix = hash ? `#${hash}` : '';
  const resolved = posix.normalize(posix.join('docs',posix.dirname(file),path));
  if (resolved === 'docs/README.md' || resolved === 'docs/index.md') return `/docs/${suffix}`;
  if (resolved === 'docs/releases' || resolved === 'docs/releases/') return `/docs/releases/v020/${suffix}`;
  if (resolved.startsWith('docs/') && resolved.endsWith('.md')) {
    const slug = resolved.slice(5,-3).toLowerCase().replaceAll('.','');
    if (docPages.has(slug) || slug.startsWith('releases/')) return `/docs/${slug}/${suffix}`;
  }
  const isFolder = path.endsWith('/');
  return `${repository}/${isFolder ? 'tree' : 'blob'}/main/${resolved}${suffix}`;
}
