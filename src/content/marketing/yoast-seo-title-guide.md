---
url: /yoast-seo-title-guide
title: "Yoast SEO titles for WooCommerce product pages"
meta_description: "How to configure Yoast SEO title templates for WooCommerce product pages. Variables, character limits, and best practices for product titles in search results."
og_title: "Yoast SEO titles for WooCommerce"
og_description: "Yoast SEO title configuration for WooCommerce product pages. Templates, variables, character limits, and what shows in Google."
canonical: https://asterisaffiliates.com/yoast-seo-title-guide
primary_keyword: yoast seo title for woocommerce
primary_keyword_us_vol: 290
primary_keyword_kd: 18
secondary_keywords:
  - yoast seo title tag woocommerce
  - woocommerce product title seo
  - yoast title template
schema_type: Article + HowTo + FAQPage
internal_links_out:
  - /yoast-guide
  - /yoast-meta-description-guide
  - /modules
  - /yoast-vs-asteris
verified_date: 2026-06-01
ai_overview_optimised: true
faqs:
  - q: "Is the SEO title the same as the page title?"
    a: "No. The page title (post_title in WordPress) is the product or post name shown on your site. The SEO title is the title tag in the head — what Google shows in search results. Yoast lets you set them independently."
  - q: "What's the maximum length for a Yoast SEO title?"
    a: "Around 580 pixels on desktop SERPs, which works out to roughly 50-60 characters of mixed-case text. Yoast's green-bar indicator measures pixel width directly — trust the bar over the character count."
  - q: "Can I use HTML in Yoast SEO titles?"
    a: "No. The title element is plain text only. HTML tags get stripped or rendered as literal characters in the SERP."
  - q: "Do title templates work for variable products?"
    a: "Yes. The template applies to the parent product page. Individual variations don't have their own SEO titles — they're not separate URLs."
  - q: "Why is my SEO title showing the wrong text in Google?"
    a: "Three possibilities. Google has rewritten your title (they do this on roughly 60% of pages when the algorithm thinks your title doesn't match the query). Your title tag is being set by your theme or another plugin and overriding Yoast. Or the cache hasn't refreshed — Google can take days to pick up a title change."
  - q: "Does Yoast SEO Premium add more title features over the free version?"
    a: "Not for titles specifically. Free Yoast handles the full template system. Premium adds internal linking suggestions, redirects, multiple focus keyphrases — none of which touch title generation."
  - q: "What's the difference between %%category%% and %%primary_category%%?"
    a: "%%category%% outputs the first category assigned to a post (alphabetical, usually arbitrary). %%primary_category%% outputs the one you explicitly marked as primary in the Yoast meta box. Always prefer the latter for predictable output."
  - q: "Can I use Yoast title variables in custom code?"
    a: "Yes, via the filter wpseo_title. You get the final title string and can modify it before output. Used carefully this is fine; abused it makes the visible template lie about what's actually shipping."
  - q: "Do title changes need a sitemap resubmit?"
    a: "No. Title changes are picked up on the next crawl. You don't need to resubmit anything in Search Console — though if you want the change reflected fast on a high-priority page, requesting indexing on that URL is reasonable."
  - q: "Should I include the price in the SEO title?"
    a: "Usually no. Prices change, titles get cached in Google, and a stale price in the SERP looks worse than no price. The exception: products on permanent fixed pricing where the price is a key differentiator."
aio_audit:
  faq_count: 10
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# Yoast SEO titles for WooCommerce product pages

The SEO title is the clickable headline Google shows in search results. It is not the same thing as your product name (the `post_title` in WordPress) or the H1 on the page — those are three separate fields that can hold three different strings. This guide covers how Yoast's title template system generates SEO titles for WooCommerce, every variable that matters, the gotchas that quietly tank your CTR, and how to fix the defaults that ship out of the box.

## Title tag vs H1 vs post title — the three are different things

This trips up most store owners on day one.

| Field | Where it lives | What sees it |
|---|---|---|
| **Post title** (`post_title`) | `wp_posts` table, the WordPress "Product name" field | Site visitors on the product page, admin lists, breadcrumbs, internal linking |
| **H1** | Rendered by your theme inside `<h1>` tags | On-page visual heading, screen readers, on-page SEO signals |
| **SEO title** (`<title>` tag) | The `<title>…</title>` element in the `<head>` | Google SERPs, browser tabs, social cards when no `og:title` is set |

In a default WooCommerce store all three usually contain the same string — the product name. Yoast's job is to let the SEO title diverge from the other two so you can write something tuned for SERP click-through without renaming the product or breaking the H1.

A worked example. The product is named "Heavy Duty Stainless Steel Camping Kettle 1.5L". Your H1 stays that way (customers searching the site need to see it). Your SEO title becomes "Camping Kettle 1.5L — Stainless Steel | Acme Outdoors" — shorter, with the brand at the end, optimised for the 580-pixel SERP slot.

## How Yoast title templates work

Yoast generates the `<title>` tag from a template string containing variables wrapped in `%%`. You set templates per content type in **SEO → Settings → Content types** and **SEO → Settings → Categories & tags** (newer versions) or **SEO → Search Appearance** (Yoast ≤ 19.x).

Templates apply to:

- **Homepage** — usually `%%sitename%% %%page%% %%sep%% %%sitedesc%%`
- **Posts** — `%%title%% %%page%% %%sep%% %%sitename%%`
- **Pages** — same as posts
- **Products** (single product pages) — `%%title%% %%page%% %%sep%% %%sitename%%`
- **Product categories** — `%%term_title%% %%page%% %%sep%% %%sitename%%`
- **Product tags** — same as categories
- **Shop page** — uses the Pages template by default unless you set a separate one
- **Author archives, date archives, search results, 404s** — separate templates each

Every product, category, tag and page can override the template with a per-post SEO title set in the Yoast meta box. The override always wins.

## The variables that matter

Yoast ships around 40 template variables. These are the ones that actually pull weight on a WooCommerce store.

### Universal variables

| Variable | Outputs |
|---|---|
| `%%title%%` | The post/product title |
| `%%sitename%%` | The Site Title from Settings → General |
| `%%sitedesc%%` | The Tagline from Settings → General |
| `%%sep%%` | The separator you picked in Yoast settings |
| `%%page%%` | "Page 2 of 5" on paginated archives — leave it in or you get duplicate titles |
| `%%pagenumber%%` | Just the current page number |
| `%%searchphrase%%` | The user's search term on `/?s=` pages |

### WooCommerce-specific variables (require Yoast WooCommerce SEO add-on, $79/yr)

| Variable | Outputs |
|---|---|
| `%%product_price%%` | The product price including currency symbol |
| `%%product_short_description%%` | The product short description, stripped of HTML |
| `%%product_sku%%` | The SKU |
| `%%wc_brand%%` | Brand taxonomy term (WooCommerce 9.4+ native brand taxonomy) |
| `%%wc_gtin8%%`, `%%wc_gtin12%%`, `%%wc_gtin13%%`, `%%wc_gtin14%%` | The respective GTIN field |
| `%%wc_mpn%%` | Manufacturer Part Number |
| `%%cf_<field_name>%%` | Any custom field by meta key |

The custom-field variable is the under-used one. `%%cf_brand%%` pulls from a `brand` meta key set by another plugin. Handy when migrating from a setup that stored brand in a custom field rather than a taxonomy.

### Category and term variables

| Variable | Outputs |
|---|---|
| `%%term_title%%` | The current category/tag name |
| `%%term_description%%` | The category description (use sparingly — it's long) |
| `%%category%%` | The first category assigned to a post |
| `%%primary_category%%` | The category you marked primary on the post (Yoast feature) |
| `%%parent_title%%` | The parent term's title (for hierarchical categories) |

## Recommended templates for WooCommerce

These are the defaults worth shipping with on a fresh store.

**Single products:**

```
%%title%% — %%primary_category%% %%sep%% %%sitename%%
```

Produces: `Camping Kettle 1.5L — Cookware | Acme Outdoors`. Putting the category in the middle is a small but consistent CTR lift on long-tail product searches — the searcher sees the category match and the product match in the same line.

**Product categories:**

```
%%term_title%% %%page%% %%sep%% %%sitename%%
```

Produces: `Cookware | Acme Outdoors` and `Cookware Page 2 of 7 | Acme Outdoors`. The `%%page%%` variable is non-negotiable on paginated archives — without it every page in the archive has an identical `<title>` and Google starts deduplicating them in the index.

**Shop page:**

```
Shop %%sep%% %%sitename%%
```

Hardcode the word "Shop" rather than relying on `%%title%%` — the shop page's `post_title` is often just "Shop" already, but some themes rename it.

**Homepage:**

```
%%sitename%% %%sep%% %%sitedesc%%
```

Only if your tagline is actually a useful sentence. If your tagline is "Just another WordPress site" (the WP default), fix that first.

## Title length — pixel width, not characters

The "50–60 characters" rule is a useful shorthand but it's wrong as a hard limit. Google truncates SERP titles at roughly **580 pixels on desktop**, and pixel widths vary wildly by character. A title made of `i`, `l` and `t` fits far more characters than one made of `m`, `w` and capitals.

Some quick numbers from Yoast's own pixel calculator (Arial 18pt, which approximates Google's SERP font):

- 60 lowercase `i` characters: ~330 px (fits comfortably)
- 60 uppercase `M` characters: ~960 px (massively truncated)
- "WOMEN'S WATERPROOF WALKING BOOTS — SIZE 9 | OUTDOORSY CO" — 56 chars, 620 px, truncated
- "women's waterproof walking boots — size 9 | Outdoorsy Co" — 56 chars, 525 px, fits

Lowercase + mixed case sits well under the limit at 55–60 chars. Title Case With Lots Of Capitals starts truncating around 50. Yoast's traffic-light indicator uses pixel width under the hood — trust the bar, not your character count.

## Separators

Yoast lets you pick from seven separators. They're cosmetic but they affect both pixel width and how the title reads.

| Separator | Char | Pixel width (approx) | Notes |
|---|---|---|---|
| Em dash | `—` | ~14px | Most editorial. Default in many style guides. |
| En dash | `–` | ~10px | Slimmer, often confused with hyphen visually. |
| Hyphen | `-` | ~6px | Narrowest. Reads as a list separator. |
| Pipe | `\|` | ~6px | Classic SEO separator. Reads as "or" to screen readers. |
| Middle dot | `·` | ~6px | Subtle. Underused. |
| Bullet | `•` | ~8px | Heavier visual weight. |
| Asterism | `⁂` | rare | Don't. |

Pick one and use it across every template. Mixed separators across a site look amateur.

## Per-post overrides

The meta box on every product/post has a "Google preview" panel. Click the SEO title field and you can write a fully custom title that ignores the template. The override applies only to that one product.

When to override:

- **High-value products** where every CTR point matters and the template doesn't quite fit.
- **Products with brand names in them** where the brand-at-the-end template causes the brand to appear twice (e.g. product is "Nike Air Max 90", template adds "| Acme Outdoors" — fine — but the template `%%title%% — %%primary_category%%` would produce "Nike Air Max 90 — Footwear | Acme Outdoors" and you might want to drop the category for branded items).
- **Products with truncation problems** even after picking a slim separator.

Don't override on hundreds of products. If you're rewriting the template manually that many times, the template itself is wrong.

## Common mistakes

**Stuffing keywords.** "Camping Kettle | Stainless Steel Kettle | Camping Cookware Kettle | Acme" is not better than "Camping Kettle 1.5L — Stainless Steel | Acme". Google's been ignoring repeated-keyword titles for a decade and users find them off-putting.

**Forgetting `%%page%%` on archives.** Paginated category pages with identical titles are the single most common WooCommerce SEO bug. Google folds them in the SERP and your deep catalogue stops surfacing.

**Brand at the start, product at the end.** "Acme Outdoors — Camping Kettle 1.5L" buries the lede. The product name is what the searcher matched on; show it first. Brand belongs at the end, after the separator, where it acts as trust signalling rather than headline space.

**Not setting a homepage title.** Yoast falls back to "%%sitename%% %%page%% %%sep%% %%sitedesc%%" — fine if your tagline is real, awful if it's "Just another WordPress site".

**Using `%%title%%` for category templates.** The category equivalent is `%%term_title%%`. Using `%%title%%` on a category template silently outputs nothing.

**Setting it once and forgetting.** Title templates need a sanity check whenever you add a new content type, change brand naming, or import products from another store. Audit annually.

## How Asteris Affiliates fits

Title templates are a tiny slice of on-page SEO and Yoast does them well. If you're happy with Yoast SEO Premium ($99/yr) plus the WooCommerce SEO add-on ($79/yr), there's no reason to switch on this feature alone.

Asteris Affiliates includes an SEO module with the same `%%variable%%` template system, the same WooCommerce variables (`%%product_price%%`, `%%wc_brand%%`, `%%cf_*%%`), per-post overrides, and pixel-width validation. The difference is it's one of 18 modules in the same plugin — covering breadcrumbs, schema, redirects, sitemaps, robots, brands, GTIN, performance, security and more — for an annual price below what Yoast Premium + WooCommerce SEO costs on its own.

If you're already on Yoast and it works, stay there. If you're stacking five plugins to cover what one could, the consolidation maths is straightforward.

[See the SEO module →](/modules) · [Yoast vs Asteris comparison →](/yoast-vs-asteris) · [Migrate from Yoast →](/migrate/from-yoast)

## FAQ

**Is the SEO title the same as the page title?**
No. The page title (`post_title` in WordPress) is the product or post name shown on your site. The SEO title is the `<title>` tag in the `<head>` — what Google shows in search results. Yoast lets you set them independently.

**What's the maximum length for a Yoast SEO title?**
Around 580 pixels on desktop SERPs, which works out to roughly 50–60 characters of mixed-case text. Yoast's green-bar indicator measures pixel width directly — trust the bar over the character count.

**Can I use HTML in Yoast SEO titles?**
No. The `<title>` element is plain text only. HTML tags get stripped or rendered as literal characters in the SERP.

**Do title templates work for variable products?**
Yes. The template applies to the parent product page. Individual variations don't have their own SEO titles — they're not separate URLs.

**Why is my SEO title showing the wrong text in Google?**
Three possibilities. (1) Google has rewritten your title — they do this on roughly 60% of pages when the algorithm thinks your title doesn't match the query. (2) Your `<title>` tag is being set by your theme or another plugin and overriding Yoast. View source on the page and search for `<title>` to confirm. (3) The cache hasn't refreshed — Google can take days to pick up a title change.

**Does Yoast SEO Premium add more title features over the free version?**
Not for titles specifically. Free Yoast handles the full template system. Premium adds internal linking suggestions, redirects, multiple focus keyphrases — none of which touch title generation.

**What's the difference between `%%category%%` and `%%primary_category%%`?**
`%%category%%` outputs the first category assigned to a post (alphabetical, usually arbitrary). `%%primary_category%%` outputs the one you explicitly marked as primary in the Yoast meta box. Always prefer the latter for predictable output.

**Can I use Yoast title variables in custom code?**
Yes, via the filter `wpseo_title`. You get the final title string and can modify it before output. Used carefully this is fine; abused it makes the visible template lie about what's actually shipping.

**Do title changes need a sitemap resubmit?**
No. Title changes are picked up on the next crawl. You don't need to resubmit anything in Search Console — though if you want the change reflected fast on a high-priority page, requesting indexing on that URL is reasonable.

**Should I include the price in the SEO title?**
Usually no. Prices change, titles get cached in Google, and a stale price in the SERP looks worse than no price. The exception: products on permanent fixed pricing where the price is a key differentiator (e.g. "$5 t-shirts"). For everything else, leave price to the meta description or structured data.

## Related

- [Yoast SEO for WooCommerce hub](/yoast-guide)
- [Yoast meta description guide](/yoast-meta-description-guide)
- [Yoast breadcrumbs guide](/yoast-breadcrumbs-guide)
- [Yoast SEO score explained](/yoast-seo-score-explained)
- [Yoast SEO checklist](/yoast-seo-checklist)
- [Yoast vs Asteris comparison](/yoast-vs-asteris)
- [Migrate from Yoast to Asteris](/migrate/from-yoast)
- [WooCommerce SEO overview](/woocommerce-seo)
