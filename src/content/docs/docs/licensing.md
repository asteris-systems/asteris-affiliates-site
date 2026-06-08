---
title: Licensing
description: Activate, validate, deactivate, transfer licences. Site count per tier.
---

The plugin code is **GPL-2.0+**. Your subscription pays for **updates, support, and the licence key** that activates the plugin on your tier's site count.

## Tier site counts

- **Starter** — 1 site
- **Pro** — 3 sites
- **Agency** — 10 sites

## Activate

1. Buy at [pay.asteriscommerce.com](https://pay.asteriscommerce.com) → emailed your licence key
2. **Affiliates → Settings → Licence** → paste key → **Activate**
3. Plugin pings `pay.asteriscommerce.com` with an HMAC-signed request; on success, the site is bound to your licence

## Validate

Every 24 hours the plugin re-validates the licence in the background. If validation fails (network, expired, deactivated), the plugin keeps working but admin notices appear and updates are blocked.

Manually re-validate: **Affiliates → Settings → Licence → Re-validate now**.

## Deactivate (move to another site)

Before installing on a different site, deactivate the current site to free up the slot:

**Affiliates → Settings → Licence → Deactivate this site**

You can also deactivate from your account at [pay.asteriscommerce.com/account](https://pay.asteriscommerce.com/account) → **Sites** → **Remove**.

## Transfer

Same as deactivate + reactivate on the new site. Your data stays on the original site's database; the plugin doesn't migrate data between sites (that's a manual export/import).

## Expired licence

If your subscription expires:

- The plugin **keeps working** on the last installed version
- Updates and support stop until you renew
- Existing affiliates and commissions continue to track normally

To renew, sign in to your account and click **Renew**.

## Refunds

14-day money-back guarantee on new subscriptions. See [Refund Policy](/refund-policy).

## Multi-site / WordPress Multisite

Each network site counts as a separate site against your licence. A 10-site Agency licence can power 10 individual Multisite network sites.
