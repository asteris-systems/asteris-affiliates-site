---
title: Stripe Connect direct payouts
description: Direct affiliate payouts via Stripe Connect Express. Fastest settlement, lowest fees in most regions.
---

Stripe Connect is the **fastest, lowest-fee** payout method for affiliates in Stripe-supported countries. Affiliates onboard via Stripe Express (5 min, OAuth-based), and payouts settle direct to their connected Stripe account.

## Why Stripe Connect over PayPal

| | Stripe Connect | PayPal API |
|---|---|---|
| Settlement | Direct to bank, 2-7 days | PayPal balance, instant |
| Fees (US/EU) | 0.25% + $0.25 / payout | 2% capped |
| Onboarding | Stripe Express (KYC handled by Stripe) | PayPal account required |
| Country coverage | 40+ countries | 200+ countries |
| Affiliate UX | One-time OAuth onboarding | Affiliate provides email |

If your affiliates are mostly in Stripe-supported countries (US/CA/UK/EU/AU/etc.), Stripe Connect is usually the better choice. For broad international payouts, PayPal still wins on country coverage.

## Prerequisites

- Stripe Business account (free)
- Stripe Connect enabled on your account ([dashboard.stripe.com/connect/accounts/overview](https://dashboard.stripe.com/connect/accounts/overview))
- Your Stripe API keys (Live, not Test)

## Connect in WordPress

**Affiliates → Settings → Payouts → Stripe Connect**:

1. Paste your **Stripe Secret key** (`sk_live_...`)
2. Paste your **Stripe Publishable key** (`pk_live_...`)
3. Set **Connect platform branding** — name + logo shown to affiliates during Stripe Express onboarding
4. **Save + Test connection** — confirms your keys are valid + Connect is enabled

## Affiliate onboarding flow

When you enable Stripe Connect as a payout method, affiliates see a **Connect Stripe** button in their portal:

1. Affiliate clicks **Connect Stripe**
2. Redirected to Stripe Express (your branding)
3. They provide business / personal details + ID for KYC
4. Stripe approves (usually instant; up to 24h for some countries)
5. Redirected back to their Asteris portal — Stripe Connect is now linked

Once connected, payouts go direct to their bank via their Stripe account.

## Schedule batches

Same as PayPal API: **Settings → Payouts → Schedule** → frequency, day, minimum threshold.

When the batch runs, the plugin calls `POST /v1/transfers` per affiliate via your Stripe key, with their connected account as the destination.

## Encryption + security

Stripe Secret key encrypted at rest (AES-256-CBC, same pattern as PayPal credentials). Never logged, never sent to our servers.

## Failed transfers

If Stripe rejects a transfer (e.g. affiliate's Stripe account suspended), the payout is marked `failed` in **Payouts → Failed**. The plugin doesn't automatically retry — review and retry manually or switch the affiliate to another method.

## Fees

Stripe Connect Express charges Stripe's standard payout fee (typically 0.25% + $0.25/payout in US/EU). The fee is paid by **you** (the platform), not the affiliate.

Compare to PayPal: 2% capped per transaction. Stripe is cheaper for most batch sizes.

## Refunds + chargebacks

If a referred order is refunded after the commission has been paid via Stripe Connect, the plugin queues a reversal against the affiliate's next payout. See **[Refunds + chargebacks →](/docs/commissions/refunds)**.

## When to use PayPal instead

- Your affiliates are in countries Stripe doesn't support
- Your affiliates already have PayPal accounts and prefer not to onboard with Stripe
- You need instant settlement (PayPal balance shows immediately; Stripe takes 2-7 days to bank)

## Related

- [PayPal API auto-batch](/docs/payouts/paypal-api)
- [Bank transfer](/docs/payouts/bank-transfer)
- [Thresholds + schedules](/docs/payouts/thresholds)
