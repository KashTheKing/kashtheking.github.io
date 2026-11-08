// The shop in the browser. Every shop page is already a finished static page (tools/seo.mjs writes them with views.mjs);
// this module makes moving between them instant:
//  - a click on a shop link renders the next page here from packs.json with the same views.mjs, swaps <main> and the
//    head tags, and pushes the address; back and forward restore the page and where it was scrolled to
//  - hovering, focusing or touching a link loads what that page needs first (the data and its first images), so the
//    page is ready before the click lands; links outside the shop are prefetched as documents
//  - a product card scrubs through the pack's slides on hover, and its art morphs into the pack page's gallery
// Anything unexpected falls back to a normal page load, so the shop never breaks when this script does.
import * as V from '/shop/app/views.mjs';

const root = document.documentElement;
const main = document.getElementById('main');
const status = document.getElementById('route-status');
const reduce = matchMedia('(prefers-reduced-motion: reduce)');
const saveData = Boolean(navigator.connection && navigator.connection.saveData);

/* ---------- data ---------- */

let dataP = null;
const getJson = (u) => fetch(u, {cache: 'no-cache'}).then((r) => (r.ok ? r.json() : null)).catch(() => null);
/** packs.json, buy.json and soon.json as one model, fetched once per visit. */
function data() {
  dataP ??= Promise.all(['/shop/packs.json', '/shop/buy.json', '/shop/soon.json'].map(getJson)).then(([packs, buy, soon]) => {
    if (!Array.isArray(packs)) throw new Error('packs.json did not load');
    return V.model(packs, {buy: buy ?? {}, soon: soon ?? []});
  });
  dataP.catch(() => { dataP = null; });
  return dataP;
}
const within = (p, ms) => Promise.race([p, new Promise((_, no) => setTimeout(() => no(new Error('timeout')), ms))]);

/* ---------- images: fetched and decoded once ---------- */

const images = new Map();
function warm(url) {
  if (!url) return Promise.resolve();
  let p = images.get(url);
  if (!p) {
    const img = new Image();
    img.decoding = 'async';
    img.src = url;
    p = img.decode().catch(() => {});
    images.set(url, p);
  }
  return p;
}

/* ---------- which links the router takes ---------- */

function shopUrl(a) {
  if (!a || !a.href || a.hasAttribute('download') || (a.target && a.target !== '_self')) return null;
  let url;
  try { url = new URL(a.href, location.href); } catch { return null; }
  if (url.origin !== location.origin || !url.pathname.startsWith('/shop/')) return null;
  if (/\.[a-z0-9]+$/i.test(url.pathname) && !url.pathname.endsWith('/index.html')) return null;   // files and other pages
  return url;
}
const here = () => location.pathname + location.search;

/* ---------- history and scroll ---------- */

const SCROLLS = 'shop:scroll';
let scrolls;
try { scrolls = new Map(JSON.parse(sessionStorage.getItem(SCROLLS) || '[]')); } catch { scrolls = new Map(); }
const newKey = () => Math.random().toString(36).slice(2, 10);
let key = history.state && history.state.key;
if (!key) { key = newKey(); history.replaceState({...(history.state || {}), key}, ''); }
history.scrollRestoration = 'manual';
let shown = here();
addEventListener('pagehide', () => {
  scrolls.set(key, scrollY);
  try { sessionStorage.setItem(SCROLLS, JSON.stringify([...scrolls].slice(-50))); } catch { /* private mode */ }
});
/** Changes the address of this page without a new history entry (catalog filters). */
function setUrl(u) {
  if (u.href === location.href) return;
  history.replaceState(history.state, '', u.href);
  shown = here();
}

/* ---------- moving between pages ---------- */

let ticket = 0;
let cleanups = [];

async function go(url, {from = null, push = true, replace = false, restore = null} = {}) {
  const mine = ++ticket;
  root.classList.add('is-loading');
  try {
    const m = await within(data(), 5000);
    if (mine !== ticket) return;
    const route = V.resolve(url.pathname, url.searchParams, m);
    if (!route) { location.assign(url.href); return; }
    if (route.kind === 'redirect') { go(new URL(route.to + url.hash, location.origin), {push, replace: true}); return; }
    const v = V.render(route, m);
    await within(Promise.all(V.preload(route, m).slice(0, 4).map(warm)), 350).catch(() => {});
    if (mine !== ticket) return;

    // the art that morphs: a card into the gallery, the gallery back into its card
    const card = from && from.closest('.card');
    const leaving = main.dataset.route === 'pack' ? main.dataset.pack : null;
    const start = card && route.kind === 'pack' ? Number(card.dataset.peek || 0) : 0;
    let named = [];
    const name = (el) => { if (el) { el.style.viewTransitionName = 'pack-art'; named.push(el); } };
    const visible = (el) => { const r = el.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; };

    const swap = () => {
      named.forEach((el) => { el.style.viewTransitionName = ''; });
      named = [];
      if (push) {
        if (!replace) scrolls.set(key, scrollY);
        key = newKey();
        history[replace ? 'replaceState' : 'pushState']({key}, '', url.href);
      }
      shown = here();
      apply(v, url, route, {start});
      const target = url.hash && document.getElementById(decodeURIComponent(url.hash.slice(1)));
      if (restore != null) scrollTo(0, restore);
      else if (target) target.scrollIntoView();
      else scrollTo(0, 0);
      if (card && route.kind === 'pack') name(main.querySelector('.gallery__stage'));
      else if (leaving && route.kind !== 'pack') {
        const back = main.querySelector(`.card[data-pack="${CSS.escape(leaving)}"] .card__art`);
        if (back && visible(back)) name(back);
      }
    };

    if (document.startViewTransition && !reduce.matches) {
      if (card && route.kind === 'pack') name(card.querySelector('.card__art'));
      else if (leaving && route.kind !== 'pack') name(main.querySelector('.gallery__stage'));
      const t = document.startViewTransition(swap);
      t.finished.finally(() => { named.forEach((el) => { el.style.viewTransitionName = ''; }); named = []; });
      t.ready.catch(() => {});
      await t.updateCallbackDone;
    } else swap();
  } catch (err) {
    if (mine === ticket) location.assign(url.href);
  } finally {
    if (mine === ticket) root.classList.remove('is-loading');
  }
}

/** Puts a rendered page in place: head tags, department colour, nav, main, then the page's controls. */
function apply(v, url, route, {start = 0} = {}) {
  cleanups.forEach((f) => f());
  cleanups = [];
  document.title = v.title;
  document.head.querySelectorAll('[data-r]').forEach((n) => n.remove());
  const t = document.createElement('template');
  t.innerHTML = V.headTags(v);
  t.content.querySelectorAll('title').forEach((n) => n.remove());
  document.head.append(t.content);
  root.dataset.dept = v.dept;
  document.querySelectorAll('.top__nav a[data-section]').forEach((a) => a.classList.toggle('is-on', a.dataset.section === v.section));
  main.dataset.route = v.kind;
  if (v.slug) main.dataset.pack = v.slug; else delete main.dataset.pack;
  main.innerHTML = v.html;
  search.close();
  search.input.placeholder = v.find || 'Search packs';
  search.input.setAttribute('aria-label', search.input.placeholder);
  search.input.value = route.kind === 'catalog' ? url.searchParams.get('q') ?? '' : '';
  const h1 = main.querySelector('h1');
  status.textContent = h1 ? h1.textContent : v.title;
  main.focus({preventScroll: true});
  mount({start});
}

document.addEventListener('click', (e) => {
  if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
  const a = e.target.closest && e.target.closest('a[href]');
  const url = shopUrl(a);
  if (!url) return;
  if (url.pathname === location.pathname && url.search === location.search && url.hash) return;   // same page anchor
  e.preventDefault();
  if (url.href === location.href && !url.hash) { scrollTo({top: 0, behavior: reduce.matches ? 'auto' : 'smooth'}); return; }
  go(url, {from: a});
});

addEventListener('popstate', (e) => {
  if (here() === shown) return;   // only the hash changed
  scrolls.set(key, scrollY);
  key = (e.state && e.state.key) || newKey();
  go(new URL(location.href), {push: false, restore: scrolls.get(key) ?? 0});
});

/* ---------- preloading on intent ---------- */

const specRules = typeof HTMLScriptElement.supports === 'function' && HTMLScriptElement.supports('speculationrules');
const fetched = new Set();
function prefetch(a) {
  if (!a || !a.href) return;
  const url = shopUrl(a);
  if (url) {
    data().then((m) => {
      const route = V.resolve(url.pathname, url.searchParams, m);
      if (route && !saveData) V.preload(route, m).forEach(warm);
    }).catch(() => {});
    return;
  }
  // other pages on this site: the browser fetches the document ahead (speculation rules do it where supported)
  let u;
  try { u = new URL(a.href, location.href); } catch { return; }
  if (specRules || saveData || u.origin !== location.origin || a.target === '_blank' || fetched.has(u.pathname)) return;
  fetched.add(u.pathname);
  const l = document.createElement('link');
  l.rel = 'prefetch';
  l.href = u.pathname + u.search;
  document.head.append(l);
}
let hoverTimer = 0;
document.addEventListener('pointerover', (e) => {
  if (e.pointerType !== 'mouse') return;
  const a = e.target.closest && e.target.closest('a[href]');
  if (!a || (e.relatedTarget && a.contains(e.relatedTarget))) return;
  clearTimeout(hoverTimer);
  hoverTimer = setTimeout(() => prefetch(a), 60);
}, {passive: true});
document.addEventListener('pointerout', (e) => {
  const a = e.target.closest && e.target.closest('a[href]');
  if (a && !(e.relatedTarget && a.contains(e.relatedTarget))) clearTimeout(hoverTimer);
}, {passive: true});
document.addEventListener('focusin', (e) => prefetch(e.target.closest && e.target.closest('a[href]')));
document.addEventListener('touchstart', (e) => prefetch(e.target.closest && e.target.closest('a[href]')), {passive: true});

/* ---------- hover scrub: a card shows the pack's slides under the pointer ---------- */

const peeks = new WeakMap();
function peekState(card, m) {
  let st = peeks.get(card);
  if (st) return st;
  const p = m.live.find((x) => x.slug === card.dataset.pack);
  const slides = p ? p.slides.map(V.src) : [];
  if (slides.length < 2) { peeks.set(card, null); return null; }
  const art = card.querySelector('.card__art');
  const img = document.createElement('img');
  img.className = 'card__peek';
  img.alt = '';
  img.decoding = 'async';
  const dots = document.createElement('span');
  dots.className = 'card__dots';
  dots.setAttribute('aria-hidden', 'true');
  dots.innerHTML = slides.map(() => '<i></i>').join('');
  art.append(img, dots);
  st = {slides, art, img, dots, i: -1, on: false, timer: 0};
  peeks.set(card, st);
  return st;
}
function peekTo(card, st, i) {
  if (st.i === i) return;
  st.i = i;
  [...st.dots.children].forEach((d, k) => d.classList.toggle('is-on', k === i));
  const url = st.slides[i];
  warm(url).then(() => {
    if (!st.on || st.i !== i) return;
    st.img.src = url;
    st.img.classList.add('is-on');
    card.dataset.peek = String(i);
  });
}
function peekOff(card) {
  const st = peeks.get(card);
  if (!st) return;
  clearTimeout(st.timer);
  st.on = false;
  st.i = -1;
  st.img.classList.remove('is-on');
  st.dots.classList.remove('is-on');
  delete card.dataset.peek;
}
let peekModel = null;
main.addEventListener('pointermove', (e) => {
  if (e.pointerType !== 'mouse' || !peekModel) return;
  const card = e.target.closest && e.target.closest('a.card[data-pack]');
  if (!card) return;
  const st = peekState(card, peekModel);
  if (!st) return;
  const r = st.art.getBoundingClientRect();
  const i = Math.max(0, Math.min(st.slides.length - 1, Math.floor(((e.clientX - r.left) / r.width) * st.slides.length)));
  if (!st.on) {
    // a short rest first, so sweeping the pointer across the grid does not load every pack's slides
    st.want = i;
    if (!st.timer) st.timer = setTimeout(() => { st.timer = 0; st.on = true; st.dots.classList.add('is-on'); peekTo(card, st, st.want); }, 140);
    return;
  }
  peekTo(card, st, i);
}, {passive: true});
main.addEventListener('pointerout', (e) => {
  const card = e.target.closest && e.target.closest('a.card[data-pack]');
  if (card && !(e.relatedTarget && card.contains(e.relatedTarget))) peekOff(card);
}, {passive: true});

/* ---------- header search ---------- */
// One search box per page. On a catalog page it filters that catalog in place (the page sets a scope); everywhere else
// it suggests packs as you type and Enter opens the search page.

const search = (() => {
  const form = document.querySelector('[data-search]');
  const input = form ? form.querySelector('input') : document.createElement('input');
  const list = form ? form.querySelector('.search__list') : null;
  let active = -1;
  let scope = null;
  const options = () => (list ? [...list.querySelectorAll('a[role="option"]')] : []);
  function close() {
    if (!list) return;
    list.hidden = true;
    list.innerHTML = '';
    active = -1;
    input.setAttribute('aria-expanded', 'false');
    input.removeAttribute('aria-activedescendant');
  }
  function mark(i) {
    const o = options();
    active = o.length ? (i + o.length) % o.length : -1;
    o.forEach((x, k) => x.setAttribute('aria-selected', String(k === active)));
    if (active >= 0) { input.setAttribute('aria-activedescendant', o[active].id); o[active].scrollIntoView({block: 'nearest'}); prefetch(o[active]); }
  }
  async function show() {
    if (scope) return;
    const q = input.value.trim();
    if (!q) { close(); return; }
    const m = await data().catch(() => null);
    if (!m || input.value.trim() !== q || document.activeElement !== input) return;
    const hits = V.search(m.live, q, {rank: true});
    const all = `/shop/search/?q=${encodeURIComponent(q)}`;
    list.innerHTML = hits.length
      ? `${hits.slice(0, 6).map(V.searchOption).join('')}${hits.length > 6 ? `<a class="search__all" role="option" id="search-opt-all" aria-selected="false" tabindex="-1" href="${V.esc(all)}">All ${hits.length} results</a>` : ''}`
      : `<p>No packs match “${V.esc(q)}”</p>`;
    list.hidden = false;
    input.setAttribute('aria-expanded', 'true');
    active = -1;
    input.removeAttribute('aria-activedescendant');
  }
  if (form) {
    input.addEventListener('focus', () => { data().catch(() => {}); if (input.value.trim()) show(); });
    input.addEventListener('input', () => (scope ? scope() : show()));
    input.addEventListener('blur', () => setTimeout(() => { if (document.activeElement !== input) close(); }, 120));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        if (list.hidden) return;
        e.preventDefault();
        mark(active + (e.key === 'ArrowDown' ? 1 : -1));
      } else if (e.key === 'Escape') {
        if (!list.hidden) { e.preventDefault(); close(); } else if (!input.value) input.blur();
      } else if (e.key === 'Enter' && active >= 0) {
        e.preventDefault();
        const o = options()[active];
        close();
        input.blur();
        if (o) go(new URL(o.href), {from: null});
      }
    });
    list.addEventListener('mousedown', (e) => e.preventDefault());   // keep focus in the box while a result is clicked
    list.addEventListener('click', () => { setTimeout(() => { close(); input.blur(); }, 0); });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      if (scope) { scope(true); if (matchMedia('(pointer: coarse)').matches) input.blur(); return; }
      const q = input.value.trim();
      close();
      input.blur();
      go(new URL(`/shop/search/${q ? `?q=${encodeURIComponent(q)}` : ''}`, location.origin));
    });
    document.addEventListener('keydown', (e) => {
      if (e.key !== '/' || e.metaKey || e.ctrlKey || e.altKey) return;
      const t = e.target;
      if (t && (t.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(t.tagName))) return;
      e.preventDefault();
      input.focus();
      input.select();
    });
  }
  /** A catalog page takes the box over: typing filters it in place. Null gives the box back. */
  function setScope(f) { scope = f; close(); }
  return {input, close, scope: setScope};
})();

/* ---------- page controls ---------- */

let mountTicket = 0;
async function mount({start = 0} = {}) {
  const mine = ++mountTicket;
  const g = main.querySelector('[data-gallery]');
  if (g) gallery(g, {start});
  const bar = main.querySelector('[data-buybar]');
  if (bar) buybar(bar);
  const cat = main.querySelector('[data-catalog]');
  if (cat) { search.scope(() => {}); cleanups.push(() => search.scope(null)); }   // no suggestions while the catalog loads
  const shelf = main.querySelector('[data-shelf]');
  if (shelf) shelfNav(shelf);
  const m = await data().catch(() => null);
  if (!m || mine !== mountTicket) return;
  peekModel = m;
  if (cat) catalog(cat, m);
  if (main.dataset.route === 'pack') buyBox(m);
}

function debounce(f, ms) {
  let t = 0;
  return (...a) => { clearTimeout(t); t = setTimeout(() => f(...a), ms); };
}

/** Filter chips, the header search box and the sort of a catalog page; the state lives in the address (?q=&f=&sort=). */
function catalog(el, m) {
  const c = V.catalogOf(el.dataset.catalog, m);
  if (!c) return;
  const grid = main.querySelector('[data-grid]');
  const count = main.querySelector('[data-count]');
  const empty = main.querySelector('[data-empty]');
  const input = search.input;
  const everywhere = main.querySelector('[data-everywhere]');
  const select = el.querySelector('select[name="sort"]');
  const chips = [...el.querySelectorAll('.chip')];
  const params = new URLSearchParams(location.search);
  const st = {q: (params.get('q') ?? '').trim(), f: params.get('f') ?? 'all', sort: params.get('sort') ?? 'new'};
  if (!chips.some((b) => b.dataset.f === st.f)) st.f = 'all';
  if (!V.SORTS.some(([s]) => s === st.sort)) st.sort = 'new';
  const typed = input.value.trim();
  if (typed && document.activeElement === input) st.q = typed;   // typed before the data arrived
  else input.value = st.q;
  select.value = st.sort;
  const address = debounce(() => {
    const u = new URL(location.href);
    for (const [k, d] of [['q', ''], ['f', 'all'], ['sort', 'new']]) { if (st[k] && st[k] !== d) u.searchParams.set(k, st[k]); else u.searchParams.delete(k); }
    if (main.contains(el)) setUrl(u);
  }, 400);
  const draw = () => {
    const list = V.pick(c, st);
    grid.innerHTML = V.gridHtml(list);
    count.textContent = V.countLine(c, list.length);
    empty.hidden = list.length > 0;
    chips.forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.f === st.f)));
    if (everywhere) everywhere.href = `/shop/search/${st.q ? `?q=${encodeURIComponent(st.q)}` : ''}`;
    address();
  };
  if (st.q || st.f !== 'all' || st.sort !== 'new') draw();
  const typing = debounce(() => { if (input.value.trim() !== st.q) { st.q = input.value.trim(); draw(); } }, 120);
  search.scope((now) => { if (now === true) { st.q = input.value.trim(); draw(); } else typing(); });
  select.addEventListener('change', () => { st.sort = select.value; draw(); });
  el.addEventListener('click', (e) => {
    const b = e.target.closest('.chip');
    if (!b || b.dataset.f === st.f) return;
    st.f = b.dataset.f;
    draw();
  });
  const clear = main.querySelector('[data-clear]');
  if (clear) clear.addEventListener('click', () => { st.q = ''; st.f = 'all'; input.value = ''; draw(); input.focus(); });
}

/** The Collections shelf on the home page: arrows page through it when it is wider than the screen. */
function shelfNav(list) {
  const prev = main.querySelector('[data-shelf-prev]');
  const next = main.querySelector('[data-shelf-next]');
  if (!prev || !next) return;
  const update = () => {
    const max = list.scrollWidth - list.clientWidth;
    prev.hidden = next.hidden = max <= 2;
    prev.setAttribute('aria-disabled', String(list.scrollLeft <= 2));
    next.setAttribute('aria-disabled', String(list.scrollLeft >= max - 2));
  };
  // one page is as many whole tiles as fit, so the next tile lands on the left edge
  const page = (d) => {
    const li = list.children;
    const each = li.length > 1 ? li[1].offsetLeft - li[0].offsetLeft : list.clientWidth;
    const pad = parseFloat(getComputedStyle(list).paddingLeft) || 0;
    const gap = each - (li[0] ? li[0].offsetWidth : 0);
    const n = Math.max(1, Math.floor((list.clientWidth - 2 * pad + gap + 1) / each));
    list.scrollBy({left: d * n * each, behavior: reduce.matches ? 'auto' : 'smooth'});
  };
  prev.addEventListener('click', () => page(-1));
  next.addEventListener('click', () => page(1));
  list.addEventListener('scroll', update, {passive: true});
  if ('ResizeObserver' in window) {
    const ro = new ResizeObserver(update);
    ro.observe(list);
    cleanups.push(() => ro.disconnect());
  }
  update();
}

/** buy.json can change after the page was built (a ClearlyDev link, a Robux product): the buttons follow it. */
function buyBox(m) {
  const p = m.live.find((x) => x.slug === main.dataset.pack);
  const box = main.querySelector('[data-buy]');
  if (!p || !box) return;
  const html = V.buyActions(p, m.buy);
  const t = document.createElement('div');
  t.innerHTML = html;
  if (t.innerHTML !== box.innerHTML) box.innerHTML = html;
}

/** On phones the Purchase bar slides up once the buy buttons are out of view. */
function buybar(bar) {
  const box = main.querySelector('[data-buy]');
  if (!box || !('IntersectionObserver' in window)) return;
  const link = bar.querySelector('a');
  const io = new IntersectionObserver(([e]) => {
    const on = !e.isIntersecting;
    bar.classList.toggle('is-on', on);
    bar.setAttribute('aria-hidden', String(!on));
    if (link) link.tabIndex = on ? 0 : -1;
  });
  io.observe(box);
  cleanups.push(() => io.disconnect());
}

/** The pack's slides: snap scrolling, arrows, thumbnails, keys, and zoom with pan. */
function gallery(el, {start = 0} = {}) {
  const strip = el.querySelector('.gallery__strip');
  if (!strip) return;
  const figs = [...strip.children];
  const n = figs.length;
  const thumbs = [...el.querySelectorAll('.gallery__thumbs button')];
  const count = el.querySelector('[data-index]');
  const prev = el.querySelector('[data-prev]');
  const next = el.querySelector('[data-next]');
  const level = el.querySelector('[data-zlevel]');
  const box = el.querySelector('.gallery__thumbs');
  let i = 0, z = 1, tx = 0, ty = 0;
  const clamp = (v, a, b) => Math.min(b, Math.max(a, v));
  const w = () => strip.clientWidth || 1;
  const h = () => strip.clientHeight || 1;
  const img = () => figs[i] && figs[i].querySelector('img');

  function set(k) {
    if (k === i && count && count.textContent.startsWith(`${k + 1} `)) return;
    if (z !== 1) zoom(1);
    i = k;
    if (count) count.textContent = `${i + 1} / ${n}`;
    thumbs.forEach((b, j) => b.setAttribute('aria-current', String(j === i)));
    if (prev) prev.disabled = i === 0;
    if (next) next.disabled = i === n - 1;
    figs.forEach((f, j) => { const v = f.querySelector('video'); if (v && j !== i) v.pause(); });
    const t = thumbs[i];
    if (t && box) {
      const l = t.offsetLeft - box.offsetLeft, r = l + t.offsetWidth;
      if (l < box.scrollLeft) box.scrollTo({left: l - 8, behavior: 'smooth'});
      else if (r > box.scrollLeft + box.clientWidth) box.scrollTo({left: r - box.clientWidth + 8, behavior: 'smooth'});
    }
  }
  function to(k, smooth = true) {
    k = clamp(k, 0, n - 1);
    if (z !== 1) zoom(1);
    strip.scrollTo({left: k * w(), behavior: smooth && !reduce.matches ? 'smooth' : 'auto'});
    set(k);
  }
  strip.addEventListener('scroll', () => {
    if (z !== 1) return;
    const k = Math.round(strip.scrollLeft / w());
    if (k !== i) set(k);
  }, {passive: true});
  if (prev) prev.addEventListener('click', () => to(i - 1));
  if (next) next.addEventListener('click', () => to(i + 1));
  thumbs.forEach((b, j) => b.addEventListener('click', () => {
    to(j);
    const v = figs[j].querySelector('video');
    if (v) v.play().catch(() => {});
  }));
  strip.addEventListener('keydown', (e) => {
    const k = {ArrowLeft: i - 1, ArrowRight: i + 1, Home: 0, End: n - 1}[e.key];
    if (k === undefined || (e.target !== strip)) return;
    e.preventDefault();
    to(k);
  });

  // zoom: the current image scales from its top-left corner; the point under the pointer stays put
  function paint() {
    const im = img();
    if (im) im.style.transform = z === 1 ? '' : `translate(${tx}px, ${ty}px) scale(${z})`;
    el.classList.toggle('is-zoomed', z !== 1);
    if (level) level.textContent = `${Math.round(z * 100)}%`;
  }
  function zoom(nz, cx = w() / 2, cy = h() / 2) {
    const im = img();
    if (!im) return;
    nz = clamp(nz, 1, 4);
    const k = nz / z;
    tx = cx - (cx - tx) * k;
    ty = cy - (cy - ty) * k;
    z = nz;
    tx = z === 1 ? 0 : clamp(tx, w() - w() * z, 0);
    ty = z === 1 ? 0 : clamp(ty, h() - h() * z, 0);
    paint();
  }
  const STEPS = [1, 1.5, 2, 3, 4];
  const at = (e) => { const r = strip.getBoundingClientRect(); return [e.clientX - r.left, e.clientY - r.top]; };
  const zin = el.querySelector('[data-zin]'), zout = el.querySelector('[data-zout]'), zreset = el.querySelector('[data-zreset]');
  if (zin) zin.addEventListener('click', () => zoom(STEPS.find((s) => s > z + 0.01) ?? 4));
  if (zout) zout.addEventListener('click', () => zoom([...STEPS].reverse().find((s) => s < z - 0.01) ?? 1));
  if (zreset) zreset.addEventListener('click', () => zoom(1));
  strip.addEventListener('dblclick', (e) => { if (!e.target.closest('img')) return; const [x, y] = at(e); zoom(z === 1 ? 2.5 : 1, x, y); });
  strip.addEventListener('wheel', (e) => {
    if (!img() || (!e.ctrlKey && z === 1)) return;
    e.preventDefault();
    const [x, y] = at(e);
    zoom(z * Math.exp(-e.deltaY * (e.ctrlKey ? 0.01 : 0.0025)), x, y);
  }, {passive: false});
  let drag = null;
  strip.addEventListener('pointerdown', (e) => {
    if (z === 1 || !e.target.closest('img')) return;
    drag = {x: e.clientX, y: e.clientY, tx, ty};
    strip.setPointerCapture(e.pointerId);
    el.classList.add('is-dragging');
  });
  strip.addEventListener('pointermove', (e) => {
    if (!drag) return;
    tx = clamp(drag.tx + e.clientX - drag.x, w() - w() * z, 0);
    ty = clamp(drag.ty + e.clientY - drag.y, h() - h() * z, 0);
    paint();
  });
  const end = () => { drag = null; el.classList.remove('is-dragging'); };
  strip.addEventListener('pointerup', end);
  strip.addEventListener('pointercancel', end);

  // keep the same slide in view when the strip changes width
  if ('ResizeObserver' in window) {
    let last = w();
    const ro = new ResizeObserver(() => { if (w() !== last) { last = w(); if (z !== 1) zoom(1); strip.scrollLeft = i * w(); } });
    ro.observe(strip);
    cleanups.push(() => ro.disconnect());
  }

  const first = start ? figs.findIndex((f) => f.dataset.slide === String(start)) : 0;
  if (first > 0) { strip.scrollLeft = first * w(); set(first); } else set(0);
}

/* ---------- start ---------- */

mount();
if (performance.getEntriesByType && (performance.getEntriesByType('navigation')[0] || {}).type === 'back_forward' && scrolls.has(key)) {
  scrollTo(0, scrolls.get(key));
}
const idle = window.requestIdleCallback || ((f) => setTimeout(f, 300));
idle(() => data().catch(() => {}));
