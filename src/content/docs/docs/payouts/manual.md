---
title: Manual payouts
description: Track commissions in Asteris, pay outside the plugin (Wise, Stripe Connect, crypto, gift cards).
---

If your payout method isn't PayPal or bank transfer, Asteris Affiliates can still track everything and let you mark commissions paid manually after you've sent funds via your channel of choice.

## When to use manual

- **Wise / Revolut** — until v1.2 Wise integration ships
- **Stripe Connect direct** — until v1.3 ships
- **Crypto** — USDC/BTC etc.
- **Gift cards / store credit** — pay affiliates in shop credit
- **Cheque** — if you must

## Flow

1. Affiliate chooses **Manual / external** as their payout method
2. They provide a free-text "Payout instructions" field (e.g. "Wise GBP — see profile for details")
3. When you owe them, you pay via your channel
4. **Payouts → New batch → Method: Manual** → tick affiliates → **Mark paid**
5. Each affiliate gets the standard "Payout sent" email

## Bulk mark-paid via CSV

For large batches, export pending payouts to CSV, pay them all externally, then re-import the CSV with a `paid` column marked:

```bash
wp asteris-aff payouts export --status=pending > pending.csv
# pay everyone in pending.csv via your channel
wp asteris-aff payouts mark-paid --csv=pending.csv
```

## Per-affiliate payout notes

Each manual payout can include a reference (transaction ID, cheque number, crypto tx hash). This appears in the affiliate's portal payout history for their records.

## Tax / 1099 / W-9

If you're in the US, you need to issue 1099-NEC forms to affiliates paid $600+ in a calendar year. Asteris Affiliates **doesn't generate 1099s** (yet — queued for v1.3). The CSV export gives you the data; feed it into your accounting software.

## Audit trail

Every manual mark-paid logs the admin user, timestamp, reference, and amount. View at **Affiliates → Audit log → Payout events**.

## Related

- [PayPal API auto-batch](/docs/payouts/paypal-api)
- [Bank transfer](/docs/payouts/bank-transfer)
- [Bulk actions + CSV export](/docs/affiliates/bulk-actions)
