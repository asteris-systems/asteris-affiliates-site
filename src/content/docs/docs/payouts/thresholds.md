---
title: Payout thresholds + schedules
description: Set the minimum balance required for payout, the schedule, and the approval window.
---

Thresholds + schedules control **when** commissions become eligible to pay out, **how often** you run batches, and the **minimum balance** required to include an affiliate in a batch.

## Minimum threshold

**Settings → Payouts → Minimum balance to include in batch**:

- **$50** — standard. Filters out tiny commissions that don't justify the transaction fee.
- **$100** — common for international transfers with $20+ wire fees.
- **$25 / $0** — for stores that want to pay everyone every cycle.

Affiliates below the threshold carry their balance to the next batch.

## Approval window

How long after order completion before a commission becomes payable:

**Settings → Commissions → Approve commissions after N days**:

- **0 days** — immediate (highest payout speed, highest refund risk)
- **30 days** — covers WC's default refund window (recommended)
- **60 days** — for stores with longer refund/chargeback exposure

## Schedule

**Settings → Payouts → Schedule**:

| Frequency | Best for |
|---|---|
| **Weekly** | Small affiliate counts, fast feedback loops |
| **Bi-weekly** | Most stores |
| **Monthly** | Large affiliate counts, lower admin overhead |
| **Manual only** | Full control, no automated batches |

The batch runs on the chosen day. WP-Cron triggers it on the first page view after the scheduled time — for reliability, replace WP-Cron with a real system cron.

## Schedule visibility for affiliates

Affiliates can see the next scheduled payout date in their portal. Disable at **Settings → Affiliate portal → Show next payout date** if you'd rather not commit publicly.

## Per-method scheduling

Different payout methods can run on different schedules. Example:

- PayPal API — weekly auto-batch
- Bank transfer — monthly CSV
- Manual — quarterly

Configure at **Settings → Payouts → Per-method schedule**.

## Dry-run a batch

Before any scheduled batch runs, the plugin can email you a preview. Enable at **Settings → Payouts → Email dry-run preview 24h before**.

## Related

- [PayPal API auto-batch](/docs/payouts/paypal-api)
- [Refunds + chargebacks](/docs/commissions/refunds)
