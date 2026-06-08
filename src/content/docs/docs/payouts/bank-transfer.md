---
title: Bank transfer payouts
description: Capture bank details on signup, generate bank-payable batches as CSV.
---

For affiliates without PayPal (or where PayPal fees are prohibitive — e.g. AU domestic transfers), Asteris Affiliates captures bank details at signup and generates a CSV batch you upload to your bank.

## Enable bank transfer

**Settings → Payouts → Methods → Bank transfer → Enable**.

Affiliates can then choose **Bank transfer** as their payout method in the portal.

## Capture fields

By default the plugin captures:

- **Account holder name**
- **BSB** (AU) / Routing number (US) / Sort code (UK) / IBAN (EU)
- **Account number**
- **Bank name**
- **SWIFT/BIC** (for international transfers)

Customise at **Settings → Payouts → Bank fields**.

## Encryption at rest

All bank details are encrypted with AES-256-CBC, key derived from `wp_salt('auth')`. The plaintext is never logged or exposed in admin list tables (you see `••••1234` in the affiliate profile).

To view full details (e.g. to manually transfer): edit the affiliate → **Reveal bank details** (requires re-entering your admin password).

## Generate a payout batch

**Payouts → New batch → Method: Bank transfer**:

1. Choose date range / minimum threshold
2. Plugin generates a CSV with columns matching your bank's upload format
3. Common formats included: **ANZ**, **Commonwealth Bank**, **NAB**, **Westpac**, **Wise**, **Generic ABA**
4. Download CSV → upload to your bank's bulk payment portal
5. Mark the batch **Paid** in the plugin once your bank confirms

## Reconciliation

When your bank settles a transfer, mark individual recipients **Paid** or **Failed**. The plugin updates affiliate balances accordingly.

For automation, v1.2 plans an Airwallex / Wise API integration for direct bank payouts.

## International transfers

For overseas affiliates: capture SWIFT + IBAN + intermediary bank if needed. The plugin doesn't perform currency conversion — your bank handles it.

If a significant portion of your affiliates are international, PayPal API auto-batch is usually cheaper than wire transfers.

## Related

- [PayPal API auto-batch](/docs/payouts/paypal-api)
- [Manual payouts](/docs/payouts/manual)
- [Thresholds + schedules](/docs/payouts/thresholds)
