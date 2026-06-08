---
title: License issues
description: Common licence problems — activation failures, validation errors, site count exceeded.
---

## Activation fails with "Invalid licence key"

1. Double-check the key — copy from your account dashboard, not from the welcome email (autocorrect can mangle keys)
2. Confirm the licence is active in your account (subscription not paused/cancelled)
3. Confirm the licence isn't bound to too many sites — see "Site count exceeded" below
4. Check WordPress can reach `pay.asteriscommerce.com`:
   ```bash
   curl -I https://pay.asteriscommerce.com/wp-json/asteris/v1/license/validate
   ```
   Should return 200 OK. If not, your host blocks outbound HTTPS — contact host support.

## "Site count exceeded"

Your licence covers a specific number of sites (1 / 3 / 10). Deactivate from another site first:

- From the other site: **Affiliates → Settings → Licence → Deactivate this site**
- Or from your account: [pay.asteriscommerce.com/account](https://pay.asteriscommerce.com/account) → Sites → Remove

## "Licence expired" with active subscription

The plugin pings `pay.asteriscommerce.com` every 24h for validation. Brief network failures can cause a false expiry. **Re-validate now** in Licence settings usually fixes it.

If it persists for more than 24h, check your subscription billing status. A failed renewal payment expires the licence until you update payment.

## Plugin keeps working without licence

By design. The plugin code is GPL-2.0+ — it will function without a valid licence. What you lose:

- **Updates** — no security patches, no new features
- **Support** — email goes unanswered

Renew to restore both.

## Migrating to a new server

1. **Deactivate** on the old server
2. Copy files + database to new server
3. On new server: **Affiliates → Settings → Licence → Activate** with the same key

## Multisite

Each network site counts separately. 10-site Agency licence = 10 individual Multisite network sites (or 10 single-site WP installs, or a mix).

## Still stuck?

Email [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) with:
- Your licence key (first 4 + last 4 chars only is fine for support context)
- Site URL
- Error message exact text
- WordPress + PHP versions

## Related

- [Licensing](/docs/licensing)
- [Tracking issues](/docs/troubleshooting/tracking)
