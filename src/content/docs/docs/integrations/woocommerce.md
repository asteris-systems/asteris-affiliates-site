---
title: WooCommerce integration (native)
description: WooCommerce is the first-class integration. Out-of-the-box tracking on every WC order.
---

WooCommerce is Asteris Affiliates' primary integration. No adapter needed — the plugin hooks WC's order lifecycle directly.

## What's automatic

On plugin activation with WooCommerce active:

- **Order tracking** — every completed WC order is checked for affiliate attribution
- **Commission calculation** — based on subtotal × rate (or per-product overrides)
- **Status sync** — order status changes (processing → completed → refunded) automatically update commission status
- **Coupon attribution** — affiliates can be linked to WC coupons; using their coupon at checkout credits them even without a referral cookie

## WC product → affiliate commission tab

Each WooCommerce product gets an **Asteris Affiliates** tab in the Product data box:

- Override default commission rate
- Set tier-2 rate
- Disable commissions for this product entirely (good for low-margin items)
- Custom referral cookie duration for this product

## Coupon attribution

**WC → Marketing → Coupons → [coupon] → Asteris Affiliates** tab:

- Link the coupon to an affiliate
- When checkout uses the coupon, commission credits to the linked affiliate
- Useful for offline / podcast / influencer promotions where you can't use a referral link

## HPOS compatibility

Asteris Affiliates is fully **HPOS-compatible** (High-Performance Order Storage). Works with both legacy post-meta orders and HPOS orders. Auto-detects which is active.

## Refund hook

WC refunds trigger commission revocation automatically — see [Refunds + chargebacks](/docs/commissions/refunds).

## Subscription products

Compatible with WooCommerce Subscriptions:

- **First payment** → commission earned as normal
- **Recurring renewals** → optional recurring commissions (configurable per-product)
- **Cancellation** → no future commissions earned; existing ones stay

Enable recurring at **WC → Products → [subscription product] → Asteris Affiliates → Recurring commission rate**.

## WC Memberships, Booking, etc.

Most WC extensions work transparently because Asteris hooks the core order lifecycle. Confirm with a test order.

## Related

- [EDD integration](/docs/integrations/edd)
- [Surecart integration](/docs/integrations/surecart)
- [Per-product commission rates](/docs/commissions/per-product)
