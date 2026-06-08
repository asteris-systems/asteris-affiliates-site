---
url: /migrate/from-skyverge
title: "Switching from Skyverge WooCommerce plugins to Asteris Affiliates"
meta_description: "Skyverge sells WooCommerce Sequential Order Numbers Pro and several utility plugins at $59–$79/yr each. Asteris Affiliates includes Sequential Order Numbers (full) in the free tier plus 19 more modules."
og_title: "Switch from Skyverge plugins to Asteris Affiliates"
og_description: "Skyverge Sequential Order Numbers Pro is $59/yr. Asteris Affiliates includes it in Asteris Free, plus 5 other Free modules and 14 paid modules."
canonical: https://asterisaffiliates.com/migrate/from-skyverge
primary_keyword: skyverge woocommerce alternative
primary_keyword_us_vol: 260
primary_keyword_kd: 14
secondary_keywords:
  - skyverge sequential order numbers alternative
  - woocommerce sequential order numbers free
  - skyverge woocommerce alternative
schema_type: Article + FAQPage
internal_links_out:
  - /docs/modules/sequential-order-numbers
  - /free
  - /modules
  - /pricing
verified_date: 2026-06-03
ai_overview_optimised: true
---

# Migrate from Skyverge plugins

Skyverge built a number of focused WooCommerce utility plugins, the most widely-installed being **WooCommerce Sequential Order Numbers Pro** ($59/yr). The plugin family transferred to GoDaddy in 2019 and has received intermittent updates since. Asteris Affiliates includes a Sequential Order Numbers module that is **fully equivalent to Skyverge Pro and ships free** in Asteris Free.

---

## TL;DR

- One Skyverge plugin → one Asteris module: Sequential Order Numbers Pro → **Sequential Order Numbers** (full, in Asteris Free).
- Existing order numbers stay exactly as they were. The module re-uses WooCommerce's `_order_number` meta key, the same one Skyverge writes to.
- New orders pick up the next number from your existing counter. The migration tab reads Skyverge's `wc_seq_order_number_start` option and seeds the Asteris counter with the next-expected number.
- What carries across cleanly: starting number, current counter position, prefix, suffix, zero-padding length, reset-on-period rules.
- What does **not** carry across: any custom hooks you wrote against `wc_sequential_order_numbers_*` action names (Asteris fires its own `asteris_sequential_*` hooks; both are documented).
- Time: 5–15 minutes.
- Reversible: yes. Asteris reads/writes the same `_order_number` meta key Skyverge uses. Reactivate Skyverge, disable the Asteris module, your data is untouched.

---

## Before you start

1. **Database backup.** UpdraftPlus, BackWPup, or your host's snapshot tool. Capture `wp_options` (where Skyverge stores the counter) and `wp_postmeta` (where `_order_number` lives) before the migration.
2. **Note your current counter position.** Go to **WooCommerce → Settings → Orders** in Skyverge's tab and write down the last-used number, the prefix, the suffix, and the padding. Migration should preserve all of these — but writing them down first means you can spot-check immediately after.
3. **Confirm requirements.** WordPress 6.4+, PHP 8.1+, WooCommerce 8.0+. Asteris Free is sufficient — no paid licence needed for this module.
4. **Confirm HPOS state.** Skyverge's older versions wrote `_order_number` to `wp_postmeta`. WooCommerce's High-Performance Order Storage (HPOS, GA in WC 8.2+) stores order meta in dedicated tables. Asteris reads via `$order->get_meta()` which works in both — but if your store has *just* migrated to HPOS, run the WC → Tools → "Sync order data" task before the Skyverge migration.

---

## What gets imported

| From Skyverge Sequential Order Numbers Pro | To Asteris Sequential Order Numbers | Status |
|---|---|---|
| `wc_seq_order_number_start` (starting number) | `asteris_sequential_start_number` | auto |
| `wc_seq_order_number_skip_free` (skip free orders) | `asteris_sequential_skip_free` | auto |
| `wc_seq_order_number_prefix` | `asteris_sequential_prefix` | auto |
| `wc_seq_order_number_suffix` | `asteris_sequential_suffix` | auto |
| Current counter position (from highest `_order_number` on existing orders) | `asteris_sequential_next_number` (seeded to highest + 1) | auto |
| Existing orders' `_order_number` post meta | unchanged — Asteris reads from the same key | no migration needed |
| Skyverge custom hooks (`wc_sequential_order_numbers_*`) | — | **manual rewrite required** if you used them; map to `asteris_sequential_*` equivalents documented in module docs |

---

## Run the migration

1. Install + activate Asteris Affiliates Free (from wordpress.org) or any paid Asteris tier. Add your licence key if paid.
2. Go to **WooCommerce → Asteris WC → Migrate**.
3. The Skyverge-detection check fires automatically on the active plugin. You will see one card: "Skyverge Sequential Order Numbers Pro detected."
4. Click **Import settings**. The import is idempotent — running it twice is safe.
5. Toggle on the **Sequential Order Numbers** module in **Modules**.
6. Place a test order (Stripe test mode or a manual order set to "processing"). Confirm the new order's number continues the sequence rather than restarting at 1.
7. Deactivate Skyverge Sequential Order Numbers Pro. Re-check the next order. If anything looks off, reactivate Skyverge — your data is intact.

---

## FAQ

### Will my historic order numbers change?

No. Asteris reads the same `_order_number` meta key Skyverge wrote to. Historic orders display exactly the numbers they always did.

### What if I want to reset the counter for a new financial year?

Asteris supports "reset on period" rules: annual (1 Jan), quarterly, or never. Configure under **Modules → Sequential Order Numbers → Settings**. Skyverge Pro had the same setting; it migrates across.

### Does this work on multisite?

Multisite is not supported in Asteris v1.0 (planned for v1.1). If you run Skyverge on a multisite network, each subsite would need its own Asteris activation.

### How does the price comparison actually work?

Skyverge Sequential Order Numbers Pro is $59/yr (publicly listed as of 2026-06-03). Asteris Free includes the same module at $0/yr — that is genuinely the entire saving on this single migration. The real value is everything else Asteris bundles: SEO (Lite), PDF Invoices (Lite), Variation Swatches (Lite), Product Filtering (Lite), and Trust Badges — all free in Asteris Free, plus 14 more paid-only modules in Starter / Pro / Agency.

---

## See also

- [Sequential Order Numbers module docs](/docs/modules/sequential-order-numbers)
- [Asteris Free](/free) — six modules at zero cost, no licence key required
- [Migration hub](/migrate) — all migration adapters
- [Pricing](/pricing)
