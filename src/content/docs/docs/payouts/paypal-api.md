---
title: PayPal API auto-batch
description: Configure PayPal's OAuth2 + Payouts API for hands-off scheduled batch payouts.
---

PayPal API auto-batch is the recommended payout method for most stores — you set the schedule once, and the plugin pays everyone over the minimum threshold automatically.

## Prerequisites

- PayPal Business account (free)
- PayPal Developer credentials (Client ID + Secret) — see below

## Get your PayPal credentials

1. Sign in to [developer.paypal.com](https://developer.paypal.com)
2. **My Apps & Credentials → Live → Create App**
3. App name: `Asteris Affiliates`
4. Choose **Merchant** account
5. Enable scopes: **Payouts**
6. Click **Create App**
7. Copy **Client ID** and **Secret**

## Connect in WordPress

**Affiliates → Settings → Payouts → PayPal API**:

1. Paste **Client ID** and **Secret**
2. **Environment** — `Live` (or `Sandbox` for testing)
3. **Save + Test connection** — confirms OAuth2 token exchange works

## Schedule payouts

**Settings → Payouts → Schedule**:

- **Frequency** — Weekly, Bi-weekly, Monthly, Manual only
- **Day of week / month** — when to run
- **Minimum threshold** — $50 / $100 is standard
- **Currency** — usually matches your store currency
- **Dry-run first** — preview the next batch before it sends

The batch runs via WP-Cron. For larger stores, replace WP-Cron with a real system cron pointing at `wp-cron.php`.

## Manually run a batch

Even on a schedule, you can trigger ad-hoc:

**Payouts → Run batch now**.

## Encryption + security

Your PayPal Client Secret is encrypted at rest (AES-256-CBC) using a key derived from `wp_salt('auth')`. Never logged to PHP error log, never sent to our servers.

## What happens during a batch

1. Plugin queries PayPal `/v1/oauth2/token` for an access token
2. Builds a single `POST /v1/payments/payouts` request with up to 15,000 recipients
3. Receives a `batch_id`
4. Polls PayPal for batch status (queued → processing → success/failed) and updates each affiliate's commission status

## Failed payouts

If PayPal rejects a recipient (e.g. unverified PayPal account), that single recipient is marked `failed` in **Payouts → Failed**. You can retry individually or switch them to bank transfer.

## v1.2 — webhook listener

v1.1.0 polls PayPal for batch status. v1.2 adds the `PAYMENT.PAYOUTS-ITEM.SUCCEEDED` webhook listener for instant status updates without polling.

## Related

- [Bank transfer](/docs/payouts/bank-transfer)
- [Thresholds + schedules](/docs/payouts/thresholds)
- [Manual payouts](/docs/payouts/manual)
