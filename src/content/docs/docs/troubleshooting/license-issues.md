---
title: License issues — activation, limits, and migrations
description: Fix "License limit reached", "After plugin update I can't activate", "I migrated my site and lost activation", and other licensing problems with Asteris Affiliates.
---

If you're running into a licensing problem, this page walks through the four most common scenarios and how to solve each. If none match, email [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) (1 business day SLA, Pro/Agency/Founder) or post in the [WordPress.org plugin forum](https://wordpress.org/support/plugin/asteris-free/) (Asteris Free, 2–3 business days fallback).

## First: where does your license live?

Asteris licenses are stored on **Lemon Squeezy** — they are the source of truth, not Asteris. This means:

- Your license persists even if you delete the plugin
- Activation slots are tracked by Lemon Squeezy across all sites you install on
- You can manage activations directly from your [Lemon Squeezy customer portal](https://app.lemonsqueezy.com/my-orders) (search for "Asteris")

If you're not sure which Lemon Squeezy account holds your license, check the email address you used when you purchased — it'll be the inbox that received `Your Asteris license is ready`.

---

## "License limit reached" when activating

**What's happening:** Your tier's site activation limit is already used by another install.

| Tier | Site limit |
|---|---|
| Asteris Starter | 1 site |
| Asteris Pro | 3 sites |
| Asteris Agency | Unlimited |
| Asteris Founder | 1 site |

**Fix (in order — try the first one that applies):**

### A. You already use Asteris on another site you still own

You need to free a slot before activating on this one. Two ways:

**Easiest — deactivate from the other site's WordPress admin:**

1. Log into the other site's WordPress admin
2. Go to **Asteris → License**
3. Click **Deactivate license** (releases the slot back to Lemon Squeezy)
4. Now come back to this site and activate

**If you can't access the other site (deleted / locked out / sold):**

1. Log into [your Lemon Squeezy customer portal](https://app.lemonsqueezy.com/my-orders)
2. Find your Asteris order → click **Manage licenses**
3. Find the old activation in the list → click **Deactivate**
4. The slot is now free — activate on the new site

### B. Your slot count is wrong (it's actually free, but LS thinks it's not)

This can happen if you cloned a site (dev → staging → production) without uninstalling Asteris cleanly first. Each clone consumed a slot.

**Fix:** Use the Lemon Squeezy customer portal (method above) to find and deactivate the stale instances. You can see when each was activated and what URL it was registered for — that helps identify which one to release.

### C. You need more sites than your tier allows

Upgrade. From the Asteris admin:

1. Asteris → License → **Upgrade license**
2. Pick your new tier (Starter → Pro is pro-rated; Pro → Agency same)
3. Pay via Lemon Squeezy
4. Your new license key is sent to your email; replace the existing one

Or contact [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) for help with upgrades.

---

## "After plugin update I can't activate" — auto-fixed in 1.9.5+

**Short version:** if you're on Asteris 1.9.5 or later, your site self-heals the next time you log into wp-admin. Read on only if something didn't go as expected.

### The bug that was there (≤1.9.2)

Before 1.9.3, the activation identifier sent to Lemon Squeezy included the plugin version number (e.g., `example.com — Asteris v1.9.2`). Every plugin update where you re-entered the licence key could consume a fresh activation slot. A Starter customer (1-site limit) could hit the cap after the first update.

### How 1.9.5+ heals it automatically

On the first admin page load after upgrading to 1.9.5+, Asteris quietly runs a one-time migration:

1. Deactivates the old version-suffixed slot on Lemon Squeezy (frees it)
2. Re-activates with a new clean identifier (no version suffix — won't burn slots on future updates)
3. Updates the local state and marks the migration done

**You don't have to do anything.** No clicks, no key re-entry, no portal visit. If everything went well, the migration is invisible — your modules keep working, your licence stays valid.

### If you see a yellow admin notice asking you to re-activate

Sometimes the auto-migration can't complete cleanly. The most common reason: between freeing the old slot and grabbing a new one, another site or process briefly grabbed the slot (Starter's 1-slot limit makes this more likely).

If you see this notice:

> ⚠ **Asteris:** Your licence needs re-activation after our cleanup. Reason: [X]. Go to Asteris → Licence and click Activate (your key is still saved).

Here's what to do:

1. Go to **Asteris → Licence** in your wp-admin
2. Your licence key is **still saved** — you don't need to retype it
3. Click **Activate licence**
4. Should succeed immediately

**If activation still fails:** the slot is genuinely consumed elsewhere. Check your [Lemon Squeezy customer portal](https://app.lemonsqueezy.com/my-orders) → Manage licences → look for any other active instances. Deactivate the one that shouldn't be there.

### If you're on ≤1.9.4 and stuck

Manual cleanup path (one-time):

1. **Update Asteris to 1.9.5 or later** — the auto-migration ships here
2. Log into wp-admin once after updating — migration runs in the background
3. If you still have multiple stale slots from past updates, log into your [Lemon Squeezy customer portal](https://app.lemonsqueezy.com/my-orders) → Manage licences → manually deactivate any instances whose names contain `— Asteris v` (those are the old version-suffixed ones)

### If you want us to clean it up for you

Email [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) with your licence key — we'll deactivate the stale instances from our side. SLA per [the support matrix](/support).

---

## "I migrated my site to a new URL and lost activation"

**What's happening:** Your license was activated for `oldsite.com`, but Asteris now reports the site as `newsite.com`. Lemon Squeezy sees this as a new site — and your old slot is still in use by `oldsite.com`.

**Two scenarios:**

### Scenario 1: You changed the WordPress Site URL setting (Settings → General)

Your activation is now associated with a host that doesn't exist. Free it and re-activate:

1. Asteris → License → **Deactivate license** (clears the local activation)
2. Then click **Activate license** with the same key — registers under the new URL

### Scenario 2: You moved the site to a new domain entirely (e.g., `example.com` → `mybrand.com`)

Same fix as above — deactivate, then re-activate. If you've completely lost access to the old domain and your slot count is now wrong on Lemon Squeezy, use the customer portal to manually deactivate the stale `example.com` instance.

**To prevent this in the future:** Asteris treats `example.com`, `www.example.com`, `https://example.com`, and `https://www.example.com/` as the same site (since 1.9.3). So if you only changed protocol or added/removed `www`, you don't need to re-activate. But if you changed the actual hostname, you do.

---

## "My license shows valid in Asteris but a paid module is locked"

Two possible causes:

### Cause 1: The module isn't in your tier

Asteris Starter doesn't include every module. Specifically:
- **AI Suite** — Pro and above only
- **SEO (full)** — Pro and above only
- **Asteris Links** — Pro and above only

If you're on Starter and need these, upgrade to Pro.

### Cause 2: Your validation cache is stale

Asteris re-validates your license once per day in the background. If you just upgraded tiers, the local cache may not have refreshed yet.

**Force a re-validation:**

1. Asteris → License → **Re-check license** (top right of the license screen)
2. Page should refresh with the new tier
3. Your modules unlock

If it still doesn't update, log out of WordPress admin, log back in, and check again. Worst case: deactivate and re-activate the license (no slot burn, since you're re-activating on the same site).

---

## "I deleted Asteris but my license slot is still consumed"

**If you deleted Asteris ≥1.9.3, this shouldn't happen** — the uninstall hook automatically deactivates your slot on Lemon Squeezy. But if you deleted ≤1.9.2 (the buggy versions), the slot stays locked.

**Fix:** Log into your [Lemon Squeezy customer portal](https://app.lemonsqueezy.com/my-orders) and manually deactivate the stale instance.

Or email [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) and we'll clear it.

---

## "I'm running Asteris on a development/staging site — do I need a license?"

**No.** Asteris auto-detects development environments and bypasses license enforcement on hostnames ending in:

- `.test`
- `.local`
- `localhost`

Plus any host where you've explicitly set `define( 'ASTERIS_DEV_MODE', true );` in your `wp-config.php`.

This means you can develop and test freely without burning your license slot. Only your production hostname needs an activation.

---

## "Asteris is in offline mode / grace period"

If Asteris can't reach Lemon Squeezy (network outage, firewall blocking outbound HTTPS, your hosting provider's outbound restrictions), it falls back to a cached license state:

- **0–7 days offline:** Cached "valid" state is honored — Asteris continues working
- **7–30 days offline:** Cached state is honored but a warning is shown in admin
- **30+ days offline:** Cached state expires; Asteris falls back to free-tier behavior

**Common causes:**

1. **WP Engine, Pantheon, or similar managed host blocking outbound HTTPS** — whitelist `api.lemonsqueezy.com` in their dashboard
2. **Wordfence or similar security plugin blocking outbound requests** — add exception for `api.lemonsqueezy.com`
3. **Server-level firewall (iptables, etc.)** — your sysadmin needs to allow outbound HTTPS to LS

If you've confirmed the network is fine and you're still in offline mode, email [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) — we can check our end.

---

## Founder: special notes

Founder licenses have one site activation and never expire. A few specific things to know:

- **Cap is hard.** Your slot is permanent — install on your one site for life
- **No renewals.** You'll never see a renewal email or expiry warning
- **All future modules included.** When Asteris ships v1.1, v1.2, every new module appears in your install
- **Migrating to a new site is fine.** Deactivate from the old site, activate on the new — same slot, just relocated
- **You CAN'T transfer the license to a different person.** It's tied to your Lemon Squeezy customer record (per [EULA](/license))

---

## Still stuck?

| Tier | First-response SLA | Channel |
|---|---|---|
| Asteris Free | 2–3 business days (forum first) | [WP.org plugin forum](https://wordpress.org/support/plugin/asteris-free/) → [support@](mailto:support@asterisaffiliates.com) |
| Asteris Starter | 2–3 business days | [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) |
| Asteris Pro | 1 business day | [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) |
| Asteris Agency | 1 business day | [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) |
| Asteris Founder | 1 business day, for life | [support@asterisaffiliates.com](mailto:support@asterisaffiliates.com) (or direct to [founder@asteriscommerce.com](mailto:founder@asteriscommerce.com)) |

Include in your email:
- Your license key (the one shown in Asteris → License)
- Your Lemon Squeezy order email (might differ from where you want the reply)
- The URL of the site giving you trouble
- A screenshot of the error message

We'll have you sorted within SLA.
