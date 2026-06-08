---
title: Payout issues
description: PayPal API errors, failed bank transfers, batches not running, balance mismatches.
---

## PayPal API: "INVALID_CREDENTIALS"

- Confirm you're using **Live** credentials (not Sandbox) for production
- Re-create the Developer App on [developer.paypal.com](https://developer.paypal.com) and paste fresh Client ID + Secret
- Make sure the **Payouts** scope is enabled on the app

## PayPal API: "PAYEE_ACCOUNT_RESTRICTED"

The recipient's PayPal account can't receive funds (often unverified or country-restricted). Options:

- Ask the affiliate to verify their PayPal account
- Switch them to bank transfer
- Mark the individual failed payout and retry the rest

## PayPal API: "INSUFFICIENT_FUNDS"

Your own PayPal Business account doesn't have enough to cover the batch. Top up from your linked bank, or fund a smaller batch.

## Batch didn't run on schedule

WP-Cron requires page traffic to trigger. On low-traffic sites, scheduled batches drift.

Fix: replace WP-Cron with a system cron:

```cron
0 2 * * 1  cd /var/www/yoursite.com && wp asteris-aff run-payouts --quiet
```

(Runs every Monday at 02:00.)

## Balance doesn't match expected total

Common causes:

1. **Revoked commissions** counted somewhere but not deducted from balance — run `wp asteris-aff recompute-aggregates`
2. **Pending vs approved** — only `approved` counts toward payout. Check filter on the balance display.
3. **Cross-currency mismatch** — if you've changed payout currency mid-stream, historical commissions may need re-conversion. Email support.

## Affiliate says they didn't receive the payout email

- Check **Affiliates → Audit log → Throttled emails** — they may have been throttled (see [email throttling](/docs/growth/email-throttling))
- Confirm the email isn't in spam (most likely)
- Resend manually: **Affiliates → [affiliate] → Resend last payout email**

## Bank CSV rejected by bank

Each bank has a slightly different expected CSV format. The plugin ships templates for the major AU + US banks. If yours isn't covered:

- Use the **Generic ABA** format and adapt manually
- Or set custom column mappings at **Settings → Payouts → Bank CSV → Custom mapping**

## Payouts queued but never sent

Check:

- **Payouts → Failed** — they may have errored silently
- WP-Cron is firing: `wp cron event list | grep asteris_aff`
- PHP max execution time isn't hitting on large batches; for 1000+ recipients use WP-CLI: `wp asteris-aff run-payouts`

## Still stuck?

Email [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) with the payout batch ID, recipient count, and any error from the audit log.

## Related

- [PayPal API auto-batch](/docs/payouts/paypal-api)
- [Bank transfer](/docs/payouts/bank-transfer)
- [WP-CLI commands](/docs/dev/wp-cli)
