---
url: /roadmap
title: "Asteris Affiliates — Roadmap"
meta_description: "What's shipping in Asteris Affiliates next. Concrete v1.1 items, what's under consideration, what's deliberately out of scope. Updated as priorities shift."
og_title: "Asteris Affiliates roadmap"
og_description: "Concrete v1.1 shipping list, what's banked for v1.x, what's under consideration, and what we deliberately won't build."
canonical: https://asterisaffiliates.com/roadmap
primary_keyword: Asteris Affiliates roadmap
primary_keyword_us_vol: 0
primary_keyword_kd: 0
secondary_keywords:
  - asteris future modules
  - asteris updates
schema_type: WebPage
internal_links_out:
  - /changelog
  - /lifetime
  - /founder
  - /what-asteris-doesnt-do
verified_date: 2026-06-06
ai_overview_optimised: false
---

# Asteris Affiliates — Roadmap

The roadmap is updated as priorities shift, not on a fixed schedule. Items move between columns when Founder feedback or measured demand warrants it. Per the locked no-hard-dates rule we don't commit ship dates — items list a version target only when the work is genuinely close.

Founder customers receive every shipped module automatically.

---

## In progress (pre-1.0 launch)

These need to land before the public v1.0 launch:

- **HPOS per-module verification** — line-grep across all 21 modules for legacy `get_post_meta($order_id)` calls. Order-touching modules use `$order->update_meta_data()`; this is the final audit pass.
- **Block Cart smoke test** — Side Cart, Free Shipping Bar, Trust Badges and Stock Urgency tested on the block-only theme test site (TT4 / FSE). Cart-interaction modules need to behave correctly when WooCommerce's classic-cart shortcode is replaced with the cart block.
- **6-theme regression sweep** — every module touched on each of the six themed test sites (default, Elementor, GeneratePress, Divi, Bricks, block-only) before launch.
- **Model C plugin refactor** — split the monolithic plugin into Asteris Free (six free modules, WordPress.org-hostable) and Asteris Affiliates (the paid add-on that registers the remaining 14). Required for WordPress.org submission.
- **WordPress.org submission** — `readme.txt` formatting, banner + icon assets, screenshots, the 1–2 week approval cycle.

---

## Shipping in v1.1

Concrete items that are designed and scoped, not yet built:

- **Module 21 — Cookie Consent** — first-party GDPR/EPR consent banner + consent log. Replaces CookieYes / Cookiebot / Iubenda SaaS ($9–$99/mo each). Sovereign-signed-off; built to Best-in-Class spec under the Module Quality Protocol. Hero feature of the v1.1 release.
- **Activity Log + Asteris Undo** — every settings change, plugin activation, and bulk operation logged with one-click revert. Sister-product Asteris for WordPress builds the canonical implementation under the shared library; Asteris Affiliates vendor-imports the same code plus WC-specific extensions (HPOS / Block Cart Site Health checks, WC option allow-list). Includes the Tier-1 debug snapshot ZIP and Tier-2 temporary support user features used in our support workflow.
- **WordPress Multisite network support** — explicitly not v1.0. v1.1 target per the locked compatibility matrix. See [Multisite docs](/docs/multisite) for the v1.0 stance + v1.1 timeline.
- **Expanded WP-CLI commands** for licence management, module enable/disable, SEO bulk operations. (Diagnostic + recovery commands — `wp asteris status`, `wp asteris safe-mode …` — already shipped in v1.0.)
- **Pre-Flight checklist wired into bulk-op surfaces** — the infrastructure shipped in v1.9.21 gets opt-in adoption across AI Suite bulk regen, Variation Swatches bulk-apply, Coupons bulk-create, Wishlist bulk-clear. Each surface prompts "we recommend a backup first" with a per-user dismiss.
- **Dedicated Agency Slack channel** for Asteris Agency customers. Currently same email support channel as Asteris Pro.
- **OpenAI-compatible local endpoints** for AI Suite (Ollama, LM Studio, LocalAI). Lets Founder customers run AI Suite without sending any data outside their own infrastructure.
- **White-label for Agency** — hide the Asteris admin branding on client sites. Note: this is Agency-tier-only, not on any other tier.
- **Interactive comparator widget** on `/pricing` — pick the modules you currently use across other plugins, see your annualised spend vs Asteris. WCAG-AA compliant. Spec locked.
- **SEO module v1.1 upgrade** — WC-product schema enrichment (variations, GTIN/MPN/brand, video, audience targeting, returns + shipping schema) tracking 2026 Google Merchant Center spec. Buildlist locked at `02-specs/handover_seo_product_v1_1.md`.

---

## Under consideration

Being evaluated based on Founder feedback and measured demand. No commitment to ship.

- **Module 22 — Product Feed** — Google Merchant Center 2026-spec product feed with feed-mapping UI, schedule, submission, diagnostic dashboard. Replaces CTX Feed Pro / Product Feed Pro / Product Feed Manager. Channel coverage (Google only at v1.0 vs Google + Facebook + Pinterest + TikTok) pending research. Target v1.2.
- **Module 23 — AI Shopping Optimisation** — first WP plugin built for Google AI Mode + Perplexity Shopping + Claude Search. Distinct ranking/citation grammar from traditional SERP. Replaces Surfer SEO / MarketMuse / Clearscope when used for AI-search optimisation. Critical blocking research: market timing — only proceeds if AI-search drives meaningful WC traffic share in 2026. Target v1.2+ (or cancelled if timing doesn't validate).
- **Module 24 — Gift Cards** — AI-personalised recipient messages, custom template designer, login-free balance-check magic-link, bulk-issue corporate-gift CSV. Replaces WC Gift Cards ($129/yr) / YITH Gift Cards / PW Gift Cards Pro. Target v1.2+.
- **Module 25 — Returns + RMA** — line-item-level partial returns, structured return-reason taxonomy feeding Analytics, AI-suggested decision based on reason + customer history, proper EU Right of Withdrawal + AU consumer law defaults. Replaces WC Returns and Warranty Requests ($129/yr) / YITH Advanced Refund / ELEX RMA. Paid legal review planned before launch. Target v1.2+.
- **Checkout Customizer (Module 22 candidate)** — field-level WooCommerce checkout customisation: add/remove/reorder fields, conditional logic, custom thank-you templates. Deliberately scoped to be smaller than a full funnel builder. Sovereign-signed-off as research-needed; gap analysis underway. Target v1.2.
- **Social Proof Notifications + Payment Icons** — banked research-needed; Sovereign-signed-off. Target v1.2+.
- **WPML / Polylang deeper integration** — beyond the basic string-translation support that's already there.
- **Subscription-compatible mode** — co-exist more cleanly with WooCommerce Subscriptions (Asteris doesn't try to *replace* Subscriptions; this is about not stepping on its toes).
- **Product video support module** — for product galleries that need video, not just photos.
- **Advanced analytics** — cohort analysis, LTV reporting, retention curves. Currently Analytics module is GA4/GTM-only.
- **Review collection module** — request-review-after-order workflow.

If you want one of these prioritised, see "Founder input" below.

---

## Deliberately out of scope

These won't be in Asteris Affiliates. Dedicated plugins handle them better and we won't dilute the bundle by half-building each one.

- **Cart abandonment recovery + advanced cart features** — getting their own dedicated plugin (**Asteris Cart**, separate purchase). Spec is being built in parallel; until it ships, the Side Cart module here covers the basic slide-out drawer. When Asteris Cart launches, it absorbs Side Cart cleanly via sister-override for customers who run both. No regression for v1.0 buyers.
- **Full sales funnel builder** — FunnelKit or CartFlows are the right call. Funnels are a platform-within-a-plugin category and don't fit Asteris's "focused modules" promise.
- **Dropshipping supplier integration** — AliExpress, Spocket, etc. Use a dropshipping plugin.
- **Subscription billing engine** — use WooCommerce Subscriptions.
- **Membership system** — use Paid Memberships Pro or similar.
- **Payment gateway** — we don't build a payment processor.
- **Tax automation** — TaxJar, Avalara, Quaderno handle this better.
- **Booking / appointments** — Bookly, Amelia, or WooCommerce Bookings.
- **LMS / course delivery** — LearnDash, Tutor LMS, LifterLMS.

[Full reasoning on what we deliberately don't do →](/what-asteris-doesnt-do)

---

## Recently shipped

See the changelog for full version history. Most recent:

- **v1.9.56 — Asteris Live Monitor ships** — cart-aware real-time visitor dashboard (Module 26). Live session table with current page, funnel stage, cart contents, customer LTV, abandon-risk score. Operator alerts on abandoning carts + high-value visitors. In-page nudge round-trip to push a message into a live abandoning visitor's browser. Promoted from v1.1 candidate into the v1.0 launch as a wedge feature — no competitor combines cart-awareness with operator alerts + nudge. Replaces Metorik ($300+/yr), Glew.io Pro, MonsterInsights Plus, WP Statistics Realtime when used for live store monitoring.
- **Self-hosted plugin updater** — customers see "Update available" in their WordPress Plugins screen with one-click upgrade direct from Asteris. R2 distribution + signed URLs + HMAC verification. Built into all three plugins (WC, WP, Cart).
- **R2 release pipeline** — Cloudflare R2 (`releases-asteris` bucket) is the canonical ZIP store. `release-plugin.ps1` automates build → versioned ZIP → R2 upload → version-map update. Replaces the dead `wp-content/uploads/asteris-releases/` distribution path.
- **`/account` customer self-service portal** — live at pay.asteriscommerce.com/account. View licence, transfer between domains, download history, invoice list, resend licence email. Replaces manual `support@` email handling.
- **Founder cohort live** — Stripe Buy buttons live on `/pricing` for all three Asteris plugins. 100 paid + 20 competition cohort spots per product. Launch-locked prices for life of subscription.
- **v1.9.23** — Plugin-wide local-time rule: every Asteris admin timestamp now renders in the viewer's browser timezone via `time-localise.js`. `asteris_wc_disabled_modules` filter for sister-plugin overrides. Pre-Flight `manage_options` cap hardening. Safe-Mode notice gated to non-AJAX requests.
- **v1.9.22** — Back_In_Stock timestamp storage normalised to UTC + `<time datetime>` display markup (reference implementation of the local-time rule).
- **v1.9.21** — Module Safe Mode + WP-CLI commands (`wp asteris safe-mode …`), Pre-Flight checklist infrastructure, `asteris_activity_log()` forward-compatible stub. The support-readiness release.
- **v1.9.20** — Module 20 ships: Asteris Coupons. BOGO, tiered, URL-applied, scheduled + segmented. Plugin reaches its locked 21-module v1.0 set.
- **v1.9.3 → 1.9.6** — Licence auto-migration hardening across four releases. 16 bugs caught and fixed before customer impact.

[Full changelog →](/changelog)

---

## Founder input

If you're a Founder customer, the fastest way to influence this roadmap is a specific, detailed feature request to `founder@asteriscommerce.com`. Vague requests ("please add more modules") don't move anything. Specific use cases — *"I run a store doing X, the current way to do Y is Z, here's what's missing"* — do.

The Founder cohort exists to shape what Asteris becomes. Asteris is in active development. As a Founder, you're shaping it. Your bug reports and feedback are part of the deal — and so are all future updates, free, forever.

[About Founder →](/lifetime) · [Changelog →](/changelog)
