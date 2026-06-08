---
title: "Asteris Coupons"
description: "BOGO, tiered cart discounts, URL coupons, and scheduled/segmented promotions — a single rule engine that extends WooCommerce's built-in coupons rather than replacing them."
---

## What it does

Asteris Coupons extends WooCommerce's built-in `shop_coupon` post type with the four advanced rule types that normally require a stack of separate plugins:

- **BOGO** (buy X, get Y free or discounted) with mix-and-match across products and a server-side quantity lock that mitigates the WebToffee-class cart-manipulation exploit pattern from 2025.
- **Tiered cart discounts** ("spend $50, get 5% off; spend $100, get 10% off") with either percent-off or fixed-amount-off per tier; highest matching tier wins.
- **URL coupons** — `?coupon=CODE` auto-applies via a 30-day cookie that survives cart abandonment; IP rate-limited to prevent code brute-forcing.
- **Scheduled + segmented coupons** — date range, day-of-week mask, time-of-day window; role / category / first-time-buyer / repeat-buyer gates.

Single-coupon-per-cart with deterministic top-down evaluation (follows the WooCommerce Dynamic Pricing precedent). Replaces a stack typically purchased as Advanced Coupons Pro ($79/yr) + WebToffee Smart Coupons ($89/yr) + Flycart Discount Rules Pro ($99/yr) = **$180–$400+/yr** depending on the combination.

## Quick start

1. Enable the module under **WooCommerce → Asteris WC → Modules**.
2. Go to **Marketing → Coupons** and create a coupon in the standard WooCommerce way (code, discount type, amount). The new **"Asteris Coupons — Advanced Rules"** metabox appears below WC's own panels with four tabs: **Rules**, **Schedule**, **Segmentation**, **Preview**.
3. In the **Rules** tab, pick a coupon type (BOGO / Tiered / URL auto-apply / Scheduled / Segmented). Each type reveals its own configuration block below.
4. Configure the type-specific fields, set evaluation priority (higher = evaluated first; default 10), then click **Update** at the top to save.
5. In the **Preview** tab, set a synthetic cart subtotal + quantity and click **Run simulation** to verify your rules behave as expected against the real evaluator.

## Settings reference (per-coupon meta)

| Field | Meta key | What it does |
|---|---|---|
| Coupon type | `_asteris_coupon_type` | `bogo` / `tiered` / `url_auto` / `scheduled` / `segmented` — empty means plain WC coupon, Asteris does not act |
| URL slug | `_asteris_coupon_url_slug` | The `?coupon=THIS-SLUG` value (URL Auto-apply type only); empty falls back to the WC coupon code itself |
| Schedule window | `_asteris_coupon_schedule_start_ts`, `_..._end_ts` | UTC unix timestamps; 0 = no gate |
| Day-of-week mask | `_asteris_coupon_schedule_dow_mask` | Bitmask (Mon=1, Tue=2, Wed=4, Thu=8, Fri=16, Sat=32, Sun=64); 127 = any day |
| Time-of-day | `_asteris_coupon_schedule_hour_start`, `_..._end` | Site timezone; `end < start` = overnight window; -1 = no time gate |
| Allowed roles | `_asteris_coupon_segment_roles` | Array of role slugs; empty = any role (incl. guest) |
| Allowed categories | `_asteris_coupon_segment_product_cats` | Array of term IDs; empty = any category |
| First-time-buyer only | `_asteris_coupon_segment_first_buyer_only` | Customer must have zero prior orders |
| Repeat-buyer minimum | `_asteris_coupon_segment_repeat_buyer_min_orders` | Minimum prior orders required |
| BOGO buy quantity | `_asteris_coupon_bogo_buy_qty` | "Buy N" |
| BOGO get quantity | `_asteris_coupon_bogo_get_qty` | "Get M" |
| BOGO get discount % | `_asteris_coupon_bogo_get_discount_pct` | 100 = free, 50 = half-price |
| BOGO get eligible products | `_asteris_coupon_bogo_get_product_ids` | Array of product IDs eligible as the free/discounted item; empty = same as buy products |
| Tiered thresholds | `_asteris_coupon_tiered_thresholds` | Array of `{spend, off_pct, off_amount}` rows |
| Priority | `_asteris_coupon_priority` | Higher = evaluated first (default 10) |
| Visible auto-apply | `_asteris_coupon_visible_auto_apply` | Customer sees "Coupon applied automatically — click to remove" notice (default on) |

All values are saved via the standard WordPress `save_post_shop_coupon` hook with nonce + capability check; the module-level settings page (trace mode, default priority, migration scanner) saves via `admin-post.php` per the project-wide pattern.

## Common workflows

### Create a BOGO "buy 2 get 1 free" promotion

1. Add a coupon (`SUMMER-BOGO`, type "Fixed cart discount", amount 0 — the discount is computed by Asteris).
2. In the Asteris metabox **Rules** tab, set **Coupon type** = BOGO.
3. In the **BOGO rules** block: buy quantity = 2, get quantity = 1, discount on Get items = 100%, Get eligible product IDs = leave empty (uses WC's "Products" list on the standard coupon panel).
4. Set Evaluation priority appropriately.
5. Save. Add 3 eligible products to a test cart — discount should equal the cheapest item's price.

### Create a tiered "spend more, save more" promotion

1. Add a coupon (`TIER`, type "Fixed cart discount", amount 0).
2. Asteris metabox **Rules** tab: **Coupon type** = Tiered.
3. In the **Tiered thresholds** table: row 1 spend = 50, off_pct = 5; row 2 spend = 100, off_pct = 10; row 3 spend = 200, off_pct = 15.
4. Save. Highest matching spend wins — a $120 cart gets the 10% tier, a $250 cart gets the 15% tier.

### Create a URL auto-apply campaign coupon

1. Add a coupon (`SUMMER25`, type "Percent discount", amount 25).
2. Asteris metabox **Rules** tab: **Coupon type** = URL Auto-apply.
3. In the **URL slug** field, paste `SUMMER25` (or any slug — does not need to match the WC code).
4. Save. Visit `https://yourstore.com/?coupon=SUMMER25` — the coupon is set in a 30-day cookie and auto-applies on next cart calc.

### Migrate plain WC coupons into Asteris management

1. Go to **WooCommerce → Asteris WC → Coupons tab → Migrate from WC** sub-tab.
2. The list shows every plain `shop_coupon` post that has no `_asteris_coupon_type` set.
3. Click **Manage with Asteris** on any row. The coupon is stamped with `_asteris_coupon_type = scheduled` and "always active" defaults; refine the rules in the per-coupon metabox.

## For developers

> **Stability commitment.** The `asteris_cart_thresholds` filter and the `Auto_Apply_Engine::trace_id_for()` accessor follow semver — breaking changes only on major version bumps with a minor-version deprecation notice. Other classes are implementation detail.

### Shared cart-threshold ledger

The module publishes its tiered + URL auto-apply spend triggers into a shared filter that any other module (Free Shipping Bar in particular) can read:

```php
$thresholds = apply_filters( 'asteris_cart_thresholds', [] );
// Each entry: [ 'spend' => 50.0, 'label' => '...', 'source' => 'coupon:SUMMER25', 'kind' => 'discount' ]
```

This is the canonical "what unlocks at what cart spend" source of truth across Asteris modules. Free Shipping Bar reads it to surface coupon thresholds alongside free-shipping thresholds in one bar.

### BOGO server-side lock

`Cart_Hooks::verify_bogo_quantities` runs at `woocommerce_checkout_create_order` (priority 10). It recomputes the BOGO_Resolver's allowed discount from the order's persisted line items and silently corrects any over-discount, adding an order note and an `error_log` entry. Customer-side cart manipulation cannot escape this gate.

## Known plugin conflicts

- **Other coupon engines** (Advanced Coupons, Smart Coupons by WebToffee, Smart Coupons by StoreApps, Flycart Discount Rules, YITH Dynamic Pricing, Plugin Republic Dynamic Pricing) — running any of these alongside Asteris Coupons will produce double-applied discounts or evaluation conflicts. Disable the other engine before enabling this module, or migrate its rules across via the **Migrate from WC** tab.
- **WooCommerce Subscriptions** — at v1.0, Asteris Coupons treats subscription products as standard products. Subscription-aware rules (recurring discount, signup-only discount) are deferred to v1.1.
- **Multi-currency plugins** — coupon spend thresholds are evaluated in the store's base currency. Multi-currency support is on the roadmap.

## What is in Free vs Paid

Coupons is a paid-tier module. Available in Starter, Pro, and Agency (launch-locked Founder rate applies).

## Related

- [Pricing and tiers](/pricing)
- [Module 20 build spec](https://github.com/asteris-commerce/asteris-affiliates/blob/main/02-specs/module_20_coupons_build_spec.md) (internal — exists in repo)
- [Free Shipping Bar module](/docs/modules/free-shipping-bar) (consumes the shared `asteris_cart_thresholds` filter)
- [Migrating coupons in](/migrate) — overview of all migration adapters

## Changelog

| Version | Date | Notes |
| --- | --- | --- |
| 1.9.20 | 2026-06-03 | Module 20 ships. Sprints 1–4 complete: BOGO, tiered, URL auto-apply, scheduled/segmented; 4-tab admin metabox; plain-English rule summary on the coupons list; one-click migration scanner; preview simulator; FSB shared ledger; ghost-coupon cleanup; trace-ID plumbing. |
