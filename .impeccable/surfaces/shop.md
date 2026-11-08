# Surface: the shop (/shop/ and everything under it)

Scope: shop home, model and UI departments, style collections, search, every pack page, plugins.
Visitor mode: Persuade on the home and pack pages, Operate on the catalogs (browse, filter, compare).

Audience and job: a Roblox developer looking for a pack for the game they are building. The action is the store's own:
open the pack, check what is inside, press Purchase on Creator Store. Proof is the real box art and slides; no claims.
Constraints: data comes only from `shop/packs.json`, `buy.json` and `soon.json`; prices never change here; no taglines.

## Direction contract

THESIS: Kash's box-art wall, moving like an app. The product art leads at full size in his own thumbnail livery, and no
link inside the shop reloads the page. Refused: a gradient headline over equal tile cards on grid paper, the shop hub
that makes you click once more before you see a pack.

OWN-WORLD: Plain baseplate charcoal (#1A1C20 ground, #22252B raised), no grid lines; the thumbnail livery as whole
fields: livery orange #FF9A1F for model packs, marketing blue #49BAEC for UI packs, each with dark ink on it; the black
skewed label strip for specs; Montserrat only (900 display, 500 body); 6px corners; container-less product cards; buttons
whose face sinks 2px when pressed.

STORY: The visitor sees both product lines and real box art at once, scrubs a card to look inside a pack, opens it with
no page load, checks the slides and what is included, and leaves for the Creator Store.

FIRST VIEWPORT: Header bar (crown wordmark, Model packs, UI packs, Plugins, Library, search, Lifetime Pack). Under it a
stage split by one diagonal: the orange Model packs door on the left with its name at display size in dark ink, its live
count and a fan of its three newest box arts; the blue UI packs door mirrored on the right. Under the stage the Lifetime
Pack strip, then the top of the New shelf.

FORM: The category standard executed at full fidelity, chosen because Kash asked for "a full professional shop website":
storefront home, departments, catalog with filters and sort, product page with gallery and buy box. Bar: Steam store,
Fab, Apple Store product pages. Signature interaction: hover scrub that shows a pack's slides on its card, the box art
morphing into the pack page through a view transition, and hover or focus preloading every link's data and images.
seed: none (unavailable)

FINISH: unreviewed and undocumented is unfinished; this build ends with the finish review, the verdict, DESIGN.md, and every shipping raster carrying its provenance
