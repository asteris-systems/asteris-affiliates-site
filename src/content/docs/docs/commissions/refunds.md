---
title: Refunds + chargebacks
description: When a referred order is refunded or charged back, the commission can be reversed automatically.
---

Asteris Affiliates listens to WooCommerce/EDD/Surecart refund hooks. When a referred order is refunded — fully or partially — the commission is recalculated.

## What happens on full refund

1. The commission status moves to `revoked`
2. The amount is deducted from the affiliate's `pending` or `approved` balance (whichever bucket it's in)
3. If the commission was already in a `paid` payout, the deduction queues against the affiliate's next payout
4. Tier-2 commissions are revoked alongside

The affiliate gets an optional notification: **Settings → Notifications → Notify on commission revoked**.

## What happens on partial refund

The commission is recalculated against the **post-refund order total**. If the order was $100 with $10 commission and you refund $30, the commission becomes $7 (10% of $70).

## Chargebacks

Stripe and PayPal chargebacks trigger the same reversal flow. Asteris listens for the `charge.dispute.created` Stripe webhook and the `CUSTOMER.DISPUTE.CREATED` PayPal webhook.

If the chargeback is later resolved in your favour, you can manually reinstate the commission: **Commissions → [commission] → Reinstate**.

## Refund grace period

To avoid the awkward "paid commission then refunded a day later" loop, set an approval delay: **Settings → Commissions → Approve commissions when → After N days from order completion**.

A 30-day delay covers most refund windows. The trade-off: affiliates wait longer to get paid.

## Net-negative balances

If reversals exceed the affiliate's current pending balance, their balance can go negative. The plugin won't pay them until they earn enough to clear the negative.

If you want to forgive a negative balance: edit the affiliate → **Balance → Adjust → +amount with reason "refund forgiven"**.

## Related

- [Default commission rates](/docs/commissions/rates)
- [Manual payouts](/docs/payouts/manual)
