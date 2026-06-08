---
title: Per-product commission rates
description: Override the default commission rate for specific products. Useful for high-margin items, loss-leaders, or sale items.
---

You can set a custom commission rate on individual WooCommerce products. The per-product rate **overrides** the default for that product only.

## Set per-product rate

1. Edit a WC product
2. Open the **Asteris Affiliates** tab (in the Product data box)
3. Set:
   - **Override default rate** — yes/no
   - **Rate** — percentage or flat
   - **Tier-2 rate** (optional, for MLM)

Save the product. New referred orders on this product use the override.

## When to override

- **High-margin items** — pay affiliates more to push them
- **Loss-leaders / promo items** — pay affiliates less (or zero) since margin is already thin
- **Subscription products** — different rate for first month vs recurring
- **Bundles** — single explicit rate so the calculation is predictable

## Mixed-cart orders

If an order contains multiple products with different rates, the plugin uses the **MAX-of strategy** by default — the highest rate wins, applied across the entire commissionable subtotal.

Change to per-line-item splits (v1.2): **Settings → Commissions → Multi-product strategy → Per-line-item**.

> Per-line-item is queued for v1.2. v1.1.0 uses MAX-of only.

## Variable products

Override the rate at the **product** level — applies to all variations. Variation-specific rates are queued for v1.2.

## EDD + Surecart

The per-product tab also renders in EDD and Surecart product edit screens. Same fields, same behaviour.

## Bulk update via WP-CLI

```bash
wp asteris-aff product-rate set --product=123 --rate=20
wp asteris-aff product-rate clear --product=123
wp asteris-aff product-rate import --csv=/path/to/rates.csv
```

## Related

- [Default commission rates](/docs/commissions/rates)
- [Two-tier (MLM) referrals](/docs/commissions/two-tier)
- [WP-CLI commands](/docs/dev/wp-cli)
