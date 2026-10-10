// Editor mode: shows a small bar only when the owner is signed in to the panel (same site, so its cookie is sent).
(async () => {
  const P = 'https://panel.kashtheking.com/legacy';
  try {
    const r = await fetch(`${P}/api/editor`, {credentials: 'include', cache: 'no-store'});
    if (!r.ok || !(await r.json()).owner) return;
  } catch { return; }
  const bar = document.createElement('div');
  bar.setAttribute('style', 'position:fixed;top:12px;right:12px;z-index:99999;display:flex;gap:14px;align-items:center;padding:8px 16px;border-radius:999px;background:#1c1e22;color:#f2f2f2;font:600 13px system-ui;box-shadow:0 6px 24px rgba(0,0,0,.45);border:1px solid #ff9a1f');
  bar.innerHTML = `<b style="color:#ff9a1f">Editor mode</b><a style="color:#fff" href="${P}/shop-stats">Shop stats</a><a style="color:#fff" href="${P}/marketing/creator-store">Creator Store</a><a style="color:#fff" href="${P}/home">Panel</a>`;
  document.body.append(bar);
})();
