---
title: Easy Digital Downloads integration
description: EDD adapter for affiliate tracking on EDD orders. Drop-in, same UX as WooCommerce.
---

The EDD adapter gives you the same affiliate-tracking workflow you'd get on WooCommerce, but for Easy Digital Downloads stores.

## Activate the adapter

**Affiliates → Settings → Integrations → Easy Digital Downloads → Enable**.

Requires the EDD core plugin (free) installed and active.

## What hooks in

- **EDD purchase complete** — checks for affiliate attribution
- **EDD purchase refunded** — revokes commission
- **EDD product → Asteris Affiliates** tab — per-product rate overrides
- **EDD discount → Asteris Affiliates** field — coupon-affiliate attribution

## Recurring (EDD Recurring Payments)

If you use EDD Recurring Payments, the adapter handles:

- First payment commission
- Optional commission on each renewal
- No commission after cancellation

Configure per-product at **Downloads → [download] → Asteris Affiliates → Recurring commission rate**.

## Per-bundle pricing

EDD bundles trigger commissions on each component download by default. Override:

- **Whole bundle as one commission** (using max-of strategy) at **Settings → Commissions → Bundle strategy**

## License-key delivery integration

If you sell software with EDD Software Licensing, commissions are awarded on the initial purchase (not on individual licence-key activations). Renewals follow your recurring config.

## Compatibility notes

- **EDD 3.0+** — full support
- **EDD legacy (< 3.0)** — partial support; recommend upgrading

## Switching from EDD-native affiliate tools

If you currently use AffiliateWP with EDD, see [Migrate from AffiliateWP](/migrate/from-affiliatewp) — the import preserves all EDD-attributed referrals.

## Related

- [WooCommerce integration](/docs/integrations/woocommerce)
- [Surecart integration](/docs/integrations/surecart)
- [Custom cart adapter](/docs/integrations/custom-adapter)
