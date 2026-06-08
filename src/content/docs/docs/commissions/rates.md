---
title: Default commission rates
description: Set the default commission rate that applies to all referred orders. Override per-product or per-affiliate.
---

The **default commission rate** applies to every referred order unless overridden by a per-product rate, a per-affiliate rate, or a special campaign.

## Set the default

**Affiliates → Settings → Commissions → Default rate**.

Two formats:

- **Percentage** (e.g. `10%` of order subtotal)
- **Flat amount** (e.g. `$5` per order, regardless of order value)

Most stores use percentage. Flat amounts make sense for low-AOV products where percentage feels insignificant.

## What's included in "subtotal"

By default, commission is calculated on order subtotal **excluding**:

- Shipping
- Tax
- Discounts (applied before commission)

Toggle each at **Settings → Commissions → Calculation basis**:

- Include shipping (default: no)
- Include tax (default: no)
- Apply commission to pre-discount subtotal (default: no)

## When commissions become "approved"

Default: when the order moves to `completed` status. Configurable at **Settings → Commissions → Approve commissions when**:

- Order is `processing` (faster — pay before refund window ends)
- Order is `completed` (default — safer)
- After N days from order completion (e.g. 30 days — buffer for refunds)

## Pending vs approved vs paid

- **Pending** — order hasn't yet hit your approval trigger
- **Approved** — eligible for payout
- **Paid** — included in a completed payout

## Industry baselines

- **Digital products** — 10–30%
- **Physical products with margin** — 5–15%
- **High-margin services / subscriptions** — 20–50% first-month, lower trailing
- **B2B / high-AOV** — 5–10%

## Related

- [Per-product overrides](/docs/commissions/per-product)
- [Two-tier (MLM) referrals](/docs/commissions/two-tier)
- [Refunds + chargebacks](/docs/commissions/refunds)
