# Product

<!-- impeccable:product-schema 1 -->

Product record for kashtheking.com and its shop. Facts come from Kash's own rules (the panel repo's CLAUDE.md and
AGENTS.md, the project's notes) and from this repository. Lines marked *(inferred)* were not confirmed by Kash in words.

## Platform

web

## Users

- Roblox developers, from hobbyists to small studios, building simulators, tycoons, obbies, RPGs, horror games, tower
  defense and shooters. They work in Roblox Studio (dark theme) and buy assets on the Roblox Creator Store.
- They arrive on a pack or style page from Google, YouTube, X or Discord, often on a phone, and browse on desktop
  between Studio sessions. *(inferred from the shop's analytics setup and link previews)*

## Product Purpose

The shop sells Kash's own packs and sends the visitor to buy them. Buying happens off the site: on the Roblox Creator
Store (the pack then sits in the buyer's Toolbox inventory), on ClearlyDev (the Lifetime Pack and some packs), with
Robux in the showcase place when a pack has a Robux product, or by DM on Discord for other payment methods. Success is a
visitor who finds the right pack fast and leaves for the Creator Store with it.

## Positioning

- Every model pack is one Model to insert in Studio; every model inside is textured, rigged and animated, with moving
  parts as separate rigged parts.
- House styles: Stud (the real Roblox studs texture), Voxel and Pixel. Older Cute/Cartoon and Low Poly packs still sell;
  no new ones are made.
- UI packs are full working game screens, never icon sheets, each shipped twice: a static ScreenGui for beginners and a
  Fusion 0.3 version with UI Labs stories.
- Try in Roblox: a showcase place loads any pack by its asset id before you buy.

## Operating Context

- `shop/packs.json` is the product list. The panel (panel.kashtheking.com) edits it on GitHub: name, price,
  description, Creator Store link, count, and new products. It never edits markup.
- `tools/seo.mjs` renders every shop page from that file with `shop/app/views.mjs`; `.github/workflows/seo.yml` runs it
  on every push to main, commits the pages and pings IndexNow. GitHub Pages serves the site; there is no build step.
- `shop/buy.json` holds the showcase place, Robux products, ClearlyDev links, the subscription and the newsletter
  endpoint. `shop/soon.json` lists packs that are not out yet.
- Website views and clicks go to the panel's own tracker (`panel.kashtheking.com/t.js`) and Cloudflare Web Analytics.
  Each pack's `roblox/` and `discord/` pages count the click, then forward.

## Capabilities and Constraints

- Prices, putting a pack on or off sale, and archiving are Kash's approvals in the panel. The site shows the price in
  `packs.json` and never changes it.
- Model packs default to $4.99, UI packs to $9.99. The Robux price is the DevEx value ($0.0038 per Robux) rounded down
  to a clean number; $14.99 stays R$ 3,945. A free pack shows FREE once.
- A UI pack with no Creator Store link yet shows Coming soon and cannot be bought.
- Paid deliveries (Robux packs, the subscription) must always work; any change near them needs tests.
- Never put kashtheking.com in Creator Store listings, the group or the profile (Roblox rule).
- No dependencies, no build step: plain HTML, CSS and ES modules served as files.

## Brand Commitments

- Name KashTheKing; the crown wordmark (`assets/watermark.png`) and crown favicons.
- The thumbnail livery: charcoal ground, an orange diagonal band for model packs, marketing blue #49BAEC for UI packs,
  the black skewed label strip (TEXTURED · RIGGED · ANIMATED, 9 SCREENS · FUSION + STATIC), Montserrat Black lettering,
  the white shine arc.
- Kash's rule for every screen: "Cut taglines, helper text and secondary labels. If a screen needs them to make sense,
  fix the layout."

## Evidence on Hand

- 81 packs with real box art (`shop/img/<Slug>.jpg`, 720×720) and slides (`shop/img/<Slug>/NN.jpg`, 1600×900).
- The Lifetime Pack banner (`shop/img/lifetime.jpg`): every pack, now and in the future, $99 instead of $199.
- Plugin heroes for Infinite Ocean and Flashback; the Blockwork icon.
- No reviews, testimonials, customer counts or sales numbers are published on the site. Do not invent them.

## Product Principles

1. The product art leads. Box art and slides are the proof; chrome stays out of their way.
2. Buying always works: every live pack has a working Creator Store button.
3. Inside the shop, nothing reloads. A link you are about to press is already loaded.
4. The panel edits data, never markup. A new row in `packs.json` becomes a finished page with no hand work.
5. Nothing on the page that the visitor does not need: no taglines, no helper lines, no invented claims.

## Accessibility & Inclusion

WCAG 2.1 AA: text contrast, keyboard paths with visible focus, reduced motion, and phone widths down to 360px.
*(inferred: the standard the shop already aimed at)*
