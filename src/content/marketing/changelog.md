---
url: /changelog
title: "Asteris Affiliates — Changelog"
meta_description: "Every version of Asteris Affiliates. What shipped, what was fixed, what was hardened. Founder gets every update automatically."
og_title: "Asteris Affiliates changelog"
og_description: "Version history, bug fixes, new modules, hardening — everything that has shipped in Asteris Affiliates."
canonical: https://asterisaffiliates.com/changelog
primary_keyword: Asteris Affiliates changelog
primary_keyword_us_vol: 0
primary_keyword_kd: 0
secondary_keywords:
  - asteris version history
  - asteris updates
schema_type: WebPage
internal_links_out:
  - /roadmap
  - /lifetime
  - /free
verified_date: 2026-06-06
ai_overview_optimised: false
---

# Asteris Affiliates — Changelog

Every version of Asteris Affiliates is documented here. Founder customers receive every update automatically. Annual tier customers receive updates while their licence is active.

The changelog updates with each release. A built-in-public weekly summary publishes every Friday (separate blog post coming once `/blog` is live).

---

## v1.9.56 — current release

**Asteris Live Monitor ships — cart-aware real-time visitor dashboard (Module 26 promoted into v1.0 launch).**

This is the headline ship of the v1.9.38 → v1.9.56 cycle. Live Monitor was originally banked as a v1.1 candidate; the locked spec at `memory/project_wc_live_monitor_locked.md` (sovereign sign-off 2026-06-06) pulled it forward into the launch as a wedge feature. No competitor combines cart-awareness with operator alerts and in-page nudge to a live abandoning cart — Metorik ($300+/yr) gets closest but is paid SaaS, stitches identity only after checkout step 1, and has no operator alerts. Glew is hourly-batched BI, MonsterInsights and WP Statistics Realtime are cart-blind.

- **Cart-aware live session table** — every active visitor with current page, funnel stage (browsing → cart → checkout → abandoning), live cart contents (line items + total), customer LTV when identifiable, geo, device, and an abandon-risk score updated every heartbeat.
- **Four DB tables** — `sessions` (current state, overwritten per heartbeat), `history` (rotating session log), `events` (cart + funnel-transition events only — no pageviews), `alert_rules`, plus `nudges` for the in-page nudge feature. HPOS-native, classic + Blocks checkout aware. Session identity = SHA-256(sid cookie + per-install salt); IP addresses hashed and pruned on a rolling window.
- **Heartbeat capture layer** — first-party `asteris_lm_sid` UUIDv4 cookie, same-origin REST endpoint (deliberately not admin-ajax — dodges ad-blocker patterns), bot filter at ingress, UA parser, geo lookup, cart snapshot serialised per heartbeat. Cart line-item JSON snapshot (not just cart-value heat) was a blocker gap closed during spec lock.
- **Operator alerts** — rules engine on the `alert_rules` table; v1.0 ships with abandoning-cart-detected and high-value-visitor triggers. (Originally deferred to v1.2 — pulled forward to v1.0 per the gap-analysis blocker review.)
- **In-page nudge to live cart** — operator can push a short message into an active abandoning visitor's browser via the heartbeat round-trip. `Nudge_Send_Endpoint` (admin) → `Nudge_Delivery` → `Nudge_Ack_Endpoint` (frontend, records seen + dismissed). Rate-limited per session.
- **Admin surface** — `/wp-admin/admin.php?page=asteris-live-monitor` Stream view, per-session detail drawer (history + events + cart trajectory), settings tab (alert rules + retention + bot-filter strictness). Stream auto-refreshes via the `Stream_Endpoint` REST route.
- **Customer identity lookup** — wires session → WC customer when known (logged-in or checkout-email captured), exposing LTV from order history. Closed the second of three blocker spec gaps from the gap analysis.

Sister-product coordination: this module is WC-only by design (cart awareness is the wedge). The Asteris for WordPress plugin will not vendor it in.

The 18 alpha bumps between v1.9.38 and v1.9.56 were the iterative build of this module — DB schema → capture layer → admin stream → session detail → nudge round-trip → alerts → polish — shipped as small alphas while the spec gaps surfaced in the Phase 0 gap analysis were closed. No customer-facing behaviour changes outside the module itself.

---

## v1.9.37

**Licence-option cleanup + self-hosted updater pipeline live.**

- One-time cleanup of the legacy `asteris_license_instance_id` `wp_options` row. Pre-v1.9.36 builds wrote this key under the old licence module; the server-backed `Asteris\Core\License` shipped in v1.9.36 ignores it. Cleanup runs on plugin boot, idempotent, deletes the row if present.
- No code-path uses the value any more — purely housekeeping so customer sites don't carry stale licence data forever.

---

## v1.9.36

**Self-hosted updater wired — customers see "Update available" in their Plugins screen.**

- `\AsterisShared\License\Updater` now loads from `src/shared/License/Updater.php` and hooks WordPress's plugin-update machinery to `pay.asteriscommerce.com`. Customers with an active licence see one-click upgrades directly from the Plugins screen — no manual ZIP downloads.
- Bootstrap is `\Asteris\Core\License::boot_updater()` (silent no-op if the licence key isn't set, so free-tier and unlicensed test sites stay quiet).
- Pipeline endpoint: updater hits `/check-update` on the licence server, which returns a Cloudflare R2 signed URL (5-minute TTL) for the versioned ZIP. WordPress downloads, unpacks, activates — the rest is standard WP plumbing.
- Server-side licence model rewritten in this cycle: the previous `instance_id` storage pattern is retired in favour of the server-backed instance map. Forward-only — no migration needed for v1.0 customers (alpha cohort only).

---

## v1.9.30 – v1.9.35

**Interim hardening + Gutenberg dedicated PluginSidebar.**

The bulk of this cycle was visual + UX polish on the SEO surfaces that landed in v1.9.26-v1.9.29, plus the move from "Asteris fields mixed into WordPress's Document Settings" to a dedicated slide-out sidebar.

- **Gutenberg `PluginSidebar` for Asteris SEO** — accessed via a ★ icon in the editor toolbar (per the locked UX). Slide-out panel hosts focus-keyword discovery, search-engine preview, title + meta description fields, AI Generate button, canonical + robots, and the Open Graph + Twitter override fields. Also registered as a `PluginSidebarMoreMenuItem` for the kebab menu. No webpack — ships as one PHP file with inline JS using `wp.plugins` / `wp.element` / `wp.editor` globals.
- **Builder docked-sidebar pattern** (parity with WP plugin alpha.198) — the four builder integrations (Elementor / Divi / Bricks / BeaverBuilder) now share a single docked-sidebar approach so customers get the same focus-keyword + coverage UX inside their builder of choice, not just in Gutenberg.
- Smaller fixes across the SEO surfaces: idempotency guards on the meta-output paths (so a site running both WC + WP plugin only emits one set of OG / Twitter / JSON-LD), debounce on coverage re-renders, defensive ` ```json ` fence stripping on AI responses.

Released as a sequence of small alphas while the dedicated-sidebar UX was iterated against the 6 Local test themes. No customer-facing behaviour regressions tracked.

---

## v1.9.28 – v1.9.29

**Keyword Coverage + Keyword Weave + AI Suite gap closure.**

The discover-first SEO workflow shipped in v1.9.26 surfaced a second gap: the customer picks a strategic keyword, but if it doesn't actually appear in the copy, downstream scores stay mysteriously low. Coverage closes the loop; Weave gives the customer a one-click way to fix the gaps Coverage surfaces.

- **`Keyword_Coverage`** — pure utility class (no DB, no hooks except REST). Checks 6 SEO placement slots: SEO title, meta description, first paragraph (~120 words), H2/H3/H4 headings, URL slug, image alt text. Returns per-slot `{label, present, count}` + aggregate `score (0-6)` + `level (good/warn/bad)`. Whole-word boundary match, case-insensitive, stems not collapsed (intentional — surfaces the gap rather than silently forgiving it). REST: `POST /asteris/v1/seo-keyword-coverage`.
- **`Keyword_Weave`** — AI-rewrite REST endpoint with 3 targets: rewrite intro paragraph to include the keyword, suggest an H2 containing the keyword, rewrite meta description (≤155 chars). Each target has its own constrained system prompt. Server verifies the rewrite actually contains the keyword as a whole word and reports `contains_kw: true|false` so the sidebar can flag if the AI failed to comply. No server-side write — the rewrite only lands if the customer clicks "Apply". REST: `POST /asteris/v1/seo-keyword-weave`.
- **Sidebar wiring** — coverage strip renders below the keyword-discovery results, re-renders on `input` events (200ms debounce). When `level !== 'good'`, weave buttons appear matching the missing slots; suggestions render in a green-bordered card with original (strikethrough) + suggested + Apply/Copy/Discard. Intro + H2 use clipboard copy because Elementor's content lives in an iframe — sidebar JS can't directly edit it.
- **AI Suite gap-analysis pass** completed against the current state of the AI_Suite module and the AI_Provider facade — banked for the next round of work, no customer-facing change yet.

---

## v1.9.27

**SEO load-order safety pattern.**

- All Tier 1 SEO fields now live as `_asteris_seo_*` post_meta keys with **canonical literal string constants** (`Module::META_TITLE`, `META_DESC`, `META_FOCUS_KWS`, `META_CANONICAL`, etc.). Previously some constants were resolved at runtime via property reads — that was fine in isolation but broke the moment a builder integration tried to reference the constant before the SEO module had booted.
- The pattern is now: every meta key is a `const` literal on the canonical class, every consumer references the constant by class-scope (`SEO\Module::META_TITLE`), and the canonical class loads first in `Plugin::boot()`. No more load-order footguns when builder integrations or `wp_head` consumers run before the module proper.

---

## v1.9.26

**SEO+AI v1 — Keyword Research + builder integrations ported from the WP plugin.**

The biggest single release in the v1.9.x line after v1.9.21. The WC plugin's SEO module was 2015-era Yoast model (user invents a focus keyword from thin air; tool analyses against it). This release brings it level with the discover-first workflow that landed on the WP plugin between alpha.168 and alpha.199.

- **`Keyword_Research` module** (new). Pipeline: AI extracts 8-12 candidate keywords from post content → DataForSEO batch-scores them (search volume + competition index) → opportunity-score ranking (`log10(volume+1) × (100 - competition_index) / 100`) → results cached 7 days keyed by `post_id + content_hash`. Graceful degradation: no DataForSEO creds = AI-only candidates ranked by position with amber warning; no AI provider = `WP_Error`. REST: `POST /asteris/v1/seo-keyword-discover`.
- **`DataForSEO_Client::get_keyword_metrics()`** — new method calling `POST /v3/keywords_data/google_ads/search_volume/live`. Capped at 1000 keywords per batch. Same error-handling pattern as `get_serp_top10` (returns `WP_Error` on creds-missing / HTTP error / task-status non-20000).
- **`AI_Provider` facade** — thin shim wrapping the existing `Providers::call_provider($prompt, $image, $action)` so the ported WP-plugin code can call `AI_Provider::call($system, $user, $opts)` without a rewrite. Throwaway by design — both plugins consolidate to `AsterisShared\Lib\AI\Provider::call(...)` at the v1.0 shared-module migration.
- **Twitter override constants** — `Module::META_TWITTER_TITLE / DESC / IMAGE` now defined and wired through `wp_head`. Twitter Card output falls back to OG values when blank (standard behaviour). These constants are referenced by every builder integration's `FIELD_MAP`; their previous absence would have fatalled the first builder load.
- **Four builder integrations** — `Elementor_Integration`, `Divi_Integration`, `Bricks_Integration`, `BeaverBuilder_Integration`. Each maps builder-control-id → canonical `_asteris_seo_*` meta key with two-way sync. Loaded directly from `Plugin::boot()` (not through `Module_Loader`) so they ship even on sites where the SEO module proper is sister-overridden, and each self-gates on the builder's own request signature (`$_GET['action']==='elementor'` etc.) so there's zero overhead off-screen. Elementor 3.x uses the native `TAB_DOCUMENT_SETTINGS` API; Elementor 4.x (which removed that panel) falls through to an output-buffer-injected docked sidebar.

This is an interim port. Both plugins consolidate to `AsterisShared\Modules\SEO_AI\*` at the v1.0 shared-module migration (per the locked dual-plugin architecture).

---

## v1.9.25

**Compatibility audit close-out — WP `Tested up to: 6.7`.**

- Plugin header now declares `Tested up to: 6.7`. Combined with the `Requires at least: 6.4` bump in v1.9.24, this satisfies WP.org's submission requirements for the eventual Asteris Free upload.
- Cross-plugin compatibility audit discrepancies D2 (version sync, longstanding), D4 (HPOS per-module code-grep clean), D7 (MySQL / MariaDB minimum documented), D8 (6th Local test site running TT4 / block theme) all marked resolved against this version. D5 + D6 still pending Nick verify-tasks.

---

## v1.9.24

**PHP + WordPress minimums raised.**

- Plugin header `Requires PHP:` bumped `7.4 → 8.1`. Sales site has claimed 8.1+ in 14 places for months; the header now matches. WordPress refuses to activate the plugin on legacy PHP installs, which drops ~5% of WP-7.4-era hosting environments — acceptable per the compatibility matrix policy (PHP 7.4 has been EOL since November 2022).
- `Requires at least:` bumped `6.3 → 6.4`. Mid-step on the path to 6.5 (which is the gate for `Requires Plugins:` header support — needed for the Asteris Free → paid dependency wiring in Model C).
- Compat-audit discrepancies D1 + D3 (the two long-running drifts between the plugin header and the sales-site copy) closed.

---

## v1.9.23

**Local-time rule + Cart sister-override + hardening.**



- **Local-time rule rolled out plugin-wide.** All Asteris admin timestamps now emit `<time datetime="…Z">` markup; the new `time-localise.js` (shipped on plugin admin + sales site + parent brand site) reads `navigator.language` and renders every timestamp in the viewer's browser timezone. Back_In_Stock "notified" column converted to the new pattern as the exemplar; remaining surfaces inherit the same `class="asteris-localise"` hook.
- **`asteris_wc_disabled_modules` option + filter** — `Module_Loader::load()` now honours a sister-plugin disable list. Enables the upcoming Asteris Cart plugin to suppress the WC `Side_Cart` module when both plugins are installed (sister-override, per the locked dual-plugin pattern).
- **Pre-Flight `manage_options` cap check** — `Pre_Flight::handle_acknowledge()` now requires the `manage_options` capability (was `is_user_logged_in`). Closes a subscriber-CSRF surface around the bulk-op acknowledgement endpoint.
- **Safe-Mode notice gated to non-AJAX requests** — the orange "Safe Mode is active" admin banner no longer pollutes AJAX / REST / XML-RPC response bodies.
- WP-CLI docblock cleanup — removed a bogus `@subcommand` annotation; `wp asteris safe-mode …` continues to work via WP-CLI's automatic method-name → kebab-case conversion.

---

## v1.9.22

**Back_In_Stock storage normalised to UTC.**

- Back_In_Stock notification timestamps now store as UTC (`current_time( 'mysql', true )`) and display via the `<time datetime>` pattern. Display shows site-local fallback text until `time-localise.js` lands (which it now does, in v1.9.23). Reference implementation of the locked local-time rule.

---

## v1.9.21

**Support-readiness shipped — Safe Mode + Pre-Flight + recovery doc.**

The biggest release in the v1.9.x line. Three new Core/utility surfaces land — none of them add a module (the public 20-module count is unchanged), but together they cover the "my site broke, what now?" support workflow that customers will rely on during launch.

- **Module Safe Mode** — `wp asteris safe-mode enable` (and `disable`, `status`, `token`, `rotate-token`) suspends every Asteris module without deactivating the plugin or touching the licence. Pro/Agency/Founder access is preserved through the recovery flow because the bypass fires AFTER `Core/License` has initialised, BEFORE the module loader runs. There's also a one-shot URL bypass: `?asteris_safe_mode=<token>` (token-gated against an autogenerated site secret — defends against unauth probing). Admin sees an orange warning banner with a one-click "Disable Safe Mode" button when active.
- **Pre-Flight checklist infrastructure** — new `Pre_Flight::render_notice()` API for modules to wrap destructive bulk operations behind a "we recommend a backup first" acknowledgement, stored per-user-per-module-per-op in user_meta. Infrastructure-only this release; per-module wiring (AI Suite bulk regen, Variation Swatches bulk-apply, etc.) ships in v1.1+.
- **`asteris_activity_log()` no-op stub** — a forward-compatible global function that today does nothing, but gets a real implementation when the Activity Log + Site Health shared module vendors in at v1.1. Bulk operations instrumented now will populate the audit log automatically once the shared module ships. AI Suite bulk completion is the first call site.

Sales-site companions: the new [`/docs/recovery`](/docs/recovery) page covers the full 5-step recovery decision tree (URL Safe Mode → persistent Safe Mode → WP-CLI deactivate → FTP plugin-folder rename → support email), with license-continuity notes and a sister-plugin caveat. The [`/docs/wp-cli`](/docs/wp-cli) page now documents the v1.0-available commands (was "all v1.1").

---

## v1.9.20

**Module 20 ships: Asteris Coupons.**

The 20th Asteris module is live. Replaces a stack of 2-3 separate coupon plugins ($180–$400/yr) with a single integrated rule engine that extends WC's own coupons (never replaces them):

- **BOGO** — buy X get Y free/discounted, mix-and-match supported, server-side quantity lock (mitigates the WebToffee-class exploit class from 2025)
- **Tiered** — spend $X, get Y% (or $Z) off; highest matching tier wins
- **URL coupons** — `?coupon=CODE` auto-applies via 30-day cookie, rate-limited per IP
- **Scheduled + segmented** — date/day-of-week/time-of-day windows; role/category/first-time-buyer/repeat-buyer gates
- **Shared cart-threshold ledger** — tiered + URL coupon spend triggers exposed to the Free Shipping Bar via the new `asteris_cart_thresholds` filter (one source of truth across modules)
- **Admin** — 4-tab metabox on every WC coupon edit screen (Rules / Schedule / Segmentation / Preview), plain-English rule summary on the coupons list, one-click migration from existing WC coupons, inline preview simulator that runs the real evaluator against a synthetic cart
- **Discoverability fix** — added a dynamic help line to WC's own Coupon Amount field (with a %-symbol stripper) so merchants stop typing "10%" into a percent-discount field and breaking the math
- **Cleanup** — WC core's "Recommended coupon extensions" and "WooCommerce knowledge base" promo cards are hidden on the coupons screen when this module is active (no more competing third-party plugin ads inside Asteris)

Plugin versions 1.9.10 → 1.9.20 across the 4 build sprints.

---

## v1.9.9

**Pre-launch cleanup.**

- Removed two unused module directories (`Cart_Upsells`, `Shop_Archive_Delivery`) that were cut from the v1.0 scope per the locked 19-module set. The plugin then shipped with 19 modules — Coupons later added as the 20th (see v1.9.20).

---

## v1.9.8

**Admin menu label.**

- WordPress admin menu label changed from "Asteris" to "★ Asteris WC" (under **WooCommerce → Asteris WC**). The URL slug stayed `?page=asteris`, so existing bookmarks and admin links keep working.

---

## v1.9.7

**Free-tier reshuffle — Option A (locked).**

- `License::FREE_MODULES` constant updated to match `modules.json` v1.1.0. The new six free modules (loaded without a licence) are:
  - **SEO** (lite — meta editor + basic XML sitemap)
  - **PDF Invoices and Packing Slips** (lite — one plain template, customer-only download)
  - **Variation Swatches** (lite — colour + image swatches, one attribute per product)
  - **Sequential Order Numbers** (full)
  - **Product Filtering** (lite — category + price filter, shortcode-only)
  - **Trust Badges** (full)
- Analytics, Stock Urgency and Free Shipping Bar were removed from the free set and are now paid-only. Pre-launch behaviour change — no customer impact (the free tier had not been released yet).

---

## v1.9.6

**Auto-migration hardening — round 3.** Closing the last gaps in the licence-instance-name normalisation introduced in v1.9.3.

- 12-layer hardening pass on `License::maybe_migrate_v193()`:
  - per-request static guard (no double-run inside a single request)
  - `current_user_can` check
  - dev-mode bypass
  - `is_multisite()` bail (multisite isn't supported at v1.0)
  - autoload-aware "done" marker check
  - atomic `add_option` lock with stale-lock steal after 5 minutes
  - retry counter capped at 5 with backoff
  - `WP_Error` path that preserves the licence key for retry (retryable)
  - `activated:false` path that clears only the local instance reference and surfaces an admin notice (terminal)
  - defensive read-back after marking done
  - dismissible admin notice via inline JS + nonce-checked AJAX dismiss
  - uninstall hook that best-effort deactivates the licence on plugin Delete
- 16 license-system bugs caught across the 1.9.3 → 1.9.6 cycle via adversarial-review workflows before any customer impact. Three were customer-bricking criticals (network failure deleting the licence key, race condition burning slots, idempotency hole).

---

## v1.9.5

**Auto-migration hardening — round 2.** Tightened the v1.9.3 instance-name migration. Internal release, no customer-facing behaviour change.

---

## v1.9.4

**Auto-migration hardening — round 1.** Tightened the v1.9.3 instance-name migration. Internal release, no customer-facing behaviour change.

---

## v1.9.3

**Auto-migration of legacy instance names.**

- New `instance_name()` rule: stable across plugin version bumps, `www`/non-`www` swaps, casing changes, ports, and trailing-slash variations. Subdirectory installs are preserved.
- One-time auto-migration on `admin_init` re-registers instances under the new stable name so customers don't lose their licence slot on upgrade. Replaces the manual "deactivate the old instance via the Lemon Squeezy portal" workaround that v1.9.2 customers were briefly asked to do.
- Background revalidation cadence stays daily.

---

## v1.9.2

**Plugin-header version sync.**

- Plugin file header `Version: 1.0.5` corrected to `Version: 1.9.2` so it matches the `ASTERIS_VERSION` constant. This drift had been causing the WordPress "update available" badge to show stale numbers in some admin contexts.
- All 20 modules included and active.
- HPOS compatibility declared at the plugin level (per-module verification in progress — see roadmap).
- Block Cart / Checkout compatibility declared at the plugin level (per-module verification for the four cart-interaction modules in progress).

---

## Earlier versions

The pre-1.9.2 releases were internal-only development cycles before the version-sync correction. The full git log lives in the source repository.

---

## What's next

[See the roadmap →](/roadmap)

Founder customers receive new modules as they ship, automatically and at no additional cost. Annual tier customers receive new modules while their licence is active.

[About Founder →](/lifetime)
