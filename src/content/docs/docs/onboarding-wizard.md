---
title: Onboarding wizard
description: The 4-step setup wizard captures business details, default commission rate, payout method, and cookie duration.
---

The onboarding wizard runs automatically after first activation. You can re-run it from **Affiliates → Tools → Onboarding wizard**.

## Step 1 — Business details

- **Business name** — appears on payout confirmation emails to affiliates
- **ABN / EIN** — optional; required if you're issuing tax invoices alongside payouts
- **Default currency** — pulled from your WooCommerce / EDD / Surecart store; override if needed

## Step 2 — Default commission rate

The percentage paid on each completed order. Industry baselines:

- **Digital products** — 10–30%
- **Physical products** — 5–15%
- **High-margin services** — up to 50%

You can override this per-product later from **WC → Products → [product] → Asteris Affiliates** tab.

## Step 3 — Payout method

| Method | Best for |
|---|---|
| **PayPal API auto-batch** | Affiliates with PayPal accounts. Schedule weekly/monthly. |
| **Manual PayPal** | Same as above but you trigger each payout. |
| **Bank transfer** | Local affiliates. You handle the transfer outside the plugin. |
| **Manual / external** | You pay via Wise, Stripe Connect, crypto, whatever — plugin just tracks balances. |

You can configure multiple methods and let affiliates choose during signup.

## Step 4 — Cookie duration

How long an affiliate's referral cookie persists after the visitor's first click. The visitor's subsequent purchase still credits the affiliate within this window.

- **30 days** — standard for impulse / digital purchases
- **60 days** — standard for considered purchases (default)
- **90 days** — for B2B or high-consideration products

## After the wizard

You'll land on **Affiliates → Dashboard** with a live overview. Create your sign-up page next (see **[Affiliate portal →](/docs/affiliates/portal)**), then start recruiting.
