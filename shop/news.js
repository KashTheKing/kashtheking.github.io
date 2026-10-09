// "Join Newsletter" form. Renders into every element with class news-slot, but only when shop/buy.json has a
// newsletter_endpoint (empty or missing = nothing shown). Same-origin endpoint ("/newsletter/subscribe", once the site
// is served by the Clanker server): JSON answer shown. Another origin (before the DNS cutover): a simple form POST
// without CORS, so the answer cannot be read and the neutral message is shown instead.
(function () {
    var slots = document.querySelectorAll(".news-slot");
    if (!slots.length) return;
    var NEUTRAL = "Thanks! If that address can be added, we just sent it an email. Click the link in it to confirm.";
    var css = ".news-box{max-width:640px;margin:0 auto;padding:18px;border:1px solid var(--line,#3a3d44);border-radius:14px;background:var(--panel,#26292e);color:var(--text,#fff);text-align:left}" +
        ".news-box h2{font:800 18px/1.2 Montserrat,Inter,sans-serif;margin:0 0 4px}.news-box p{font-size:13px;color:var(--dim,#a9adb6);margin:0}" +
        ".news-row{display:flex;gap:8px;margin-top:12px;flex-wrap:wrap}.news-row input[type=email]{flex:1 1 220px;min-width:0;padding:10px 12px;border-radius:10px;border:1px solid var(--line,#3a3d44);background:#1c1e22;color:inherit;font:inherit;font-size:15px}" +
        ".news-row button{padding:10px 16px;border:0;border-radius:10px;background:var(--gold,#ffb02e);color:#1c1e22;font:700 14px Inter,sans-serif;cursor:pointer}.news-row button:disabled{opacity:.6;cursor:default}" +
        ".news-consent{margin-top:8px!important;font-size:12px!important}.news-consent a{color:var(--gold,#ffb02e)}.news-msg{margin-top:8px!important;color:var(--text,#fff)!important}" +
        ".news-hp{position:absolute!important;left:-9999px!important;width:1px;height:1px;overflow:hidden}.news-slot[data-place=top]{margin:0 0 26px}.news-slot[data-place=footer]{margin:0 0 18px}";
    var base = (document.currentScript && document.currentScript.src) || location.href;
    fetch(new URL("buy.json", base), { cache: "no-cache" }).then(function (r) { return r.ok ? r.json() : {}; }).catch(function () { return {}; }).then(function (cfg) {
        var endpoint = cfg && typeof cfg.newsletter_endpoint === "string" ? cfg.newsletter_endpoint.trim() : "";
        if (!endpoint) return;
        var url = new URL(endpoint, location.href);
        var same = url.origin === location.origin;
        var style = document.createElement("style");
        style.textContent = css;
        document.head.appendChild(style);
        slots.forEach(function (slot, i) {
            var id = "news-email-" + i;
            slot.innerHTML = '<form class="news-box" novalidate><h2>Join Newsletter</h2><p>Get notified about new packs and sales</p>' +
                '<div class="news-row"><label for="' + id + '" class="news-hp" style="position:absolute;left:-9999px">Email address</label>' +
                '<input id="' + id + '" type="email" name="email" required maxlength="254" autocomplete="email" placeholder="you@example.com" aria-label="Email address">' +
                '<span class="news-hp" aria-hidden="true"><label>Website <input type="text" name="website" tabindex="-1" autocomplete="off"></label></span>' +
                '<button type="submit">Subscribe</button></div>' +
                '<p class="news-consent">By subscribing you agree to get emails about new packs and sales. Unsubscribe any time. <a href="/shop/newsletter-privacy.html">Privacy note</a></p>' +
                '<p class="news-msg" role="status" aria-live="polite"></p></form>';
            var form = slot.querySelector("form"), msg = slot.querySelector(".news-msg"), btn = slot.querySelector("button");
            form.addEventListener("submit", function (e) {
                e.preventDefault();
                var email = form.email.value.trim();
                if (!form.email.checkValidity() || !email) { msg.textContent = "Type one valid email address."; return; }
                btn.disabled = true;
                msg.textContent = "Sending...";
                var body = new URLSearchParams({ email: email, website: form.website.value, source: location.pathname.slice(0, 100) });
                var done = function (text) { msg.textContent = text; btn.disabled = false; if (text === NEUTRAL) form.email.value = ""; };
                if (same) {
                    fetch(url, { method: "POST", body: body }).then(function (r) { return r.json().then(function (j) { done(r.ok ? (j.message || NEUTRAL) : (j.error || "That did not work. Try again later.")); }); })
                        .catch(function () { done("That did not work. Try again later."); });
                } else {
                    fetch(url, { method: "POST", body: body, mode: "no-cors" }).then(function () { done(NEUTRAL); }).catch(function () { done("That did not work. Try again later."); });
                }
            });
        });
    });
})();
