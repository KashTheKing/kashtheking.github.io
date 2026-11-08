// node --test test/seo.test.mjs  (no dependencies). Runs tools/seo.mjs on a copy of the site without images.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {build, metaDescription, clip} from '../tools/seo.mjs';
import * as V from '../shop/app/views.mjs';

const repo = new URL('..', import.meta.url).pathname;
function copy() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-'));
  const skip = /^(\.git|library|flashback|infinite-ocean|text-to-scratch|img|video|public|assets)$/;
  fs.cpSync(repo, dir, {recursive: true, filter: (src) => !skip.test(path.basename(src))});
  return dir;
}
const read = (dir, rel) => fs.readFileSync(path.join(dir, rel), 'utf8');
const main = (html) => /<main\b[^>]*>\n([\s\S]*)\n<\/main>/.exec(html)?.[1];
const grid = (html) => /data-grid>([\s\S]*?)<\/div>\s*<div class="empty"/.exec(html)?.[1] ?? '';
function addPacks(dir, ...rows) {
  const file = path.join(dir, 'shop/packs.json');
  const packs = JSON.parse(fs.readFileSync(file, 'utf8'));
  packs.unshift(...rows);
  fs.writeFileSync(file, JSON.stringify(packs, null, 4));
  return packs;
}

test('a second run changes nothing', () => {
  const dir = copy();
  build(dir);
  assert.deepEqual(build(dir).changed.filter((f) => f !== 'sitemap.xml'), []);
});

test('a pack the panel added without a page gets one, with its click-through pages, and shows on the shop', () => {
  const dir = copy();
  addPacks(dir, {slug: '100StudCastle', name: '100 Stud Castle Assets', count: 100, price: 4.99, url: 'https://create.roblox.com/store/asset/1234567890', image: 'img/100StudCastle.jpg', tags: ['Stud'], description: 'A studded castle. Textured, rigged and animated.'});
  build(dir);
  const saved = JSON.parse(read(dir, 'shop/packs.json'));
  assert.equal(saved[0].page, '100-stud-castle-assets');
  const page = read(dir, 'shop/100-stud-castle-assets/index.html');
  assert.match(page, /<title>100 Stud Castle Assets - Studded Roblox Asset Pack \| KashTheKing Shop<\/title>/);
  assert.match(page, /<main id="main" tabindex="-1" data-route="pack" data-pack="100StudCastle">/);
  assert.match(page, /<link data-r rel="canonical" href="https:\/\/kashtheking\.com\/shop\/100-stud-castle-assets\/">/);
  assert.match(page, /"@type":"Offer","price":"4.99"/);
  assert.match(page, /<h1 class="buy__name" id="pack-name">100 Stud Castle Assets<\/h1>/);
  assert.match(page, /href="\/shop\/100-stud-castle-assets\/roblox\/" target="_blank" rel="noopener">Purchase on Creator Store/);
  assert.match(read(dir, 'shop/100-stud-castle-assets/roblox/index.html'), /href="https:\/\/create\.roblox\.com\/store\/asset\/1234567890"/);
  assert.match(read(dir, 'shop/100-stud-castle-assets/discord/index.html'), /href="https:\/\/discord\.gg\//);
  assert.match(grid(read(dir, 'shop/models/index.html')), /<a class="card" href="\/shop\/100-stud-castle-assets\/" data-pack="100StudCastle">/);
  assert.match(grid(read(dir, 'shop/stud/index.html')), /href="\/shop\/100-stud-castle-assets\/"/);
  assert.match(read(dir, 'shop/index.html'), /href="\/shop\/100-stud-castle-assets\/"/);   // newest pack on the New shelf
  assert.match(read(dir, 'sitemap.xml'), /<loc>https:\/\/kashtheking\.com\/shop\/100-stud-castle-assets\/<\/loc>/);
});

test('style pages: own address, only their packs, linked from the shop and from pack pages', () => {
  const dir = copy();
  build(dir);
  const stud = read(dir, 'shop/stud/index.html');
  assert.match(stud, /<link data-r rel="canonical" href="https:\/\/kashtheking\.com\/shop\/stud\/">/);
  assert.match(stud, /<h1>Stud asset packs<\/h1>/);
  assert.match(grid(stud), /href="\/shop\/100-stud-pets\/"/);
  assert.doesNotMatch(grid(stud), /100-cute-robots\//);
  assert.match(read(dir, 'shop/models/index.html'), /<a href="\/shop\/stud\/">Stud<span>/);
  assert.match(read(dir, 'shop/100-stud-pets/index.html'), /<a href="\/shop\/voxel\/">Voxel<span>/);
  assert.match(read(dir, 'shop/ui/index.html'), /<html lang="en" data-dept="ui">/);   // UI packs are blue
});

test('every link inside the shop goes to a page that exists', () => {
  const dir = copy();
  build(dir);
  const pages = ['shop/index.html', 'shop/models/index.html', 'shop/ui/index.html', 'shop/plugins/index.html', 'shop/search/index.html', 'shop/100-stud-pets/index.html'];
  for (const rel of pages) {
    for (const [, href] of read(dir, rel).matchAll(/href="(\/shop\/[^"#?]*)/g)) {
      const file = href.endsWith('/') ? `${href}index.html` : href;
      if (/\.(css|mjs|js|json|woff2)$/.test(file)) continue;
      assert.ok(fs.existsSync(path.join(dir, file)) || /\.(png|jpe?g|mp4)$/.test(file), `${rel} links to ${href}`);
    }
  }
});

test('the browser renders the same page the build wrote', () => {
  const dir = copy();
  build(dir);
  const m = V.model(JSON.parse(read(dir, 'shop/packs.json')), {buy: JSON.parse(read(dir, 'shop/buy.json')), soon: JSON.parse(read(dir, 'shop/soon.json'))});
  for (const p of ['/shop/', '/shop/models/', '/shop/ui/', '/shop/voxel/', '/shop/plugins/', '/shop/100-stud-pets/', '/shop/250-cute-sea-creatures/']) {
    const route = V.resolve(p, new URLSearchParams(), m);
    assert.ok(route, p);
    assert.equal(main(read(dir, `${p.slice(1)}index.html`)), V.render(route, m).html, p);
  }
});

test('addresses: which page each shop link is, and which ones the router leaves to the browser', () => {
  const m = V.model(JSON.parse(fs.readFileSync(path.join(repo, 'shop/packs.json'), 'utf8')));
  const q = new URLSearchParams();
  assert.equal(V.resolve('/shop/', q, m).kind, 'home');
  assert.equal(V.resolve('/shop/index.html', q, m).kind, 'home');
  assert.deepEqual([V.resolve('/shop/models', q, m).kind, V.resolve('/shop/models/', q, m).id], ['catalog', 'models']);
  assert.equal(V.resolve('/shop/stud/', q, m).id, 'stud');
  assert.equal(V.resolve('/shop/100-stud-pets/', q, m).pack.slug, '100StudPets');
  assert.equal(V.resolve('/shop/100-stud-pets/roblox/', q, m), null);
  assert.equal(V.resolve('/shop/no-such-pack/', q, m), null);
  assert.equal(V.resolve('/library/', q, m), null);
  assert.deepEqual(V.resolve('/shop/pack/', new URLSearchParams('p=100StudPets'), m), {kind: 'redirect', to: '/shop/100-stud-pets/'});
  assert.equal(V.resolve('/shop/pack/', new URLSearchParams('p=nope'), m), null);
});

test('catalog filters: chips, search words and sort; coming-soon packs stay last', () => {
  const m = V.model([
    {slug: 'a', page: 'a', name: '100 Stud Pets', price: 4.99, count: 100, url: 'u', tags: ['Stud', 'Animals']},
    {slug: 'b', page: 'b', name: '100 Voxel Mobs', price: 14.99, count: 250, url: 'u', tags: ['Voxel', 'Animals']},
    {slug: 'c', page: 'c', name: '50 Low Poly Guns', price: 0, count: 50, url: 'u', tags: ['Weapons']},
  ], {soon: [{name: 'Stud Dragons', slug: 'd', tags: ['Stud']}]});
  const c = V.catalogOf('models', m);
  assert.deepEqual(V.pick(c).map((p) => p.slug), ['a', 'b', 'c', 'd']);
  assert.deepEqual(V.pick(c, {f: 'stud'}).map((p) => p.slug), ['a', 'd']);
  assert.deepEqual(V.pick(c, {q: 'mobs'}).map((p) => p.slug), ['b']);
  assert.deepEqual(V.pick(c, {sort: 'low'}).map((p) => p.slug), ['c', 'a', 'b', 'd']);
  assert.deepEqual(V.pick(c, {sort: 'big'}).map((p) => p.slug), ['b', 'a', 'c', 'd']);
  assert.deepEqual(V.chipsOf(c).map((x) => x[0]), ['all', 'stud', 'voxel', 'lowpoly']);
  assert.equal(V.countLine(c, 4), '4 packs · 400 models');
  assert.equal(V.countLine(c, 1), '1 of 4 packs');
  assert.match(V.card(m.live[2]), /<b>FREE<\/b>/);
  assert.doesNotMatch(V.card(m.live[2]), /R\$/);
});

test('search snippets stay short and name the style and price', () => {
  const p = {name: '100 Voxel Mobs', count: 100, price: 4.99, tags: ['Voxel'], description: `${'Blocky mobs '.repeat(40)}. Rigged and animated.`};
  const d = metaDescription(p);
  assert.ok(d.length <= 165, d);
  assert.match(d, /^100 voxel Roblox models, rigged and animated\./);
  assert.match(d, /\$4\.99 on the Creator Store\.$/);
  assert.equal(clip('short', 10), 'short');
});

test('sitemap leaves out hidden pages and other sites', () => {
  const dir = copy();
  build(dir);
  const map = read(dir, 'sitemap.xml');
  assert.doesNotMatch(map, /\/roblox\/<|\/discord\/<|\/shop\/pack\/<|\/shop\/search\/<|minigame|newsletter-privacy|contact\.html/);
  assert.match(map, /<loc>https:\/\/kashtheking\.com\/shop\/<\/loc>/);
  assert.match(read(dir, 'shop/search/index.html'), /<meta data-r name="robots" content="noindex">/);
});

test('UI packs: screens, not models, and their own UI packs page once there are two', () => {
  const dir = copy();
  const pack = (slug, name) => ({slug, name, kind: 'ui', count: 5, price: 6.99, url: 'https://create.roblox.com/store/asset/123', image: `img/${slug}.jpg`, description: 'A full game UI.', tags: ['UI']});
  const packs = addPacks(dir, pack('TestUiOne', 'Test One UI Pack'), pack('TestUiTwo', 'Test Two UI Pack'));
  const r = build(dir);
  assert.ok(r.collections.some((c) => c.slug === 'ui' && c.packs >= 2));
  const page = read(dir, 'shop/test-one-ui-pack/index.html');
  assert.match(page, /<title>Test One UI Pack - Roblox UI Pack \| KashTheKing Shop<\/title>/);
  assert.match(page, /<span>5 screens<\/span>/);
  assert.match(page, /<html lang="en" data-dept="ui">/);
  assert.match(metaDescription(packs[0]), /^5 full Roblox UI screens, static and Fusion\./);
  assert.doesNotMatch(page, /5 models/);
});

test('a UI pack shows before its Creator Store listing: page and card, no Roblox link until it has one', () => {
  const dir = copy();
  addPacks(dir, {slug: 'SoonUi', name: 'Soon UI Pack', kind: 'ui', count: 4, price: 5.99, url: '', image: 'img/SoonUi.jpg', description: 'A full game UI.', tags: ['UI']});
  build(dir);
  const page = read(dir, 'shop/soon-ui-pack/index.html');
  assert.match(page, /schema\.org\/PreOrder/);
  assert.match(page, /price--soon price--hero">Coming soon/);
  assert.doesNotMatch(page, /Purchase on Creator Store|data-buybar/);
  assert.ok(!fs.existsSync(path.join(dir, 'shop/soon-ui-pack/roblox/index.html')));
  assert.doesNotMatch(read(dir, 'shop/models/index.html'), /soon-ui-pack/);
  assert.match(read(dir, 'shop/ui/index.html'), /soon-ui-pack\//);
});

test('every shop page loads the shop app with a content version, the subscription slot and analytics', () => {
  const dir = copy();
  const r = build(dir);
  for (const rel of ['shop/index.html', 'shop/models/index.html', 'shop/100-stud-pets/index.html']) {
    const page = read(dir, rel);
    assert.ok(page.includes(`/shop/app/app.mjs?v=${r.version}`), rel);
    assert.ok(page.includes(`"/shop/app/views.mjs":"/shop/app/views.mjs?v=${r.version}"`), rel);
    assert.match(page, /<div id="sub" class="wrap sub-slot"><\/div>/);
    assert.match(page, /<script src="\/shop\/sub\.js" defer><\/script>/);
    assert.match(page, /panel\.kashtheking\.com\/t\.js/);
    assert.match(page, /"spa": true/);
  }
});

test('the trailer plays in the gallery and image slides keep their index for the hover scrub', () => {
  const dir = copy();
  build(dir);
  const page = read(dir, 'shop/250-cute-sea-creatures/index.html');
  assert.match(page, /<video src="\/shop\/video\/sea-creatures\.mp4" poster="\/shop\/video\/sea-creatures\.jpg"/);
  assert.match(page, /<figure data-slide="0"><img src="\/shop\/img\/250CuteSeaCreatures\/01\.jpg"/);
});
