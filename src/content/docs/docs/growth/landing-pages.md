---
title: Vanity /go/ landing pages
description: Branded /go/{handle} landing pages with built-in cookie + view tracking. Affiliates get their own URL.
---

Every approved affiliate gets a vanity URL at `/go/{their-handle}` (e.g. `yoursite.com/go/sarah`). The page is a branded landing page with the affiliate's intro + the destination product/store + cookie tracking.

## Default behaviour

When a visitor lands on `/go/sarah`:

1. The plugin drops Sarah's referral cookie (configurable duration — see [getting started](/docs/getting-started))
2. The view is counted in Sarah's stats
3. The visitor sees a landing page with:
   - Your store logo + tagline
   - Optional "Sarah recommends [product]" callout
   - Auto-redirect after N seconds (default: 3) to the target URL

## Configure default landing template

**Settings → Landing pages → Default template**:

- **Auto-redirect after** — seconds (0 = instant, 3 = show page briefly)
- **Show affiliate's name** — yes/no
- **Show product image** — yes/no
- **Target URL** — homepage / specific product / latest post

## Per-affiliate customisation

Affiliates can override the default in their portal:

- Custom intro text ("Hi, I'm Sarah and I think you'll love…")
- Custom photo
- Different target URL per campaign

## Per-campaign landing pages

Affiliates can create multiple landing pages with different handles:

- `/go/sarah` — homepage
- `/go/sarah-summer-sale` — campaign landing
- `/go/sarah-product-x` — specific product

Generate from their portal → **Links → Create vanity link**.

## SEO

Vanity pages are `noindex` by default — they're affiliate-tracking URLs, not content pages. Override per page if you want a specific campaign to be indexable.

## White-label CSS

Override the default landing page styling at **Settings → Landing pages → Custom CSS**. Brand colours, fonts, layout — all customisable. Agency tier includes a "Built with Asteris" footer removal toggle.

## Performance

Landing pages render server-side via PHP, cached for 60 seconds per affiliate. Negligible overhead even on stores with thousands of vanity pages.

## Related

- [Affiliate portal](/docs/affiliates/portal)
- [AI swipe-copy generator](/docs/growth/ai-swipe-copy)
