---
title: "Live Monitor"
description: "Real-time visitor dashboard with WooCommerce cart awareness. See who's on the site right now, what's in their cart, send in-page nudges, and get fraud alerts."
---

## What it does

Live Monitor is a real-time visitor dashboard built specifically for WooCommerce stores. It shows you who is on the site right now, what page they're on, what's in their cart, which carts are abandoning, and which visitors are returning VIPs.

It also lets you act on what you see — without leaving the dashboard:

- **Send an in-page nudge** to a live cart with a single click. A floating panel appears in the shopper's browser within 10 seconds carrying a single-use coupon, a free-shipping offer, or a custom message.
- **Detect abandoning carts BEFORE the email is captured** — most cart-recovery tools wait until the visitor types an email at checkout step 1. Asteris flags abandonment from the first add-to-cart.
- **Catch carding / fraud attempts** in real time — 5 detection rules covering declined-transaction spikes, AVS/CVV failure clusters, multi-card-from-one-IP, off-hours micro-baskets, and identical-UA-many-IPs.
- **Route alerts to Slack, email, or any webhook** (Klaviyo / Make / n8n / Zapier compatible, HMAC-signed).

It's self-hosted, GDPR-clean, and ad-blocker-immune. Your data never leaves your server.

## Replaces

| Tool | Annual cost | What Asteris covers |
|---|---|---|
| Metorik | $300+/yr SaaS | Live cart tracking, abandoned cart timeline, customer segmentation |
| WP Statistics Realtime Stats | $39–$169/yr | Live visitor list, geo, device, referrer |
| MonsterInsights Plus | $99.50/yr | Real-time visitor report (GA4-tied) |
| Glew.io Pro | $948/yr | Aggregated cart KPIs |
| OptinMonster | $108–$588/yr | In-page intervention (popups) |

Typical stack: **$300–$948/yr for what Asteris ships as part of the plugin.**

## Quick start (5 minutes to a working live dashboard)

### 1. Enable the module

Open your WordPress admin and go to **WooCommerce → Asteris WC → Dashboard**. Find the **Live Monitor** card in the module grid and toggle it on. The module ships disabled by default so it never tracks anything unless you opt in. Click **Save Module Settings**.

You should now see a new top-level menu item in your wp-admin sidebar — **Live Monitor**, positioned directly above WooCommerce.

### 2. Open the dashboard

Click the new **Live Monitor** menu entry. You'll land on the dashboard with five tiles across the top:

- **In carts right now** — total $ value across all active carts
- **Active** — visitor count in the last 30 minutes
- **Abandoning** — sessions that crossed the abandon threshold
- **Revenue today** — completed orders since midnight (site-local timezone)
- **Heartbeat** — pulses every 10 seconds confirming the polling is live

If you have any active visitors on the storefront right now, they appear as rows in the left column within ~10 seconds. If you don't, open your storefront in an incognito window — your test visit will appear as an anonymous row.

### 3. Inspect a visitor

Click any row. The drawer on the right shows three tabs:

- **Cart** — every line item the visitor has added, line totals, applied coupons, subtotal, grand total
- **Journey** — chronological timeline of every event: page views, add-to-cart, remove-from-cart, coupon applied, checkout-started, payment-attempted, stage-changed
- **Customer** — for logged-in customers: name, email, total prior orders, lifetime value, last order date, avg order value, country

Below the tabs the **Send nudge** card has 3 quick buttons + a **Recent nudges** card shows the full lifecycle of any nudges you've sent (pending → delivered → dismissed / acted / expired).

### 4. Send your first in-page nudge

Hover over a visitor row with a cart in the left column. Three inline buttons appear at the bottom of the row:

- **💸 10% off** — fires the default coupon10 template
- **15%** — sends a one-off 15% coupon (operator override)
- **🚚 Free ship** — fires the free-shipping template

Click any button. Within 10 seconds (their next heartbeat), the shopper sees a floating panel in the bottom-right corner of their browser with the offer + a click-to-copy coupon code + Apply CTA + Dismiss button. The coupon is a real WooCommerce coupon (single-use, IP-bound to that visitor, 15-minute TTL by default).

### 5. Configure alert rules + channels

Click the **⚙ Settings** button in the top-right of the stat strip. The settings drawer opens with three tabs:

**Nudges tab** — edit the 3 default templates (10% off, Free shipping, Quick send). For each:
- Toggle enabled
- Edit headline, body, CTA text
- Edit discount percent (coupon template)
- Edit emoji + button label
- Use `{percent}` and `{coupon}` placeholders in headline/body to substitute live values

**Appearance tab** — customise how the nudge looks in the shopper's browser:
- Position: bottom-right / bottom-left / top-right / top-left / bottom-center
- Border, background, text, accent gradient start/end, CTA text colours (paired hex inputs + native colour pickers)
- Animate-in toggle
- Live preview tile updates as you change colours

**Alert rules tab** — 9 rules ship disabled by default. For each rule:
- Toggle enabled
- Set thresholds (cart $, idle seconds, percent, etc.)
- Set cooldown (minutes between consecutive fires)
- Pick channels: in-admin / email / slack / webhook / auto-nudge
- **Send test** button fires the rule immediately to verify channel routing
- If `auto_nudge` is selected (only on cart/checkout/VIP rules) — pick the template + percent that should auto-fire to the matched session

**Channels tab** — set destinations for the email / Slack / webhook channels:
- Email recipients (comma-separated)
- Slack incoming-webhook URL (`https://hooks.slack.com/services/T.../B.../...`)
- Generic webhook URL (Klaviyo / Make / n8n / Zapier compatible)
- Webhook HMAC secret (signs requests via `X-Asteris-Signature: sha256=...`)

### 6. Recommended starting configuration

For a typical store, enable these 4 rules with sensible defaults:

| Rule | Threshold | Cooldown | Channels |
|---|---|---|---|
| `high_value_cart_idle` | cart ≥ $100, idle ≥ 300s | 15 min | in_admin + email |
| `abandoning_checkout` | idle ≥ 180s | 10 min | in_admin + email + auto_nudge (coupon10, 10%) |
| `vip_on_site` | LTV ≥ $500 | 60 min | in_admin + slack |
| `declined_tx_spike` | ≥ 3 failures in 10 min | 15 min | in_admin + email + slack |

That gives you live revenue alerts on big idle carts, auto-recovery on abandoning checkout (no operator needed), VIP notifications when high-value customers arrive, and immediate flags on carding-attack signatures.

### 7. Add real viewer counters to product pages

Add either or both shortcodes to your product template, your product description, or anywhere in the page:

```
[asteris_live_viewers]                       — auto-detects current product
[asteris_live_viewers product_id=123]        — specific product
[asteris_live_viewers min=5 window=300]      — only show if 5+ viewers in last 5min

[asteris_live_added_to_cart]                 — "12 added to cart in the last hour"
[asteris_live_added_to_cart window=15 min=1] — 15-minute window
```

Or enable **auto-inject mode** to drop both counters under the product title on every product page automatically:

```sql
UPDATE wp_options SET option_value='1' WHERE option_name='asteris_live_monitor_counters_auto_inject';
```

Real numbers from the heartbeat — no faking, no randomising.

## What you see

- **In carts right now** — total $ value across active carts
- **Active** — visitor count in the last 30 minutes
- **Abandoning** — sessions that crossed the abandon threshold (configurable, default 5min idle on a cart-bearing page)
- **Revenue today** — completed orders since midnight, site-local timezone
- **Per-visitor row** — initials avatar, display name (logged-in customer name or "Anonymous · 364c1b"), prior orders + LTV, country flag + city, funnel stage badge, cart value (orange if ≥ threshold), idle countdown, device + browser

## Filter chips

- **All** — every active session
- **Abandoning** — sessions that crossed the abandon threshold
- **Cart** / **Checkout** — funnel-stage filters
- **VIP** — customers with LTV ≥ $500 (configurable)
- **Returning** — customers with prior orders

## In-page nudge (the demo feature)

Operator clicks **Send nudge** in the visitor drawer. Server queues the nudge. The shopper's next heartbeat (within 10s) fetches the payload and renders a floating panel in their browser — bottom-right by default, fully customisable position + colours.

**Templates ship out of the box:**

- **10% off if completed in 10 min** — generates a real single-use WooCommerce coupon (`usage_limit=1`, 10-minute expiry, code embedded in the URL so clicking the CTA auto-applies it)
- **Free shipping unlock** — links to checkout
- **Quick send** — operator-customised headline + body + CTA

Customise everything via the ⚙ Settings button: per-template enable toggle, edit headline / body / CTA, discount % for coupon templates, modal position (bottom-right / bottom-left / top-right / top-left / bottom-center), border colour, background colour, body text colour, accent gradient (start + end), CTA text colour, animation on/off. Live preview shows the result before you save.

## Alert engine

9 rules ship with the module, all disabled by default. Enable per rule, configure thresholds, pick channels.

**Commerce alerts:**

- **High-value cart idle** — cart ≥ $X idle for ≥ Y minutes
- **Abandoning checkout** — visitor on /checkout/, cart > 0, idle ≥ Y seconds
- **VIP on site** — customer LTV ≥ $X currently active
- **Flash sale spike** — active sessions ≥ N within last X minutes

**Fraud / carding alerts (v1.1):**

- **Declined transaction spike** — N failed payments within Y minutes
- **AVS / CVV cluster** — multiple AVS or CVV failures from one session (classic carding signature)
- **Multi-card from one IP** — N distinct payment attempts from same IP-hash
- **Off-hours micro-basket** — small cart attempting checkout during your store's off-hours (configurable window, site-local timezone)
- **Identical UA from many IPs** — one user-agent string seen across N distinct IP-hashes (bot rotation / proxy farm)

**Channels:**

- **In-admin** — count + recent list on the dashboard's Alerts tile
- **Email** — branded HTML email via wp_mail() to configurable recipients
- **Slack webhook** — proper Block Kit attachment with severity colour + "Open Live Monitor" button
- **Generic webhook** — JSON POST with optional HMAC-SHA256 signature via `X-Asteris-Signature` header
- **Auto-nudge** — fires a templated nudge directly to the matched session. Cart-stall auto-trigger feature: no operator needed.

Each rule has a cooldown (configurable per rule) and de-duplicates per session over a 24h window so the operator's Slack doesn't get hammered when 20 carts cross a threshold within one minute.

## Cart-stall auto-trigger

When a rule fires and the **auto-nudge** channel is enabled, Asteris automatically composes a templated nudge for the matched session and queues it for the visitor's next heartbeat — no operator action required.

Configure per rule:
- **Template** — Coupon % off, Free shipping, or Quick send
- **Percent** (coupon template only) — the discount amount

Per-session cooldown (default 30 min, filterable) prevents the same cart getting nudged every cron tick. The nudge is logged with `triggered_by_rule` set so the operator can see exactly which auto-triggers fired without them watching.

The numbers that should sell this: real-time intervention recovers ~15% of abandoning carts vs ~3% for post-departure email — and 45–60 seconds of idle is the conversion sweet spot. Asteris fires *before* the shopper leaves; abandoned-cart-email tools fire *after*.

## Real-shopper viewer counters

Two shortcodes you can drop on any product page (or any page, with `product_id=N`):

```
[asteris_live_viewers product_id=123 min=2 window=120]
   → "👁 7 shoppers viewing right now"

[asteris_live_added_to_cart product_id=123 window=60 min=1]
   → "🛒 12 added to cart in the last 1 hour"
```

Both:
- `product_id` auto-resolves on single-product pages
- `min=N` configurable floor — hides if count < N (defaults: viewers=2, atc=1)
- `window=N` configurable look-back (seconds for viewers, minutes for atc)
- `show_zero=1` always render
- `class="..."` append custom CSS class

Or enable **auto-inject mode** to drop both counters under the product title on every single-product page automatically.

**Real numbers. Never randomised. Never faked.** Every other live-counter widget on the market (Provely $9-29/mo, Nudgify $14-65/mo, Searchanise $19+/mo) lets you randomise or fake the number because they don't own a heartbeat. Asteris uses the actual heartbeat-derived session count. Competitors literally have a "randomise" toggle in their app-store disclosures — Asteris can't claim that because the numbers are real.

## Ad-blocker visibility delta

Hero tile above the dashboard stat strip:

> 👁 **32% of your real traffic is invisible to GA4**
>
> ~15 sessions were invisible to GA4 today (industry-average 32% ad-blocker + consent-banner block rate). Click "Sync GA4 number" for an exact delta.
>
> Asteris saw: **47** · GA4 saw: **32 (est.)** · Blind spot: **15**

Click **Sync GA4 number** → enter your real "today" sessions count from GA4 → tile flips to exact delta. Stored per-day, persists across page loads.

The estimate uses the industry-average 32% ad-blocker + consent-banner block rate. Filter `asteris_live_monitor_estimated_blind_pct` to override per-site.

## Site Health integration

Three tests added to **Tools → Site Health → Info → Asteris Live Monitor**:

1. **Alert engine cron is firing** — checks `asteris_live_monitor_alert_tick` is scheduled and within 5 min of due. Goes "recommended" (yellow) if overdue, "critical" if not scheduled.
2. **Asteris real-time vs WC Analytics latency** — reads Action Scheduler's `wc-admin-data` pending queue depth. Surfaces "Asteris is real-time; WC Analytics queues updates via Action Scheduler — your queue currently has N pending jobs."
3. **HPOS + Blocks Checkout compatibility** — confirms HPOS state + Blocks-checkout state and notes Asteris reads cart state via `WC()->cart` (universal across both).

## Privacy + GDPR

- **Anonymous session ID** via first-party cookie `asteris_lm_sid` (UUIDv4) — 30 day life, server-side hashed before storage with per-install salt (SHA-256)
- **IP address never stored raw** — hashed at write-time, purged at 24 hours by hourly cron
- **Country + city** via Cloudflare proxy headers (zero-cost when behind CF) or Accept-Language fallback. MaxMind GeoLite2 support via filter hook.
- **GDPR consent gate** — respects existing consent banners via filter `asteris_live_monitor_consent_missing`. Defers tracking until consent given.
- **Configurable retention** — 7 days active sessions + 30 days history (defaults, both configurable)
- **Activity Log audit trail** — every admin view of identifying info logged via the shared Activity Log module. GDPR Article 30 records-of-processing ready.
- **No SaaS pipeline** — your visitor data never leaves your server. Compare to Metorik, OptinMonster, Glew which all process data on third-party SaaS infrastructure.

## Why self-hosted + ad-blocker-immune matters

GA4 is blocked by 25–40% of visitors via ad blockers and consent banners. MonsterInsights, which is a thin wrapper around GA4, inherits that blind spot. Asteris uses a first-party heartbeat that ad blockers don't recognise — you see the shoppers your analytics misses.

Marketing copy you can quote: "Asteris saw 47 visitors today. GA4 saw 32. Your 32% blind spot — surfaced."

(The visibility-delta tile lands in a follow-up release.)

## Tier availability

Pro, Agency, and Lifetime tiers. Not in Free.

## Spec

- 6 database tables: `wp_asteris_wc_live_sessions`, `_history`, `_events`, `_alert_rules`, `_nudges`, `_alerts_log`
- 10-second polling default (configurable 5s / 10s / 30s / 60s)
- HPOS-native + WooCommerce Blocks Checkout compatible
- Module bundles its own admin assets, no external CDN
- Self-hosted: zero outbound requests on the heartbeat path

## Troubleshooting

### No visitors appearing in the dashboard

1. Confirm the module is enabled at **WooCommerce → Asteris WC → Dashboard**. The Live Monitor card should be toggled on.
2. Visit your storefront in an incognito window (logged-out). Open DevTools → **Application → Cookies**. You should see a cookie named `asteris_lm_sid` with a UUID value.
3. Open DevTools → **Network** tab, filter on `beat`. You should see a POST to `/wp-json/asteris/v1/live-monitor/beat` every 10 seconds, returning status 200 with `{"ok":true,"interval":10}`.
4. If both checks pass but the admin still shows no rows: hard-refresh the admin tab (Ctrl+Shift+R) — WP REST nonces expire after 24 hours and the polling silently 403s with a stale nonce.
5. If still empty: confirm the visitor heartbeat is hitting your real domain (some staging configs route to a different host). Run `SELECT COUNT(*) FROM wp_asteris_wc_live_sessions WHERE last_activity_at >= UNIX_TIMESTAMP()-300;` in your database. If this returns 0, the heartbeat isn't writing rows; if > 0, it's an admin polling issue.

### Admin user not appearing in the dashboard

By default the admin role is excluded from tracking (set in `asteris_live_monitor_excluded_roles`). This avoids polluting your live view with your own browsing.

For dev hostnames (`.local`, `.test`, `localhost`) the exclusion is bypassed automatically so you can dogfood the dashboard. In production, either browse in incognito or add a non-admin role to test with.

### Nudge sent but not appearing in shopper's browser

1. Confirm the shopper's storefront tab has live heartbeats (DevTools Network → filter `beat` → POSTs every 10s).
2. Open the visitor's drawer in your admin → **Recent nudges** card → check the latest nudge's status. Should be `pending` immediately after sending, then `delivered` within 10s.
3. If status is stuck at `pending` for > 30s, the shopper's tab isn't polling — confirm they haven't closed it.
4. If status flips to `expired`, the TTL elapsed before delivery — increase the template's `ttl_minutes` setting.

### Alerts not firing

1. The alert engine cron runs every 60 seconds. Confirm it's scheduled: **Tools → Site Health → Info → Asteris Live Monitor → "Alert engine cron is firing on schedule"** should be a green check.
2. If overdue, your site may have low traffic + WP-Cron disabled. Either get traffic to the site, hit `/wp-cron.php` manually to fire pending jobs, or set up a real cron call to wp-cron.php every minute.
3. Check the rule is enabled and the threshold is reachable by your traffic. Use the **Send test** button next to the rule to verify channel routing without waiting.

### Slack alerts not arriving

1. Confirm the rule has `slack` ticked in its channels.
2. Settings → Channels tab → confirm a valid Slack incoming-webhook URL is saved.
3. Use **Send test** on the rule to dispatch a synthetic alert immediately.
4. If still nothing, the webhook may have been disabled on the Slack side — visit your Slack app config to verify.

### Generic webhook arrives but signature verification fails

The HMAC signature is `sha256={hash}` where `{hash}` is the lower-case hex-encoded HMAC-SHA256 of the raw request body, signed with the secret you saved in Channels tab. In your receiver, compute the same hash on the raw body bytes (NOT the parsed JSON) and `hash_equals()` against the value in the `X-Asteris-Signature` header.

### Coupon won't apply

The coupon push mints **IP-bound, single-use, TTL'd** WC coupons. If the shopper:

- Tries to redeem from a different IP (e.g. clicked the URL on their phone after the coupon was sent to their desktop) — blocked by **Coupon_Guard**. This is the intended defence against the coupon URL leaking to social media.
- Tries to redeem after the TTL elapses — blocked by WC's standard expiry check.
- Tries to redeem twice — blocked by `usage_limit=1`.

If a legitimate customer is blocked: increase the `ttl_minutes` setting, or override the operator-typed `percent` to a longer-lasting offer.

## FAQ

### Is Live Monitor GDPR-compliant?

Yes. We never store raw IP addresses (hashed with a per-install salt at write time, hash purged at 24 hours by hourly cron). The session ID is a random UUIDv4 in a first-party cookie. Cookie consent is respected via the `asteris_live_monitor_consent_missing` filter — if your consent banner says "no", tracking is deferred until consent is given. Every admin view of identifying info is recorded in the Activity Log for GDPR Article 30 records-of-processing.

### Does Live Monitor send data to any third party?

No. Everything is processed in your own database. There is no SaaS pipeline, no analytics relay, no cloud function. Your visitor data never leaves your server. Compare to Metorik / OptinMonster / Glew which all process visitor data on third-party SaaS infrastructure.

### Will Live Monitor slow down my store?

The frontend heartbeat is ~16 KB of vanilla JavaScript deferred to the footer. It fires a single POST every 10 seconds (configurable) that returns within ~50 ms server-side. No external requests, no third-party SDK, no large CSS payload. The admin dashboard is admin-only and doesn't run on the storefront.

### Does Live Monitor work with HPOS and WooCommerce Blocks Checkout?

Yes. We read cart state via `WC()->cart` which is universal across HPOS and the new Blocks Checkout. The Site Health panel confirms compatibility — green ticks if both are working.

### Can I export Live Monitor data?

The webhook channel lets you export every alert as a JSON POST to any URL — perfect for Klaviyo flows, Make / n8n / Zapier automations, or your own data warehouse. For raw session-level export, query the `wp_asteris_wc_live_sessions` and `wp_asteris_wc_live_events` tables directly.

### What's planned for v1.2 and beyond?

The roadmap is built from a 6-angle research workflow. Candidates in priority order: on-device gradient-boosted abandon scorer trained on your store's own data (BYO-key, never leaves your server), operator-in-loop LLM nudge rewrite (BYO API key — Asteris never proxies), Apriori cross-sell token in nudge templates, contextual bandit nudge timing, field-level checkout drop-off analytics, rage-click/dead-click capture, B2B company badge surface. See the **roadmap** page for current priority.

[← All Asteris Affiliates modules](/modules)
