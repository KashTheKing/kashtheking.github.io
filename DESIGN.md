---
name: KashTheKing Shop
description: The look of the kashtheking.com shop, where Roblox developers browse Kash's model packs, UI packs and plugins and leave for the Creator Store to buy them.
colors:
  orange: "#FF9A1F"
  orange-base: "#B86400"
  blue: "#49BAEC"
  blue-base: "#1F7FAD"
  dark-ink: "#121316"
  strip: "#0B0C0E"
  sunk: "#121316"
  ground: "#1A1C20"
  raised: "#22252B"
  raised-2: "#2B2F36"
  ink: "#F2F3F5"
  ink-2: "#D3D6DC"
  dim: "#A3A8B2"
  hair: "rgba(255, 255, 255, .08)"
  line: "rgba(255, 255, 255, .12)"
typography:
  display:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "clamp(48px, min(7.4vw, calc(var(--h) * .2)), 116px)"
    fontWeight: 900
    lineHeight: 0.9
    letterSpacing: "-.035em"
  headline:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "clamp(44px, 6.4vw, 92px)"
    fontWeight: 900
    lineHeight: 0.92
    letterSpacing: "-.035em"
  pack-name:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "clamp(30px, 3vw, 42px)"
    fontWeight: 900
    lineHeight: 1.02
    letterSpacing: "-.025em"
  title:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "clamp(24px, 2.4vw, 32px)"
    fontWeight: 900
    lineHeight: 1.08
    letterSpacing: "-.01em"
  card-name:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 800
    lineHeight: 1.3
    letterSpacing: "0"
  body:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 500
    lineHeight: 1.55
  meta:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "13px"
    fontWeight: 600
  label:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "12px"
    fontWeight: 800
    lineHeight: 1.4
    letterSpacing: ".07em"
  button:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "15px"
    fontWeight: 800
    lineHeight: 1.2
  nav:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "15px"
    fontWeight: 700
  chip:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "14px"
    fontWeight: 700
  price:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "16px"
    fontWeight: 900
    lineHeight: 1.2
    fontFeature: '"tnum"'
  price-hero:
    fontFamily: 'Montserrat, system-ui, -apple-system, "Segoe UI", sans-serif'
    fontSize: "clamp(30px, 3vw, 40px)"
    fontWeight: 900
    lineHeight: 1.2
    fontFeature: '"tnum"'
rounded:
  r: "6px"
spacing:
  wrap: "1320px"
  top-h: "64px"
components:
  button-primary:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    padding: "10px 18px"
    height: "44px"
  button-primary-hover:
    backgroundColor: "color-mix(in srgb, #FF9A1F 88%, #fff)"
  button-primary-ui:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    padding: "10px 18px"
    height: "44px"
  button-primary-ui-hover:
    backgroundColor: "color-mix(in srgb, #49BAEC 88%, #fff)"
  button-neutral:
    backgroundColor: "{colors.raised-2}"
    textColor: "{colors.ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    padding: "10px 18px"
    height: "44px"
  button-neutral-hover:
    backgroundColor: "#343941"
  button-robux:
    backgroundColor: "{colors.ink}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.button}"
    rounded: "{rounded.r}"
    padding: "10px 18px"
    height: "44px"
  button-robux-hover:
    backgroundColor: "#fff"
  button-big:
    padding: "10px 22px"
    height: "54px"
  header-lifetime:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.r}"
    padding: "0 14px"
    height: "40px"
  nav-link:
    textColor: "{colors.dim}"
    typography: "{typography.nav}"
    rounded: "{rounded.r}"
    padding: "8px 12px"
  nav-link-hover:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
  nav-link-current:
    textColor: "{colors.ink}"
  search-input:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "0 40px 0 40px"
    height: "42px"
  search-input-hover:
    backgroundColor: "{colors.raised-2}"
  search-list:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.r}"
    padding: "6px"
  chip:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.r}"
    padding: "0 14px"
    height: "38px"
  chip-hover:
    backgroundColor: "{colors.raised-2}"
  chip-selected:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark-ink}"
  chip-selected-ui:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark-ink}"
  collection-link:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    typography: "{typography.chip}"
    rounded: "{rounded.r}"
    padding: "0 14px"
    height: "38px"
  sort-select:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "0 36px 0 12px"
    height: "38px"
  door-models:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.display}"
  door-ui:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.display}"
  page-head-models:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.headline}"
    padding: "28px 0 44px"
  page-head-ui:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark-ink}"
    typography: "{typography.headline}"
    padding: "28px 0 44px"
  lifetime-strip:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
  lifetime-strip-hover:
    backgroundColor: "{colors.raised-2}"
  card-art:
    backgroundColor: "{colors.raised}"
    rounded: "{rounded.r}"
  card-name:
    textColor: "{colors.ink}"
    typography: "{typography.card-name}"
  card-meta:
    textColor: "{colors.dim}"
    typography: "{typography.meta}"
  card-placeholder:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark-ink}"
    padding: "16px"
  card-placeholder-ui:
    backgroundColor: "{colors.blue}"
    textColor: "{colors.dark-ink}"
    padding: "16px"
  label-strip:
    backgroundColor: "{colors.strip}"
    textColor: "{colors.ink}"
    typography: "{typography.label}"
    padding: "7px 18px"
  shelf-button:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    size: "40px"
  gallery-stage:
    backgroundColor: "{colors.sunk}"
    rounded: "{rounded.r}"
  gallery-nav:
    backgroundColor: "rgba(18, 19, 22, .72)"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    size: "48px"
  buybar:
    backgroundColor: "rgba(34, 37, 43, .96)"
    textColor: "{colors.ink}"
    padding: "10px 16px calc(10px + env(safe-area-inset-bottom))"
  footer:
    backgroundColor: "{colors.sunk}"
    textColor: "{colors.dim}"
    padding: "48px 0 calc(32px + env(safe-area-inset-bottom))"
  newsletter-box:
    backgroundColor: "{colors.raised}"
    textColor: "{colors.ink}"
    rounded: "{rounded.r}"
    padding: "18px"
  newsletter-button:
    backgroundColor: "{colors.orange}"
    textColor: "{colors.dark-ink}"
    rounded: "{rounded.r}"
    padding: "10px 16px"
---

# Design System: KashTheKing Shop

## Overview

**Creative North Star: "The Box-Art Wall"**

The shop is Kash's thumbnail livery turned into a store. The box art he makes for every pack already carries the brand: a charcoal ground, an orange diagonal band for model packs, marketing blue for UI packs, a black skewed label strip and Montserrat Black lettering. The interface is built from the same few materials so that it never competes with the art. Box art is shown at full size with nothing around it, and the chrome is flat charcoal with one accent colour at a time.

The site is dark because its visitors work in Roblox Studio's dark theme. Density is that of a real storefront: four box arts across on a desktop, two on a phone, separated by generous gaps instead of borders. The home page is split by one diagonal into two departments, the orange Model packs door and the blue UI packs door, and the department's colour follows the visitor into its catalog and pack pages. Words are few and short. Weight and size carry the hierarchy, not extra lines of text.

Motion is quick and has a job. Moving between shop pages never reloads the page; the clicked card's art morphs into the pack gallery, and a pointer that rests on a card scrubs through the pack's slides. Everything that moves stops under reduced motion. The direction for this shop refused a gradient headline over equal tile cards on grid paper.

**Key Characteristics:**
- A baseplate charcoal ground (#1A1C20) with flat tonal steps above and below it, and no grid lines.
- One accent per department: livery orange for model packs and marketing blue (#49BAEC) for UI packs, always with dark ink on top.
- Montserrat only: 900 for names, 800 for card names and buttons.
- Product cards with no container: the 1:1 box art is the card.
- One 6px corner on every surface.
- Buttons whose face sits on a 2px darker base and sinks onto it when pressed.
- Hard diagonals (the stage seam, the page-head edge, the label strip, skewed marks) instead of soft gradients.

## Colors

A ladder of five near-neutral charcoals carries every surface, and one saturated livery colour per department carries every action, selection and focus.

### Primary
- **Livery Orange** (`--orange`, #FF9A1F): The model-packs accent and the default value of `--accent`. It fills the Model packs door and the Model packs page head, primary buttons, the selected filter chip, focus outlines, the current-page underline in the header, the hover ring on art, the label-strip separators and the spec bullets. Shop-wide pieces stay orange on every page: the Lifetime Pack strip and its button, the header Lifetime Pack button, the newsletter Subscribe button and the plugin icon livery.
- **Burnt Orange Base** (`--orange-base`, #B86400): The 2px base under orange buttons, reached through `--accent-base` on model-pack pages. It is never a fill or a text colour.

### Secondary
- **Marketing Blue** (`--blue`, #49BAEC): The UI-packs accent. Inside `[data-dept="ui"]` it becomes `--accent`, so it fills the UI packs door, the UI packs page head, UI card rings and focus, and the primary button on UI pack pages. It is Kash's marketing blue; no other blue appears in the shop.
- **Deep Blue Base** (`--blue-base`, #1F7FAD): The 2px base under blue buttons, reached through `--accent-base` inside `[data-dept="ui"]`.

### Neutral
- **Strip Black** (`--strip`, #0B0C0E): The fill of the label strip on pack pages, and nothing else. It is the darkest step.
- **Sunken Charcoal** (`--sunk`, #121316): The footer band, the gallery stage and its thumbnails, the backdrop behind a scrubbed slide, the fan cards while they load, and the `/` key hint in the search box.
- **Baseplate Charcoal** (`--ground`, #1A1C20): The page itself, the browser `theme-color`, the seam between the two doors, and the gap colour inside every focus and hover ring on art.
- **Raised Charcoal** (`--raised`, #22252B): Controls and rows that sit on the ground: the search box, filter chips, the sort select, collection links, shelf arrows, the Lifetime strip, the search dropdown, empty image slots, nav-link hover and the newsletter box.
- **Lifted Charcoal** (`--raised-2`, #2B2F36): The face of a neutral button and the hover state of every raised surface.
- **Studio White** (`--ink`, #F2F3F5): Headings, names, prices and primary text on charcoal, and the face of the Robux button.
- **Soft Ink** (`--ink-2`, #D3D6DC): Longer text that should sit back a little: the About paragraphs, the spec list in the buy box, the "All N results" row, and a hero price that reads Coming soon.
- **Muted Slate** (`--dim`, #A3A8B2): Secondary text that has to stay: the card meta line, chip counts, idle nav links, footer links, the Robux figure next to a price, search placeholders and the empty-state line. It holds 7.15:1 on the ground and 5.63:1 on raised-2.
- **Dark Ink** (`--dark-ink`, #121316): Text and icons on orange, on blue and on the Robux button, the text selection colour and the skip link text. It has the same value as `--sunk` but a different job, so the two names stay separate.
- **Hairline** (`--hair`, rgba(255, 255, 255, .08)): One-pixel lines under the header, above the phone buy bar, above How buying works and the spec list, and around the search dropdown.
- **Legacy Line** (`--line`, rgba(255, 255, 255, .12)): Kept for `shop/news.js`, which draws the newsletter email border with it. New shop CSS uses `--hair`.

### Department Accent
Components never name orange or blue when they mean the action colour; they ask for `--accent` and `--accent-base`. `:root` sets them to `--orange` and `--orange-base`. `[data-dept="ui"]` sets them to `--blue` and `--blue-base`, and it can sit on `<html>` (the router sets it per page), on a section, a card, a search result, a nav link or a door. The Model packs nav link pins `--accent` back to orange so it stays orange on a UI page.

### Legacy Aliases
Four more names on `:root` exist for older shared scripts: `--panel` (an alias of `--raised`), `--text` (an alias of `--ink`), `--gold` (an alias of `--orange`) and `--line` (its own value, above). `shop/news.js` reads them, each with a fallback from the old palette. The stylesheet comment also names `shop/sub.js`, but that script reads no tokens at all.

A few colours in `shop.css` are literals, not tokens: #15171A (the base under a neutral button), #343941 (a neutral button's hover face), #8E939C (the base under the Robux button), #202227 (the plugin icon livery ground), #3A3F48 (the scrollbar thumb), #fff and #000, and translucent copies of the ground, raised and sunk values for glass and overlay controls.

### Named Rules
**The Two Doors Rule.** Orange means model packs and blue means UI packs. A component takes its colour through `--accent`, so `data-dept="ui"` is the only switch. Only shop-wide pieces (the Lifetime Pack, the newsletter button, the plugin livery) name orange directly.

**The Dark Ink Rule.** Text and icons on an orange or blue field are always Dark Ink (#121316), which holds 8.75:1 on orange and 8.42:1 on blue. White on orange is 2.12:1 and is never used.

**The One Step Up Rule.** Hover moves a charcoal surface one step up the ladder: raised becomes raised-2, and a neutral button face becomes #343941. An accent surface on hover mixes 12% white into the accent instead.

## Typography

**Display Font:** Montserrat (with system-ui, -apple-system, "Segoe UI", sans-serif)
**Body Font:** Montserrat (same stack)
**Label/Mono Font:** none; labels and key hints are Montserrat too.

Montserrat is self-hosted as one variable file (`/kit/fonts/montserrat.woff2`, weights 100 to 900, `font-display: swap`) and preloaded on every shop page.

**Character:** One geometric sans in heavy weights, the same Montserrat Black that letters the box art, so the page and the product read as one voice. The big names are set tight, with negative tracking and line heights under 1.

### Hierarchy
- **Display** (900, clamp(48px, min(7.4vw, calc(var(--h) * .2)), 116px), line-height .9, -.035em): The department names on the stage doors, two words on two lines, in dark ink. At 720px and below it is clamp(42px, 12.5vw, 64px).
- **Headline** (900, clamp(44px, 6.4vw, 92px), .92, -.035em): The page name in a catalog head: Model packs, UI packs, a collection, All packs, Plugins.
- **Pack name** (900, clamp(30px, 3vw, 42px), 1.02, -.025em): The pack's name at the top of the buy box.
- **Title** (900, clamp(24px, 2.4vw, 32px), 1.08, -.01em): Section headings on the home and pack pages, fixed at 24px at 720px and below. Smaller headings keep the weight at fixed sizes: the Lifetime Pack name at clamp(22px, 2vw, 28px) (22px in the compact strip), About this pack and How buying works at 22px, and the Collections links heading at 20px.
- **Card name** (800, 16px, 1.3, 0): Product card names and collection tile names. Card names drop to 15px at 720px and below. Plugin names use the same weight at 18px.
- **Body** (500, 16px, 1.55): The default for all text. About this pack sets its paragraphs at line-height 1.7 in soft ink with a 72ch measure; How buying works sets its answers at 14px and 1.6 in muted slate.
- **Meta** (600, 13px): The card meta line ("100 models · Voxel"), tile pack counts, and the Robux figure next to a price.
- **Label** (800, 12px, 1.4, .07em, uppercase): The label strip on a pack page.
- **Button** (800, 15px, 1.2): Button text. Big buttons use 16px.
- **Nav** (700, 15px): Header links, 14px at 860px and below. The "All model packs" style links beside section headings use the same weight and size.
- **Chip** (700, 14px): Filter chips and collection links. Their count sits after the name at 700 and 12px in muted slate.
- **Price** (900, 16px, 1.2, tabular numerals): Card prices. The big price in the Lifetime strip is 28px and the hero price in the buy box is clamp(30px, 3vw, 40px). The Robux figure after a price is 600 at 13px (14px big, 16px hero) in muted slate, and a struck former price is 600 at 14px.

Headings default to 900, line-height 1.08, -.01em and `text-wrap: balance`; paragraphs use `text-wrap: pretty`. Prices and every count (door counts, tile counts, chip counts, the gallery counter, catalog counts, collection link counts) use `font-variant-numeric: tabular-nums`.

### Named Rules
**The One Family Rule.** Montserrat is the only typeface. Weight carries the hierarchy: 900 for names and prices, 800 for card names, buttons and labels, 700 for navigation, chips and counts, 600 for meta, 500 for body text.

**The Say It Once Rule.** A card or a row says each thing once: the name, one meta line, the price. Kash's rule for every screen applies: "Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout."

## Layout

Content sits in one column, `min(100% - 32px, var(--wrap))`: at most 1320px wide with a 16px gutter on each side at every width. The stage, the catalog page heads, the tools bar, the phone buy bar and the footer run the full width of the window, and their content lines up with the same 1320px column; door text uses `max(16px, calc((100% - var(--wrap)) / 2))` for that. The header is 64px tall (`--top-h`) and sticks to the top.

The home page runs, top to bottom: the stage, the Lifetime strip, New model packs (8 cards), UI packs (4 cards), the Collections shelf and Plugins (3 cards). The stage is `clamp(420px, min(calc(100svh - var(--top-h) - 360px), 52vw), 600px)` tall, so the Lifetime strip and the top of the first shelf show in the first screen. Its diagonal leans `--d` (7vw) either side of the centre line, with a `--seam` of 5px cut from each door so a 10px charcoal gap divides them.

Product grids have four columns with a 32px row gap and a 22px column gap. Home grids show at most 8 cards; catalog grids show every pack, lazy-loading images after the first eight. A catalog page is the page head, a sticky tools bar, the compact Lifetime strip (Model packs only), the grid 28px below, the empty state and the collection links at the bottom. A pack page is breadcrumbs, then two columns (`minmax(0, 1fr)` and `minmax(320px, 400px)`, gap `clamp(28px, 3.4vw, 48px)`) for the gallery and the buy box, then About this pack, More like this, How buying works and the collection links.

The stylesheet has no spacing tokens. The rhythm comes from recurring literal values: 8px between chips and small controls, 12px inside the tools bar and between buy buttons, 16px gutters, 22px column gaps, 32px row gaps and footer columns, `clamp(48px, 6vw, 80px)` between home sections, and `clamp(64px, 8vw, 112px)` above the footer. Component-scoped custom properties carry the few values that change by width: `--d`, `--seam`, `--h` and `--skew` on the stage, and `--cols` and `--gap` on the shelf.

### Breakpoints
All breakpoints are `max-width` queries.

| Width | What changes |
| --- | --- |
| 1180px | The shelf shows 4 tiles instead of 6. Grids drop to 3 columns and home grids show 6 cards. The Lifetime strip image narrows to 200px and the price stacks over the button. The header gap tightens from 28px to 18px. |
| 1000px | The pack page becomes one column, the buy box stops sticking (its buttons are at most 480px wide) and the phone buy bar turns on. The Library link leaves the header. |
| 860px | The header stops sticking (`--top-h` becomes 0px) and becomes two rows: brand and search, then the nav and the Lifetime Pack button. The nav scrolls sideways under a fade mask and shows Library again. The tools bar sticks at the very top; the chips and the sort select (152px) share one row, and the chips stay on one line and scroll sideways under a 56px fade on the right. The Lifetime strip runs its image edge to edge across the top at 3:1; the compact strip drops its image. The home page shows 2 plugins and the footer has 2 columns. |
| 720px | The doors stack: each is 330px tall, the edge between them slants 40px (`--skew`) with an 8px gap, and each fan sits under its name. Grids are 2 columns with 26px and 14px gaps, and home grids show 4 cards. The shelf shows 2.4 tiles so the next one peeks, with a 14px gap and no arrows. The gallery runs to the screen edges with square corners. How buying works is one column. |
| 560px | The header becomes three rows: the brand with the Lifetime Pack button at the right, then the search box, then the nav with all four links, no fade mask and 8px link padding. |
| 460px | The Lifetime strip is one column with a full-width button. Plugins are one column and all three show on the home page. The brand is 22px tall. |

On touch screens (`hover: none`) the gallery arrows and counter are always visible, the arrows shrink to 40px and the zoom controls are hidden.

## Elevation & Depth

The system is flat and layered by tone. Depth is a ladder of five charcoals: strip, sunk, ground, raised and raised-2, from darkest to lightest. A surface that sits on another is one step lighter, and the footer and gallery sit one step below the page. Shadows that lift something appear in only three places: the 2px base under buttons, the search dropdown, and the box arts fanned on the stage. The other box-shadows are rings and hairlines, and two small drop shadows keep icons readable over images. The three bars that float over content (the header, the catalog tools bar and the phone buy bar) are translucent glass with `backdrop-filter: blur(14px)`: the header is the ground at 90% (rgba(26, 28, 32, .9)), the tools bar the ground at 92%, and the buy bar the raised charcoal at 96% (rgba(34, 37, 43, .96)). Overlay controls on the gallery use the sunk charcoal at 72% to 92%.

### Shadow Vocabulary
- **Button base** (`box-shadow: 0 2px 0 var(--base)`): Under every button, the header Lifetime Pack button and the newsletter Subscribe button. Pressed, it becomes `0 0 0 var(--base)` while the face moves down 2px.
- **Art ring** (`box-shadow: 0 0 0 3px var(--ground), 0 0 0 5px var(--accent)`): Hover and keyboard focus on product card art, the front card of a collection tile and plugin art. At rest both rings are `0 0 0 0` so the ring can grow in.
- **Thumbnail ring** (`box-shadow: 0 0 0 2px var(--ground), 0 0 0 4px var(--accent)`): The current gallery thumbnail.
- **Inset accent** (`box-shadow: inset 0 0 0 2px var(--accent)`): The collection link for the current page, and the gallery strip when it has keyboard focus.
- **Hairline** (`box-shadow: 0 1px 0 var(--hair)`): Under the header; `0 -1px 0 var(--hair)` above the phone buy bar.
- **Dropdown** (`box-shadow: 0 18px 48px rgba(0, 0, 0, .5), 0 0 0 1px var(--hair)`): The search suggestions list.
- **Fan card** (`box-shadow: 0 18px 40px rgba(0, 0, 0, .35)`): Each box art fanned on a door.
- **Icon lift** (`filter: drop-shadow(0 10px 18px rgba(0, 0, 0, .45))`): A plugin icon on its livery.
- **Legibility** (`box-shadow: 0 1px 3px rgba(0, 0, 0, .5)` on scrub dots, `filter: drop-shadow(0 1px 3px rgba(0, 0, 0, .7))` on the play icon): Keeps small white marks readable over any image.

### Named Rules
**The Flat Ladder Rule.** Resting surfaces are flat. A shadow belongs only to something that floats over content (the dropdown, the fanned art) or that is pressed (the button base).

**The Ground Gap Rule.** A ring around art is the accent separated from the art by a band of ground colour, never an accent border touching the image.

## Shapes

One corner radius, `--r` (6px), is on every surface, control and image: buttons, the search box, chips, the sort select, card art, collection tiles, plugin art, the Lifetime strip, the search dropdown, the gallery stage and its overlay controls, the shelf arrows, the newsletter box and its controls, and the skip link. Small pieces use 4px: search result rows and their thumbnails, gallery thumbnails, the `/` key hint and the brand link's focus box. Scrub dots use 2px, the lock badge on a locked card is a circle, and on phones the gallery runs to the screen edge with square corners.

The livery's diagonal band appears as hard edges. The stage is cut into two doors by clip-path polygons. A department page head has its bottom edge cut on a 26px rise from left to right, and on phones the stacked doors meet on a 40px slant. The label strip is a parallelogram with an 8px slant at each end. Small marks are skewed by -24deg: the 4px underline under the current header link and the 10px by 6px bullets in the spec list. The plugin icon livery draws two hard orange bands at 152deg, one in the top-left corner to 15% and one in the bottom-right from 84%, on #202227.

Images keep fixed shapes: box art, cards, tiles and fan cards are 1:1; gallery slides, gallery thumbnails and plugin art are 16:9; the Lifetime image is 2:1, and 3:1 at 860px and below.

**The Six Pixel Rule.** Every surface uses the 6px radius. The smaller 4px radius is only for small pieces such as search rows and gallery thumbnails, and there are no pills.

**The Hard Diagonal Rule.** Diagonals are cut with clip-path, skew or hard-stop gradients, never blended. The only soft gradients in the shop are fade masks at the edge of a sideways-scrolling row.

## Components

### Buttons
A button is a key that sinks: a face lifted 2px over a darker base.
- **Shape:** The 6px radius, a minimum height of 44px, 10px by 18px padding, Button type, a 10px gap and 18px icons.
- **Mechanism:** Each button sets three local variables: `--face`, `--base` and `--fg`. The face is lifted with `translate: 0 -2px` (a 2px top margin keeps its box in place) over a `0 2px 0 var(--base)` shadow. On `:active` the face moves down 2px and the shadow goes to zero, so the face lands where the base was. The press takes 90ms and colour changes take `--fast`, both on `--ease`.
- **Primary:** Face `--accent`, base `--accent-base`, text Dark Ink. On hover the face mixes in 12% white (`color-mix(in srgb, var(--accent) 88%, #fff)`). Used for Purchase on Creator Store (Get it on Creator Store for a free pack), the phone bar's Purchase, and Get it on ClearlyDev in the Lifetime strip, which is always orange.
- **Robux:** Face Studio White, base #8E939C, text Dark Ink, and pure white on hover. Used only for Purchase with Robux, which shows the Robux price in the label.
- **Neutral:** Face Lifted Charcoal (#2B2F36), base #15171A, Studio White text, #343941 on hover. Used for Try in Roblox (with a play icon), Purchase on Clearly Dev, Clear search and Search all packs. In code this is `.btn--ghost`, which keeps the default face.
- **Big:** A 54px minimum height, 16px text and 22px side padding. The buy box's main buttons are big and fill the width of the box.
- **Header Lifetime Pack:** Its own rule, not `.btn`: an orange face 40px tall with 14px side padding, 800 at 14px, lifted 1px over a 2px Burnt Orange base, with the same press. At 860px and below it is 34px tall at 13px.
- **Text link:** "Other ways to pay" under the buy buttons is a centred, underlined link in muted slate, 600 at 14px, that turns Studio White on hover.
- **Focus:** Every control shows a 2px accent outline at a 3px offset on `:focus-visible`. In forced-colours mode buttons, chips and the header Lifetime Pack button gain a 1px `ButtonText` border.

### Chips
- **Style:** Raised Charcoal, 38px tall, 14px side padding, the 6px radius, Chip type in Studio White, with the count after the name in muted slate at 12px.
- **State:** Hover lifts to raised-2. The selected chip (`aria-pressed="true"`) is filled with the accent and set in Dark Ink, with its count at 72% opacity.
- **Filters:** The Model packs page filters by look: All, Stud, Voxel, Cute/Cartoon and Low Poly, each with its count. Other catalogs filter by tag, and show a chip row only when at least two tags each match two or more packs but not all of them. A catalog with no useful filters shows no chips.
- **Narrow screens:** At 860px and below the chips stay on one line beside the sort select and scroll sideways under a fade on the right.
- **Collection links:** The Collections list at the bottom of catalog and pack pages uses the chip shape as links, with the pack count after each name. The current collection carries the inset accent ring.

### Cards / Containers
The product card has no container. The box art is the card.
- **Corner Style:** The 6px radius on the art only.
- **Background:** None around the card. The art box shows Raised Charcoal only while the image loads.
- **Shadow Strategy:** None at rest. Hover and keyboard focus draw the art ring (see Elevation & Depth); the card does not lift or scale.
- **Border:** None.
- **Internal Padding:** None. The art fills the card's width at 1:1 with `object-fit: cover`; 12px below it come the name (Card name), the meta line (count and look, in Meta type, muted slate) and the price, 4px apart. The whole card is one link, and UI pack cards carry `data-dept="ui"` so their ring is blue.
- **Hover scrub:** With a mouse, once the pointer has rested on a card for 140ms, the art shows the pack's slides. The pointer's position across the art picks the slide, so moving left to right steps through them. Each slide is decoded before it shows, sits over the box art on Sunken Charcoal with `object-fit: contain`, and crossfades in over 120ms. A row of dots near the bottom (3px tall, 4px apart, white at 40% with the current one solid white) shows the position. Leaving the card returns it to the box art. Packs with fewer than two slides do not scrub. Opening a scrubbed card starts its gallery on the slide the card showed.
- **Locked card:** A pack from `soon.json` shows its art at 45% opacity with a 60% grayscale, a 36px lock icon in a dark circle, and "Coming soon" or its release date where the price would be. It is not a link.
- **Placeholder art:** A pack with no image shows an accent field with its count in 900 at `clamp(32px, 5vw, 56px)` and its name in 800 at 14px, in Dark Ink.

### Inputs / Fields
- **Search box:** Raised Charcoal, 42px tall (40px at 860px and below), a 1px transparent border, the 6px radius, 500 at 15px, an 18px search icon in muted slate on the left and a `/` key hint on the right (Sunken Charcoal, muted slate, 700 at 12px, 4px radius). The key hint hides on focus, once something is typed, and at 860px and below. On desktop the box is at most 440px wide and pushed to the right of the nav.
- **Search focus:** Hover lifts the box to raised-2; focus turns the border to the accent and keeps the raised fill.
- **Search scope:** There is one search box, in the header. On a catalog page it filters that catalog in place: its placeholder names the catalog (Search model packs, Search UI packs, Search halloween asset packs), the grid redraws 120ms after typing stops, and the address updates to `?q=&f=&sort=` after 400ms without adding a history entry. Everywhere else it suggests packs as you type.
- **Suggestions:** A list 8px under the box on Raised Charcoal with the 6px radius, 6px padding and the dropdown shadow, at most `min(70vh, 560px)` tall. It shows up to six rows (a 48px thumbnail, the name at 700 and 15px, the meta line at 13px, the price at 14px) and an "All N results" row when there are more. The highlighted row is raised-2. Arrow keys move through the rows, Enter opens one, Escape closes the list, and `/` focuses the box from anywhere on the page. With no match the list shows one line in muted slate. Enter with no row highlighted opens the search page for the query.
- **Sort select:** Raised Charcoal, 38px tall, a 1px transparent border, the 6px radius, 600 at 14px, with a 16px chevron in muted slate drawn as an inline SVG on the right. Focus turns the border to the accent. The choices are Newest, Lowest price, Highest price and Most models.
- **Error / Disabled:** The shop has no error states on its own fields. A shelf arrow at the end of its row is `aria-disabled` at 35% opacity, and a gallery arrow at the end of the slides is disabled and hidden.

### Navigation
- **Header bar:** Sticky, 64px tall, ground glass with a hairline underneath. In order: the crown wordmark (30px tall, 26px at 860px and below, 22px at 460px and below), the nav, the search box and the Lifetime Pack button, 28px apart.
- **Header links:** Model packs, UI packs, Plugins and Library, in muted slate with Nav type, 8px by 12px padding and the 6px radius. Hover turns the text Studio White on Raised Charcoal. The current section's link is Studio White with a 4px accent bar skewed by -24deg under it, which grows from the left over `--slow`. The UI packs link carries `data-dept="ui"`, so its bar and focus outline are blue.
- **Mobile:** At 860px and below the nav becomes a second header row that scrolls sideways under a fade mask, with the underline flush to the bottom of each link. The Library link is hidden between 861px and 1000px only. At 560px and below the header has three rows (the brand and the Lifetime Pack button, the search box, the nav) and the nav shows all four links without a mask.
- **Breadcrumbs:** 600 at 14px with "/" separators at 55% opacity. Links sit at 80% opacity and underline on hover; the current page is 700 at full strength. On an orange or blue page head they take Dark Ink; elsewhere they are muted slate with the current page in Studio White.
- **Section links:** "All model packs", "All UI packs" and "All plugins" sit opposite a section heading in muted slate with an 18px arrow. Hover turns them Studio White and slides the arrow 4px to the right.
- **Skip link:** A Studio White tab with Dark Ink text at 800 that appears at the top left on keyboard focus.

### Stage Doors and Fan
The home page's first screen: two departments split by one diagonal.
- **Doors:** Each door is one link that covers the whole stage and is clipped to its half: Model packs in orange on the left, UI packs in blue on the right, with the ground showing through the seam. The text sits `clamp(28px, 5vh, 56px)` from the top, lined up with the content column: the Model packs text on its left edge, the UI packs text right-aligned on its right edge.
- **Text:** The department name in Display type on two lines, then a count line ("69 packs · 8,855 models") at 700 and `clamp(14px, 1.3vw, 17px)` with a 22px arrow, all in Dark Ink, 14px apart.
- **Fan:** The department's three newest box arts, square, `clamp(160px, min(20vw, calc(var(--h) * .46)), 300px)` wide, standing on the bottom edge and partly cut off by it. The front card is lifted 6%; the side cards are rotated 12deg to each side and pushed 44% out, turning around a point below the cards. On hover or focus the front card rises to 12%, the side cards open to 16deg and 58%, and the arrow moves 6px right, all over `--slow` on `--ease`. Keyboard focus also underlines the name with a 6px line at an 8px offset.
- **Phones:** At 720px and below the doors stack, each 330px tall, joined on a 40px slant with an 8px gap. The fan moves under the name, `clamp(120px, 38vw, 176px)` wide.

### Lifetime Strip
One row that sells the Lifetime Pack.
- **Shape:** A Raised Charcoal row with the 6px radius and its image cut flush at the left. The whole row is one link to ClearlyDev that opens in a new tab.
- **Content:** The 2:1 banner image (220px wide), the name in 900 at `clamp(22px, 2vw, 28px)` with one line under it in muted slate at 15px, the big price (the struck former price, the price and the Robux figure, right-aligned), and a primary button with an external-link icon. Columns are 28px apart.
- **Colour:** Always orange, on every department's pages.
- **Hover:** The row lifts to raised-2 and its button takes the hover tint.
- **Compact form:** On the Model packs catalog the strip sits between the tools bar and the grid with a 180px image and a 22px name. At 860px and below the full strip runs its image edge to edge across the top at 3:1, and the compact strip drops its image.
- **Placement:** On the home page it sits 32px under the stage, with 44px before the next section.

### Collection Shelf
- **Shelf:** A single row that scrolls sideways with scroll snap and a hidden scrollbar: 6 tiles across, 4 at 1180px and below, and 2.4 at 720px and below so the next tile peeks in. The gap is 22px (14px on phones). The row has 18px of padding above and 16px at the sides, cancelled by negative margins, so rings and rotated cards are not clipped.
- **Tile:** A square stack of up to three box arts from the collection. The front card is flat; the two behind it are rotated 5deg to each side, scaled to 94% and darkened to 60% brightness. Each tile leads with a pack that no other tile leads with. 12px under the stack come the collection name in Card name type and "7 packs" in Meta type, muted slate.
- **Hover / Focus:** The back cards open to 8deg and shift 3% out over `--slow`, and the front card gets the art ring.
- **Arrows:** Two 40px Raised Charcoal buttons with the 6px radius and 20px chevrons sit opposite the Collections heading. Hover lifts them to raised-2. They page by whole tiles so the next tile lands on the left edge, fade to 35% at each end, hide when the whole row fits, and hide at 720px and below, where the row is swiped.

### Plugin Card
- **Shape:** No container. 16:9 art with the 6px radius on Raised Charcoal, and the plugin name 14px under it in 800 at 18px.
- **Image variant:** A hero screenshot of the plugin, cropped to fill.
- **Icon-on-livery variant:** For a plugin with only an icon (Blockwork, and the All plugins card), the icon sits centred at `min(38%, 168px)` with the icon lift, on #202227 with the two hard orange livery bands.
- **External link:** A plugin hosted elsewhere adds a 16px external-link icon in muted slate after its name and opens in a new tab.
- **Hover / Focus:** The art ring.
- **Layout:** Three across on the home page, two across on the Plugins page.

### Catalog Head, Tools and Empty State
- **Page head:** On a department or collection catalog, a full-width accent field in Dark Ink with 28px above and 44px below the content and its bottom edge cut on a 26px diagonal. It holds the breadcrumbs, the page name in Headline type 18px below them, and a count line (700, 16px) 14px below that ("69 packs · 8,855 models", or "2 of 69 packs" while filtered). All packs and Plugins use a plain head on the ground with the count in muted slate.
- **Tools bar:** A sticky bar under the header in ground glass, with 12px of padding above and below, the filter chips on the left and the sort select on the right.
- **Empty state:** Centred in muted slate with 64px above and below: one line, "No packs match that search.", and two neutral buttons. Clear search empties the query and the filter and puts focus back in the search box. Search all packs carries the query to the All packs page and is left out on that page itself.

### Pack Gallery
- **Stage:** A 16:9 Sunken Charcoal stage with the 6px radius, full width with square corners at 720px and below. Inside is a sideways scroll-snap strip with one slide per figure, cropped to fill. When `packs.json` names a trailer, it is the second item, shown whole on black with native controls.
- **Arrows:** 48px dark translucent squares (the sunk charcoal at 72%, 92% on hover) with 24px chevrons, 12px from each side. They appear on hover or when focus is inside the stage, and hide at the first and last slide. On touch screens they are always visible at 40px.
- **Counter and zoom:** Along the bottom, 12px in: a counter ("1 / 9", 700 at 13px) on the left and a zoom group on the right (zoom out, the level, zoom in, reset) on the same dark glass. Zoom steps through 1x, 1.5x, 2x, 3x and 4x; a double-click toggles 2.5x at the pointer; Ctrl with the wheel zooms at the pointer, and so does the wheel alone once a slide is zoomed; dragging pans a zoomed slide. Changing slide resets the zoom.
- **Keys:** The strip takes keyboard focus (shown with the inset accent ring) and answers the left and right arrows, Home and End.
- **Thumbnails:** A row 10px under the stage, 8px apart, each `clamp(88px, 11vw, 132px)` wide at 16:9 with a 4px radius. Thumbnails rest at 55% opacity (85% on hover); the current one is at full opacity with the thumbnail ring and scrolls into view. The trailer's thumbnail carries a white play icon.

### Buy Box and Phone Buy Bar
- **Buy box:** The right column of a pack page, sticking 20px under the header, with its parts 18px apart and left-aligned: the pack name, the label strip, the hero price, the buttons and the spec list.
- **Label strip:** A Strip Black parallelogram with 7px by 18px padding, set in Label type in Studio White: the count first, then the pack's tags, with accent "·" separators.
- **Price:** The dollar price in Price hero type with the Robux figure after it. A free pack shows FREE once. A UI pack with no Creator Store listing yet shows Coming soon in soft ink at 22px.
- **Buttons:** Full width, 12px apart: Purchase on Creator Store (big primary), Purchase with Robux (big Robux) when the pack has a Robux product, Try in Roblox (neutral) when a showcase place is set, Purchase on Clearly Dev (neutral) when there is a link, then the Other ways to pay text link. The buttons follow `buy.json` even when it changed after the page was built.
- **Specs:** Three short lines in soft ink at 14px, each with an accent bullet skewed by -24deg, 18px under a hairline.
- **Phone buy bar:** At 1000px and below, a bar fixed to the bottom of the screen in raised glass with a hairline on top: the pack name (800 at 14px, cut with an ellipsis), the price, and a primary Purchase button 42px tall. It stays below the screen while the buy buttons are in view and slides up over `--slow` once they scroll away; while hidden it is out of the tab order. The footer gets 96px of extra bottom padding on pack pages so the bar never covers it. Only packs with a Creator Store link have the bar.

### Footer and Newsletter
- **Footer:** A full-width Sunken Charcoal band with 48px above its content. Four columns (Shop, Collections, KashTheKing, Legal), 32px apart, two columns at 860px and below. Column headings are 800 at 15px in Studio White; links are muted slate at 14px and turn Studio White with an underline on hover. A short legal line in muted slate at 13px closes the footer 40px below the columns.
- **Newsletter:** `shop/news.js` renders it at the top of the footer, 40px above the columns, only when `buy.json` names a newsletter endpoint. In the footer the box is Raised Charcoal with the 6px radius, no border, at most 560px wide, with 18px padding and a "Newsletter" heading at 800 and 18px. Its row holds the email field (1px Legacy Line border, the 6px radius) and an orange Subscribe button in Dark Ink on a 2px Burnt Orange base. One consent line in muted slate at 12px with an orange Privacy note link sits under the row, followed by a status line.

### Moving Between Pages
- **No reloads:** A shop link renders the next page in place and swaps the main content and the head tags. The department colour on `<html>` and the current header link change in the same frame, and back and forward restore the page and where it was scrolled to.
- **Pack-art morph:** With View Transitions and no reduced motion, the page crossfades over 200ms on `--ease`. The clicked card's art is named `pack-art` and morphs into the gallery stage over `--slow` (420ms) on `--ease`, clipped to the 6px radius. Going back morphs the gallery into the same card when that card is in view. The header has its own transition name, `top`, so it holds still.
- **Preload on intent:** Hovering a link for 60ms, focusing it or touching it loads that page's data and first images. A click waits at most 350ms for up to four images to decode, so the new page paints whole.
- **Slow loads:** If a page is still loading after 120ms, the main content dims to 60%.
- **Reduced motion:** Under `prefers-reduced-motion: reduce` every transition and animation lasts 1ms, scrolling is instant, the view-transition animations are off, and the script skips the morph.
- **Forced colours:** The doors and the department page heads keep their own colours (`forced-color-adjust: none`), and buttons, chips and the header Lifetime Pack button gain a 1px `ButtonText` border.

**The Art Is The Card Rule.** A product, collection or plugin is shown by its art at full size with its name under it. Nothing frames the art, and every state (hover, focus, selected, scrubbing) happens on or around the art itself.

## Do's and Don'ts

### Do:
- **Do** take every colour from the `:root` tokens, and switch department only with `data-dept="ui"`; components ask for `--accent` and `--accent-base`, and only shop-wide pieces (the Lifetime Pack, the newsletter button, the plugin livery) name orange directly.
- **Do** set text on Livery Orange (#FF9A1F) and Marketing Blue (#49BAEC) in Dark Ink (#121316).
- **Do** show box art square and at full size with the 6px radius and nothing around it, with the name, one meta line and the price under it.
- **Do** give every button its face on a 2px darker base (`box-shadow: 0 2px 0 var(--base)`) and let the face sink 2px when pressed.
- **Do** mark hover and focus on art with the ground-gap ring (`0 0 0 3px var(--ground), 0 0 0 5px var(--accent)`), and keep the 2px accent focus outline on every control.
- **Do** move a charcoal surface one step up the ladder on hover (raised to raised-2).
- **Do** time motion with `--fast` (160ms) or `--slow` (420ms) on `--ease`, and turn it off under `prefers-reduced-motion`.
- **Do** use tabular numerals for prices and counts.
- **Do** keep one search box, in the header: it filters a catalog page in place and suggests packs everywhere else.

### Don't:
- **Don't** add taglines, helper text or secondary labels. Kash: "Cut taglines, helper text and secondary labels. If a screen needs them to make sense, fix the layout."
- **Don't** put white text on orange or blue; white on orange is 2.12:1.
- **Don't** use any blue other than Marketing Blue (#49BAEC) for UI packs.
- **Don't** wrap a product card in a panel, border, background or padding.
- **Don't** add a second typeface, a system display face or a monospace face.
- **Don't** blend colours in a gradient or draw grid lines on the ground; cut diagonals as hard edges.
- **Don't** put a resting shadow under a flat surface; shadows belong to the button base and to things that float over content.
- **Don't** use a radius other than 6px, apart from 4px on small pieces such as search rows and gallery thumbnails.
- **Don't** add new hard-coded colours; reuse a token, or add one to `:root` and to this file.
- **Don't** use the legacy aliases (`--panel`, `--line`, `--text`, `--gold`) in new shop CSS.
