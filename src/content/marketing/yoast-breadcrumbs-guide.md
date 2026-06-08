---
url: /yoast-breadcrumbs-guide
title: "Yoast breadcrumbs for WooCommerce product pages"
meta_description: "How to configure Yoast SEO breadcrumbs on WooCommerce product pages. Category hierarchy, product page paths, and schema markup for WooCommerce stores."
og_title: "Yoast breadcrumbs for WooCommerce — configuration guide"
og_description: "Yoast breadcrumb settings specific to WooCommerce. Category hierarchy, variable products, and breadcrumb schema for product pages."
canonical: https://asterisaffiliates.com/yoast-breadcrumbs-guide
primary_keyword: yoast breadcrumbs for woocommerce
primary_keyword_us_vol: 290
primary_keyword_kd: 14
secondary_keywords:
  - yoast seo breadcrumbs woocommerce
  - woocommerce breadcrumbs yoast
  - yoast breadcrumb navigation
schema_type: Article + HowTo + FAQPage
internal_links_out:
  - /yoast-guide
  - /yoast-seo-title-guide
  - /modules
  - /yoast-vs-asteris
verified_date: 2026-06-01
ai_overview_optimised: true
faqs:
  - q: "Do I need breadcrumbs for WooCommerce SEO?"
    a: "Not strictly — Google doesn't penalise their absence. But BreadcrumbList schema replaces the raw URL in search results with a cleaner Home > Category > Product trail, which improves click-through. It's a low-cost win."
  - q: "Can I use Yoast breadcrumbs without enabling other Yoast features?"
    a: "Yes. Yoast's breadcrumbs work independently of meta titles, descriptions, and XML sitemaps. The plugin still has to be active and configured, but you don't need to use anything else."
  - q: "Do Yoast breadcrumbs work with Elementor?"
    a: "Yes. Drop the [wpseo_breadcrumb] shortcode into an Elementor text widget, or use Elementor's own breadcrumb widget which can use Yoast as the source. The Yoast Gutenberg block doesn't render inside Elementor templates."
  - q: "Why is my breadcrumb showing the wrong category?"
    a: "The product has multiple product categories assigned and no Primary Category set. Edit the product, find the Yoast box, set Primary Category to the one you want in the trail."
  - q: "Will Yoast breadcrumbs slow down my site?"
    a: "No measurable impact. The schema is added to the existing JSON-LD payload Yoast already outputs, and the visible trail is a single PHP function call."
  - q: "Can I have different breadcrumb formats for products vs blog posts?"
    a: "Not within Yoast's settings — they're global. If you need different formats, wrap your yoast_breadcrumb() calls in conditionals (is_product(), is_singular('post')) and pass different CSS classes per context."
  - q: "Do Yoast breadcrumbs support multilingual sites (WPML, Polylang)?"
    a: "Yes. Both translate the home label and category names automatically. The separator is global."
  - q: "How do I remove the current page from the breadcrumb trail?"
    a: "You can't via settings — Yoast always includes the current page as the final crumb. To strip it, filter the output via wpseo_breadcrumb_links and pop the last element. This is rarely a good idea — the final crumb is what tells users where they are."
  - q: "Does Rank Math, AIOSEO, or SEOPress do breadcrumbs differently?"
    a: "Conceptually the same — settings panel, schema output, shortcode or PHP function. Rank Math's shortcode is [rank_math_breadcrumb]. AIOSEO uses [aioseo_breadcrumbs]. Migrating between them means replacing shortcode calls and updating any template code."
aio_audit:
  faq_count: 9
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# Yoast breadcrumbs for WooCommerce product pages

Breadcrumbs show a page's position in your store hierarchy — Home → Category → Product — both on the rendered page and in Google search results via BreadcrumbList schema. Yoast SEO ships breadcrumb output for WooCommerce, but the default install only handles half the job: settings live in Yoast, but the actual breadcrumb trail won't appear until you hook it into your theme. This guide covers the three ways to render the trail (theme code, shortcode, Gutenberg block), per-theme guidance for the most common WooCommerce themes, the WooCommerce-specific gotcha around shop vs category hierarchy, and how to fix the four most common breadcrumb problems.

---

## What are Yoast breadcrumbs?

A breadcrumb trail is a row of links showing the path from your homepage down to the current page. On a WooCommerce product page that path is usually:

```
Home › Shop › Hoodies › Black Hoodie
```

Yoast's breadcrumb feature does two things. First, it generates the visible HTML trail when you call the `yoast_breadcrumb()` PHP function, the `[wpseo_breadcrumb]` shortcode, or the Yoast breadcrumb block. Second, it outputs `BreadcrumbList` schema in the page's JSON-LD payload, which is what Google uses to show the breadcrumb-style URL display in search results instead of the raw URL.

The schema is on by default once Yoast is active. The visible trail is not — you have to enable it in Yoast settings, and then physically place it somewhere in your theme.

---

## Enable breadcrumbs in Yoast settings

Before adding any code or shortcodes, turn the feature on.

1. WordPress admin → **Yoast SEO → Settings → Advanced → Breadcrumbs** (Yoast 23.x and later). On older Yoast versions it's **SEO → Search Appearance → Breadcrumbs**.
2. Toggle **Enable breadcrumbs for your theme** to on.
3. Set **Separator** — most stores use `›` (the right-pointing single guillemet) or `/`. The character is rendered as-is, so type it directly rather than using an HTML entity.
4. Set **Anchor text for the homepage** — usually "Home" or your store name.
5. Leave **Prefix for the breadcrumb path** blank unless you specifically want every trail to start with "You are here:" or similar.
6. Under **Taxonomy to show in breadcrumbs for content types**, set Products to **Product categories**.

Save changes. Nothing will appear on the front-end yet — that's expected.

---

## Method 1: Theme template code (`yoast_breadcrumb`)

The most reliable method. You drop a PHP call into the theme template where you want the trail to render.

```php
<?php if ( function_exists( 'yoast_breadcrumb' ) ) {
    yoast_breadcrumb( '<nav class="breadcrumbs" aria-label="Breadcrumb">', '</nav>' );
} ?>
```

The two string arguments wrap the output. Adding `aria-label="Breadcrumb"` is worth keeping — it's a small accessibility win and Google's documentation flags breadcrumbs as a navigation landmark.

Where to put it depends on what pages you want trails on:

- **Product pages only**: edit `single-product.php` in a child theme, place the call above `<div class="summary entry-summary">`.
- **Shop archive + product pages**: hook into WooCommerce's `woocommerce_before_main_content` action in `functions.php`:

```php
add_action( 'woocommerce_before_main_content', function() {
    if ( function_exists( 'yoast_breadcrumb' ) ) {
        yoast_breadcrumb( '<nav class="breadcrumbs" aria-label="Breadcrumb">', '</nav>' );
    }
}, 20 );
```

- **Everywhere, including blog posts and pages**: edit `header.php` or whichever template wraps your main content area. Add a conditional `if ( ! is_front_page() )` so it doesn't render on the homepage.

Always do this in a child theme. Editing the parent theme directly will lose your changes on the next update.

---

## Method 2: Shortcode `[wpseo_breadcrumb]`

Pasted into any page, post, or text widget. Useful for non-WooCommerce pages or when you don't have access to PHP templates.

```
[wpseo_breadcrumb]
```

The shortcode works inside the classic editor, Gutenberg shortcode blocks, Elementor text widgets, and most page builders. It will not work inside a sidebar widget unless your theme runs `do_shortcode` on widget text — most modern themes do, but if nothing renders, that's the first thing to check.

The shortcode honours the separator and home-label settings from Yoast's breadcrumb panel.

---

## Method 3: The Yoast breadcrumb block

In the Gutenberg block editor, search for "Yoast breadcrumbs" in the block inserter. Drop it where you want the trail. The block accepts no settings of its own — everything still flows from the Yoast settings panel.

The block is the cleanest method if you're using a block theme (Twenty Twenty-Four, Twenty Twenty-Five) and editing templates in the Site Editor. Open **Appearance → Editor → Templates → Single Product**, insert the breadcrumbs block above the product title, save.

---

## Per-theme guidance

WooCommerce themes vary in how they handle breadcrumbs. Most have their own breadcrumb implementation that conflicts with Yoast's. Here's the picture for the five most common.

| Theme | Default breadcrumb behaviour | What to do |
|---|---|---|
| Storefront | Renders its own WooCommerce breadcrumb via `storefront_breadcrumb` | Yoast detects this and replaces it automatically when enabled. No code needed. |
| Astra | Native breadcrumb option in Customiser, supports Yoast directly | Customiser → Header Builder → Breadcrumb → Source: Yoast SEO. |
| GeneratePress | Breadcrumb module in GP Premium, or theme hook | If GP Premium: Layout → Layout → disable native breadcrumbs, then add Yoast via theme hook (Element → Hook). Free GeneratePress: use Method 1. |
| Blocksy | Native breadcrumb element with Yoast as a source option | Customiser → Header/Footer → add Breadcrumbs element → Source: Yoast SEO. |
| Hello (Elementor) | No native breadcrumbs | Add the Yoast block in the Elementor template, or use Elementor's own breadcrumb widget pointed at Yoast. |

If you're on a custom or boutique theme, default to Method 1 (template code) and check the rendered HTML for duplicate breadcrumb output — see the troubleshooting section below.

---

## Customising the separator and home label

Both live in **Yoast SEO → Settings → Advanced → Breadcrumbs**. Common patterns:

- **Separator**: `›` (clean, single character), `/` (compact), `→` (heavier), `»` (dated, avoid).
- **Home label**: "Home" is the default and what most users expect. Using your brand name ("Asteris") is a small SEO signal but can read awkwardly on long trails.

For deeper styling, target the wrapper class you set in your `yoast_breadcrumb()` call. Yoast outputs each crumb as `<a>` tags separated by raw text, not `<li>` elements, so flex layout is the path of least resistance:

```css
.breadcrumbs {
    font-size: 0.875rem;
    color: #666;
    margin: 1rem 0;
}
.breadcrumbs a {
    color: #0073aa;
    text-decoration: none;
}
.breadcrumbs .breadcrumb_last {
    color: #111;
    font-weight: 500;
}
```

`.breadcrumb_last` is the class Yoast applies to the final (non-link) crumb.

---

## The WooCommerce shop-vs-category gotcha

This is the single most common source of confusion. WooCommerce has two competing hierarchies for products:

1. **Shop page hierarchy**: Home → Shop → Product
2. **Category hierarchy**: Home → Product Category → Product

Yoast lets you pick one. **Yoast SEO → Settings → Advanced → Breadcrumbs → Taxonomy to show in breadcrumbs for "Product"** controls this.

- Set to **Product categories** for category-driven stores (most common — Home → Hoodies → Black Hoodie).
- Set to **None** if you want Home → Shop → Product, then enable **Show blog page in breadcrumbs** or its equivalent for the shop archive.

If a product belongs to multiple categories, Yoast picks one. Override it on a per-product basis: edit the product → in the Yoast sidebar, find **Primary category** under the categories list. The chosen category is what shows in the breadcrumb and the schema.

Without a primary category set, Yoast picks the alphabetically first one, which is usually wrong.

---

## Troubleshooting

**Breadcrumbs don't appear at all.** Three causes, in order of likelihood: (1) you enabled the setting but never added the shortcode/template code/block, (2) your theme renders its own breadcrumb and you haven't routed it through Yoast (see the per-theme table above), (3) a caching plugin is serving an old version of the page — purge and recheck.

**Duplicate breadcrumbs (two trails stacked).** Your theme is rendering its native breadcrumb AND Yoast's. Find the theme's breadcrumb function (usually in `functions.php` or a `template-parts/breadcrumb.php` file) and remove its call, or disable native breadcrumbs in the theme's Customiser/options.

**Wrong order — breadcrumb shows the wrong category.** The product has multiple categories and no primary set. Edit the product, set the Yoast Primary Category, save. Schema regenerates on the next page load.

**Breadcrumb schema not detected in Search Console.** Verify the page actually renders the visible trail (view source, search for `breadcrumbs`). If the visible trail is missing, the schema won't fire correctly either — Yoast scopes the schema output to pages where the trail is enabled. Test the URL in Google's Rich Results Test for the specific error message.

**Home → Shop → Category → Product (four levels) instead of three.** This is correct when the shop page is set as the parent in **Settings → Reading → Posts page** equivalent. If you don't want the Shop crumb, set Taxonomy to Product Categories and remove the shop page reference from your breadcrumb settings.

**Breadcrumbs show on mobile but not desktop (or vice versa).** Your theme is hiding the wrapper class with CSS at certain breakpoints. Inspect with browser dev tools, find the `display: none` rule, override it.

---

## FAQ

**Do I need breadcrumbs for WooCommerce SEO?**
Not strictly — Google doesn't penalise their absence. But BreadcrumbList schema replaces the raw URL in search results with a cleaner Home › Category › Product trail, which improves click-through. It's a low-cost win.

**Can I use Yoast breadcrumbs without enabling other Yoast features?**
Yes. Yoast's breadcrumbs work independently of meta titles, descriptions, and XML sitemaps. The plugin still has to be active and configured, but you don't need to use anything else.

**Do Yoast breadcrumbs work with Elementor?**
Yes. Drop the `[wpseo_breadcrumb]` shortcode into an Elementor text widget, or use Elementor's own breadcrumb widget which can use Yoast as the source. The Yoast Gutenberg block doesn't render inside Elementor templates.

**Why is my breadcrumb showing the wrong category?**
The product has multiple product categories assigned and no Primary Category set. Edit the product, find the Yoast box, set Primary Category to the one you want in the trail.

**Will Yoast breadcrumbs slow down my site?**
No measurable impact. The schema is added to the existing JSON-LD payload Yoast already outputs, and the visible trail is a single PHP function call.

**Can I have different breadcrumb formats for products vs blog posts?**
Not within Yoast's settings — they're global. If you need different formats, wrap your `yoast_breadcrumb()` calls in conditionals (`is_product()`, `is_singular('post')`) and pass different CSS classes per context.

**Do Yoast breadcrumbs support multilingual sites (WPML, Polylang)?**
Yes. Both translate the home label and category names automatically. The separator is global.

**How do I remove the current page from the breadcrumb trail?**
You can't via settings — Yoast always includes the current page as the final crumb. To strip it, filter the output via `wpseo_breadcrumb_links` and pop the last element. This is rarely a good idea — the final crumb is what tells users where they are.

**Does Rank Math, AIOSEO, or SEOPress do breadcrumbs differently?**
Conceptually the same — settings panel, schema output, shortcode or PHP function. Rank Math's shortcode is `[rank_math_breadcrumb]`. AIOSEO uses `[aioseo_breadcrumbs]`. Migrating between them means replacing shortcode calls and updating any template code.

---

## How Asteris Affiliates fits

Breadcrumbs are a small slice of WooCommerce SEO. Yoast handles them well, and if breadcrumbs are the only feature you need, there's no reason to switch.

Asteris Affiliates includes breadcrumb output as part of its SEO module — the same BreadcrumbList schema, the same shortcode-or-template choice, with WooCommerce-aware defaults (primary category respected, shop hierarchy handled, no setup wizard required). The reason a store would move from Yoast to Asteris is rarely breadcrumbs in isolation; it's the bundle. Asteris combines SEO, security, performance, licensing, and a handful of other modules under one annual licence at AUD $79/year (founder year) instead of paying for Yoast Premium ($99/year), a security plugin, a caching plugin, and the rest separately.

If you're currently on Yoast and breadcrumbs work, leave them. If you're rebuilding your plugin stack, the [Yoast vs Asteris comparison](/yoast-vs-asteris) covers the full feature parity.

---

## Related

- [Yoast SEO for WooCommerce — complete guide](/yoast-guide)
- [Yoast SEO title configuration](/yoast-seo-title-guide)
- [Yoast meta description guide](/yoast-meta-description-guide)
- [Yoast SEO checklist for WooCommerce](/yoast-seo-checklist)
- [Yoast vs Asteris Affiliates](/yoast-vs-asteris)
- [Migrating from Yoast to Asteris](/migrate/from-yoast)
- [Asteris modules](/modules)
- [WooCommerce SEO — what actually matters](/woocommerce-seo)
