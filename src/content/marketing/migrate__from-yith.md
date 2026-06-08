---
url: /migrate/from-yith
title: "Switching from YITH Wishlist to Asteris Affiliates"
meta_description: "YITH WC Wishlist Premium is $94/yr. Asteris Affiliates Starter is $149/yr and includes Wishlist plus 19 more modules. Migration preserves customer wishlists."
og_title: "Switch from YITH Wishlist to Asteris Affiliates"
og_description: "YITH Wishlist is $94/yr. Asteris Affiliates covers Wishlist plus 18 more modules for $149/yr. Customer wishlist data migrates."
canonical: https://asterisaffiliates.com/migrate/from-yith
primary_keyword: yith wishlist alternative
primary_keyword_us_vol: 70
primary_keyword_kd: 33
secondary_keywords:
  - replace yith wishlist
  - yith wishlist migration
schema_type: Article + FAQPage
internal_links_out:
  - /yith-vs-asteris
  - /docs/migrations/from-yith-wishlist
  - /modules
  - /pricing
verified_date: 2026-06-01
ai_overview_optimised: true
---

# Migrate from YITH plugins

This walkthrough covers consolidating five YITH plugins into Asteris Affiliates: **YITH Wishlist**, **YITH Request a Quote**, **YITH WC Color and Label Variations**, **YITH WC Badge Management**, and **YITH WC Cart Messages**. They map to six Asteris modules: Wishlist, Quote / Enquiry, Variation Swatches, Feature Labels, Product Badges, and Free Shipping Bar.

## TL;DR

- **Wishlist** is the only YITH source with a built-in automated adapter. Customer wishlists are imported by user, collapsing all of a user's YITH lists into one Asteris wishlist.
- **Request a Quote, Color/Label Variations, Badge Management, and Cart Messages** have no automated importer. The Asteris data shapes are different enough that these are manual rebuilds, not data migrations.
- Expect 30–90 minutes for a small store, longer if you have many badged products, many variation attributes with swatches, or a large quote-request archive to preserve.
- Asteris modules can run side-by-side with the YITH plugins during cutover. Test on a staging site first.
- Reversible: Asteris does not delete or modify YITH tables or YITH post meta. Deactivating the Asteris modules and re-enabling YITH restores the previous behaviour.

---

## Before you start

1. Take a full database backup (UpdraftPlus, WP Engine snapshot, host snapshot — whichever you use).
2. Clone the site to staging if possible and run the migration there first.
3. Confirm requirements: PHP 8.1+, WordPress 6.4+, WooCommerce 8.0+.
4. Deactivate page-cache and object-cache plugins for the import window, or flush after each step.
5. Note current versions of YITH Wishlist, YITH Request a Quote, YITH Color and Label Variations, YITH Badge Management, and YITH Cart Messages. Record any custom CSS targeting their classes — Asteris uses different selectors.
6. Export your YITH quote-request archive to CSV if you need it for records (Asteris does not import historical quote requests).
7. Make a list of currently-configured swatches (attribute → term → colour/image) and active badges. You will rebuild these by hand.

---

## What gets imported

| From YITH | To Asteris | Status |
|---|---|---|
| `wp_yith_wcwl_items.user_id` + `prod_id` (Wishlist items per user) | User meta `asteris_wishlist` (array of product IDs) | **Auto** — lossy: list names and tokens are dropped |
| `wp_yith_wcwl` lists (named lists, shared tokens) | Collapsed into a single Asteris wishlist per user | **Auto** — lossy: multi-list structure is flattened |
| `wp_yith_wcwl_items.dateadded` | Not stored | **Not migrated** |
| Guest wishlists (cookie-based) | Not migrated | **Not migrated** — guests start fresh |
| Post meta `_yith_ywraq_enable` (per-product quote toggle) | Post meta `_aqe_mode` (per-product mode: alongside / replace / disabled) | **Manual** |
| Post meta `_yith_ywraq_price_display` | No equivalent — Asteris hides price only when mode is `replace` | **Manual / lossy** |
| Quote-request CPT `yith_ywraq_request` and items | Asteris CPT `asteris_enquiry` with meta `_aqe_product_id`, `_aqe_name`, `_aqe_email`, `_aqe_phone`, `_aqe_message`, `_aqe_qty`, `_aqe_status` | **Not migrated** — historical quotes stay in YITH |
| Attribute term meta `_ywccp_color_type` | Term meta `_avs_type` (`color` / `image` / `text`) | **Manual** |
| Attribute term meta `_ywccp_color` | Term meta `_avs_color` (hex) | **Manual** |
| Attribute term meta `_ywccp_color_2` (dual-colour swatches) | No equivalent — Asteris swatches are single-colour | **Not migrated** |
| Attribute term meta `_ywccp_color_image` / `swatch_thumbnail` | Term meta `_avs_image` (image URL) | **Manual** |
| YITH attribute "label" type (text pill) | Term meta `_avs_type = text` | **Manual** |
| CPT `yith-wcbm-product-badge` (badge designs) | Post meta `_asteris_badge_custom` (per-product text) + `_asteris_badge_custom_bg` / `_asteris_badge_custom_tx` (colours) | **Manual** — Asteris is per-product, not a reusable badge library |
| Product meta `_ywbm_badge` (assigned badge IDs) | Per-product custom badge text + automatic Sale / New badges | **Manual** |
| Image-based YITH badges | No equivalent — Asteris badges are text-only | **Not migrated** |
| Option `ywcm_messages` (cart message rules) | Free Shipping Bar option `asteris_free_shipping_bar_msg_progress` / `_msg_achieved` | **Manual** — Asteris only handles the free-shipping-threshold case |
| Conditional cart messages (cart contents, coupons applied, user role, etc.) | No equivalent | **Not migrated** |

---

## What does NOT get imported

- **YITH Wishlist email reminders.** Asteris has no scheduled-email engine in v1.0.
- **Multiple named wishlists per customer.** Asteris stores one wishlist per user.
- **Wishlist share tokens and public share URLs.** Existing share links break.
- **Guest wishlist cookies.** Guests must rebuild their wishlist after cutover.
- **Wishlist analytics dashboard.** Asteris has no per-product wishlist count report at v1.0.
- **Historical quote-request records.** The YITH `yith_ywraq_request` CPT is left in the database; nothing reads it. Export to CSV first if you need an archive.
- **Quote-to-order conversion flow.** YITH's "approve quote → checkout pre-fill" workflow does not exist in Asteris. The Asteris enquiry is a contact form that emails the admin and stores the request; conversion is manual.
- **PDF quote generation.** Not in Asteris Quote / Enquiry. Use the Asteris PDF Invoices module separately if needed.
- **Dual-colour swatches** (the half-and-half circles YITH supports).
- **Variation tooltip images** beyond the single swatch image.
- **YITH's badge design library** (reusable badge templates with positioning per template). Asteris badges are configured per-product.
- **Image badges, ribbon badges, and animated badges.** Asteris badges are text pills with background + text colour.
- **Conditional cart messages.** YITH Cart Messages supports message rules based on cart contents, applied coupons, user role, geolocation, etc. Asteris Free Shipping Bar only handles the single case of "amount remaining to free shipping" and "free shipping achieved".
- **Multiple cart messages stacked.** Asteris shows one bar.

---

## Step-by-step

1. **Install Asteris Affiliates.** Plugins → Add New → upload the zip → Activate. Activate your licence at WooCommerce → Asteris → Licence.
2. **Leave YITH plugins active for now.** Both run together during cutover.
3. **Enable the destination modules.** WooCommerce → Asteris → Modules. Toggle on: Wishlist, Quote / Enquiry, Variation Swatches, Feature Labels, Product Badges, Free Shipping Bar.
4. **Run the Wishlist import.** WooCommerce → Asteris → Migrations. The YITH Wishlist adapter scans `wp_yith_wcwl_items` and shows the number of customers and items it found. Click **Run import**. It batches by user ID and writes `asteris_wishlist` user meta. Existing Asteris wishlist entries (if a user added items via Asteris before the import) are merged, not overwritten.
5. **Rebuild attribute swatches.** Products → Attributes → for each attribute (e.g. `pa_color`), open each term and set the Asteris swatch type (`text` / `color` / `image`) and value. Asteris stores these as term meta `_avs_type`, `_avs_color`, `_avs_image`. YITH's existing `_ywccp_*` term meta is left in place but ignored by Asteris.
6. **Rebuild product badges.** Open each product that had a YITH badge → scroll to the **Asteris Badges** metabox → enter custom badge text and optional background/text colours. Save. Asteris also auto-shows Sale and New badges; configure thresholds at WooCommerce → Asteris → Product Badges.
7. **Set Quote / Enquiry per-product mode.** Asteris does not import `_yith_ywraq_enable`. Open each product that should accept enquiries → **Asteris Quote / Enquiry** metabox → set mode to `alongside` (button next to Add to Cart), `replace` (hides price + Add to Cart), or leave blank for global default. Configure global default at WooCommerce → Asteris → Quote / Enquiry.
8. **Add the Quote / Enquiry email address.** WooCommerce → Asteris → Quote / Enquiry → admin email. Defaults to the site admin email.
9. **Rebuild cart messages as a free-shipping bar.** WooCommerce → Asteris → Free Shipping Bar. Set the threshold (or enable auto-detect from your free-shipping zone), edit the progress and achieved messages, choose position. Place the `[asteris_free_shipping_bar]` shortcode on the cart page if you do not want the auto-injected mini-cart bar.
10. **Add Feature Labels where you used YITH's text-label variations as product features.** Products → edit product → **Feature Labels** metabox → enter comma-separated chips (e.g. `Hand Made, Australian Owned`). Place `[asteris_feature_labels]` in your single-product template or block.
11. **Verify on the front-end** (see next section).
12. **Deactivate YITH plugins.** Once verified on staging *and* production, deactivate YITH Wishlist, YITH Request a Quote, YITH Color and Label Variations, YITH Badge Management, and YITH Cart Messages. Leave them installed (not deleted) for one week so you can roll back without re-installing.

---

## Verifying the migration

1. **Wishlist:** log in as a customer who had a YITH wishlist. Visit the wishlist page (or the page where you placed the Asteris wishlist shortcode/block). Confirm the products appear. Pick 3 customers from the Asteris Migrations preview list and check each one.
2. **Swatches:** open 5 variable products on the front-end. Confirm the new Asteris swatch styles render (colour fills, image tiles, or text chips) and that selecting a swatch correctly switches the variation. View-source and check for the `avs-swatch` class.
3. **Badges:** open shop archive + 5 random products. Confirm custom badges render with the configured background/text colours and that auto-detected Sale / New badges appear where expected.
4. **Quote / Enquiry:** open a product with mode set to `alongside`. Confirm both the Add to Cart and Request Quote buttons appear. Submit a test enquiry — check that an `asteris_enquiry` post is created (WooCommerce → Asteris → Enquiries) and that the admin email arrives.
5. **Free Shipping Bar:** add products to cart until you cross the threshold. Confirm the bar updates from progress message to achieved message and that the bar position (top / bottom / inline) is correct.

---

## Rollback

Asteris migrations are non-destructive. To revert:

1. Deactivate the relevant Asteris modules at WooCommerce → Asteris → Modules.
2. Reactivate the YITH plugins.
3. (Optional, only if you want a clean slate) Delete the Asteris-only data:
   - Wishlist: `DELETE FROM wp_usermeta WHERE meta_key = 'asteris_wishlist';`
   - Quote / Enquiry: leave the `asteris_enquiry` CPT in place — it does no harm, or delete via Posts → Asteris Enquiries.
   - Feature Labels / Badges: delete post meta `_asteris_fl_labels`, `_asteris_fl_hide`, `_asteris_badge_custom`, `_asteris_badge_custom_bg`, `_asteris_badge_custom_tx`, `_asteris_badge_hide`.
   - Variation Swatches: delete term meta `_avs_type`, `_avs_color`, `_avs_image`.
4. Clear any page / object cache.

YITH's tables (`wp_yith_wcwl`, `wp_yith_wcwl_items`) and YITH's own meta (`_yith_ywraq_*`, `_ywccp_*`, `_ywbm_badge`) are never touched by Asteris, so YITH resumes exactly where it left off.

---

## Edge cases and troubleshooting

### Wishlist import shows zero customers but YITH clearly has items

The adapter only counts rows where `user_id > 0`. Guest wishlist entries (anonymous, cookie-keyed) are skipped by design — there is no Asteris user to attach them to. Check `SELECT COUNT(*) FROM wp_yith_wcwl_items WHERE user_id > 0;` directly. If the count is zero, your YITH store only ever held guest wishlists.

### Customer had multiple named wishlists in YITH

All of that user's items across all of their YITH lists are unioned into a single Asteris wishlist (duplicates removed). List names ("Birthday", "Wedding", etc.) are dropped. If the customer relies on separate lists, this is a real loss of functionality — communicate it before cutover or stay on YITH.

### Dual-colour swatches render as a single colour

YITH's `_ywccp_color_2` (the second half of a two-tone swatch) has no Asteris equivalent. Rebuild as either a single colour or an image swatch (`_avs_type = image`). For complex multi-colour terms, an image swatch with a small PNG is usually the closest match.

### Badges have moved position after migration

YITH Badge Management positions badges per badge-template. Asteris positions all badges globally — WooCommerce → Asteris → Product Badges → Position. Pick one of top-left / top-right / bottom-left / bottom-right and accept that all badges on a product share that anchor.

### Cart messages were conditional (coupon applied, user role, geolocation)

Asteris Free Shipping Bar only handles the free-shipping-threshold case. There is no rule engine. If your YITH Cart Messages setup depends on conditional logic (e.g. "show message X when coupon Y is applied"), Asteris will not replicate it — keep YITH Cart Messages active alongside Asteris, or use a generic notice plugin for the conditional cases and Asteris only for the shipping bar.

### Quote-request archive needs preserving

Asteris does not read the YITH `yith_ywraq_request` CPT. Either leave YITH Request a Quote installed-but-deactivated so the records stay accessible, or export to CSV via Tools → Export → Quote Requests before deactivating. New enquiries from the cutover onward live in the `asteris_enquiry` CPT.

---

## After the migration

1. Clear all caches (page cache, object cache, CDN edge cache).
2. Email a notice to customers with active YITH wishlists explaining that shared wishlist URLs (the YITH share tokens) no longer work — their saved items are preserved but the public share links must be re-generated.
3. Re-test checkout end-to-end — variation selection, add-to-cart, quote submission — using a private window.
4. Schedule a 7-day check-in: review the `asteris_enquiry` CPT for stuck enquiries, scan front-end pages for missing badges, and confirm the Free Shipping Bar threshold matches the WooCommerce shipping zone.
5. After 2–4 weeks of clean running, delete the YITH plugin files (Plugins → Delete). The YITH database tables and post meta will remain — that is fine, and reversible if needed by re-installing.

---

## Related

- [/pricing](/pricing)
- [/yith-vs-asteris](/yith-vs-asteris)
- [/migrate](/migrate)
- [/docs/modules/wishlist](/docs/modules/wishlist)
- [/docs/modules/quote-enquiry](/docs/modules/quote-enquiry)
- [/docs/modules/variation-swatches](/docs/modules/variation-swatches)
- [/docs/modules/feature-labels](/docs/modules/feature-labels)
- [/docs/modules/product-badges](/docs/modules/product-badges)
- [/docs/modules/free-shipping-bar](/docs/modules/free-shipping-bar)
- [/docs/troubleshooting](/docs/troubleshooting)
- [/support](/support)
