---
url: /migrate/from-monsterinsights
title: "Switching from MonsterInsights to Asteris Affiliates"
meta_description: "MonsterInsights Plus is $99/yr (Pro $199/yr with the eCommerce addon). Asteris Affiliates includes a Google Analytics 4 module with enhanced-ecommerce events plus 19 other modules for $149/yr."
og_title: "Switch from MonsterInsights to Asteris Affiliates"
og_description: "MonsterInsights Pro is $199/yr for the eCommerce addon. Asteris Affiliates includes GA4 + WooCommerce enhanced-ecommerce events at $149/yr Starter."
canonical: https://asterisaffiliates.com/migrate/from-monsterinsights
primary_keyword: monsterinsights alternative
primary_keyword_us_vol: 880
primary_keyword_kd: 22
secondary_keywords:
  - monsterinsights woocommerce alternative
  - free monsterinsights alternative
  - google analytics 4 woocommerce plugin
schema_type: Article + FAQPage
internal_links_out:
  - /docs/modules/analytics
  - /modules
  - /pricing
verified_date: 2026-06-03
ai_overview_optimised: true
---

# Migrate from MonsterInsights

MonsterInsights is the most widely-installed GA4 / Universal Analytics plugin for WordPress, with a free tier on .org and paid tiers from $99–$399/yr (the WooCommerce eCommerce addon requires Pro at $199/yr). The Asteris **Analytics** module covers the same GA4 + enhanced-ecommerce ground without an add-on and without an admin dashboard inside WordPress (we don't try to compete with Google's own GA4 reports).

---

## TL;DR

- One MonsterInsights tracker → one Asteris module: **Analytics**.
- What carries across: GA4 Measurement ID, GTM container ID (if you used the GTM addon), the choice to skip-tracking-for-admins, IP anonymisation, DNT respect.
- What does **not** carry across: the in-WordPress GA4 reports dashboard (Asteris deliberately does not duplicate it — view your reports in GA4 directly); MonsterInsights' "Custom Dimensions" addon mappings (rebuild manually in GTM); MonsterInsights' affiliate-link tracking module (use Asteris Links instead, which has its own click tracker).
- Time: 5–10 minutes.
- Reversible: yes. Asteris Analytics injects its own gtag/GTM snippets and writes only its own option namespace. Reactivate MonsterInsights, disable Asteris Analytics, your historic GA4 data is unaffected (it lives in GA4, not WordPress).

---

## Before you start

1. **Database backup** (UpdraftPlus, BackWPup, host snapshot). Captures `wp_options` where both plugins store IDs.
2. **Verify GA4 reports are working in GA4 itself.** Open analytics.google.com → your property → Realtime. If MonsterInsights is firing correctly, you'll see live users. If not, fix that before migrating — Asteris does not change *what GA4 sees*, it changes the *plugin firing the events*.
3. **Note your current MonsterInsights settings.** Measurement ID, GTM container ID (if any), checkboxes for admin-skip, IP anonymisation, DNT. Migration should preserve these.
4. **Confirm requirements.** WordPress 6.4+, PHP 8.1+, WooCommerce 8.0+, Asteris Affiliates Starter / Pro / Agency (Analytics is paid-only).
5. **If you use MonsterInsights' eCommerce addon (Pro tier),** confirm WooCommerce events appear in GA4 → Events → `purchase`, `add_to_cart`, etc. Asteris Analytics fires the same event names (`view_item`, `add_to_cart`, `remove_from_cart`, `begin_checkout`, `purchase`, `view_cart`) using the standard GA4 enhanced-ecommerce parameter shapes — your existing GA4 reports and audiences continue working with zero changes.

---

## What gets imported

| From MonsterInsights | To Asteris Analytics | Status |
|---|---|---|
| `monsterinsights_settings.ga4_measurement_id` | `asteris_analytics_ga4_id` | auto |
| `monsterinsights_settings.gtm_container_id` (Pro) | `asteris_analytics_gtm_id` | auto |
| `monsterinsights_settings.ignore_users` (admin-skip) | `asteris_analytics_skip_admins` | auto |
| `monsterinsights_settings.anonymize_ip` | `asteris_analytics_anonymize_ip` | auto |
| `monsterinsights_settings.dnt_enabled` | `asteris_analytics_respect_dnt` | auto |
| MonsterInsights eCommerce addon `events_mode` (enhanced ecom on/off) | `asteris_analytics_enhanced_ecommerce` | auto (defaults on) |
| MonsterInsights Pro: Custom Dimensions mappings | — | **manual rebuild in GTM** required |
| MonsterInsights in-WordPress reports dashboard | — | **not duplicated** — use GA4 reports directly |
| MonsterInsights Pro: affiliate link tracker | — | **use Asteris Links module** (Pro+ tier) |

---

## Run the migration

1. Install + activate Asteris Affiliates. Add your licence key (Starter or higher).
2. Go to **WooCommerce → Asteris WC → Migrate**.
3. The MonsterInsights-detection check fires automatically. You will see one card: "MonsterInsights / MonsterInsights Pro detected."
4. Click **Import settings**. Imports are idempotent.
5. Toggle on the **Analytics** module in **Modules**.
6. In an incognito window, visit a product page → add to cart → place a test order (Stripe test mode or manual order set to "processing"). Use the Google Tag Assistant Chrome extension to confirm `view_item`, `add_to_cart`, and `purchase` events fire.
7. Verify in GA4 → Reports → Realtime that events arrive within 60 seconds.
8. **Wait 24 hours.** Compare GA4's daily totals before vs after — they should match within ~1% (within normal variation).
9. Once you're confident, deactivate MonsterInsights. Re-check GA4 the next day.

---

## FAQ

### Will I lose my GA4 historic data?

No. All your historic data lives in Google Analytics, not in the WordPress plugin. Both MonsterInsights and Asteris Analytics are *transmitters* — Google is the *recorder*. Switching transmitters does not affect what Google has already stored.

### Will I see GA4 reports inside WordPress like MonsterInsights does?

No, and this is deliberate. MonsterInsights' in-WordPress reports duplicate GA4's own dashboards and the duplication causes a real problem: when the two disagree (and they sometimes do, due to refresh cadence and sampling), users don't know which to trust. We chose to send people to GA4 directly. Bookmark `analytics.google.com` and pin it.

### What about Universal Analytics (UA-XXXXX)?

Universal Analytics has been sunset by Google as of 1 July 2024. Asteris Analytics is GA4-only. If MonsterInsights is still firing UA events to a property you haven't migrated to GA4 yet, that property is no longer collecting data. Migrate to GA4 in Google's console first, then run this migration.

### How does the price comparison actually work?

MonsterInsights Plus is $99/yr but does NOT include eCommerce events. MonsterInsights Pro at $199/yr is the tier most WooCommerce stores actually need for purchase tracking. Asteris Starter is $149/yr for the same GA4 + WC enhanced-ecommerce capability plus 19 other modules. Founder pricing locks $149/yr forever (continuous subscription).

---

## See also

- [Analytics module docs](/docs/modules/analytics)
- [Migration hub](/migrate) — all migration adapters
- [Pricing](/pricing)
