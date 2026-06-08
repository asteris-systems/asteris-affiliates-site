---
title: Surecart integration
description: Surecart adapter for affiliate tracking on Surecart-hosted orders.
---

The Surecart adapter brings Asteris Affiliates' tracking + payouts to Surecart stores. Surecart is a hosted checkout (cart lives on their servers); the adapter listens for Surecart webhooks and credits commissions accordingly.

## Activate the adapter

**Affiliates → Settings → Integrations → Surecart → Enable**.

Requires the **Surecart plugin** installed and connected to your Surecart workspace.

## Webhook setup

The adapter auto-registers two Surecart webhooks:

- `order.created` → tentative commission
- `order.paid` → confirmed commission
- `order.refunded` → revoke commission

Verify in **Surecart dashboard → Webhooks** — you should see entries pointing to `https://yoursite.com/wp-json/asteris-aff/v1/surecart/webhook`.

## Tracking method

Because Surecart's checkout is hosted, the adapter passes the referral cookie via a URL parameter on the Surecart checkout link:

`https://shop.yoursite.com/checkout?asteris_aff=sarah`

Affiliate referral links generated in the portal include this parameter automatically when the destination is a Surecart product.

## Per-product rates

Surecart products show an **Asteris Affiliates** section in the Surecart product editor (requires the Surecart plugin → WP admin integration). Override rates and tier-2 settings the same way as WooCommerce.

## Recurring billing

Surecart subscriptions trigger the recurring commission flow same as WC Subscriptions. Configure per-product.

## Tax + currency

Asteris reads the Surecart-reported subtotal in the order currency. No conversion. If you have multi-currency stores, ensure your payout currency matches expectation.

## Compatibility

- Surecart **2024.0+** — full support
- Surecart **2023.x** — webhook payload differs; not officially supported, may work

## Limitations

- Bundle products handled per-line-item (no MAX-of strategy in Surecart adapter v1)
- Order-bump products credit the same affiliate as the parent order

## Related

- [WooCommerce integration](/docs/integrations/woocommerce)
- [EDD integration](/docs/integrations/edd)
- [Custom cart adapter](/docs/integrations/custom-adapter)
