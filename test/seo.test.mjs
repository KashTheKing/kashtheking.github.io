// node --test test/seo.test.mjs  (no dependencies). Runs tools/seo.mjs on a copy of the site without images.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import {build, metaDescription, clip} from '../tools/seo.mjs';

const repo = new URL('..', import.meta.url).pathname;
function copy() {
  const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'seo-'));
  const skip = /^(\.git|library|flashback|infinite-ocean|text-to-scratch|img|video|public|assets)$/;
  fs.cpSync(repo, dir, {recursive: true, filter: (src) => !skip.test(path.basename(src))});
  return dir;
}
const read = (dir, rel) => fs.readFileSync(path.join(dir, rel), 'utf8');

test('a second run changes nothing', () => {
  const dir = copy();
  build(dir);
  assert.deepEqual(build(dir).changed.filter((f) => f !== 'sitemap.xml'), []);
});

test('a pack the panel added without a page gets one, with its click-through pages, and shows on the shop', () => {
  const dir = copy();
  const packs = JSON.parse(read(dir, 'shop/packs.json'));
  packs.unshift({slug: '100StudCastle', name: '100 Stud Castle Assets', count: 100, price: 4.99, url: 'https://create.roblox.com/store/asset/1234567890', image: 'img/100StudCastle.jpg', tags: ['Stud'], description: 'A studded castle. Textured, rigged and animated.'});
  fs.writeFileSync(path.join(dir, 'shop/packs.json'), JSON.stringify(packs, null, 4));
  build(dir);
  const saved = JSON.parse(read(dir, 'shop/packs.json'));
  assert.equal(saved[0].page, '100-stud-castle-assets');
  const page = read(dir, 'shop/100-stud-castle-assets/index.html');
  assert.match(page, /<title>100 Stud Castle Assets - Studded Roblox Asset Pack \| KashTheKing Shop<\/title>/);
  assert.match(page, /window\.PACK_SLUG = "100StudCastle"/);
  assert.match(page, /<link rel="canonical" href="https:\/\/kashtheking\.com\/shop\/100-stud-castle-assets\/">/);
  assert.match(page, /"@type":"Offer","price":"4.99"/);
  assert.doesNotMatch(page, /100 Stud Pets/);   // nothing left over from the template
  assert.match(read(dir, 'shop/100-stud-castle-assets/roblox/index.html'), /href="https:\/\/create\.roblox\.com\/store\/asset\/1234567890"/);
  assert.match(read(dir, 'shop/index.html'), /<a class="card" href="100-stud-castle-assets\/">/);
  assert.match(read(dir, 'shop/stud/index.html'), /100-stud-castle-assets\//);
  assert.match(read(dir, 'sitemap.xml'), /<loc>https:\/\/kashtheking\.com\/shop\/100-stud-castle-assets\/<\/loc>/);
});

test('style pages: own address, the shop as base, only their packs, linked from the shop', () => {
  const dir = copy();
  build(dir);
  const stud = read(dir, 'shop/stud/index.html');
  assert.match(stud, /<base href="\/shop\/">/);
  assert.match(stud, /<link rel="canonical" href="https:\/\/kashtheking\.com\/shop\/stud\/">/);
  assert.match(stud, /window\.SHOP_PICK = \[/);
  assert.doesNotMatch(stud, /100-cute-robots\//);
  assert.doesNotMatch(stud, /class="feat"/);
  assert.match(read(dir, 'shop/index.html'), /<a href="stud\/">Stud<\/a>/);
  assert.match(read(dir, 'shop/100-stud-pets/index.html'), /<a href="\.\.\/voxel\/">Voxel<\/a>/);
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
  assert.doesNotMatch(map, /\/roblox\/<|\/discord\/<|\/shop\/pack\/<|minigame|newsletter-privacy|contact\.html/);
});

test('UI packs: screens, not models, and their own UI packs page once there are two', () => {
  const dir = copy();
  const file = path.join(dir, 'shop/packs.json');
  const packs = JSON.parse(fs.readFileSync(file, 'utf8'));
  const pack = (slug, name) => ({slug, name, kind: 'ui', count: 5, price: 6.99, url: 'https://create.roblox.com/store/asset/123', image: `img/${slug}.jpg`, description: 'A full game UI.', tags: ['UI']});
  packs.unshift(pack('TestUiOne', 'Test One UI Pack'), pack('TestUiTwo', 'Test Two UI Pack'));
  fs.writeFileSync(file, JSON.stringify(packs, null, 4));
  const r = build(dir);
  assert.ok(r.collections.some((c) => c.slug === 'ui' && c.packs >= 2));
  const page = read(dir, 'shop/test-one-ui-pack/index.html');
  assert.match(page, /<title>Test One UI Pack - Roblox UI Pack \| KashTheKing Shop<\/title>/);
  assert.match(page, /<p>5 screens, \$6\.99\./);
  assert.match(metaDescription(packs[0]), /^5 full Roblox UI screens, static and Fusion\./);
  assert.doesNotMatch(page, /5 models/);
});

test('a UI pack shows before its Creator Store listing: page and card, no Roblox link until it has one', () => {
  const dir = copy();
  const file = path.join(dir, 'shop/packs.json');
  const packs = JSON.parse(fs.readFileSync(file, 'utf8'));
  packs.unshift({slug: 'SoonUi', name: 'Soon UI Pack', kind: 'ui', count: 4, price: 5.99, url: '', image: 'img/SoonUi.jpg', description: 'A full game UI.', tags: ['UI']});
  fs.writeFileSync(file, JSON.stringify(packs, null, 4));
  build(dir);
  const page = read(dir, 'shop/soon-ui-pack/index.html');
  assert.match(page, /schema\.org\/PreOrder/);
  assert.doesNotMatch(page, /Get it on the Roblox Creator Store/);
  assert.ok(!fs.existsSync(path.join(dir, 'shop/soon-ui-pack/roblox/index.html')));
  assert.match(read(dir, 'shop/index.html'), /<a class="card" href="soon-ui-pack\/">/);
  assert.match(read(dir, 'shop/ui/index.html'), /soon-ui-pack\//);
});
