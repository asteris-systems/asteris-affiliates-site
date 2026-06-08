---
title: Approving + rejecting affiliates
description: Approve, reject, and manage affiliate signups from the WordPress admin.
---

New affiliate signups appear in **Affiliates → Pending**. You can approve, reject, or hold them.

## Approve

1. Go to **Affiliates → Pending**
2. Tick the affiliate(s)
3. **Bulk actions → Approve → Apply**

The affiliate receives a welcome email with their referral link and portal login.

## Reject

Same flow with **Bulk actions → Reject**. Rejected affiliates get an optional notification (toggle in Settings → Notifications).

## Auto-approve

If you want every signup approved automatically: **Settings → Affiliates → Auto-approve new signups**. Useful if you have low fraud risk or you screen affiliates outside the plugin.

## Required fields on signup

By default the signup form captures: name, email, website, payout method, payout details. You can require/remove fields via **Settings → Affiliate signup form**.

## What approved affiliates can do

- Log in to the affiliate portal at `/affiliate-portal`
- View their stats (clicks, conversions, commissions, payouts)
- Generate referral links (vanity `/go/handle` URLs included)
- Copy swipe-copy from the [AI Swipe Copy library](/docs/growth/ai-swipe-copy)
- Update their payout details
- Request a payout (if `Allow self-requested payouts` is enabled)

## Related

- [Suspension + reinstatement](/docs/affiliates/suspension)
- [Bulk actions + CSV export](/docs/affiliates/bulk-actions)
- [Affiliate portal](/docs/affiliates/portal)
