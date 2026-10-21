// node tools/seo.mjs  (no dependencies). Makes the shop findable from shop/packs.json, which the panel edits:
//  - every pack's own page /shop/<page>/ (search title, short description, Product data, link previews), made from a
//    template when the panel added a pack that has no page yet, plus its roblox/ and discord/ click-through pages
//  - the static grid and pack list in shop/index.html, so search engines see every pack without running scripts
//  - one page per style or theme (/shop/stud/, /shop/voxel/, ...) for what people search, linked from every shop page
//  - sitemap.xml with every page that should be found
// Only text between <!--name:start--> and <!--name:end--> markers is rewritten, so hand edits elsewhere stay.
// .github/workflows/seo.yml runs this on every push to main that touches the shop and commits what changed.
import fs from 'node:fs';
import path from 'node:path';
import {execFileSync} from 'node:child_process';

const SITE = 'https://kashtheking.com';
let ROOT = path.resolve(path.dirname(new URL(import.meta.url).pathname), '..');
const TEMPLATE = '100-stud-pets';   // the pack page a new pack's page is copied from

// Pages per style or theme. `match` picks packs from packs.json; a page with fewer than 2 packs is not made.
// Words are what people type into Google, YouTube and the DevForum when they look for assets.
export const COLLECTIONS = [
  {slug: 'stud', nav: 'Stud', h1: ['STUD', 'ASSET PACKS'], tag: 'CLASSIC ROBLOX STUDS',
    title: 'Roblox Stud Asset Packs: Studded Models for Roblox Studio',
    lead: 'Classic studded Roblox style: smooth blocky models with the real Roblox studs texture. Pets, eggs, bosses, worlds and seasonal builds that look at home in any old-school or simulator game.',
    match: (p) => has(p, 'Stud')},
  {slug: 'voxel', nav: 'Voxel', h1: ['VOXEL', 'ASSET PACKS'], tag: 'BLOCKY  ·  MINECRAFT STYLE',
    title: 'Roblox Voxel Asset Packs: Blocky Minecraft-Style Models',
    lead: 'Blocky voxel models in a Minecraft-like style for Roblox Studio: villages, cities, sky islands, dungeons, biomes, mobs, characters, vehicles, furniture, tools and armor.',
    match: (p) => has(p, 'Voxel')},
  {slug: 'pixel', nav: 'Pixel', h1: ['PIXEL', 'ASSET PACKS'], tag: 'PIXEL ART IN 3D',
    title: 'Roblox Pixel Asset Packs: Pixel Art Guns and Items in 3D',
    lead: 'Pixel art turned into 3D Roblox models: guns, swords, food, tools and loot with crisp pixel textures, ready for inventories, shops and drops.',
    match: (p) => /pixel/i.test(p.name)},
  {slug: 'halloween', nav: 'Halloween', h1: ['HALLOWEEN', 'ASSET PACKS'], tag: 'SPOOKY SEASON',
    title: 'Roblox Halloween Asset Packs: Spooky Models and Decorations',
    lead: 'Halloween models for Roblox events and horror games: pumpkins, graves, haunted props, spooky tools and creatures, rigged and animated where they move.',
    match: (p) => has(p, 'Halloween') || /halloween|spooky|horror/i.test(p.name)},
  {slug: 'weapons', nav: 'Weapons', h1: ['WEAPON', 'ASSET PACKS'], tag: 'GUNS  ·  SWORDS  ·  TOOLS',
    title: 'Roblox Weapon Asset Packs: Gun, Sword and Tool Models',
    lead: 'Guns, blasters, swords, fishing rods and tools for Roblox shooters, RPGs and simulators. Moving parts are separate and rigged, so reloads, triggers and reels animate.',
    match: (p) => has(p, 'Weapons') || /\bguns?\b|tools|rods/i.test(p.name)},
  {slug: 'vehicles', nav: 'Vehicles', h1: ['VEHICLE', 'ASSET PACKS'], tag: 'CARS  ·  KARTS  ·  MACHINES',
    title: 'Roblox Vehicle Asset Packs: Cars, Karts and Machines',
    lead: 'Cars, karts, trucks and machines for Roblox racing, city and tycoon games. Every wheel is its own part, so they are ready to drive.',
    match: (p) => has(p, 'Vehicles')},
  {slug: 'pets', nav: 'Pets & animals', h1: ['PET & ANIMAL', 'ASSET PACKS'], tag: 'FOR PET SIMULATORS',
    title: 'Roblox Pet Asset Packs: Rigged and Animated Pets and Animals',
    lead: 'Pets, eggs and animals for pet simulators, hatch games and farms. Rigged with shared Idle, Walk, Jump and Fly animations, so every pet moves the same way in your code.',
    match: (p) => has(p, 'Animals') || /\bpets?\b|eggs|dinos|creatures/i.test(p.name)},
  {slug: 'characters', nav: 'Characters', h1: ['CHARACTER', 'ASSET PACKS'], tag: 'NPCS  ·  ENEMIES  ·  BOSSES',
    title: 'Roblox Character Asset Packs: Rigged NPCs, Enemies and Bosses',
    lead: 'Rigged and animated NPCs, enemies, mobs and bosses for Roblox RPGs, tower defense and fighting games, with walk, attack and hit animations.',
    match: (p) => has(p, 'Characters')},
  {slug: 'rpg', nav: 'RPG', h1: ['RPG', 'ASSET PACKS'], tag: 'DUNGEONS  ·  LOOT  ·  MONSTERS',
    title: 'Roblox RPG Asset Packs: Dungeons, Loot and Monsters',
    lead: 'Everything for a Roblox RPG: dungeons, villages, enemies, bosses, loot, potions and gear.',
    match: (p) => has(p, 'RPG')},
  {slug: 'simulator', nav: 'Simulator & tycoon', h1: ['SIMULATOR', 'ASSET PACKS'], tag: 'SIMULATORS  ·  TYCOONS',
    title: 'Roblox Simulator and Tycoon Asset Packs',
    lead: 'Props, machines, eggs, lucky blocks and pets for Roblox simulators and tycoons.',
    match: (p) => has(p, 'Simulator') || has(p, 'Tycoon')},
  {slug: 'buildings', nav: 'Buildings & maps', h1: ['BUILDING & MAP', 'ASSET PACKS'], tag: 'MAPS  ·  CITIES  ·  VILLAGES',
    title: 'Roblox Building and Map Asset Packs: Cities, Villages and Islands',
    lead: 'Buildings, streets, villages, islands and nature to build a whole Roblox map fast.',
    match: (p) => has(p, 'Buildings') || has(p, 'City') || has(p, 'Nature')},
  {slug: 'cute', nav: 'Cute', h1: ['CUTE', 'ASSET PACKS'], tag: 'CHIBI  ·  TOY STYLE',
    title: 'Cute Roblox Asset Packs: Chibi Toy-Style Models',
    lead: 'Chunky, colourful toy-style models for cozy, kids and simulator games: pets, food, furniture, cars, robots and more.',
    match: (p) => has(p, 'Cute')},
];

const has = (p, t) => (p.tags ?? []).includes(t);
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;'}[c]));
const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
const money = (n) => `$${Number(n).toFixed(2)}`;
const kebab = (s) => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
/** Cuts text to at most n characters at a word, with an ellipsis. */
export const clip = (s, n) => { s = String(s ?? '').replace(/\s+/g, ' ').trim(); if (s.length <= n) return s; const c = s.slice(0, n - 1); return `${c.slice(0, c.lastIndexOf(' ') > n / 2 ? c.lastIndexOf(' ') : c.length).replace(/[\s,;:.(-]+$/, '')}…`; };
/** What the models look like, for titles and descriptions. */
export const style = (p) => (has(p, 'Stud') ? 'studded' : /pixel/i.test(p.name) ? 'pixel art' : has(p, 'Voxel') ? 'voxel' : 'low-poly');
const moves = (p) => (/animat/i.test(p.description ?? '') ? 'rigged and animated' : /rigged/i.test(p.description ?? '') ? 'rigged' : 'textured');
const free = (p) => Number(p.price) === 0;
const priceText = (p) => (free(p) ? 'Free' : money(p.price));
const pageUrl = (p) => `${SITE}/shop/${p.page}/`;
const imageUrl = (rel) => `${SITE}/shop/${rel}`;

/** The search snippet: what it is, the style, the price, under ~160 characters. */
export function metaDescription(p) {
  const lead = `${p.count ?? ''} ${style(p)} Roblox models, ${moves(p)}.`.trim();
  const tail = ` ${priceText(p)} on the Creator Store.`;
  const first = (p.description ?? '').split(/(?<=[.!?])\s/)[0];
  return `${lead} ${clip(first, Math.max(40, 158 - lead.length - tail.length))}${tail}`.replace(/\s+/g, ' ');
}

function read(rel) { return fs.readFileSync(path.join(ROOT, rel), 'utf8'); }
function write(rel, text, changed) {
  const f = path.join(ROOT, rel);
  if (fs.existsSync(f) && fs.readFileSync(f, 'utf8') === text) return;
  fs.mkdirSync(path.dirname(f), {recursive: true});
  fs.writeFileSync(f, text);
  changed.push(rel);
}
/** Replaces what is between <!--name:start--> and <!--name:end-->. */
function between(text, name, inner) {
  const a = `<!--${name}:start-->`, b = `<!--${name}:end-->`;
  const i = text.indexOf(a), j = text.indexOf(b);
  if (i < 0 || j < i) throw new Error(`no ${a} ... ${b} markers`);
  return text.slice(0, i + a.length) + inner + text.slice(j);
}
/** Puts a marked block after `anchor` once; later runs replace what is inside it. */
function ensureBlock(text, name, inner, anchor) {
  if (text.includes(`<!--${name}:start-->`)) return between(text, name, inner);
  const i = text.indexOf(anchor);
  if (i < 0) throw new Error(`cannot place ${name}: "${anchor}" not found`);
  return `${text.slice(0, i + anchor.length)}\n        <!--${name}:start-->${inner}<!--${name}:end-->${text.slice(i + anchor.length)}`;
}

function packSeo(p) {
  const slides = (p.slides?.length ? p.slides : [p.image]).filter(Boolean);
  const desc = metaDescription(p);
  const product = {
    '@context': 'https://schema.org', '@type': 'Product', name: `${p.name} - Roblox Asset Pack`, description: p.description ?? desc,
    image: [p.image, ...slides].filter((v, i, a) => v && a.indexOf(v) === i).map(imageUrl), url: pageUrl(p), sku: p.slug,
    category: 'Roblox asset pack', brand: {'@type': 'Brand', name: 'KashTheKing'},
    offers: {'@type': 'Offer', price: Number(p.price).toFixed(2), priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: p.url},
  };
  const crumbs = {'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
    {'@type': 'ListItem', position: 1, name: 'KashTheKing', item: `${SITE}/`},
    {'@type': 'ListItem', position: 2, name: 'Roblox Asset Packs', item: `${SITE}/shop/`},
    {'@type': 'ListItem', position: 3, name: p.name, item: pageUrl(p)}]};
  const img = slides[0] ?? p.image;
  return `
    <title>${esc(p.name)} - ${style(p) === 'low-poly' ? '' : `${style(p)[0].toUpperCase()}${style(p).slice(1)} `}Roblox Asset Pack | KashTheKing Shop</title>
    <meta name="description" content="${esc(desc)}">
    <link rel="canonical" href="${pageUrl(p)}">
    <meta property="og:type" content="product">
    <meta property="og:site_name" content="KashTheKing Shop">
    <meta property="og:url" content="${pageUrl(p)}">
    <meta property="og:title" content="${esc(p.name)} - Roblox Asset Pack (${priceText(p)})">
    <meta property="og:description" content="${esc(clip(p.description ?? desc, 300))}">
    ${img ? `<meta property="og:image" content="${imageUrl(img)}">
    <meta property="og:image:alt" content="${esc(p.name)} Roblox asset pack">` : `<meta property="og:image" content="${SITE}/shop/og-banner.jpg">`}
    <meta property="product:price:amount" content="${Number(p.price).toFixed(2)}">
    <meta property="product:price:currency" content="USD">
    <meta name="twitter:card" content="summary_large_image">
    <meta name="twitter:site" content="@KashTheKing_X">
    <script type="application/ld+json">${json(product)}</script>
    <script type="application/ld+json">${json(crumbs)}</script>
    <script>window.PACK_SLUG = ${JSON.stringify(p.slug)};</script>
`;
}

function packStatic(p) {
  return `<div id="pack"><h1>${esc(p.name)} - Roblox Asset Pack</h1><p>${esc(p.description)}</p><p>${p.count} models, ${priceText(p)}. <a href="${esc(p.url)}">Get it on the Roblox Creator Store</a>.</p>${p.image ? `<img src="../${esc(p.image)}" alt="${esc(p.name)} Roblox asset pack thumbnail" width="540" height="540">` : ''}</div>\n`;
}

/** Links to every collection page. `prefix` is how the page reaches /shop/ ("" on the shop, "../" one level down). */
function collectionNav(cols, prefix, current) {
  return `<nav class="cols" aria-label="Browse asset packs by style"><style>.cols{display:flex;flex-wrap:wrap;gap:8px;align-items:center;margin:28px 0 8px}.cols b{color:var(--dim);font-size:13px;font-weight:700;letter-spacing:.06em;text-transform:uppercase;margin-right:4px}.cols a{padding:7px 13px;border-radius:999px;border:1px solid var(--line);background:var(--panel);color:var(--text);text-decoration:none;font-size:14px;font-weight:600}.cols a:hover,.cols a[aria-current]{border-color:var(--gold);color:var(--gold)}</style><b>Browse</b><a href="${prefix || './'}"${current === '' ? ' aria-current="page"' : ''}>All packs</a>${cols.map((c) => `<a href="${prefix}${c.slug}/"${c.slug === current ? ' aria-current="page"' : ''}>${esc(c.nav)}</a>`).join('')}</nav>`;
}

function itemList(name, list) {
  return `<script type="application/ld+json">${json({'@context': 'https://schema.org', '@type': 'ItemList', name, numberOfItems: list.length,
    itemListElement: list.map((p, i) => ({'@type': 'ListItem', position: i + 1, name: p.name, url: pageUrl(p)}))})}</script>`;
}
const gridCards = (list) => list.map((p) => `<a class="card" href="${esc(p.page)}/"><img src="${esc(p.image)}" alt="${esc(p.name)} Roblox asset pack" loading="lazy" width="540" height="540"><div class="body"><h2>${esc(p.name)}</h2><p>${esc(p.description)}</p></div></a>`).join('');

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
  try { return execFileSync('git', ['log', '-1', '--format=%cs', '--', rel], {cwd: ROOT, encoding: 'utf8'}).trim() || today(); } catch { return today(); }
}
const today = () => new Date().toISOString().slice(0, 10);

export function build(root = ROOT) {
  ROOT = path.resolve(root);
  const changed = [];
  const file = 'shop/packs.json';
  const raw = read(file);
  const packs = JSON.parse(raw);
  // The panel adds a product with only its slug, name, price and link: give it a page address and tags once.
  let fixed = false;
  for (const p of packs) {
    if (!p.page) { p.page = kebab(p.name || p.slug); fixed = true; }
    if (!Array.isArray(p.tags)) { p.tags = []; fixed = true; }
  }
  if (fixed) write(file, `${JSON.stringify(packs, null, 4)}\n`, changed);
  const live = packs.filter((p) => p.page && p.url);

  const cols = COLLECTIONS.map((c) => ({...c, packs: live.filter(c.match)}))
    .filter((c) => c.packs.length >= 2);

  // each pack's page
  const template = read(`shop/${TEMPLATE}/index.html`);
  for (const p of live) {
    const rel = `shop/${p.page}/index.html`;
    let html = fs.existsSync(path.join(ROOT, rel)) ? read(rel) : template.replace(/<div id="pack">[\s\S]*?<\/div>\n/, '<div id="pack"></div>\n').replace(/<!--cols:start-->[\s\S]*?<!--cols:end-->/, '<!--cols:start--><!--cols:end-->');
    html = between(html, 'seo', packSeo(p));
    html = html.replace(/<div id="pack">[\s\S]*?<\/div>\n/, packStatic(p));
    const mine = cols.filter((c) => c.packs.includes(p));
    html = ensureBlock(html, 'cols', collectionNav([...mine, ...cols.filter((c) => !mine.includes(c))], '../', null), '</section>');
    write(rel, html, changed);
    for (const [sub, label, to] of [['roblox', 'Roblox', p.url], ['discord', 'Discord', 'https://discord.gg/6HYgCk22eD']]) {
      const srel = `shop/${p.page}/${sub}/index.html`;
      if (fs.existsSync(path.join(ROOT, srel))) continue;
      const t = read(`shop/${TEMPLATE}/${sub}/index.html`)
        .replace(/<title>[^<]*<\/title>/, `<title>Opening ${label}: ${esc(p.name)}</title>`)
        .replace(/id="go" href="[^"]*"/, `id="go" href="${esc(to)}"`);
      write(srel, t, changed);
    }
  }

  // the shop
  const shop = 'shop/index.html';
  let index = read(shop);
  index = between(index, 'packs', itemList('Roblox asset packs by KashTheKing', live));
  index = between(index, 'grid', gridCards(live));
  index = ensureBlock(index, 'cols', collectionNav(cols, '', ''), '<p id="empty" class="empty" hidden>No packs match that search.</p>');
  write(shop, index, changed);

  // one page per collection, made from the shop page; <base> keeps the shop's relative links working one level down
  const base = index.replace(/<!--cols:start-->[\s\S]*?<!--cols:end-->/, '<!--cols:start--><!--cols:end-->');
  for (const c of cols) {
    const url = `${SITE}/shop/${c.slug}/`;
    const title = `${c.title} | KashTheKing Shop`;
    const desc = clip(`${c.lead} ${c.packs.length} packs, ${c.packs.reduce((n, p) => n + (p.count || 0), 0).toLocaleString('en-US')} models.`, 160);
    const img = c.packs[0].slides?.[0] ?? c.packs[0].image;
    let html = base
      .replace(/<meta name="viewport"[^>]*>/, (m) => `${m}\n    <base href="/shop/">`)
      .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
      .replace(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`)
      .replace(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`)
      .replace(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(c.title)}">`)
      .replace(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(clip(c.lead, 200))}">`)
      .replace(/<meta property="og:image" content="[^"]*">\s*<meta property="og:image:width"[^>]*>\s*<meta property="og:image:height"[^>]*>/, `<meta property="og:image" content="${imageUrl(img)}">`)
      .replace(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`)
      .replace(/<h1>[\s\S]*?<\/h1>/, `<h1><span>${esc(c.h1[0])}</span><br>${esc(c.h1[1])}</h1>`)
      .replace(/<div class="tag">[^<]*<\/div>/, `<div class="tag">${esc(c.tag).replace(/ {2}/g, ' &nbsp;')}</div>`)
      .replace(/<p class="lead">[^<]*<\/p>/, `<p class="lead">${esc(c.lead)}</p>`)
      .replace(/<section class="feat"[\s\S]*?<\/section>/, '')   // the shop's featured trailer belongs to one pack
      .replace('<a class="brand" href="/"', '<a class="brand" href="/shop/"');
    html = between(html, 'packs', `${itemList(c.title, c.packs)}<script type="application/ld+json">${json({'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: [
      {'@type': 'ListItem', position: 1, name: 'KashTheKing', item: `${SITE}/`},
      {'@type': 'ListItem', position: 2, name: 'Roblox Asset Packs', item: `${SITE}/shop/`},
      {'@type': 'ListItem', position: 3, name: c.title.split(':')[0], item: url}]})}</script><script>window.SHOP_PICK = ${json(c.packs.map((p) => p.slug))};</script>`);
    html = between(html, 'grid', gridCards(c.packs));
    html = between(html, 'cols', collectionNav(cols, '', c.slug));
    write(`shop/${c.slug}/index.html`, html, changed);
  }

  // sitemap: lastmod is the page's last commit; the docs sites keep their own sitemaps (robots.txt lists them)
  const pages = sitemapPages();
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${pages.map((p) => `  <url><loc>${p.url}</loc><lastmod>${changed.includes(p.rel) ? today() : lastmod(p.rel)}</lastmod></url>`).join('\n')}\n</urlset>\n`;
  write('sitemap.xml', sitemap, changed);
  return {changed, pages: pages.map((p) => p.url), collections: cols.map((c) => ({slug: c.slug, packs: c.packs.length}))};
}

if (process.argv[1] && path.resolve(process.argv[1]) === path.resolve(new URL(import.meta.url).pathname)) {
  const r = build();
  console.log(`collections: ${r.collections.map((c) => `${c.slug} (${c.packs})`).join(', ')}`);
  console.log(`sitemap: ${r.pages.length} pages`);
  console.log(r.changed.length ? `changed:\n${r.changed.map((f) => `  ${f}`).join('\n')}` : 'nothing changed');
}
