// "Subscribe Monthly - Use EVERY Pack": the block at the top of the shop and of every pack page (<div id="sub">).
// Settings come from shop/buy.json `subscription: {enabled, price_usd, showcase_place_id}` (made in the Clanker panel,
// My shop > Subscription). Not enabled, missing or unreadable: nothing renders.
(() => {
    const slot = document.getElementById("sub");
    if (!slot) return;
    const get = u => fetch(u).then(r => (r.ok ? r.json() : null)).catch(() => null);
    Promise.all([get("/shop/buy.json"), get("/shop/packs.json")]).then(([buy, packs]) => {
        const s = buy && buy.subscription;
        const price = Number(s && s.price_usd);
        const place = String((s && s.showcase_place_id) || "");
        if (!s || s.enabled !== true || !(price > 0) || !/^\d{1,19}$/.test(place)) return;
        const list = Array.isArray(packs) ? packs.filter(p => typeof p.price === "number") : [];
        const worth = list.reduce((t, p) => t + p.price, 0);
        const usd = n => "$" + n.toFixed(2);
        const url = `https://www.roblox.com/games/start?placeId=${place}&launchData=${encodeURIComponent(JSON.stringify({ sub: "all" }))}`;
        const style = document.createElement("style");
        style.textContent = `
.sub-card { margin: 0 0 28px; padding: 22px; border-radius: 16px; background: #26292e; border: 2px solid #ffb02e; box-shadow: 0 0 0 4px rgba(255,176,46,.12); display: grid; gap: 18px; grid-template-columns: 1fr auto; align-items: center; }
.sub-card h2 { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 26px; margin: 4px 0 6px; color: #fff; }
.sub-tag { display: inline-block; padding: 4px 10px; border-radius: 999px; font-size: 12px; font-weight: 800; letter-spacing: .03em; text-transform: uppercase; color: #1c1e22; background: linear-gradient(180deg, #ffe98a, #ff9a1f); }
.sub-price { font-family: 'Montserrat', sans-serif; font-weight: 900; font-size: 34px; color: #ffb02e; }
.sub-price small { font-size: 16px; color: #a9adb6; }
.sub-save { margin: 4px 0 10px; color: #ffe98a; font-weight: 700; }
.sub-list { margin: 0; padding-left: 18px; color: #d6d9df; font-size: 14px; line-height: 1.7; }
.sub-go { display: block; text-align: center; padding: 16px 26px; border-radius: 12px; font-weight: 800; font-size: 17px; text-decoration: none; background: #ffb02e; color: #1c1e22; white-space: nowrap; }
.sub-go:hover { background: #ffe98a; }
@media (max-width: 700px) { .sub-card { grid-template-columns: 1fr; padding: 18px; } .sub-card h2 { font-size: 22px; } .sub-go { white-space: normal; } }`;
        document.head.appendChild(style);
        slot.innerHTML = `<section class="sub-card" aria-labelledby="sub-title">
    <div>
        <span class="sub-tag">Best deal</span>
        <h2 id="sub-title">Subscribe Monthly - Use EVERY Pack</h2>
        <div class="sub-price">${usd(price)} <small>/ month</small></div>
        ${list.length && worth > price ? `<p class="sub-save">${list.length} packs worth ${usd(worth)} if bought one by one; subscribe for ${usd(price)}/mo.</p>` : ""}
        <ul class="sub-list">
            <li>Every pack in the shop</li>
            <li>New packs included as they come out</li>
            <li>Creator Store access to use them in Roblox Studio (not Blender or source files)</li>
            <li>Cancel anytime in Roblox</li>
        </ul>
    </div>
    <a class="sub-go" href="${url}" rel="noopener">Subscribe in Roblox</a>
</section>`;
    });
})();
