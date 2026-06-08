---
title: "Announcement Bar"
description: "Scrolling marquee or auto-rotating top bar with cart-aware tokens, country targeting, schedule, and pause-on-hover. Replaces Hello Bar ($348/yr) and WPFront Notification Pro ($59/yr)."
---

## What it does

Announcement Bar puts a configurable strip across the top of every page — for shipping promos, store hours, free-gift unlocks, urgency timers, or seasonal messages.

Three styles:

- **Scrolling marquee** — messages scroll left ← right with hover-to-pause
- **Auto-rotate** — fades between messages every N seconds
- **Static** — a single fixed message

The differentiator vs Hello Bar / WPFront / etc: **cart-aware tokens**. Drop `{{free_shipping_remaining}}` into a message and it updates live as the customer adds items — "Spend **$22.50** more for free shipping!" becomes "Spend **$0.00** more — free shipping unlocked! 🎉" the instant they cross the threshold.

## Replaces

| Tool | Annual cost | What Asteris covers |
|---|---|---|
| Hello Bar | $348/yr ($29/mo) | Top-of-page promo bar with rotation + targeting |
| WPFront Notification Bar Pro | $59/yr | Schedule + geo + multiple messages |
| HollerWP | $49/yr | Sticky promo bars |
| OptinMonster (top bar only use) | $108/yr | Time-based promo bars |

Typical stack: **$60–$350/yr replaced.**

## Quick start (2 minutes)

### 1. Enable the module

**WooCommerce → Asteris WC → Dashboard** — find **Announcement Bar**, toggle on, **Save**.

### 2. Pick a style

**WooCommerce → Asteris WC → Announcement Bar** — choose:

- **Scrolling marquee** (default) — messages stream left. Pauses when the customer hovers.
- **Auto-rotate** — one message visible at a time, fades to the next every 5 seconds.
- **Static** — single message, no movement.

### 3. Write your messages

One message per line in the **Messages** field. Default content:

```
🚚 Free shipping on orders over $100
🎁 New customers — use code WELCOME10 for 10% off
📞 Sydney showroom open 9am-5pm Mon-Fri
```

Use tokens for dynamic content:

- `{{cart_total}}` — current cart total (live-updated)
- `{{free_shipping_remaining}}` — $ amount to free shipping (live-updated)
- `{{site_name}}` — your store name

Example with tokens:
```
🚚 Spend {{free_shipping_remaining}} more for free shipping!
```

### 4. Colours + speed

- **Background** — default black `#0a0a0a`
- **Text** — default white `#ffffff`
- **Accent** — `<strong>` and `<b>` tags inside messages render in this colour (default WC orange `#06D6A0`)
- **Scroll speed** — 40 seconds end-to-end is a comfortable default. Slower = more readable, faster = more visible.
- **Rotate interval** — 5 seconds per message works well.

### 5. Country + schedule + hide-for-logged-in

**Country targeting** — leave blank to show everywhere, or list comma-separated ISO codes like `AU,NZ,US,GB` to limit visibility. Uses WC's geolocation.

**Schedule** — set a from/to datetime to auto-show during a sale window. Bar disappears outside that window.

**Hide for logged-in users** — off by default. Turn on if your message is "first-time buyer" focused.

## Common questions

### Will it conflict with my theme's existing top bar?

The bar uses `wp_body_open` (and a `wp_footer` fallback for older themes). It renders before your theme's content. If you have a theme-provided top bar, you'll have two bars — either disable your theme's or stack them deliberately.

### Does cart-aware update actually work?

Yes. The frontend JS listens for WC fragment events (`updated_cart_totals`, `added_to_cart`, `wc-blocks_added_to_cart`) and refreshes the token values via AJAX. No page reload needed.

### What if I don't run WooCommerce?

The bar still works — just don't use cart-aware tokens. Country targeting + schedule + rotation all work standalone.

### Can I use HTML in messages?

Yes — limited to safe HTML (per `wp_kses_post`). `<strong>`, `<a>`, `<em>`, `<br>` all work. Scripts and forms are stripped.

### Mobile?

Auto-resizes — smaller font + tighter padding on screens ≤600px. Scrolling and rotation still work.

### Performance?

Single CSS file (~1 KB) + single JS file (~1 KB). No external requests. Loaded only when the bar is enabled and should render.

## Related modules

- [Free Shipping Bar](free-shipping-bar) — progress bar toward free shipping (different placement, same concept)
- [Live Monitor](live-monitor) — for the in-page nudge system (different surface, more targeted)
- [Stock Urgency](stock-urgency) — "Only X left!" on product pages
- [Trust Badges](trust-badges) — trust signal grid for cart/checkout

## Settings reference

| Field | Default | Purpose |
|---|---|---|
| Enabled | On | Master toggle |
| Style | Auto-rotate | scroll / rotate / static |
| Messages | 3 defaults | Newline-separated, one per line |
| Colour BG | `#0a0a0a` | Bar background |
| Colour Text | `#ffffff` | Bar text |
| Colour Accent | `#06D6A0` | `<strong>` tag colour |
| Scroll speed (sec) | 40 | End-to-end duration for marquee |
| Rotate interval (sec) | 5 | Pause per message for rotate style |
| Sticky | On | Sticks to viewport top |
| Hide for logged-in | Off | Skip rendering when user is signed in |
| Cart-aware | On | Enable {{cart_total}} + {{free_shipping_remaining}} tokens |
| Country codes | "" | Comma-separated ISO codes, blank = all |
| Schedule from | "" | YYYY-MM-DDTHH:MM datetime |
| Schedule to | "" | YYYY-MM-DDTHH:MM datetime |

## Available in

| Tier | Includes |
|---|---|
| Free (WP.org — planned) | Sticky Top Bar block (no cart-aware, no country targeting, no schedule, max 3 messages, static + rotate only) |
| Starter ($149/yr) | Full module |
| Pro ($299/yr) | Full module |
| Agency ($549/yr) | Full module |
