---
title: "Min/Max Quantity"
description: "Set minimum, maximum, and step purchase quantities globally or per-product for wholesale, bulk, and made-to-order WooCommerce stores."
---

## What it does

The Min/Max Quantity module enforces purchase quantity rules on WooCommerce products. You can set a global minimum, maximum, and step (multiple-of) value that applies to every product, then override any of those values per-product from the product edit screen. Rules are applied to the quantity input on product pages (the `min`, `max`, and `step` HTML attributes) and re-validated server-side on add-to-cart and on cart updates, so customers cannot bypass them by editing the markup.

Typical uses: wholesale stores that require a minimum order of 6 units, limited-release products capped at one per customer, or carton-based products that must be ordered in multiples of 12. If a customer attempts an invalid quantity, WooCommerce displays a standard error notice naming the product and the rule it broke.

**Replaces:** WooCommerce Min/Max Quantities extension (~$79/yr), YITH WC Minimum Maximum Quantity (~$79/yr).

## Quick start

1. In WP-admin, go to **Asteris Affiliates -> Modules** and enable **Min/Max Quantity**.
2. Open **Asteris Affiliates -> Min/Max Quantity** to set the global defaults (minimum, maximum, step).
3. Save the settings. The rules now apply to every WooCommerce product on the store.
4. (Optional) For per-product overrides, open **WooCommerce -> Products -> Edit** on any product. In the right sidebar, find the **Asteris -- Min/Max Quantity** metabox.
5. Enter override values, or leave any field blank to inherit the global default for that field. Update the product.
6. Visit the product on the front-end. The quantity input will reflect the effective rules, and any invalid add-to-cart attempt will show an error notice.

## Settings reference

All three settings live on the **Asteris Affiliates -> Min/Max Quantity** screen. They are stored as standard WordPress options under the Asteris namespace and apply to every product unless overridden per-product.

| Setting | What it does | Default | Valid values |
|---------|--------------|---------|--------------|
| Global minimum quantity | Customers must add at least this many of any product to the cart. | `1` | Integer 1 -- 9999 |
| Global maximum quantity | Maximum units of a single product per cart. `0` means no maximum. | `0` | Integer 0 -- 9999 |
| Global quantity step | Customers must buy in multiples of this number, counted from the minimum. Example: min 2, step 2 -> valid quantities are 2, 4, 6, 8... | `1` | Integer 1 -- 999 |

Per-product overrides are entered in the **Asteris -- Min/Max Quantity** metabox on the product edit screen. Leaving a per-product field blank deletes the meta and reverts that field to the global default.

## Common workflows

### Wholesale store -- everyone must order at least 6

1. Go to **Asteris Affiliates -> Min/Max Quantity**.
2. Set **Global minimum quantity** to `6`.
3. Leave maximum at `0` and step at `1`.
4. Save. Every product now enforces a six-unit minimum at the quantity input and at cart validation.

### Limit a flash-sale product to 1 per customer

1. Open the flash-sale product in **WooCommerce -> Products -> Edit**.
2. In the **Asteris -- Min/Max Quantity** metabox, set **Min qty** to `1` and **Max qty** to `1`.
3. Update the product. Customers can now only add a single unit. Note: this is a per-line-item limit, not a cross-session purchase cap -- a determined customer could place two separate orders. For multi-order limits you need a separate purchase-history module.

### Sell in cartons of 12

1. Open the carton product.
2. In the metabox, set **Min qty** to `12` and **Step** to `12`.
3. Update. The quantity input snaps to 12, 24, 36, and so on. An attempt to add 15 raises a "must be ordered in multiples of 12 (starting from 12)" error.

### Mix global and per-product rules

1. Set a sensible store-wide minimum (e.g. `1`) and step (`1`) at the global level.
2. For the small handful of products that need different behaviour (samples, wholesale-only SKUs, made-to-order items), use the metabox.
3. To revert a product to the global default for a specific field, clear that field in the metabox and update. The plugin calls `delete_post_meta()` so the product inherits the global value again.

### Remove a maximum from one product when the store-wide max is set

1. If the global maximum is `10` but one product should be uncapped, the metabox `Max qty` field accepts `0` to mean "no maximum" -- but because `0` is a literal stored value, you cannot fully inherit-and-override that way. Either lower the global max and cap the other products explicitly, or set the per-product max to a very high number (e.g. `9999`).

## For developers

> **Stability commitment.** Hooks, filters, REST endpoints, and shortcodes documented below follow semver. Breaking changes happen only on major version bumps, with at least one minor version of deprecation notice in advance. Anything not listed here (internal AJAX handlers, settings save handlers, internal plumbing hooks) is implementation detail — those may change without notice.

This module exposes no public extension points of its own. It consumes WooCommerce core filters (`woocommerce_quantity_input_args`, `woocommerce_add_to_cart_validation`, `woocommerce_update_cart_validation`) at the standard priority (10) — to customise behaviour, hook those filters at a later priority.

Per-product override data (post meta prefix `_asteris_mmq_`) and global defaults (options under `asteris_min_max_quantity_*`) are implementation detail and may change without notice. Read or write them through the WP admin UI rather than directly.

## Troubleshooting

### The quantity input still shows step 1 after saving a step value

Confirm the module is enabled on the **Asteris Affiliates -> Modules** screen. The `woocommerce_quantity_input_args` filter only runs when the module's `init()` has been called -- a disabled module attaches no hooks. Also clear any object-cache or page-cache layer; WooCommerce product templates are commonly cached.

### Per-product override is ignored

Open the product edit screen and check the **Asteris -- Min/Max Quantity** metabox. If the field is blank, the global default is used. If the field has a value but nothing changes on the front-end, confirm that the product save actually persisted -- the metabox save handler relies on the `asteris_mmq_nonce` field, so a missing or stale nonce silently aborts the save (no error notice). Edit and update the product again from a fresh browser tab.

### Customer can add invalid quantities via the cart screen

The module validates both add-to-cart and cart updates. If invalid quantities still slip through, a third-party plugin or a custom theme is likely short-circuiting `woocommerce_add_to_cart_validation` or `woocommerce_update_cart_validation` before our handler returns. Temporarily disable other cart-modifying plugins to isolate.

### Step error never fires

The step check uses `($quantity - $min) % $step === 0`. If `step` is `1` (the default), every quantity satisfies it, which is expected. Set step to `2` or higher to see the rule kick in.

### Global max of 0 unexpectedly blocks all purchases

`0` means "no maximum". If you intended "no purchases", that is not what this module does -- to hide a product use WooCommerce's stock-status or visibility controls instead.

## Known plugin conflicts

- **Other min/max plugins** (WooCommerce Min/Max Quantities extension, YITH Minimum Maximum Quantity): both attach to the same `woocommerce_quantity_input_args` and `woocommerce_add_to_cart_validation` filters. Run only one min/max plugin at a time -- the load order is otherwise non-deterministic and you will see duplicated error notices or rules fighting each other.
- **Aggressive cart-rewriting plugins**: anything that replaces WooCommerce's cart with a custom AJAX flow (some side-cart and one-page-checkout plugins) may bypass `woocommerce_update_cart_validation`. The Asteris Side Cart module is compatible. Other side-cart plugins have not been tested.
- **Quantity-input replacement plugins**: themes or plugins that render their own `+/-` quantity buttons sometimes ignore the `step` attribute returned by `woocommerce_quantity_input_args`. Server-side validation still fires, so the rule is enforced, but the input UI may not reflect it.

Other conflicts are not currently known. If you find one, please report it via the support forum.

## What is in Free vs Paid

Min/Max Quantity is a paid-tier module. Available in Starter, Pro, Agency, and Founder. It is not included in Asteris Free.

## Related

- [All modules overview](/modules)
- [Pricing and tiers](/pricing)
- [Free vs paid comparison](/docs/free-vs-paid)
- [Side Cart module](/docs/modules/side-cart) -- compatible cart drawer
- [Quote Request module](/docs/modules/quote) -- alternative for B2B made-to-order products

## Changelog

| Version | Date | Notes |
|---------|------|-------|
| 1.9.7 | 2026-06-01 | Documented in detail. Previous entries in plugin changelog. |
