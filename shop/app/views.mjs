// Every shop page as HTML, from shop/packs.json, buy.json and soon.json. One module for both sides: tools/seo.mjs writes
// each page to a static file with it (what search engines, link previews and a first visit get), and app.mjs renders the
// same markup in the browser when a shop link is clicked, so moving around the shop never reloads the page.
// Pure functions only: no DOM, no Node APIs, no dependencies.

export const SITE = 'https://kashtheking.com';
export const DISCORD = 'https://discord.gg/6HYgCk22eD';
export const LIFETIME = {url: 'https://clearlydev.com/store/kashtheking', price: 99, was: 199, robux: '25,000', robuxWas: '50,000', image: '/shop/img/lifetime.jpg'};

// Pages per style or theme. `match` picks packs; a collection with fewer than 2 packs gets no page. `ui` is the UI packs
// department. Words are what people type into Google, YouTube and the DevForum when they look for assets.
export const COLLECTIONS = [
  {slug: 'ui', nav: 'UI packs', h1: 'UI packs',
    title: 'Roblox UI Packs: Full Game UI for Roblox Studio',
    lead: 'Complete Roblox game interfaces: HUD, shop, inventory, rewards and settings screens, each as a plain ScreenGui to edit and as a Fusion 0.3 version with UI Labs stories.',
    match: (p) => ui(p)},
  {slug: 'stud', nav: 'Stud', h1: 'Stud asset packs',
    title: 'Roblox Stud Asset Packs: Studded Models for Roblox Studio',
    lead: 'Classic studded Roblox style: smooth blocky models with the real Roblox studs texture. Pets, eggs, bosses, worlds and seasonal builds that look at home in any old-school or simulator game.',
    match: (p) => has(p, 'Stud')},
  {slug: 'voxel', nav: 'Voxel', h1: 'Voxel asset packs',
    title: 'Roblox Voxel Asset Packs: Blocky Minecraft-Style Models',
    lead: 'Blocky voxel models in a Minecraft-like style for Roblox Studio: villages, cities, sky islands, dungeons, biomes, mobs, characters, vehicles, furniture, tools and armor.',
    match: (p) => has(p, 'Voxel') || /pixel/i.test(p.name)},
  {slug: 'halloween', nav: 'Halloween', h1: 'Halloween asset packs',
    title: 'Roblox Halloween Asset Packs: Spooky Models and Decorations',
    lead: 'Halloween models for Roblox events and horror games: pumpkins, graves, haunted props, spooky tools and creatures, rigged and animated where they move.',
    match: (p) => has(p, 'Halloween') || /halloween|spooky|horror/i.test(p.name)},
  {slug: 'weapons', nav: 'Weapons', h1: 'Weapon asset packs',
    title: 'Roblox Weapon Asset Packs: Gun, Sword and Tool Models',
    lead: 'Guns, blasters, swords, fishing rods and tools for Roblox shooters, RPGs and simulators. Moving parts are separate and rigged, so reloads, triggers and reels animate.',
    match: (p) => has(p, 'Weapons') || /\bguns?\b|tools|rods/i.test(p.name)},
  {slug: 'vehicles', nav: 'Vehicles', h1: 'Vehicle asset packs',
    title: 'Roblox Vehicle Asset Packs: Cars, Karts and Machines',
    lead: 'Cars, karts, trucks and machines for Roblox racing, city and tycoon games. Every wheel is its own part, so they are ready to drive.',
    match: (p) => has(p, 'Vehicles')},
  {slug: 'pets', nav: 'Pets & animals', h1: 'Pet & animal asset packs',
    title: 'Roblox Pet Asset Packs: Rigged and Animated Pets and Animals',
    lead: 'Pets, eggs and animals for pet simulators, hatch games and farms. Rigged with shared Idle, Walk, Jump and Fly animations, so every pet moves the same way in your code.',
    match: (p) => has(p, 'Animals') || /\bpets?\b|eggs|dinos|creatures/i.test(p.name)},
  {slug: 'characters', nav: 'Characters', h1: 'Character asset packs',
    title: 'Roblox Character Asset Packs: Rigged NPCs, Enemies and Bosses',
    lead: 'Rigged and animated NPCs, enemies, mobs and bosses for Roblox RPGs, tower defense and fighting games, with walk, attack and hit animations.',
    match: (p) => has(p, 'Characters')},
  {slug: 'rpg', nav: 'RPG', h1: 'RPG asset packs',
    title: 'Roblox RPG Asset Packs: Dungeons, Loot and Monsters',
    lead: 'Everything for a Roblox RPG: dungeons, villages, enemies, bosses, loot, potions and gear.',
    match: (p) => has(p, 'RPG')},
  {slug: 'simulator', nav: 'Simulator & tycoon', h1: 'Simulator & tycoon asset packs',
    title: 'Roblox Simulator and Tycoon Asset Packs',
    lead: 'Props, machines, eggs, lucky blocks and pets for Roblox simulators and tycoons.',
    match: (p) => has(p, 'Simulator') || has(p, 'Tycoon')},
  {slug: 'buildings', nav: 'Buildings & maps', h1: 'Building & map asset packs',
    title: 'Roblox Building and Map Asset Packs: Cities, Villages and Islands',
    lead: 'Buildings, streets, villages, islands and nature to build a whole Roblox map fast.',
    match: (p) => has(p, 'Buildings') || has(p, 'City') || has(p, 'Nature')},
  {slug: 'cute', nav: 'Cute/Cartoon', h1: 'Cute/Cartoon asset packs',
    title: 'Cute/Cartoon Roblox Asset Packs: Chibi Toy-Style Models',
    lead: 'Chunky, colourful toy-style models for cozy, kids and simulator games: pets, food, furniture, cars, robots and more.',
    match: (p) => has(p, 'Cute')},
];

// The model packs page filters by look, first match wins: stud, voxel (pixel packs too), cute/cartoon, low poly.
export const LOOKS = [
  {id: 'stud', name: 'Stud', test: (p) => has(p, 'Stud')},
  {id: 'voxel', name: 'Voxel', test: (p) => has(p, 'Voxel') || /pixel/i.test(p.name)},
  {id: 'cartoon', name: 'Cute/Cartoon', test: (p) => has(p, 'Cute')},
  {id: 'lowpoly', name: 'Low Poly', test: () => true},
];
export const lookOf = (p) => LOOKS.find((l) => l.test(p)).id;

export const PLUGINS = [
  {name: 'Infinite Ocean', href: '/infinite-ocean/', image: '/infinite-ocean/img/hero.jpg', w: 1601, h: 853},
  {name: 'Flashback', href: '/flashback/', image: '/flashback/img/hero.png', w: 823, h: 481},
  {name: 'Blockwork', href: 'https://github.com/KashTheKing/blockwork', image: '/assets/icons/blockwork.png', w: 256, h: 256, icon: true, out: true},
  {name: 'All plugins', href: '/library/plugins', image: '/assets/icons/plugins.svg', w: 256, h: 256, icon: true},
];

const SOCIAL = [
  ['Discord', DISCORD], ['YouTube', 'https://youtube.com/@KashTheKingYT'], ['X', 'https://x.com/KashTheKing_X'],
  ['GitHub', 'https://github.com/KashTheKing'], ['Roblox', 'https://www.roblox.com/users/117445502/profile'],
];

/* ---------- small helpers ---------- */

export const has = (p, t) => (p.tags ?? []).includes(t);
/** A UI pack (kind "ui"): its count is screens, not models. */
export const ui = (p) => p.kind === 'ui';
export const units = (p) => (ui(p) ? 'screens' : 'models');
export const what = (p) => (ui(p) ? 'Roblox UI Pack' : 'Roblox Asset Pack');
export const free = (p) => Number(p.price) === 0;
/** A UI pack with no Creator Store listing yet (still in Roblox moderation) shows Coming soon instead of a price. */
export const soon = (p) => ui(p) && !p.url;
export const money = (n) => `$${Number(n).toFixed(2)}`;
export const priceText = (p) => (free(p) ? 'Free' : money(p.price));
export const priceOrSoon = (p) => (soon(p) ? 'Coming soon' : priceText(p));
export const esc = (s) => String(s ?? '').replace(/[&<>"']/g, (c) => ({'&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'}[c]));
export const json = (o) => JSON.stringify(o).replace(/</g, '\\u003c');
export const kebab = (s) => String(s).toLowerCase().replace(/&/g, ' and ').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
const num = (n) => Number(n || 0).toLocaleString('en-US');
/** An image path from packs.json ("img/x.jpg", relative to /shop/) as a root path. */
export const src = (rel) => (!rel ? '' : /^(https?:)?\//.test(rel) ? rel : `/shop/${rel}`);
const abs = (path) => (/^https?:/.test(path) ? path : `${SITE}${path}`);

/** Cuts text to at most n characters at a word, with an ellipsis. */
export const clip = (s, n) => { s = String(s ?? '').replace(/\s+/g, ' ').trim(); if (s.length <= n) return s; const c = s.slice(0, n - 1); return `${c.slice(0, c.lastIndexOf(' ') > n / 2 ? c.lastIndexOf(' ') : c.length).replace(/[\s,;:.(-]+$/, '')}…`; };
/** What the models look like, for titles and descriptions. */
export const style = (p) => (has(p, 'Stud') ? 'studded' : has(p, 'Voxel') || /pixel/i.test(p.name) ? 'voxel' : 'low-poly');
const moves = (p) => (/animat/i.test(p.description ?? '') ? 'rigged and animated' : /rigged/i.test(p.description ?? '') ? 'rigged' : 'textured');
/** The pack's look or theme in one word, for cards. */
const look = (p) => (/pixel/i.test(p.name) ? 'Pixel' : (p.tags ?? []).find((t) => t !== 'UI') ?? (ui(p) ? 'UI' : ''));

/** Robux alternative: the DevEx value of the dollar price ($0.0038 per Robux), no marketplace tax, rounded down to a
 *  clean number (Kash: "fine with losing a little bit of robux to make it clean"). $14.99 stays R$ 3,945 (Kash). */
export function robux(d) {
  const r = Number(d) / 0.0038;
  if (Number(d) === 14.99) return '3,945';
  return (r < 5000 ? Math.floor(r / 100) * 100 : r < 20000 ? Math.floor(r / 500) * 500 : Math.floor(r / 5000) * 5000).toLocaleString('en-US');
}

/** The search snippet: what it is, the style, the price, under ~160 characters. */
export function metaDescription(p) {
  const lead = ui(p) ? `${p.count ?? ''} full Roblox UI screens, static and Fusion.`.trim() : `${p.count ?? ''} ${style(p)} Roblox models, ${moves(p)}.`.trim();
  const tail = ` ${priceOrSoon(p)}${soon(p) ? '' : ' on the Creator Store'}.`;
  const first = (p.description ?? '').split(/(?<=[.!?])\s/)[0];
  return `${lead} ${clip(first, Math.max(40, 158 - lead.length - tail.length))}${tail}`.replace(/\s+/g, ' ');
}

/** Packs whose words match every word of the query. `rank` orders by where the words hit (name, tags, description). */
export function search(list, q, {rank = false} = {}) {
  const words = String(q ?? '').toLowerCase().split(/\s+/).filter(Boolean);
  if (!words.length) return list;
  const hits = [];
  for (const p of list) {
    const name = p.name.toLowerCase(), tags = (p.tags ?? []).join(' ').toLowerCase(), desc = String(p.description ?? '').toLowerCase();
    let score = 0;
    for (const w of words) {
      if (name.startsWith(w) || name.includes(` ${w}`)) score += 6;
      else if (name.includes(w)) score += 4;
      else if (tags.includes(w)) score += 3;
      else if (desc.includes(w)) score += 1;
      else { score = 0; break; }
    }
    if (score) hits.push([score, p]);
  }
  if (rank) hits.sort((a, b) => b[0] - a[0]);
  return hits.map((h) => h[1]);
}

/* ---------- the data model ---------- */

const normal = (p) => ({...p, tags: Array.isArray(p.tags) ? p.tags : [], slides: Array.isArray(p.slides) ? p.slides.filter(Boolean) : [],
  price: Number(p.price) || 0, count: Number(p.count) || 0});

/** packs.json order is newest first (the panel adds new products at the top). UI packs show before their Creator Store
 *  listing is live; a model pack needs its store link. soon.json packs show locked. */
export function model(packs, {buy = {}, soon: later = []} = {}) {
  const all = (Array.isArray(packs) ? packs : []).filter((p) => p && p.slug && p.name).map(normal);
  const live = all.filter((p) => p.page && (p.url || ui(p)));
  const collections = COLLECTIONS.map((c) => ({...c, packs: live.filter(c.match)})).filter((c) => c.packs.length >= 2);
  const coming = (Array.isArray(later) ? later : []).filter((p) => p && p.name).map((p) => ({...normal(p), locked: true}));
  return {live, collections, soon: coming, buy: buy && typeof buy === 'object' ? buy : {}};
}

const deptOf = (list) => (list.length && list.every(ui) ? 'ui' : 'models');
const sum = (list) => list.reduce((n, p) => n + (p.count || 0), 0);

/** Which page a shop address is, or null when the router should leave it to the browser. */
export function resolve(pathname, query, m) {
  let path = String(pathname || '');
  try { path = decodeURI(path); } catch { return null; }
  path = path.replace(/index\.html$/, '');
  if (!path.endsWith('/')) path += '/';
  if (!path.startsWith('/shop/')) return null;
  const seg = path.slice(6, -1);
  if (seg === '') return {kind: 'home', path};
  if (seg.includes('/')) return null;   // roblox/ and discord/ click-through pages, files
  if (seg === 'models' || seg === 'search') return {kind: 'catalog', id: seg, path};
  if (seg === 'plugins') return {kind: 'plugins', path};
  if (seg === 'pack') {   // old /shop/pack/?p=<slug> links
    const want = typeof query?.get === 'function' ? query.get('p') : null;
    const p = want && m.live.find((x) => x.slug === want || x.page === want);
    return p ? {kind: 'redirect', to: `/shop/${p.page}/`} : null;
  }
  if (m.collections.some((c) => c.slug === seg)) return {kind: 'catalog', id: seg, path};
  const p = m.live.find((x) => x.page === seg);
  return p ? {kind: 'pack', pack: p, path} : null;
}

/** The packs and words of one catalog page. */
export function catalogOf(id, m) {
  if (id === 'models') {
    const packs = m.live.filter((p) => !ui(p));
    return {id, packs, soon: m.soon.filter((p) => !ui(p)), h1: 'Model packs', dept: 'models', section: 'models', unit: 'models', filter: 'look',
      title: 'Roblox Model Asset Packs: Stud, Voxel, Cute/Cartoon & Low-Poly Models',
      description: 'Roblox asset packs for Roblox Studio: thousands of stud, voxel, cute/cartoon and low-poly 3D models, textured, rigged and animated. Pets, weapons, vehicles, buildings and maps, $4.99 a pack on the Creator Store.',
      crumbs: [['Shop', '/shop/']]};
  }
  if (id === 'search') {
    return {id, packs: m.live, soon: [], h1: 'All packs', dept: 'models', section: null, unit: null, filter: 'tag', robots: 'noindex',
      title: 'All packs', description: 'Every Roblox asset pack and UI pack by KashTheKing.', crumbs: [['Shop', '/shop/']]};
  }
  const c = m.collections.find((x) => x.slug === id);
  if (!c) return null;
  const dept = deptOf(c.packs);
  const desc = clip(`${c.lead} ${c.packs.length} packs, ${num(sum(c.packs))} ${dept === 'ui' ? 'screens' : 'models'}.`, 160);
  return {id, packs: c.packs, soon: dept === 'ui' ? m.soon.filter(ui) : [], h1: c.h1, dept, section: dept === 'ui' ? 'ui' : 'models', unit: dept === 'ui' ? 'screens' : 'models',
    filter: 'tag', title: c.title, description: desc, ogDescription: clip(c.lead, 200), collection: c,
    crumbs: dept === 'ui' ? [['Shop', '/shop/']] : [['Shop', '/shop/'], ['Model packs', '/shop/models/']]};
}

/* ---------- icons: one 24px stroke family ---------- */

const svg = (d, cls = '') => `<svg class="i${cls}" viewBox="0 0 24 24" aria-hidden="true" focusable="false">${d}</svg>`;
export const ICON = {
  search: svg('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>'),
  arrow: svg('<path d="M4.5 12h15M13.5 6l6 6-6 6"/>'),
  out: svg('<path d="M14 4.5h5.5V10M19.5 4.5 11 13M18 14.5v5H4.5V6h5"/>'),
  prev: svg('<path d="m14.5 5-7 7 7 7"/>'),
  next: svg('<path d="m9.5 5 7 7-7 7"/>'),
  plus: svg('<path d="M12 5v14M5 12h14"/>'),
  minus: svg('<path d="M5 12h14"/>'),
  reset: svg('<path d="M4.5 12a7.5 7.5 0 1 0 2.2-5.3M4.5 4.5v4.2h4.2"/>'),
  play: svg('<path d="M8 5.8v12.4L18 12z"/>'),
  lock: svg('<rect x="5" y="10.5" width="14" height="9.5" rx="1.5"/><path d="M8.5 10.5V8a3.5 3.5 0 0 1 7 0v2.5"/>'),
  close: svg('<path d="M6 6l12 12M18 6 6 18"/>'),
  expand: svg('<path d="M4.5 9.5v-5h5M19.5 9.5v-5h-5M4.5 14.5v5h5M19.5 14.5v5h-5"/>'),
};

/* ---------- shared pieces ---------- */

const priceHtml = (p, cls = '') => (p.locked || soon(p) ? `<span class="price price--soon${cls}">Coming soon</span>`
  : free(p) ? `<span class="price${cls}"><b>FREE</b></span>`
  : `<span class="price${cls}"><b>${money(p.price)}</b><span class="sr"> or</span> <small>R$ ${robux(p.price)}</small></span>`);

const metaLine = (p) => [p.count ? `${num(p.count)} ${units(p)}` : '', look(p)].filter(Boolean).map(esc).join(' · ');

function art(p, {lazy = true, size = 720, cls = 'card__img'} = {}) {
  if (!p.image) return `<span class="ph" aria-hidden="true"><b>${esc(p.count || '')}</b><span>${esc(p.name)}</span></span>`;
  return `<img class="${cls}" src="${esc(src(p.image))}" alt="" width="${size}" height="${size}"${lazy ? ' loading="lazy"' : ''} decoding="async">`;
}

/** One product card: the box art, the name, what is inside, the price. The whole card opens the pack. */
export function card(p, {h = 'h3', lazy = true} = {}) {
  if (p.locked) {
    const when = p.drop && !Number.isNaN(Date.parse(p.drop)) ? `Releases ${new Date(p.drop).toLocaleDateString('en-US', {month: 'short', day: 'numeric', timeZone: 'America/Los_Angeles'})}` : 'Coming soon';
    return `<div class="card card--locked"><span class="card__art">${art(p, {lazy})}<span class="card__lock">${ICON.lock}</span></span><${h} class="card__name">${esc(p.name)}</${h}><span class="card__meta">${metaLine(p)}</span><span class="price price--soon">${when}</span></div>`;
  }
  return `<a class="card" href="/shop/${esc(p.page)}/" data-pack="${esc(p.slug)}"${ui(p) ? ' data-dept="ui"' : ''}><span class="card__art">${art(p, {lazy})}</span><${h} class="card__name">${esc(p.name)}</${h}><span class="card__meta">${metaLine(p)}</span>${priceHtml(p)}</a>`;
}

/** One result in the header search list. */
export function searchOption(p, i) {
  return `<a role="option" id="search-opt-${i}" href="/shop/${esc(p.page)}/" aria-selected="false" tabindex="-1" data-pack="${esc(p.slug)}"${ui(p) ? ' data-dept="ui"' : ''}>${p.image ? `<img src="${esc(src(p.image))}" alt="" width="48" height="48" decoding="async">` : '<span class="ph" aria-hidden="true"></span>'}<span><b>${esc(p.name)}</b><small>${metaLine(p)}</small></span>${priceHtml(p)}</a>`;
}

function crumbs(list, here) {
  return `<nav class="crumbs" aria-label="Breadcrumb"><ol>${list.map(([name, href]) => `<li><a href="${esc(href)}">${esc(name)}</a></li>`).join('')}<li><span aria-current="page">${esc(here)}</span></li></ol></nav>`;
}

function sectionHead(title, id, more) {
  return `<div class="shead"><h2 id="${id}">${esc(title)}</h2>${more ? `<a class="more" href="${esc(more[1])}">${esc(more[0])}${ICON.arrow}</a>` : ''}</div>`;
}

function lifetime({compact = false} = {}) {
  return `<a class="lifetime${compact ? ' lifetime--compact' : ''}" href="${LIFETIME.url}" target="_blank" rel="noopener">
      <img src="${LIFETIME.image}" alt="" width="800" height="400" loading="lazy" decoding="async">
      <span class="lifetime__text"><span class="lifetime__name">Lifetime Pack</span><span class="lifetime__what">Every asset pack, now and in the future, with FBX, Blender and Roblox files.</span></span>
      <span class="price price--big"><s>$${LIFETIME.was}</s> <b>$${LIFETIME.price}</b> <small>R$ ${LIFETIME.robux}</small></span>
      <span class="btn btn--primary">Get it on ClearlyDev${ICON.out}</span>
    </a>`;
}

/** Links to every collection; the ones this page belongs to first. */
function browse(m, {first = [], current = null} = {}) {
  const cols = [...first, ...m.collections.filter((c) => !first.includes(c))];
  if (!cols.length) return '';
  return `<nav class="browse" aria-labelledby="browse-title"><h2 id="browse-title">Collections</h2><ul>${cols.map((c) => `<li><a href="/shop/${c.slug}/"${c.slug === current ? ' aria-current="page"' : ''}>${esc(c.nav)}<span>${c.packs.length}</span></a></li>`).join('')}</ul></nav>`;
}

/* ---------- pages ---------- */

function door(kind, name, list, line) {
  const fan = list.slice(0, 3).map((p, i) => `<span class="fan__card fan__card--${i + 1}">${art(p, {lazy: false, cls: 'fan__img'})}</span>`).join('');
  const [a, b] = name.split(' ');
  return `<a class="door door--${kind}" href="/shop/${kind}/"${kind === 'ui' ? ' data-dept="ui"' : ''}>
      <span class="door__fan fan" aria-hidden="true">${fan}</span>
      <span class="door__text"><h2 class="door__name">${esc(a)}<br>${esc(b)}</h2><span class="door__count">${esc(line)}${ICON.arrow}</span></span>
    </a>`;
}

function home(m) {
  const models = m.live.filter((p) => !ui(p)), uis = m.live.filter(ui);
  const cols = m.collections.filter((c) => c.slug !== 'ui');
  // each collection leads with a pack no other tile leads with, two more fanned behind it, so it reads as a set
  const used = new Set();
  const tiles = cols.map((c) => {
    const art = c.packs.filter((x) => x.image);
    const lead = art.find((x) => !used.has(x.slug)) ?? art[0];
    if (lead) used.add(lead.slug);
    const fan = [lead, ...art.filter((x) => x !== lead)].filter(Boolean).slice(0, 3);
    const cards = fan.map((p, i) => `<span class="tile__card tile__card--${i + 1}"><img src="${esc(src(p.image))}" alt="" width="720" height="720" loading="lazy" decoding="async"></span>`).reverse().join('');
    return `<li><a class="tile" href="/shop/${c.slug}/"><span class="tile__art">${cards}</span><span class="tile__name">${esc(c.nav)}</span><span class="tile__count">${c.packs.length} packs</span></a></li>`;
  }).join('');
  const shelfNav = `<span class="shelf__nav"><button type="button" class="shelf__btn" data-shelf-prev aria-label="Earlier collections" hidden>${ICON.prev}</button><button type="button" class="shelf__btn" data-shelf-next aria-label="More collections" hidden>${ICON.next}</button></span>`;
  return `<h1 class="sr">KashTheKing Shop</h1>
    <section class="stage" aria-label="Departments">
      ${door('models', 'Model packs', models, `${models.length} packs · ${num(sum(models))} models`)}
      ${door('ui', 'UI packs', uis, `${uis.length} packs · ${num(sum(uis))} screens`)}
    </section>
    <div class="wrap">
      ${lifetime()}
      <section class="section" aria-labelledby="new-title">${sectionHead('New model packs', 'new-title', ['All model packs', '/shop/models/'])}<div class="grid">${models.slice(0, 8).map((p) => card(p)).join('')}</div></section>
      <section class="section" aria-labelledby="ui-title" data-dept="ui">${sectionHead('UI packs', 'ui-title', ['All UI packs', '/shop/ui/'])}<div class="grid">${uis.slice(0, 4).map((p) => card(p)).join('')}</div></section>
      ${cols.length ? `<section class="section" aria-labelledby="cols-title"><div class="shead"><h2 id="cols-title">Collections</h2>${shelfNav}</div><ul class="shelf" data-shelf>${tiles}</ul></section>` : ''}
      <section class="section" aria-labelledby="plugins-title">${sectionHead('Plugins', 'plugins-title', ['All plugins', '/shop/plugins/'])}<div class="plugins">${PLUGINS.slice(0, 3).map((x) => plugin(x)).join('')}</div></section>
    </div>`;
}

function howToBuy() {
  return `<section class="section how" aria-labelledby="how-title"><h2 id="how-title">How buying works</h2><dl>
      <div><dt>Creator Store</dt><dd>Packs are sold on the Roblox Creator Store. Buy there and the pack appears in your Toolbox inventory, ready to insert in Studio.</dd></div>
      <div><dt>License</dt><dd>Use and modify the assets in any game, including commercial ones. Reselling or redistributing the assets themselves is not allowed. Each pack includes the full text.</dd></div>
      <div><dt>Other ways to pay</dt><dd>DM me on <a href="${DISCORD}" target="_blank" rel="noopener">Discord</a> to purchase with a different payment method.</dd></div>
    </dl></section>`;
}

function plugin(x, h = 'h3') {
  return `<a class="plugin" href="${esc(x.href)}"${x.out ? ' target="_blank" rel="noopener"' : ''}><span class="plugin__art${x.icon ? ' plugin__art--icon' : ''}"><img src="${esc(x.image)}" alt="" width="${x.w}" height="${x.h}" loading="lazy" decoding="async"></span><${h} class="plugin__name">${esc(x.name)}${x.out ? ICON.out : ''}</${h}></a>`;
}

function plugins() {
  return `<section class="phead phead--plain"><div class="wrap">${crumbs([['Shop', '/shop/']], 'Plugins')}<h1>Plugins</h1></div></section>
    <div class="wrap"><div class="plugins plugins--page">${PLUGINS.map((x) => plugin(x, 'h2')).join('')}</div></div>`;
}

/** The filter chips of a catalog: looks with counts on the model packs page, tags elsewhere. */
export function chipsOf(c) {
  const all = [...c.packs, ...c.soon];
  if (c.filter === 'look') return [['all', 'All', all.length], ...LOOKS.map((l) => [l.id, l.name, all.filter((p) => lookOf(p) === l.id).length]).filter((x) => x[2])];
  const count = new Map();
  for (const p of all) for (const t of p.tags) if (t !== 'UI') count.set(t, (count.get(t) ?? 0) + 1);
  // a chip that picks one pack is a search, not a filter; a row needs two real choices
  const useful = [...count].filter(([, n]) => n >= 2 && n < all.length).sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]));
  return useful.length >= 2 ? [['all', 'All', all.length], ...useful.map(([t, n]) => [t, t, n])] : [];
}

export const SORTS = [['new', 'Newest'], ['low', 'Lowest price'], ['high', 'Highest price'], ['big', 'Most models']];

/** A catalog's packs after the search box, the chip and the sort. Coming-soon packs always sit after the ones you can buy. */
export function pick(c, {q = '', f = 'all', sort = 'new'} = {}) {
  const keep = (p) => f === 'all' || (c.filter === 'look' ? lookOf(p) === f : p.tags.includes(f));
  const shown = search(c.packs.filter(keep), q), waiting = search(c.soon.filter(keep), q);
  const order = {low: (a, b) => a.price - b.price, high: (a, b) => b.price - a.price, big: (a, b) => b.count - a.count}[sort];
  if (order) shown.sort(order);   // "new" keeps packs.json order
  return [...shown, ...waiting];
}

export const gridHtml = (list) => list.map((p, i) => card(p, {h: 'h2', lazy: i >= 8})).join('');
export const countLine = (c, n) => {
  const total = c.packs.length + c.soon.length;
  const what = c.unit ? ` · ${num(sum(c.packs))} ${c.unit}` : '';
  return n === total ? `${total} packs${what}` : `${n} of ${total} packs`;
};

function catalog(c, m) {
  const chips = chipsOf(c);
  const list = pick(c);
  return `<section class="phead phead--${c.id === 'search' ? 'plain' : c.dept}"><div class="wrap">${crumbs(c.crumbs, c.h1)}<h1>${esc(c.h1)}</h1><p class="phead__count" data-count>${countLine(c, list.length)}</p></div></section>
    <div class="tools" data-catalog="${esc(c.id)}"><div class="wrap tools__in">
      ${chips.length ? `<div class="chips" role="group" aria-label="Filter">${chips.map(([id, name, n]) => `<button type="button" class="chip" data-f="${esc(id)}" aria-pressed="${id === 'all'}">${esc(name)}<span>${n}</span></button>`).join('')}</div>` : '<div class="chips"></div>'}
      <label class="field field--select"><span class="sr">Sort</span><select name="sort">${SORTS.map(([v, t]) => `<option value="${v}">${t}</option>`).join('')}</select></label>
    </div></div>
    <div class="wrap">
      ${c.id === 'models' ? lifetime({compact: true}) : ''}
      <div class="grid grid--catalog" data-grid>${gridHtml(list)}</div>
      <div class="empty" data-empty hidden><p>No packs match that search.</p><span class="empty__actions"><button type="button" class="btn btn--ghost" data-clear>Clear search</button>${c.id === 'search' ? '' : '<a class="btn btn--ghost" href="/shop/search/" data-everywhere>Search all packs</a>'}</span></div>
      ${browse(m, {current: c.id})}
    </div>`;
}

/** Where each buy button goes. The Robux and Try buttons open the showcase place with launch data it acts on at once. */
export function buyLinks(p, buy = {}) {
  const b = (buy && buy.packs && buy.packs[p.slug]) || {};
  const place = /^\d{1,19}$/.test(String(buy && buy.showcasePlaceId)) ? String(buy.showcasePlaceId) : null;
  const assetId = (String(p.url || '').match(/\/asset\/(\d{1,19})/) || [])[1];
  const game = (data) => `https://www.roblox.com/games/start?placeId=${place}&launchData=${encodeURIComponent(JSON.stringify(data))}`;
  return {
    store: p.url ? `/shop/${p.page}/roblox/` : null,
    robux: place && !free(p) && /^\d{1,19}$/.test(String(b.robuxProductId)) ? game({a: 'buy', pack: p.slug}) : null,
    try: place && assetId ? game({pack: p.slug, asset: assetId}) : null,
    clearly: /^https:\/\/[^\s<>"]+$/.test(b.clearlyDevUrl || '') ? b.clearlyDevUrl : null,
    discord: soon(p) ? null : `/shop/${p.page}/discord/`,
  };
}

/** The buy buttons. app.mjs renders them again when buy.json changed after the page was built. */
export function buyActions(p, buy) {
  const l = buyLinks(p, buy);
  return [
    l.store && `<a class="btn btn--primary btn--big" href="${esc(l.store)}" target="_blank" rel="noopener">${free(p) ? 'Get it on Creator Store' : 'Purchase on Creator Store'}${ICON.out}</a>`,
    l.robux && `<a class="btn btn--robux btn--big" href="${esc(l.robux)}" rel="noopener">Purchase with Robux <span class="nowrap">(R$ ${robux(p.price)})</span></a>`,
    l.try && `<a class="btn btn--ghost" href="${esc(l.try)}" rel="noopener">${ICON.play}Try in Roblox</a>`,
    l.clearly && `<a class="btn btn--ghost" href="${esc(l.clearly)}" target="_blank" rel="noopener">Purchase on Clearly Dev${ICON.out}</a>`,
    l.discord && `<a class="buy__alt" href="${esc(l.discord)}" target="_blank" rel="noopener">Other ways to pay</a>`,
  ].filter(Boolean).join('');
}

/** The pack's slides (and its trailer, when packs.json names one) in a scroll-snap strip. Image figures carry
 *  data-slide, the slide's index in packs.json, so a card's hover scrub can open the gallery on the slide it showed. */
function gallery(p) {
  const slides = (p.slides.length ? p.slides : [p.image]).filter(Boolean);
  if (!slides.length) return `<div class="gallery gallery--empty">${art(p, {lazy: false})}</div>`;
  const items = slides.map((s, i) => ({img: src(s), i}));
  if (p.video) items.splice(1, 0, {video: src(p.video), poster: src(p.poster || slides[0])});
  const n = items.length;
  const figure = (x, k) => (x.video
    ? `<figure><video src="${esc(x.video)}" poster="${esc(x.poster)}" controls playsinline preload="none" aria-label="${esc(p.name)} trailer"></video></figure>`
    : `<figure data-slide="${x.i}"><img src="${esc(x.img)}" alt="${esc(p.name)}, image ${k + 1} of ${n}" width="1600" height="900"${k ? ' loading="lazy"' : ' fetchpriority="high"'} decoding="async"></figure>`);
  const thumb = (x, k) => `<button type="button" aria-label="${x.video ? 'Play the trailer' : `Show image ${k + 1}`}"${k ? '' : ' aria-current="true"'}><img src="${esc(x.video ? x.poster : x.img)}" alt="" width="160" height="90" loading="lazy" decoding="async">${x.video ? ICON.play : ''}</button>`;
  return `<section class="gallery" aria-label="${esc(p.name)} images" data-gallery>
      <div class="gallery__stage">
        <div class="gallery__strip" tabindex="0" aria-label="${n > 1 ? 'Scroll or use the arrow keys' : esc(p.name)}">${items.map(figure).join('')}</div>
        ${n > 1 ? `<button class="gallery__nav gallery__nav--prev" type="button" aria-label="Previous image" data-prev disabled>${ICON.prev}</button><button class="gallery__nav gallery__nav--next" type="button" aria-label="Next image" data-next>${ICON.next}</button>` : ''}
        <div class="gallery__hud"><span class="gallery__count" data-index>1 / ${n}</span><span class="gallery__zoom" role="group" aria-label="Zoom"><button type="button" aria-label="Zoom out" data-zout>${ICON.minus}</button><output data-zlevel aria-live="polite">100%</output><button type="button" aria-label="Zoom in" data-zin>${ICON.plus}</button><button type="button" aria-label="Reset zoom" data-zreset>${ICON.reset}</button></span></div>
      </div>
      ${n > 1 ? `<div class="gallery__thumbs" role="group" aria-label="Choose an image">${items.map(thumb).join('')}</div>` : ''}
    </section>`;
}

function packPage(p, m) {
  const related = m.live.filter((x) => x.slug !== p.slug).map((x) => [x.tags.filter((t) => p.tags.includes(t)).length, x]).sort((a, b) => b[0] - a[0]).slice(0, 4).map((x) => x[1]);
  const mine = m.collections.filter((c) => c.packs.includes(p));
  const strip = [p.count ? `${num(p.count)} ${units(p)}` : '', ...p.tags.filter((t) => t !== 'UI')].filter(Boolean);
  const specs = ui(p)
    ? [`${num(p.count)} full screens, every button working`, 'A static ScreenGui and a Fusion 0.3 version with UI Labs stories', 'Use in any game, including commercial ones']
    : ['Textured, rigged and animated', `One model to insert, ${num(p.count)} assets inside`, 'Use in any game, including commercial ones'];
  const paras = String(p.description ?? '').split(/\n{2,}/).map((s) => s.trim()).filter(Boolean);
  const actions = buyActions(p, m.buy);
  return `<div class="wrap pack" data-pack="${esc(p.slug)}">
      ${crumbs([['Shop', '/shop/'], ui(p) ? ['UI packs', '/shop/ui/'] : ['Model packs', '/shop/models/']], p.name)}
      <div class="pack__top">
        ${gallery(p)}
        <aside class="buy" aria-labelledby="pack-name">
          <h1 class="buy__name" id="pack-name">${esc(p.name)}</h1>
          ${strip.length ? `<p class="strip">${strip.map((s) => `<span>${esc(s)}</span>`).join('')}</p>` : ''}
          ${priceHtml(p, ' price--hero')}
          ${actions ? `<div class="buy__actions" data-buy>${actions}</div>` : '<div class="buy__actions" data-buy></div>'}
          <ul class="buy__specs">${specs.map((s) => `<li>${esc(s)}</li>`).join('')}</ul>
        </aside>
      </div>
      ${paras.length ? `<section class="about" aria-labelledby="about-title"><h2 id="about-title">About this pack</h2>${paras.map((s) => `<p>${esc(s)}</p>`).join('')}</section>` : ''}
      ${related.length ? `<section class="section" aria-labelledby="more-title">${sectionHead('More like this', 'more-title')}<div class="grid">${related.map((x) => card(x)).join('')}</div></section>` : ''}
      ${howToBuy()}
      ${browse(m, {first: mine})}
    </div>
    ${p.url ? `<div class="buybar" data-buybar aria-hidden="true"><span class="buybar__name">${esc(p.name)}</span>${priceHtml(p)}<a class="btn btn--primary" href="/shop/${esc(p.page)}/roblox/" target="_blank" rel="noopener" tabindex="-1">${free(p) ? 'Get it' : 'Purchase'}</a></div>` : ''}`;
}

/* ---------- route -> page ---------- */

const crumbLd = (items) => ({'@context': 'https://schema.org', '@type': 'BreadcrumbList', itemListElement: items.map(([name, item], i) => ({'@type': 'ListItem', position: i + 1, name, item}))});
const itemList = (name, list) => ({'@context': 'https://schema.org', '@type': 'ItemList', name, numberOfItems: list.length,
  itemListElement: list.map((p, i) => ({'@type': 'ListItem', position: i + 1, name: p.name, url: `${SITE}/shop/${p.page}/`}))});

function packMeta(p) {
  const slides = (p.slides.length ? p.slides : [p.image]).filter(Boolean);
  const url = `${SITE}/shop/${p.page}/`;
  const desc = metaDescription(p);
  const img = slides[0] ?? p.image;
  const product = {
    '@context': 'https://schema.org', '@type': 'Product', name: `${p.name} - ${what(p)}`, description: p.description || desc,
    image: [p.image, ...slides].filter((v, i, a) => v && a.indexOf(v) === i).map((s) => abs(src(s))), url, sku: p.slug,
    category: ui(p) ? 'Roblox UI pack' : 'Roblox asset pack', brand: {'@type': 'Brand', name: 'KashTheKing'},
    offers: {'@type': 'Offer', price: Number(p.price).toFixed(2), priceCurrency: 'USD', availability: `https://schema.org/${p.url ? 'InStock' : 'PreOrder'}`, ...(p.url && {url: p.url})},
  };
  const kind = ui(p) ? 'Roblox UI Pack' : `${style(p) === 'low-poly' ? '' : `${style(p)[0].toUpperCase()}${style(p).slice(1)} `}Roblox Asset Pack`;
  return {
    title: `${p.name} - ${kind} | KashTheKing Shop`, description: desc, canonical: url, ogType: 'product',
    ogTitle: `${p.name} - ${what(p)} (${priceOrSoon(p)})`, ogDescription: clip(p.description || desc, 300),
    ogImage: img ? abs(src(img)) : `${SITE}/shop/og-banner.jpg`, ogImageAlt: img ? `${p.name} ${what(p)}` : null, price: Number(p.price).toFixed(2),
    jsonld: [product, crumbLd([['KashTheKing', `${SITE}/`], ['Shop', `${SITE}/shop/`], [p.name, url]])],
  };
}

/** The header search box's words: on a catalog page it filters that catalog in place. */
const finds = (c) => (c.id === 'models' ? 'Search model packs' : c.id === 'search' ? 'Search all packs'
  : `Search ${c.h1.replace(/^([A-Z])([a-z]+)(?=[\s&])/, (w, a, b) => a.toLowerCase() + b)}`);

/** Everything one page needs: its head, which department and nav item it belongs to, and its main markup. */
export function render(route, m) {
  if (route.kind === 'home') {
    return {kind: 'home', dept: 'models', section: null, html: home(m),
      title: 'KashTheKing Shop: Roblox Asset Packs, UI Packs and Plugins', description: 'Roblox model asset packs, full game UI packs and plugins for Roblox Studio, by KashTheKing.',
      canonical: `${SITE}/shop/`, ogType: 'website', ogTitle: 'KashTheKing Shop: Roblox Asset Packs, UI Packs and Plugins', ogImage: `${SITE}/shop/og-banner.jpg?v=66`,
      jsonld: [crumbLd([['KashTheKing', `${SITE}/`], ['Shop', `${SITE}/shop/`]])], preload: m.live.slice(0, 3).map((p) => src(p.image))};
  }
  if (route.kind === 'plugins') {
    return {kind: 'plugins', dept: 'models', section: 'plugins', html: plugins(),
      title: 'Roblox Studio Plugins | KashTheKing Shop', description: 'Plugins for Roblox Studio by KashTheKing: Infinite Ocean, Flashback and Blockwork.',
      canonical: `${SITE}/shop/plugins/`, ogType: 'website', ogTitle: 'Roblox Studio Plugins', ogImage: `${SITE}/shop/og-banner.jpg?v=66`,
      jsonld: [crumbLd([['KashTheKing', `${SITE}/`], ['Shop', `${SITE}/shop/`], ['Plugins', `${SITE}/shop/plugins/`]])]};
  }
  if (route.kind === 'catalog') {
    const c = catalogOf(route.id, m);
    const url = `${SITE}/shop/${c.id}/`;
    const first = c.packs.find((p) => p.slides.length || p.image);
    const og = c.id === 'models' || !first ? `${SITE}/shop/og-banner.jpg?v=66` : abs(src(first.slides[0] ?? first.image));
    return {kind: 'catalog', id: c.id, dept: c.dept, section: c.section, html: catalog(c, m), find: finds(c),
      title: `${c.title} | KashTheKing Shop`, description: c.description, canonical: url, robots: c.robots, ogType: 'website',
      ogTitle: c.id === 'models' ? 'KashTheKing Shop 👑' : c.title, ogDescription: c.ogDescription ?? c.description, ogImage: og,
      jsonld: c.id === 'search' ? [] : [itemList(c.id === 'models' ? 'Roblox model asset packs by KashTheKing' : c.title, c.packs),
        crumbLd([['KashTheKing', `${SITE}/`], ['Shop', `${SITE}/shop/`], [c.title.split(':')[0], url]])]};
  }
  if (route.kind === 'pack') {
    const p = route.pack;
    return {kind: 'pack', slug: p.slug, dept: ui(p) ? 'ui' : 'models', section: ui(p) ? 'ui' : 'models', html: packPage(p, m), ...packMeta(p)};
  }
  throw new Error(`no page for ${route.kind}`);
}

/** Images worth fetching before a link is pressed, so the page it opens paints at once. */
export function preload(route, m) {
  if (!route) return [];
  if (route.kind === 'pack') { const p = route.pack; return [src(p.slides[0] ?? p.image)].filter(Boolean); }
  if (route.kind === 'catalog') { const c = catalogOf(route.id, m); return c ? c.packs.slice(0, 8).map((p) => src(p.image)).filter(Boolean) : []; }
  if (route.kind === 'home') return [...m.live.filter((p) => !ui(p)).slice(0, 3), ...m.live.filter(ui).slice(0, 3)].map((p) => src(p.image)).filter(Boolean);
  if (route.kind === 'plugins') return PLUGINS.map((x) => x.image);
  return [];
}

/** The route-specific tags in <head>. Each carries data-r, so the router can swap the whole set. */
export function headTags(v) {
  const t = [`<title>${esc(v.title)}</title>`,
    `<meta data-r name="description" content="${esc(v.description)}">`,
    v.robots ? `<meta data-r name="robots" content="${esc(v.robots)}">` : `<link data-r rel="canonical" href="${esc(v.canonical)}">`,
    `<meta data-r property="og:type" content="${esc(v.ogType)}">`,
    `<meta data-r property="og:site_name" content="KashTheKing Shop">`,
    `<meta data-r property="og:url" content="${esc(v.canonical)}">`,
    `<meta data-r property="og:title" content="${esc(v.ogTitle ?? v.title)}">`,
    `<meta data-r property="og:description" content="${esc(v.ogDescription ?? v.description)}">`,
    `<meta data-r property="og:image" content="${esc(v.ogImage)}">`,
    v.ogImageAlt ? `<meta data-r property="og:image:alt" content="${esc(v.ogImageAlt)}">` : '',
    v.price ? `<meta data-r property="product:price:amount" content="${v.price}">\n<meta data-r property="product:price:currency" content="USD">` : '',
    `<meta data-r name="twitter:card" content="summary_large_image">`,
    `<meta data-r name="twitter:site" content="@KashTheKing_X">`,
    ...(v.jsonld ?? []).map((o) => `<script data-r type="application/ld+json">${json(o)}</script>`)];
  return t.filter(Boolean).join('\n');
}

const NAV = [['models', 'Model packs', '/shop/models/'], ['ui', 'UI packs', '/shop/ui/'], ['plugins', 'Plugins', '/shop/plugins/']];

export function header(section, find = 'Search packs') {
  return `<header class="top">
  <div class="top__in">
    <a class="top__brand" href="/shop/"><img src="/assets/watermark.png" alt="KashTheKing Shop" width="156" height="33"></a>
    <nav class="top__nav" aria-label="Shop">${NAV.map(([id, name, href]) => `<a href="${href}" data-section="${id}"${id === section ? ' class="is-on"' : ''}${id === 'ui' ? ' data-dept="ui"' : ''}>${name}</a>`).join('')}<a href="/library/">Library</a></nav>
    <form class="search" role="search" action="/shop/search/" data-search>
      ${ICON.search}<input type="search" name="q" placeholder="${esc(find)}" aria-label="${esc(find)}" autocomplete="off" enterkeyhint="search" role="combobox" aria-expanded="false" aria-controls="search-list" aria-autocomplete="list"><kbd aria-hidden="true">/</kbd>
      <div class="search__list" id="search-list" role="listbox" aria-label="Packs" hidden></div>
    </form>
    <a class="top__lifetime" href="${LIFETIME.url}" target="_blank" rel="noopener">Lifetime Pack</a>
  </div>
</header>`;
}

export function footer(m) {
  const cols = m.collections.filter((c) => c.slug !== 'ui');
  const list = (items) => `<ul>${items.map(([name, href, out]) => `<li><a href="${esc(href)}"${out ? ' target="_blank" rel="noopener"' : ''}>${esc(name)}</a></li>`).join('')}</ul>`;
  return `<footer class="foot">
  <div class="wrap foot__in">
    <div class="news-slot" data-place="footer"></div>
    <nav class="foot__nav" aria-label="Footer">
      <div><h2>Shop</h2>${list([['Model packs', '/shop/models/'], ['UI packs', '/shop/ui/'], ['Plugins', '/shop/plugins/'], ['Lifetime Pack', LIFETIME.url, true], ['All packs', '/shop/search/'], ['Library', '/library/']])}</div>
      <div><h2>Collections</h2>${list(cols.map((c) => [c.nav, `/shop/${c.slug}/`]))}</div>
      <div><h2>KashTheKing</h2>${list(SOCIAL.map(([n, h]) => [n, h, true]))}</div>
      <div><h2>Legal</h2>${list([['Terms', '/terms.html'], ['Newsletter privacy', '/shop/newsletter-privacy.html'], ['Contact', '/contact.html']])}</div>
    </nav>
    <p class="foot__legal"><a href="/">kashtheking.com</a> · © KashTheKing</p>
  </div>
</footer>`;
}

/** A whole shop page. `version` busts the cache of the shop's own CSS and JS when they change. */
export function documentHtml(v, m, {version = ''} = {}) {
  const q = version ? `?v=${version}` : '';
  return `<!DOCTYPE html>
<html lang="en" data-dept="${v.dept}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
${headTags(v)}
<meta name="theme-color" content="#1A1C20">
<link rel="icon" type="image/png" sizes="32x32" href="/assets/favicon-crown-32.png">
<link rel="apple-touch-icon" sizes="180x180" href="/assets/favicon-crown-180.png">
<link rel="preload" href="/kit/fonts/montserrat.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/shop/app/shop.css${q}">
<script type="importmap">{"imports":{"/shop/app/views.mjs":"/shop/app/views.mjs${q}"}}</script>
<link rel="modulepreload" href="/shop/app/views.mjs${q}">
<script type="module" src="/shop/app/app.mjs${q}"></script>
<script type="speculationrules">{"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/shop/*"}}]},"eagerness":"moderate"}]}</script>
</head>
<body>
<a class="skip" href="#main">Skip to content</a>
${header(v.section, v.find)}
<div id="sub" class="wrap sub-slot"></div>
<main id="main" tabindex="-1" data-route="${esc(v.kind)}"${v.slug ? ` data-pack="${esc(v.slug)}"` : ''}>
${v.html}
</main>
${footer(m)}
<p class="sr" id="route-status" aria-live="polite"></p>
<script defer src="https://panel.kashtheking.com/t.js"></script><!-- Cloudflare Web Analytics --><script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "cd94b2bc49634d048aa496f6b380505d", "spa": true}'></script><!-- End Cloudflare Web Analytics -->
<script src="/shop/sub.js" defer></script>
<script src="/shop/news.js" defer></script>
<script src="/shop/editor.js" defer></script>
</body>
</html>
`;
}

/** The page behind a pack's Creator Store or Discord button: counts the click, then forwards. */
export function clickThrough(label, name, to) {
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Opening ${esc(label)}: ${esc(name)}</title><meta name="robots" content="noindex">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1c1e22;color:#fff;font:600 18px Inter,system-ui,sans-serif}a{color:#ffb02e}</style></head>
<body><p>Opening ${esc(label)}... <a id="go" href="${esc(to)}">Continue</a></p>
<script defer src="https://panel.kashtheking.com/t.js"></script><!-- Cloudflare Web Analytics --><script type="module" src="https://static.cloudflareinsights.com/beacon.min.js" data-cf-beacon='{"token": "cd94b2bc49634d048aa496f6b380505d"}'></script><!-- End Cloudflare Web Analytics -->
<script>
// forward as soon as the analytics hit has gone out, or after 2 seconds if it is blocked
var to = document.getElementById("go").href, t0 = Date.now();
(function wait() { var sent = performance.getEntriesByType("resource").some(function (r) { return r.name.indexOf("cdn-cgi/rum") > 0; }); if (sent || Date.now() - t0 > 2000) location.replace(to); else setTimeout(wait, 80); })();
</script></body></html>`;
}

/** Old /shop/pack/?p=<slug> links: forward to the pack's own page. */
export function legacyPackPage() {
  return `<!DOCTYPE html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Asset Pack | KashTheKing Shop</title><meta name="robots" content="noindex">
<style>body{margin:0;min-height:100vh;display:grid;place-items:center;background:#1A1C20;color:#F2F3F5;font:600 17px system-ui,sans-serif}a{color:#FF9A1F}</style></head>
<body><p id="msg">Opening the pack... <a href="/shop/">Shop</a></p>
<script>
// Old links: /shop/pack/?p=<slug or page>. Packs live at /shop/<page>/ now.
var want = new URLSearchParams(location.search).get("p");
fetch("/shop/packs.json").then(function (r) { return r.json(); }).then(function (packs) {
  var p = packs.filter(function (x) { return x.slug === want || x.page === want; })[0];
  location.replace(p && p.page ? "/shop/" + p.page + "/" : "/shop/");
}).catch(function () { location.replace("/shop/"); });
</script></body></html>
`;
}
