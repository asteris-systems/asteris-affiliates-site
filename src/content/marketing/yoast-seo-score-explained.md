---
url: /yoast-seo-score-explained
title: "Yoast SEO score for WooCommerce — what it means"
meta_description: "What Yoast's green/orange/red SEO score means for WooCommerce product pages. How it's calculated, what to fix, and when to ignore it."
og_title: "Yoast SEO score for WooCommerce explained"
og_description: "Yoast's traffic-light score for WooCommerce products. What green means, what red means, and when to stop chasing the green."
canonical: https://asterisaffiliates.com/yoast-seo-score-explained
primary_keyword: yoast seo score for woocommerce
primary_keyword_us_vol: 460
primary_keyword_kd: 33
secondary_keywords:
  - yoast seo score meaning
  - yoast green score woocommerce
  - yoast traffic light woocommerce
schema_type: Article + FAQPage
internal_links_out:
  - /yoast-guide
  - /yoast-seo-checklist
  - /modules
  - /yoast-vs-asteris
verified_date: 2026-06-01
ai_overview_optimised: true
faqs:
  - q: "Does a green Yoast score mean my page will rank?"
    a: "No. The Yoast score evaluates on-page content against a checklist. Rankings depend on backlinks, search intent, competition, site authority, page experience, and dozens of factors Yoast cannot see. Green is the start line, not the finish line."
  - q: "Is keyphrase density still a ranking factor in 2026?"
    a: "No. Google has stated this repeatedly going back to 2011. Yoast's density check is a legacy heuristic. Mention the focus keyphrase naturally where it makes sense and ignore the percentage."
  - q: "Can I get a green score on a 50-word product description?"
    a: "Almost never. The text-length and density checks will stay orange or red no matter what you do. A 50-word description that converts is more valuable than 300 words written to satisfy a plugin."
  - q: "Should I buy Yoast Premium just for the multiple keyphrases feature?"
    a: "If you're running 50+ products and you've identified secondary keyphrases worth tracking per product, yes. For a 10-product shop, no. Yoast Premium is roughly USD 99/year/site as of 2026."
  - q: "Why does Yoast show a different score after I save versus when I'm typing?"
    a: "The analysis runs against the saved post content, not the live editor. If the score looks wrong, save the draft and refresh. The keyphrase density and length checks in particular need a saved state."
  - q: "What's the difference between the SEO score and the readability score?"
    a: "The SEO score evaluates focus-keyphrase placement and a few technical checks like meta description, internal links, and alt text. The readability score evaluates writing style such as sentence length, passive voice, transitions, and paragraph length. They're independent and frequently contradict each other."
  - q: "Does Yoast score affect Google rankings directly?"
    a: "No. There is no API or signal sent to Google. The score is a private editor tool that only your team sees. Google scores your page on entirely different criteria from inside its own crawl."
  - q: "Can I disable the Yoast analysis on product pages?"
    a: "Yes. In Yoast SEO Settings Content types Products, you can disable the SEO analysis, the readability analysis, or both. Useful if your team is wasting time chasing dots on short SKU pages."
  - q: "Why is my keyphrase showing as previously used on a brand new page?"
    a: "Yoast tracks every focus keyphrase you've set across the site. Even draft posts count. Check the link in the warning to see which page already claims that keyphrase. Pick a more specific phrase or consolidate the two pages."
  - q: "Does the Yoast score work the same for WooCommerce variations?"
    a: "No. Yoast analyses the parent product only. Variation-level descriptions are invisible to the score. Move primary SEO copy into the parent product's main or short description."
aio_audit:
  faq_count: 10
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# Yoast SEO score for WooCommerce — what it actually means

Yoast's traffic-light score is a content checklist with marketing polish. Green does not mean the page will rank. Red does not mean it won't. This page walks through every check Yoast runs, which ones correlate with actual rankings, which ones are cargo cult, and the specific WooCommerce product-page situations where chasing green forces you to write worse copy.

By the end you'll know which dots to fix, which to ignore, and how to stop letting a plugin dictate your product descriptions.

---

## What the Yoast SEO score is

Yoast SEO's analysis runs locally in your browser every time you save a post or product. It evaluates the page against a focus keyphrase you set, then returns two scores: an **SEO score** (red/orange/green dot) and a **readability score** (same colours, different checks). The dots are weighted aggregates of roughly 30 individual checks.

The score has no connection to Google. Yoast cannot see your rankings, your competitors, your search volume, or your click-through rate. Every check is a static rule applied to the text on the page. A page can hit 100% green and rank nowhere. A page with three orange dots can outrank everything for its term.

This matters because the score creates pressure to edit copy until the dots turn green — and on short WooCommerce product pages, that pressure produces stuffed, awkward descriptions that perform worse with both shoppers and search engines.

---

## Every check Yoast runs (the full list)

These are the checks in Yoast SEO Free 23.x as of June 2026. Premium adds a few more, noted below.

### SEO analysis checks

| Check | What it looks for | Worth chasing on a product page? |
|---|---|---|
| Keyphrase in SEO title | Focus keyphrase appears in the title tag | Yes |
| Keyphrase at start of SEO title | Keyphrase within the first half of the title | Mostly noise |
| Keyphrase in meta description | Focus keyphrase appears in the meta description | Yes |
| Keyphrase in slug | URL contains the focus keyphrase | Yes (set once, then leave) |
| Keyphrase in introduction | Focus keyphrase in the first paragraph | Yes |
| Keyphrase in subheading | At least one H2/H3 contains the keyphrase | Sometimes |
| Keyphrase density | Keyphrase appears 0.5–3% of the word count | Cargo cult on short pages |
| Keyphrase length | Focus keyphrase is 4 words or fewer | Mostly noise |
| Keyphrase distribution (Premium) | Keyphrase spread evenly through the body | Cargo cult |
| Previously used keyphrase | This phrase isn't already a focus on another page | Yes — actual cannibalisation risk |
| Image keyphrase | At least one image alt text contains the keyphrase | Yes, once |
| Image alt attributes | All images have alt text | Yes (accessibility too) |
| Text length | Word count over the recommended minimum (300 for posts, 200 for taxonomies) | No on product pages |
| Internal links | At least one internal link on the page | Yes |
| Outbound links | At least one external link | No for product pages |
| Meta description length | Between 120 and 156 characters | Yes |
| SEO title width | Title fits within 600 pixels (roughly 60 chars) | Yes |

### Readability checks

| Check | What it looks for | Worth chasing? |
|---|---|---|
| Flesch Reading Ease | Score above 60 (roughly Year 8 reading level) | Sometimes — depends on audience |
| Sentence length | No more than 25% of sentences over 20 words | Useful as a nudge |
| Paragraph length | No paragraphs over 150 words | Useful |
| Subheading distribution | A subheading every ~300 words | Useful on long pages, irrelevant on products |
| Passive voice | Under 10% passive sentences | Often noise |
| Consecutive sentences | No three sentences in a row starting with the same word | Sometimes useful |
| Transition words | At least 30% of sentences use transitions ("however", "therefore", etc.) | Mostly noise |

### Premium-only checks

- **Multiple keyphrases** — set up to four extra focus keyphrases per page and run the full SEO analysis against each. The only Premium check that's genuinely useful, and the main reason teams pay for it.
- **Synonyms** — Yoast counts related terms toward keyphrase density. Helps a bit on density warnings.
- **Internal linking suggestions** — surfaces related posts as you write. Convenient, not transformative.

---

## Which checks actually correlate with rankings

Strip away the colour-coded theatre and only a handful of the checks above touch real ranking factors:

1. **Keyphrase in title tag** — the single highest-impact on-page signal Yoast measures.
2. **Keyphrase in slug** — modest impact, but the URL is permanent so getting it right early matters.
3. **Keyphrase in the first paragraph** — helps Google confirm topical relevance.
4. **Image alt text** — drives Google Image traffic and accessibility, which feeds engagement metrics.
5. **Internal links** — distribute crawl budget and link equity. Real signal.
6. **Meta description length** — doesn't affect rankings, but a truncated description tanks click-through rate, which does.
7. **Previously used keyphrase** — keyword cannibalisation is real and Yoast is one of the few tools that flags it.

Everything else — keyphrase density, transition words, passive voice, keyphrase distribution, keyphrase at the start of the title — has no evidence of moving rankings on its own. They're proxies for "this page looks like a piece of content that was written carefully". Useful as nudges, harmful as targets.

---

## The cargo-cult checks

These are the dots most worth ignoring, in order of how much damage chasing them does.

**Keyphrase density.** Yoast wants the focus phrase to appear roughly once every 100–200 words. On a 60-word product description that's mathematically impossible without writing "blue cotton t-shirt the blue cotton t-shirt blue cotton t-shirt" — which then trips the over-optimisation flag instead. Google's John Mueller has stated repeatedly that keyword density is not a ranking factor.

**Transition words.** The check wants 30% of sentences to use words like "however", "moreover", "therefore". On a product page or a short blog post this forces stilted, padded prose. Native English copy averages closer to 15–20%.

**Passive voice.** Useful warning on a long article. Meaningless on a product page where "made in Melbourne" is more natural than "we make this in Melbourne".

**Keyphrase at the start of the SEO title.** Front-loading the keyword can hurt click-through rate when the natural reading flow puts it later ("Buy the X" vs "X — buy now"). CTR matters more than this dot.

**Outbound links from product pages.** Yoast flags missing external links. Sending shoppers off your product page to an external site is not the move.

**Text length on product pages.** The 300-word minimum is calibrated for blog posts. Forcing 300 words onto a SKU page either repeats specs already in the structured data, or pads with generic marketing copy that adds nothing.

---

## WooCommerce-specific gotchas

Product pages break a lot of Yoast's assumptions. The plugin was built for blog posts and assumes you have a body of prose to work with. Six situations come up over and over:

**Short product descriptions.** A 40-word description for a t-shirt cannot satisfy density, length, subheading-distribution, and internal-link checks simultaneously. Set the focus keyphrase, write the description for humans, and accept the orange dot. Nothing breaks.

**Variable products.** Yoast analyses the parent product page, not the variations. If your SEO copy is in the variation descriptions, Yoast sees an empty page and reports red across the board. Move primary copy into the parent description, or use the short description field which Yoast does scan.

**Category pages.** Default WooCommerce category templates output the term description in a small block at the top, then product cards. Yoast scores the term description (often empty or one sentence) and ignores the product grid. Either write a real category intro or stop expecting useful Yoast feedback on archives.

**SKU-based product titles.** Titles like "ABC-1234" can't contain the focus keyphrase without rewriting them. Set the SEO title separately via Yoast's title field; leave the product title as the SKU for shop-floor sanity.

**Bundled/grouped products.** The "previously used keyphrase" check fires constantly because each component product targets a similar phrase. Use it as a prompt to consolidate, not a panic.

**WPML / Polylang multilingual stores.** Yoast scores each translation independently against the same focus keyphrase. If you've translated the keyphrase, set the translated phrase in the localised Yoast meta box, not the English one.

---

## Readability vs SEO — when they conflict

Yoast's two scores often pull in opposite directions on commerce copy.

A succinct product description ("Heavyweight 280gsm cotton. Pre-shrunk. Made in Melbourne.") scores well on readability — short sentences, no passive voice. But it scores red on SEO because there isn't enough text to hit keyphrase density or text length.

Add 200 words to satisfy SEO and the readability score drops as you introduce qualifiers, transitions, and longer sentences to make the padding sound natural.

The honest answer: optimise the title, meta description, slug, first sentence, and alt text. Then write the description as if Yoast doesn't exist. Let both dots sit at orange. Shoppers convert on clarity, not on dot colour.

---

## When to ignore the red dot entirely

There are pages where the Yoast score is actively misleading and you should not edit copy to satisfy it.

- **Product pages under 100 words** — the score is mathematically broken; stop.
- **Pages targeting branded or model-number queries** ("ABC-1234 review") where the keyphrase is already in the title, slug, and H1 — extra mentions look spammy.
- **Pages where you've set the focus keyphrase to a long-tail phrase you know converts** — Yoast prefers short keyphrases and will penalise you for going long-tail. Long-tail still wins.
- **Thank-you, checkout, and account pages** — these aren't meant to rank. Strip the Yoast meta box if you can; certainly don't optimise.
- **Out-of-stock or discontinued products** — fixing Yoast warnings on pages you should noindex is wasted work.

---

## FAQ

### Does a green Yoast score mean my page will rank?
No. The Yoast score evaluates on-page content against a checklist. Rankings depend on backlinks, search intent, competition, site authority, page experience, and dozens of factors Yoast cannot see. Green is the start line, not the finish line.

### Is keyphrase density still a ranking factor in 2026?
No. Google has stated this repeatedly going back to 2011. Yoast's density check is a legacy heuristic. Mention the focus keyphrase naturally where it makes sense — title, intro, one heading, one alt tag — and ignore the percentage.

### Can I get a green score on a 50-word product description?
Almost never. The text-length and density checks will stay orange or red no matter what you do. Accept it. A 50-word description that converts is more valuable than 300 words written to satisfy a plugin.

### Should I buy Yoast Premium just for the multiple keyphrases feature?
If you're running 50+ products and you've identified secondary keyphrases worth tracking per product, yes. For a 10-product shop, no — set one focus keyphrase per product and move on. Yoast Premium is roughly USD 99/year/site as of 2026.

### Why does Yoast show a different score after I save versus when I'm typing?
The analysis runs against the saved post content, not the live editor. If the score looks wrong, save the draft and refresh. The keyphrase density and length checks in particular need a saved state.

### What's the difference between the SEO score and the readability score?
The SEO score evaluates focus-keyphrase placement and a few technical checks (meta description, internal links, alt text). The readability score evaluates writing style — sentence length, passive voice, transitions, paragraph length. They're independent and frequently contradict each other.

### Does Yoast score affect Google rankings directly?
No. There is no API or signal sent to Google. The score is a private editor tool that only your team sees. Google scores your page on entirely different criteria from inside its own crawl.

### Can I disable the Yoast analysis on product pages?
Yes. In Yoast SEO → Settings → Content types → Products, you can disable the SEO analysis, the readability analysis, or both. Useful if your team is wasting time chasing dots on short SKU pages.

### Why is my keyphrase showing as "previously used" on a brand new page?
Yoast tracks every focus keyphrase you've set across the site. Even draft posts count. Check the link in the warning — it'll show you which page already claims that keyphrase. Pick a more specific phrase or consolidate the two pages.

### Does the Yoast score work the same for WooCommerce variations?
No. Yoast analyses the parent product only. Variation-level descriptions are invisible to the score. Move primary SEO copy into the parent product's main or short description.

---

## How Asteris Affiliates fits

The Yoast score is a Yoast-specific UI on top of fairly universal on-page checks. Plenty of tools do the same job — Rank Math, SEOPress, AIOSEO, All in One SEO — and most stores already have one installed.

Asteris Affiliates includes an SEO module that handles the same on-page essentials (title tag, meta description, focus keyphrase placement, schema markup, breadcrumbs, XML sitemap) but skips the gamified traffic-light score. You see specific, actionable suggestions tied to the page, not a colour-coded percentage. If you're already running Yoast and it works for you, keep it — Asteris doesn't try to replace a tool that's doing its job. If you're running Yoast plus four other plugins and want one consolidated stack, the [SEO module](/docs/modules/seo) and the [Yoast vs Asteris comparison](/yoast-vs-asteris) cover the trade-offs honestly, including what Asteris doesn't do.

---

## Related

- [Yoast SEO for WooCommerce — full guide](/yoast-guide)
- [Yoast SEO checklist for WooCommerce](/yoast-seo-checklist)
- [Yoast meta description guide](/yoast-meta-description-guide)
- [Yoast SEO title guide](/yoast-seo-title-guide)
- [Yoast vs Asteris comparison](/yoast-vs-asteris)
- [Migrating from Yoast to Asteris](/migrate/from-yoast)
- [WooCommerce SEO overview](/woocommerce-seo)
- [What Asteris doesn't do](/what-asteris-doesnt-do)
