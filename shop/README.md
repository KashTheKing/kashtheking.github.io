# The shop

Every page under `/shop/` is made from data. Change the data, push to `main`, and `.github/workflows/seo.yml` runs
`node tools/seo.mjs`, which writes the pages again and commits them. Nothing under `/shop/` is edited by hand except the
files named here.

## Data (what the panel edits)

| File | What it holds |
| --- | --- |
| `packs.json` | Every product, newest first: `slug`, `page`, `name`, `kind` (`"ui"` for UI packs), `count`, `price`, `url` (Creator Store), `image`, `slides`, `description`, `tags`, optional `video` and `poster`. A row with no `page` gets one from its name on the next build. |
| `buy.json` | The showcase place, Robux products and ClearlyDev links per pack, the subscription, the newsletter endpoint. |
| `soon.json` | Packs that are not out yet; they show locked. |

Prices come only from `packs.json`. Model packs need a `url` to show; a UI pack without one shows Coming soon.

## Code

| File | What it does |
| --- | --- |
| `app/views.mjs` | Every page's markup as pure functions of the data. Collections (`COLLECTIONS`), plugins, titles, descriptions and Product data live here. |
| `app/shop.css` | The whole look. Tokens on `:root`; see `/DESIGN.md`. |
| `app/app.mjs` | In the browser: shop links render the next page with `views.mjs` and swap it in, so nothing reloads. Hovering, focusing or touching a link loads that page's data and first images. Cards scrub through slides on hover; the art morphs into the pack page. |
| `../tools/seo.mjs` | Writes `index.html` for the shop, every catalog, every pack (plus its `roblox/` and `discord/` click-through pages), `pack/` (old links) and `sitemap.xml`. CSS and JS get a version from their contents. |
| `sub.js`, `news.js`, `editor.js` | The subscription block, the newsletter form and the owner's editor bar. Unchanged by the router. |

To add a collection, add a row to `COLLECTIONS` in `app/views.mjs`; it gets a page once two packs match. To change any
page, change `views.mjs` or `shop.css`, then run:

```bash
node tools/seo.mjs          # writes the pages
node --test test/*.test.mjs # the static pages, the router's view of them, buy links, sub.js
```

A pull request fails its check when the committed pages are not what the build makes.
