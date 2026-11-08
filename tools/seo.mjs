// node tools/seo.mjs  (no dependencies). Writes every shop page from shop/packs.json, which the panel edits, with the
// same renderer the browser uses (shop/app/views.mjs):
//  - /shop/ (the storefront), /shop/models/, /shop/search/, /shop/plugins/ and one page per style or theme
//    (/shop/stud/, /shop/ui/, ...) for what people search
//  - every pack's own page /shop/<page>/ (search title, short description, Product data, link previews) and its
//    roblox/ and discord/ click-through pages, which count the click and then forward
//  - sitemap.xml with every page that should be found
// The pages are whole files made from data: a new row in packs.json becomes a finished page with no hand work. The shop's
// CSS and JS get a version from their contents, so a change to them reaches every visitor at once.
// .github/workflows/seo.yml runs this on every push to main that touches the shop and commits what changed.
import fs from 'node:fs';
import path from 'node:path';
import crypto from 'node:crypto';
import {execFileSync} from 'node:child_process';
import * as V from '../shop/app/views.mjs';

export {metaDescription, clip} from '../shop/app/views.mjs';

const SITE = V.SITE;
let ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const APP = ['shop/app/views.mjs', 'shop/app/app.mjs', 'shop/app/shop.css'];

function read(rel) { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function readJson(rel, fallback) { try { return JSON.parse(read(rel)); } catch { return fallback; } }
function write(rel, text, changed) {
  const f = path.join(ROOT, rel);
  if (fs.existsSync(f) && fs.readFileSync(f, 'utf8') === text) return;
  fs.mkdirSync(path.dirname(f), {recursive: true});
  fs.writeFileSync(f, text);
  changed.push(rel);
}

/** Pages with a canonical address on this site and no noindex: everything search engines should list. */
function sitemapPages() {
  const out = [];
  const skip = /^(\.git|\.github|node_modules|tools|test|library|flashback|infinite-ocean|text-to-scratch)$/;   // docs sites list themselves
  (function walk(dir) {
    for (const e of fs.readdirSync(path.join(ROOT, dir), {withFileTypes: true})) {
      const rel = path.join(dir, e.name);
      if (e.isDirectory()) { if (!(dir === '' && skip.test(e.name))) walk(rel); continue; }
      if (!e.name.endsWith('.html') || e.name === '404.html') continue;
      const html = read(rel);
      if (!/<title[\s>]/i.test(html) || /<meta[^>]+name="robots"[^>]+noindex/i.test(html)) continue;   // fragments and hidden pages
      const canon = /<link[^>]+rel="canonical"[^>]+href="([^"]+)"/i.exec(html)?.[1];
      const url = `${SITE}/${rel.replace(/\\/g, '/').replace(/(^|\/)index\.html$/, '$1')}`;
      if (canon && canon !== url) continue;   // another address is the real one
      out.push({rel, url});
    }
  })('');
  return out.sort((a, b) => (a.url === `${SITE}/` ? -1 : b.url === `${SITE}/` ? 1 : a.url.localeCompare(b.url)));
}
function lastmod(rel) {
  try { return execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], {cwd: ROOT, encoding: 'utf8', stdio: ['ignore', 'pipe', 'ignore']}).trim() || today(); } catch { return today(); }
}
const today = () => new Date().toISOString().slice(0, 10);

/** The shop's CSS and JS as one short hash: it changes when any of them changes, and only then. */
function version() {
  const h = crypto.createHash('sha256');
  for (const rel of APP) h.update(read(rel));
  return h.digest('hex').slice(0, 10);
}

export function build(root = ROOT) {
  ROOT = path.resolve(root);
  const changed = [];
  const file = 'shop/packs.json';
  const packs = JSON.parse(read(file));
  // The panel adds a product with only its slug, name, price and link: give it a page address and tags once.
  let fixed = false;
  for (const p of packs) {
    if (!p.page) { p.page = V.kebab(p.name || p.slug); fixed = true; }
    if (!Array.isArray(p.tags)) { p.tags = []; fixed = true; }
  }
  if (fixed) write(file, `${JSON.stringify(packs, null, 4)}\n`, changed);

  const m = V.model(packs, {buy: readJson('shop/buy.json', {}), soon: readJson('shop/soon.json', [])});
  const v = version();
  const page = (rel, route) => write(rel, V.documentHtml(V.render(route, m), m, {version: v}), changed);

  page('shop/index.html', {kind: 'home'});
  page('shop/plugins/index.html', {kind: 'plugins'});
  for (const id of ['models', 'search', ...m.collections.map((c) => c.slug)]) page(`shop/${id}/index.html`, {kind: 'catalog', id});
  for (const p of m.live) {
    page(`shop/${p.page}/index.html`, {kind: 'pack', pack: p});
    if (p.url) write(`shop/${p.page}/roblox/index.html`, V.clickThrough('Roblox', p.name, p.url), changed);
    if (!V.soon(p)) write(`shop/${p.page}/discord/index.html`, V.clickThrough('Discord', p.name, V.DISCORD), changed);
  }
  write('shop/pack/index.html', V.legacyPackPage(), changed);

  // sitemap: lastmod is the page's last commit; the docs sites keep their own sitemaps (robots.txt lists them)
  const pages = sitemapPages();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${p.url}</loc><lastmod>${changed.includes(p.rel) ? today() : lastmod(p.rel)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  write('sitemap.xml', sitemap, changed);
  return {changed, pages: pages.map((p) => p.url), collections: m.collections.map((c) => ({slug: c.slug, packs: c.packs.length})), version: v};
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const r = build();
  console.log(`collections: ${r.collections.map((c) => `${c.slug} (${c.packs})`).join(', ')}`);
  console.log(`sitemap: ${r.pages.length} pages`);
  console.log(r.changed.length ? `changed:\n${r.changed.map((f) => `  ${f}`).join('\n')}` : 'nothing changed');
}
