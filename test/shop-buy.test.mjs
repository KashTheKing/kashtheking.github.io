// node --test test/shop-buy.test.mjs  (no dependencies). Runs shop/sub.js against a fake DOM and checks the pack page buy links.
import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';

const root = new URL('../shop/', import.meta.url);
const packs = JSON.parse(fs.readFileSync(new URL('packs.json', root), 'utf8'));

async function renderSub(subscription) {
    const slot = { innerHTML: '' };
    const document = { getElementById: () => slot, createElement: () => ({}), head: { appendChild() {} } };
    const fetch = async (u) => ({ ok: true, json: async () => (u.endsWith('buy.json') ? { subscription } : packs) });
    vm.runInNewContext(fs.readFileSync(new URL('sub.js', root), 'utf8'), { document, fetch });
    await new Promise((r) => setTimeout(r, 10));
    return slot.innerHTML;
}
const launch = (html, cls) => {
    const m = new RegExp(`class="${cls}" href="([^"]+)"`).exec(html);
    if (!m) return null;
    const u = new URL(m[1].replace(/&amp;/g, '&'));
    return { place: u.searchParams.get('placeId'), data: JSON.parse(u.searchParams.get('launchData')) };
};

test('not enabled: nothing renders', async () => {
    assert.equal(await renderSub({ enabled: false, price_usd: 14.99, showcase_place_id: '91734861985398' }), '');
    assert.equal(await renderSub({ enabled: true, price_usd: 14.99, showcase_place_id: null }), '');
});

test('both products: icon, Get Subscription (usd) and Pay with Robux, with the Opens Roblox note', async () => {
    const html = await renderSub({ enabled: true, price_usd: 14.99, showcase_place_id: '91734861985398', usd_product_id: 'EXP-1', robux_product_id: 'EXP-2' });
    assert.match(html, /src="\/shop\/img\/subscription.png"/);
    assert.match(html, /Opens Roblox/);
    assert.deepEqual(launch(html, 'sub-go'), { place: '91734861985398', data: { a: 'sub', p: 'usd' } });
    assert.deepEqual(launch(html, 'sub-alt'), { place: '91734861985398', data: { a: 'sub', p: 'robux' } });
    assert.doesNotMatch(html, /class="[^"]*\b(ad|ads|banner|sponsor)\b/);
});

test('ids missing: only the USD button; robux only: only Pay with Robux', async () => {
    const old = await renderSub({ enabled: true, price_usd: 14.99, showcase_place_id: '1' });
    assert.ok(launch(old, 'sub-go') && !launch(old, 'sub-alt'));
    const rbx = await renderSub({ enabled: true, price_usd: 14.99, showcase_place_id: '1', usd_product_id: null, robux_product_id: 'EXP-2' });
    assert.ok(!launch(rbx, 'sub-go') && launch(rbx, 'sub-alt'));
});

test('pack page: Purchase with Robux launches {"a":"buy","pack":slug} in the showcase place, only with a Robux product', async () => {
    const V = await import('../shop/app/views.mjs');
    const p = V.model(packs).live.find((x) => x.price > 0 && x.url);
    const buy = { showcasePlaceId: '91734861985398', packs: { [p.slug]: { robuxProductId: '123456' } } };
    const html = V.buyActions(p, buy);
    const m = /class="btn btn--robux btn--big" href="([^"]+)"/.exec(html);
    assert.ok(m, html);
    const u = new URL(m[1].replace(/&amp;/g, '&'));
    assert.equal(u.searchParams.get('placeId'), '91734861985398');
    assert.deepEqual(JSON.parse(u.searchParams.get('launchData')), { a: 'buy', pack: p.slug });
    assert.match(html, new RegExp(`Purchase with Robux <span class="nowrap">\\(R\\$ ${V.robux(p.price)}\\)`));
    assert.equal(V.buyLinks(p, { showcasePlaceId: '91734861985398', packs: {} }).robux, null);
    assert.equal(V.buyLinks(p, { showcasePlaceId: 'x', packs: buy.packs }).robux, null);
    assert.equal(V.buyLinks({ ...p, price: 0 }, buy).robux, null);
    const t = new URL(V.buyLinks(p, buy).try);
    assert.deepEqual(JSON.parse(t.searchParams.get('launchData')), { pack: p.slug, asset: /\/asset\/(\d+)/.exec(p.url)[1] });
    assert.equal(V.buyLinks(p, buy).store, `/shop/${p.page}/roblox/`);
    assert.equal(V.buyLinks(p, { packs: { [p.slug]: { clearlyDevUrl: 'javascript:alert(1)' } } }).clearly, null);
});

test('Robux prices: the DevEx value rounded down to a clean number', async () => {
    const { robux } = await import('../shop/app/views.mjs');
    assert.equal(robux(4.99), '1,300');
    assert.equal(robux(9.99), '2,600');
    assert.equal(robux(14.99), '3,945');
    assert.equal(robux(99), '25,000');
});
