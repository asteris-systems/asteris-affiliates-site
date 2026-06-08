---
title: Admin impersonation ("View as")
description: View any affiliate's portal as if you were them — handy for support, debugging, and onboarding help.
---

"View as" lets you log in to the affiliate portal as a specific affiliate without knowing their password. Useful for screenshotting their dashboard for support tickets, debugging permission issues, or walking a new affiliate through their setup.

## Start impersonating

1. **Affiliates → All affiliates** → click an affiliate
2. Click **View as this affiliate** (top right)
3. A yellow banner appears at the top of every page: **"You are viewing as [name] — Stop impersonating"**
4. Click **Stop impersonating** to return to your admin session

## What you can see

- Their dashboard (stats, recent commissions, pending payouts)
- Their swipe-copy library access
- Their landing pages
- Their payout history
- Their profile settings

## What you can't do

Impersonation is **read-only by default**. You cannot:

- Submit a payout request as them
- Update their payout details
- Change their password
- Delete their account

To enable write operations (rare — usually only for fixing broken accounts): **Settings → Impersonation → Allow write operations**.

## Audit log

Every "View as" session is logged with admin user, target affiliate, start time, end time, and IP. View at **Affiliates → Audit log → Impersonation events**.

## Privacy + GDPR

The affiliate is **not notified** by default that you've impersonated them. If you operate in a jurisdiction requiring notification: **Settings → Impersonation → Notify affiliate on impersonation** (sends an email after each session ends).

## Related

- [Affiliate portal](/docs/affiliates/portal)
- [Approving + rejecting](/docs/affiliates/manage)
