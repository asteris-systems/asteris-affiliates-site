---
url: /migrate/from-cartflows
title: "Switching from CartFlows (Side Cart + Cart Notices) to Asteris Affiliates"
meta_description: "CartFlows starts at $189/yr and the full FunnelKit suite is $249–$649/yr. Asteris Affiliates includes Side Cart, Free Shipping Bar, and 18 more modules for $149/yr Starter."
og_title: "Switch from CartFlows to Asteris Affiliates"
og_description: "CartFlows / FunnelKit pricing starts around $189/yr. Asteris Affiliates includes Side Cart + Free Shipping Bar + Coupons + 17 more modules from $149/yr."
canonical: https://asterisaffiliates.com/migrate/from-cartflows
primary_keyword: cartflows alternative
primary_keyword_us_vol: 720
primary_keyword_kd: 26
secondary_keywords:
  - cartflows side cart alternative
  - cartflows free alternative
  - funnelkit alternative
schema_type: Article + FAQPage
internal_links_out:
  - /docs/modules/side-cart
  - /docs/modules/free-shipping-bar
  - /docs/modules/coupons
  - /funnelkit-vs-asteris
  - /modules
  - /pricing
verified_date: 2026-06-03
ai_overview_optimised: true
---

# Migrate from CartFlows (the cart parts)

This guide is **scope-limited**: Asteris Affiliates does **not** replace CartFlows' / FunnelKit's funnel-building, order-bump, or one-click-upsell pages — those are full funnel-builder territory and a separate purchase decision (see [FunnelKit vs Asteris](/funnelkit-vs-asteris) for the honest comparison). What Asteris **does** replace is the **side-cart drawer, the free-shipping progress bar, and the cart-page coupon UX** — the parts of CartFlows that most stores actually use day-to-day. If you bought CartFlows just for these, you can drop the subscription. If you bought it for the funnel builder, keep it and add Asteris alongside.

---

## TL;DR

- Three CartFlows / FunnelKit features → three Asteris modules: Side Cart drawer → **Side Cart**; Free Shipping Bar / Cart Notices → **Free Shipping Bar**; cart-page coupon entry + URL coupons → **Coupons** (Module 20).
- What carries across: enabled-on-which-pages, free-shipping threshold value, currency display, customisable trigger button positioning.
- What does **not** carry across: order bumps, one-click upsells, custom checkout flows, funnel pages — none of those are in Asteris's scope.
- Time: 15–30 minutes for the three modules.
- Reversible: yes. Asteris uses its own option namespace and never touches CartFlows / FunnelKit data. Reactivate CartFlows, disable the Asteris modules, your funnels are intact.

---

## Decision matrix — read this first

| What you bought CartFlows for | What to do |
|---|---|
| Just the side-cart drawer | **Migrate to Asteris Side Cart and cancel CartFlows.** $189/yr → $0 incremental on Asteris Starter. |
| Side cart + free shipping bar + abandoned-cart notices | **Migrate all three to Asteris.** $189/yr → $0 incremental on Asteris Starter. |
| Order bumps, one-click upsells, full checkout funnels | **Keep CartFlows. Add Asteris alongside for the 18 modules CartFlows doesn't cover.** $189/yr CartFlows + $149/yr Asteris = $388/yr; vs an equivalent stack of Yoast Premium + YITH Wishlist + Iconic Swatches + WP Overnight + several others = $700–$1,200/yr. |
| Checkout customisation / Stripe enhancements / payment-conversion features | **Keep CartFlows.** Asteris does not touch checkout flow. |

---

## Before you start

1. **Database backup** (UpdraftPlus, BackWPup, host snapshot).
2. **Stage if you can.** Especially important if CartFlows is wired into your checkout — accidentally disabling something with checkout impact at peak traffic is a bad day.
3. **Confirm requirements.** WordPress 6.4+, PHP 8.1+, WooCommerce 8.0+, Asteris Affiliates Starter or higher (Side Cart, Free Shipping Bar, and Coupons are paid-only modules).
4. **Inventory what CartFlows is doing on your store.** WP-admin → CartFlows → Funnels. List every active funnel + the URLs they own. If any funnel page handles checkout, **do not disable CartFlows** — that flow needs to keep working.

---

## What gets imported

| From CartFlows / FunnelKit Cart | To Asteris | Status |
|---|---|---|
| Side cart enabled on / disabled on which pages | Side Cart → display rules | auto |
| Side cart trigger position (corner / floating button / cart icon) | Side Cart → trigger position | auto |
| Side cart "upsell" recommended products list | Side Cart → cross-sell list | auto |
| Free shipping bar threshold value | Free Shipping Bar → threshold | auto |
| Free shipping bar message templates | Free Shipping Bar → message field | auto |
| Cart-page coupon field positioning | Coupons → URL auto-apply / cart-page integration | auto |
| Funnel pages, order bumps, one-click upsells | — | **NOT migrated** — out of Asteris scope |
| Checkout customisation, payment-method UX | — | **NOT migrated** — out of Asteris scope |
| Email automation (FunnelKit Automations) | — | **NOT migrated** — use Mailchimp / MailerLite / Klaviyo instead |

---

## Run the migration

1. Install + activate Asteris Affiliates. Add your licence key.
2. Go to **WooCommerce → Asteris WC → Migrate**.
3. The CartFlows-detection check fires automatically on the active CartFlows or FunnelKit Cart plugin. You will see one card per cart-related sub-plugin detected.
4. Click **Import settings** on each card. Imports are idempotent.
5. Toggle on the corresponding Asteris modules: **Side Cart**, **Free Shipping Bar**, **Coupons** (whichever you'll use).
6. Visit your store front-end. Add a product to cart. The Asteris Side Cart drawer should slide in. The Free Shipping Bar should display at the top of the cart. Apply a coupon — confirm it works.
7. **Do not deactivate CartFlows yet.** First, walk through every active funnel from your inventory in step 4 and confirm Asteris isn't interfering. The two plugins coexist cleanly because Asteris uses standard WC hooks; CartFlows uses its own funnel pages.
8. **If you decide to fully cancel CartFlows:** deactivate it. Re-walk the cart + checkout. Re-check free shipping threshold + coupon application.
9. **If you decide to keep CartFlows:** disable just the cart-side features inside CartFlows (the Side Cart toggle in their settings) to avoid double-rendering. Asteris's Side Cart should be the only one active.

---

## FAQ

### What's the honest pitch vs FunnelKit?

We wrote a whole page on this: [FunnelKit vs Asteris](/funnelkit-vs-asteris). Short version: FunnelKit is best-in-class for funnels, order bumps, and conversion optimisation; Asteris is best-in-class for plugin consolidation across the rest of the store. Most agencies that scale end up running both — funnels are too specialised to bundle into a 21-module suite.

### What about FunnelKit Automations?

Out of scope. Asteris does not do email automation, marketing CRM, or behavioural triggers. Use MailerLite, Mailchimp, Klaviyo, or keep FunnelKit Automations active alongside.

### Does Asteris support abandoned-cart recovery?

Not at v1.0. Asteris Coupons supports scheduled / segmented coupons (the supply side of cart recovery), but the email-trigger / SMS-trigger automation side belongs in a dedicated tool. CartFlows / FunnelKit Automations / Klaviyo all do this well.

### How does the price comparison actually work?

CartFlows pricing as of 2026-06-03: Personal $189/yr first year ($249/yr renewal, single site), Plus $299/yr (5 sites), Professional $479/yr (30 sites). FunnelKit Funnel Builder Pro starts around $249/yr. Asteris Starter is $149/yr for the 3 cart features + 17 other modules. If you genuinely need the full funnel builder, CartFlows wins for that use-case — Asteris doesn't compete there. If you just need the cart parts, Asteris saves you $90–$330/yr.

---

## See also

- [Side Cart module docs](/docs/modules/side-cart)
- [Free Shipping Bar module docs](/docs/modules/free-shipping-bar)
- [Coupons module docs](/docs/modules/coupons)
- [FunnelKit vs Asteris — the honest comparison](/funnelkit-vs-asteris)
- [Migration hub](/migrate) — all migration adapters
- [Pricing](/pricing)
