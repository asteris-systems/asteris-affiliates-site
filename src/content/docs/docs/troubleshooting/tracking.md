---
title: Tracking issues
description: Commissions not crediting, referral clicks not counting, cookie attribution failing.
---

## Commission not credited on a known referred order

Check in order:

1. **Was the referral cookie present?**
   In the order admin, scroll to **Asteris Affiliates → Referral context**. Should show the affiliate, click timestamp, source URL.
   - If "no referral cookie present" → the cookie expired, was blocked, or the visitor came from a non-tracked link.

2. **Was the affiliate active?**
   Suspended affiliates don't credit. Check **Affiliates → All** for status.

3. **Was the commission revoked?**
   Refunds revoke commissions. Check **Commissions → All → search by order ID** to find revoked entries.

4. **Cookie blocking?**
   Brave, Safari ITP, ad-blockers may block the cookie. Asteris uses a first-party cookie which most browsers allow, but aggressive ITP settings can still block.

5. **Self-referral block?**
   If buyer's email matches the affiliate's email/payout-email, self-referral is blocked. See [self-referral prevention](/docs/fraud/self-referral).

## Vanity /go/{handle} returns 404

- Re-flush rewrite rules: **Settings → Permalinks → Save** (no changes needed, just save)
- Confirm the affiliate exists + is active
- Check `?asteris_debug=1` on the URL (admin only) for verbose tracking output

## Cookie attribution to wrong affiliate

When multiple referral cookies are present, the **last click wins** by default. Change to **first click wins** at **Settings → Tracking → Attribution model**.

## "Pending commissions" never approve

Auto-approval requires a trigger. Check:

- **Settings → Commissions → Approve commissions when** — make sure it's set (not "Manual only" unless intentional)
- The order status is reaching the configured trigger (e.g. `completed`)
- WP-Cron is firing (try `wp cron event run --due-now`)

## IP throttle blocking legitimate traffic

If you serve carrier-shared IPs (mobile / CG-NAT), raise click throttle caps or disable per-IP throttling. See [IP throttling](/docs/fraud/ip-throttling).

## Still stuck?

Enable debug logging: **Settings → Advanced → Debug log → Enable**. Reproduce the issue. Email [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) with the resulting log + the affected order ID.

## Related

- [Self-referral prevention](/docs/fraud/self-referral)
- [IP throttling](/docs/fraud/ip-throttling)
- [Default commission rates](/docs/commissions/rates)
