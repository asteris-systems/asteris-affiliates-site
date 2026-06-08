---
url: /what-asteris-doesnt-do
title: "What Asteris Affiliates doesn't do"
meta_description: "Asteris Affiliates is a 21-module store plugin. It doesn't do dropshipping, subscriptions, funnels, memberships, or payment gateways. Honest scope."
og_title: "What Asteris Affiliates doesn't do"
og_description: "Asteris Affiliates covers 21 modules for considered-purchase stores. It's not a dropshipping tool, funnel builder, or subscription engine."
canonical: https://asterisaffiliates.com/what-asteris-doesnt-do
primary_keyword: woocommerce dropshipping plugin
primary_keyword_us_vol: 2400
primary_keyword_kd: 23
secondary_keywords:
  - Asteris Affiliates limitations
  - what asteris covers
  - woocommerce plugin scope
schema_type: Article + FAQPage
internal_links_out:
  - /modules
  - /funnelkit-vs-asteris
  - /roadmap
  - /pricing
verified_date: 2026-06-01
next_verification: 2026-09-01
ai_overview_optimised: true
faqs:
  - q: "Does Asteris Affiliates do dropshipping?"
    a: "No. Asteris has no supplier-catalogue import and no automated order routing to a supplier. Use AliDropship (US$89 one-time, AliExpress), Spocket (US$29+/mo, EU/US suppliers), or DSers (free tier, AliExpress) alongside Asteris."
  - q: "Can I run WooCommerce Subscriptions with Asteris?"
    a: "Yes — they don't conflict. WooCommerce Subscriptions handles recurring billing; Asteris handles SEO, PDF invoices, wishlist, filtering, and the other 17 modules. Our PDF Invoices module generates an invoice for every subscription renewal order automatically."
  - q: "Will Asteris add a subscription engine in future?"
    a: "Not a full one. A Subscription-Ready helper module (billing-period field, simple renewal reminder) is under consideration for v1.5, but a credible competitor to WooCommerce Subscriptions takes years to build and we won't pretend otherwise."
  - q: "Is the Quote Request module a replacement for B2B plugins?"
    a: "No. Quote Request is a simple ask-for-a-quote button on product pages — useful for made-to-order furniture or bulk enquiries. It doesn't do role-based pricing, tax-exempt groups, or net-30 terms. Use Wholesale Suite or B2BKing for full B2B."
  - q: "Does Asteris build affiliate links or manage an affiliate program?"
    a: "Neither. The Asteris Links module cloaks outbound links you place (your affiliate links to Amazon, ClickBank, etc.) so they look like yoursite.com/go/product. It doesn't track inbound affiliate referrals — use AffiliateWP for that."
  - q: "Can Asteris handle multi-jurisdiction tax automation?"
    a: "No. Asteris reads whatever tax WooCommerce calculated and prints it on the PDF invoice. For automated multi-state US sales tax or EU VAT MOSS, use TaxJar, Avalara, or Quaderno. They co-exist with Asteris cleanly."
  - q: "Will Asteris replace FunnelKit or CartFlows?"
    a: "No — and we don't plan to. Funnel builders replace the checkout template and add one-click upsells; that's a different product shape. Asteris's checkout-adjacent modules (Trust Badges, Side Cart, Free Shipping Bar) work alongside funnel builders."
  - q: "Does Asteris work with LearnDash, Tutor LMS, or LifterLMS?"
    a: "Yes. LMS plugins use their own course post types and don't touch the product catalogue. Asteris's SEO module will optimise course pages too if you want them in Google."
  - q: "What about bookings and appointments?"
    a: "Asteris doesn't do bookings. Use WooCommerce Bookings (official, US$149/yr locked/yr), Bookly Pro (one-time, US$89), or Amelia (US$59+/yr). Asteris co-exists with all three."
  - q: "Are there any modules where Asteris overlaps with a dedicated plugin?"
    a: "Two minor overlaps. Quote Request overlaps with B2BKing's quote feature — disable one. Min/Max Quantity has small overlap with B2B per-role minimums. Everything else is complementary."
aio_audit:
  faq_count: 10
  has_direct_answer_lead: true
  has_concise_definitions: true
  blockers: []
  score: 5
---

# What Asteris Affiliates doesn't do (the honest list)

Asteris Affiliates is a 21-module store plugin built for considered-purchase WooCommerce stores — furniture, apparel, specialty goods, B2B, made-to-order. It covers SEO, AI content, PDF invoices, variation swatches, wishlist, quote requests, back-in-stock, side cart, sequential orders, product filtering, min/max quantity, link cloaking, trust badges, free-shipping bar, stock urgency, delivery timeline, feature labels, product badges, and analytics.

It doesn't cover everything. This page is the honest list of what Asteris is *not* — the categories we deliberately leave to dedicated plugins, why we leave them there, and which alternatives actually do the job. If you arrived here searching "asteris dropshipping" or "asteris subscriptions", the answer is no — and below is what to use instead.

## Why we keep the scope narrow

A 60-module plugin that does dropshipping, subscriptions, memberships, LMS, funnels, and tax automation in one bundle is a maintenance liability. Every category on this page is a deep specialism: subscription billing has dunning logic, proration edge cases, and tax-jurisdiction quirks that take a dedicated team years to get right. Same for tax compliance, payment processing, or course delivery.

Asteris focuses on modules that share a common surface — the store's catalogue, cart, checkout, and SEO layer. When something needs its own data model, its own renewal cron, or its own compliance engine, we recommend the specialist plugin and make sure Asteris co-exists cleanly.

Every category below lists: why Asteris won't add it, which dedicated plugin handles it, and whether Asteris runs alongside without conflict.

---

## Dropshipping

**Why Asteris won't add it.** Dropshipping needs supplier-catalogue ingestion (AliExpress, CJ, Spocket warehouses), automated order forwarding to the supplier on checkout, inventory sync against external stock, and a profit-margin layer over supplier pricing. Every piece touches third-party APIs that change without notice. A general-purpose store plugin can't keep up with AliExpress's HTML scraping rules or CJ's order-API rate limits — dedicated dropshipping tools are full-time jobs.

**Use instead.**

| Plugin | Price | Best for |
|---|---|---|
| [AliDropship](https://alidropship.com/) | US$89 one-time | AliExpress-only stores, self-hosted |
| [Spocket](https://www.spocket.co/) | US$29–$99/mo | EU/US suppliers, faster shipping |
| [DSers](https://www.dsers.com/) | Free + paid tiers | AliExpress bulk-order processing |

**Co-existence with Asteris.** Clean. Run any of these for product import and order routing; Asteris handles SEO, PDF invoices, wishlist, filtering, and the rest. No database collisions — dropshipping plugins write to their own post meta and `wp_options` keys.

**Gotcha.** If you're dropshipping with AliExpress, our PDF Invoices module will generate an invoice with *your* business details, not the supplier's — which is what you want, but verify your tax registration covers customer-facing invoicing in your jurisdiction.

---

## Subscription billing and recurring payments

**Why Asteris won't add it.** Subscriptions look simple — charge a card every month — until you hit proration on plan upgrades, failed-payment retry schedules (dunning), trial-to-paid transitions, prepaid renewals, tax recalculation on renewal in a different jurisdiction, and PSD2/SCA compliance for EU cards. WooCommerce Subscriptions has been refined since 2013. Building a credible competitor would take three years and add risk to every Asteris release.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [WooCommerce Subscriptions](https://woocommerce.com/products/woocommerce-subscriptions/) | US$239/yr | Official Automattic plugin, deepest gateway support |
| [SUMO Subscriptions](https://codecanyon.net/item/sumo-woocommerce-subscriptions/16486054) | US$49 one-time | Cheaper, smaller gateway list |
| [YITH WooCommerce Subscription](https://yithemes.com/themes/plugins/yith-woocommerce-subscription/) | €119.99/yr | If you're already in the YITH ecosystem |

**Co-existence with Asteris.** Clean. WooCommerce Subscriptions adds a `subscription` product type and its own checkout hooks; Asteris doesn't touch either. The PDF Invoices module handles subscription renewal orders the same as one-off orders.

**Roadmap note.** A "Subscription-Ready" helper module (custom field for billing period, basic renewal email) is under consideration for v1.5 — never a full billing engine.

---

## Memberships and restricted content

**Why Asteris won't add it.** Memberships need access-rule engines (this user can see these pages, these products, these download links), drip schedules, multi-tier upgrade/downgrade flows, and integration with the WordPress capabilities system. It's a different software shape from a store-features plugin.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [Paid Memberships Pro](https://www.paidmembershipspro.com/) | Free core + US$297/yr add-ons | Most-installed, generous free tier |
| [MemberPress](https://memberpress.com/) | US$179.50–$399.50/yr | Best Stripe/PayPal integration |
| [Restrict Content Pro](https://restrictcontentpro.com/) | US$99–$499/yr | Now part of StellarWP |

**Co-existence with Asteris.** Clean. Membership plugins gate content via filters on `the_content` and `template_redirect`; Asteris modules don't override either. If you restrict products to members, Asteris's filtering and wishlist will respect the restriction — restricted products won't appear to logged-out users.

---

## Payment gateways

**Why Asteris won't add it.** Payment gateways need PCI-DSS compliance, processor certification with each acquirer, fraud-screening integration, and 3DS2 handling. Building one isn't a plugin feature — it's a regulated financial product.

**Use instead.** WooCommerce ships with Stripe, PayPal, and bank-transfer support. For more:

- [WooCommerce Stripe](https://woocommerce.com/products/stripe/) — free, official
- [WooCommerce PayPal Payments](https://woocommerce.com/products/woocommerce-paypal-payments/) — free, official
- [Square for WooCommerce](https://woocommerce.com/products/square/) — free, AU/US/CA in-person + online
- [Authorize.Net](https://woocommerce.com/products/authorize-net/) — US$79/yr
- [eWAY](https://woocommerce.com/products/eway/) — free, AU-focused

**Co-existence with Asteris.** Total. Asteris never touches checkout-payment processing.

---

## Tax automation (multi-jurisdiction compliance)

**Why Asteris won't add it.** Sales tax in the US has ~13,000 jurisdictions. GST/VAT in the EU, UK, AU, and NZ each have their own digital-goods rules. Marketplace facilitator laws change every year. This is a compliance product, not a store feature.

**Use instead.**

| Service | Price | Best for |
|---|---|---|
| [TaxJar](https://www.taxjar.com/) | From US$19/mo | US sales tax, AutoFile |
| [Avalara AvaTax](https://www.avalara.com/) | Enterprise quote | Global, large catalogues |
| [Quaderno](https://quaderno.io/) | From US$49/mo | EU VAT, digital goods, invoicing |
| [Octobat](https://octobat.com/) | From €19/mo | EU VAT MOSS |

**Co-existence with Asteris.** Clean. Tax plugins hook `woocommerce_calculate_totals` and the cart-tax filters; Asteris doesn't. Our PDF Invoices module reads whatever tax line items WooCommerce stored on the order — so if TaxJar or Quaderno calculated them, the invoice shows them correctly.

**Gotcha.** If you're in Australia and your turnover is under the A$75,000 GST threshold, you don't need any of these — WooCommerce's built-in tax tables are enough. Switch when you cross the threshold.

---

## Full sales-funnel builder (upsells, order bumps, A/B tests)

**Why Asteris won't add it.** Funnel builders replace the WooCommerce checkout with their own multi-step flow, manage upsell-after-payment with one-click transactions, and ship visual page builders for funnel pages. That's an entire product category, not a module.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [FunnelKit](https://funnelkit.com/) | US$149/yr locked–$599/yr | Full funnel + automation; ex-WooFunnels |
| [CartFlows](https://cartflows.com/) | US$239/yr | The earlier-stage, simpler option |
| [WPFunnels](https://getwpfunnels.com/) | US$97–$297/yr | Visual canvas-style builder |

**Co-existence with Asteris.** Clean. FunnelKit and CartFlows replace the checkout template — Asteris's checkout-adjacent modules (Trust Badges, Free Shipping Bar, Side Cart) render via their own hooks and continue to display.

See: [FunnelKit vs Asteris](/funnelkit-vs-asteris) — they're not really competitors, they're complementary.

---

## Bookings and appointments

**Why Asteris won't add it.** Booking software needs calendar logic (recurring availability, blackout dates, buffer time), staff/resource assignment, double-booking prevention, and reminder cron. Different data shape from a product catalogue.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [Bookly Pro](https://bookly.alariadev.com/) | US$89 one-time + add-ons | Salon/clinic appointments |
| [Amelia](https://wpamelia.com/) | US$59–$149/yr locked/yr | Events + appointments, polished UI |
| [WooCommerce Bookings](https://woocommerce.com/products/woocommerce-bookings/) | US$149/yr locked/yr | Official, deepest WC integration |
| [BookingPress](https://bookingpressplugin.com/) | US$79–$399/yr | Free tier, growing rapidly |

**Co-existence with Asteris.** Clean. WooCommerce Bookings registers its own product type; Asteris's variation swatches and filtering work on standard variable products and won't conflict.

---

## LMS / online courses

**Why Asteris won't add it.** Course platforms need lesson sequencing, quiz/grade engines, certificate generation, drip schedules, cohort management, and SCORM/xAPI for enterprise. A different product entirely.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [LearnDash](https://www.learndash.com/) | US$199–$799/yr | Most-used in higher-ed/enterprise |
| [Tutor LMS](https://tutorlms.com/) | Free + US$199/yr Pro | Modern UI, strong free tier |
| [LifterLMS](https://lifterlms.com/) | US$120/yr per add-on | Modular pricing, hands-on support |
| [MasterStudy LMS](https://stylemixthemes.com/wordpress-lms-plugin/) | US$54.99–$135/yr | Cheaper, Udemy-style theming |

**Co-existence with Asteris.** Clean. LMS plugins create their own course post type; Asteris's SEO module will index courses and lessons if you want them in search results (it reads any public post type).

---

## Affiliate program management

**Why Asteris won't add it.** Affiliate platforms track referral cookies across sessions, calculate tiered commissions, manage payouts to affiliates' bank/PayPal accounts, and provide each affiliate with a dashboard. That's a SaaS-grade feature set.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [AffiliateWP](https://affiliatewp.com/) | US$149.50–$499.50/yr | The dominant choice |
| [SliceWP](https://slicewp.com/) | US$79–$279/yr | Free tier, lighter weight |
| [Solid Affiliate](https://solidaffiliate.com/) | US$99–$149/yr locked/yr | One-time pricing on lifetime plans |

**Co-existence with Asteris.** Clean. AffiliateWP's referral tracking runs on its own cookie + `wp_options` table; Asteris doesn't touch either. Asteris Links (our link-cloaking module) is for product/affiliate *outbound* links — it doesn't manage *inbound* affiliate referrals.

---

## Wholesale-only / B2B pricing tiers

**Why Asteris won't add it.** B2B WooCommerce needs role-based pricing, tax-exempt customer groups, net-30 payment terms, purchase-order checkout, minimum-order rules per role, and tiered quantity discounts per customer group. It deserves its own plugin.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [Wholesale Suite](https://wholesalesuiteplugin.com/) | US$148–$598/yr | Largest B2B plugin in WooCommerce |
| [B2BKing](https://webwizardry.net/b2bking/) | US$149 one-time + renewals | Per-role pricing, quotes, PO checkout |
| [WooCommerce B2B](https://codecanyon.net/item/woocommerce-b2b-plugin/24006072) | US$59 one-time | Cheapest entry point |

**Co-existence with Asteris.** Mostly clean — with one caveat. Asteris's Quote Request module overlaps with B2BKing's quote feature. Disable Asteris Quote Request if you run B2BKing, or vice versa. Min/Max Quantity module overlaps slightly with B2B per-role minimums; test on staging.

---

## Product configurators and visual builders

**Why Asteris won't add it.** Configurators (build-your-own-pizza, custom jewellery, configure-this-sofa) need a step-driven UI, conditional logic between options, live price calculation, and often a 3D or layered-image preview. Another product category.

**Use instead.**

| Plugin | Price | Notes |
|---|---|---|
| [Iconic WooCommerce Configurator](https://iconicwp.com/products/woocommerce-product-configurator/) | US$129/yr | Layered visual preview |
| [WPC Product Bundles](https://wpclever.net/downloads/product-bundles) | Free + Pro US$39 | Configurable bundles |
| [Product Add-Ons Ultimate](https://www.pluginrepublic.com/wordpress-plugins/woocommerce-product-add-ons-ultimate/) | US$59–$199/yr | Conditional add-on fields |
| [Uni CPO](https://builderius.io/wp/plugins/uni-cpo/) | US$59 one-time | Formula-driven custom pricing |

**Co-existence with Asteris.** Mostly clean. Variation Swatches module shows colour/size swatches for *standard* variable products — it doesn't replace a configurator. Run a configurator for build-your-own products and Asteris swatches for the simple variable products.

---

## A note on payment processing fees

Asteris doesn't charge transaction fees on your sales — we don't sit in the payment flow. Stripe, PayPal, Square, eWAY, and Authorize.Net charge processor fees (typically 1.4–2.9% + fixed cents per transaction). Lemon Squeezy (the merchant of record for *our* licensing) charges us — never you — 5% + US$0.50 per Asteris licence sale.

---

## FAQ

### Does Asteris Affiliates do dropshipping?

No. Asteris has no supplier-catalogue import and no automated order routing to a supplier. Use AliDropship (US$89 one-time, AliExpress), Spocket (US$29+/mo, EU/US suppliers), or DSers (free tier, AliExpress) alongside Asteris.

### Can I run WooCommerce Subscriptions with Asteris?

Yes — they don't conflict. WooCommerce Subscriptions handles recurring billing; Asteris handles SEO, PDF invoices, wishlist, filtering, and the other 17 modules. Our PDF Invoices module generates an invoice for every subscription renewal order automatically.

### Will Asteris add a subscription engine in future?

Not a full one. A "Subscription-Ready" helper module (billing-period field, simple renewal reminder) is under consideration for v1.5, but a credible competitor to WooCommerce Subscriptions takes years to build and we won't pretend otherwise.

### Is the Quote Request module a replacement for B2B plugins?

No. Quote Request is a simple ask-for-a-quote button on product pages — useful for made-to-order furniture or bulk enquiries. It doesn't do role-based pricing, tax-exempt groups, or net-30 terms. Use Wholesale Suite or B2BKing for full B2B.

### Does Asteris build affiliate links or manage an affiliate program?

Neither. The Asteris Links module *cloaks* outbound links you place (your affiliate links to Amazon, ClickBank, etc.) so they look like `yoursite.com/go/product`. It doesn't track inbound affiliate referrals — use AffiliateWP for that.

### Can Asteris handle multi-jurisdiction tax automation?

No. Asteris reads whatever tax WooCommerce calculated and prints it on the PDF invoice. For automated multi-state US sales tax or EU VAT MOSS, use TaxJar, Avalara, or Quaderno. They co-exist with Asteris cleanly.

### Will Asteris replace FunnelKit or CartFlows?

No — and we don't plan to. Funnel builders replace the checkout template and add one-click upsells; that's a different product shape. Asteris's checkout-adjacent modules (Trust Badges, Side Cart, Free Shipping Bar) work alongside funnel builders.

### Does Asteris work with LearnDash, Tutor LMS, or LifterLMS?

Yes. LMS plugins use their own course post types and don't touch the product catalogue. Asteris's SEO module will optimise course pages too if you want them in Google.

### What about bookings and appointments?

Asteris doesn't do bookings. Use WooCommerce Bookings (official, US$149/yr locked/yr), Bookly Pro (one-time, US$89), or Amelia (US$59+/yr). Asteris co-exists with all three.

### Are there any modules where Asteris overlaps with a dedicated plugin?

Two minor overlaps. Quote Request overlaps with B2BKing's quote feature — disable one. Min/Max Quantity has small overlap with B2B per-role minimums. Everything else is complementary.

---

## How Asteris Affiliates fits

Asteris is the consolidation layer for store features that don't deserve a separate plugin each — SEO, PDF invoices, variation swatches, wishlist, filtering, trust badges, link cloaking, analytics. We pulled together 19 features that, bought separately, cost A$1,500+/year. Asteris is one plugin, one licence, one update cycle.

Where a category genuinely needs a specialist plugin — dropshipping, subscriptions, memberships, tax automation, bookings, LMS, affiliates, B2B, configurators, funnels — we recommend that plugin and make sure Asteris co-exists cleanly. The goal isn't to be everything; it's to remove ten cheap plugins from your stack so the dedicated ones you *do* need have room to work.

If you want to see what we cover: [the 21 modules](/modules). If you want to know what consolidation costs: [pricing](/pricing). If you're weighing us against a specific competitor: [Yoast vs Asteris](/yoast-vs-asteris), [YITH vs Asteris](/yith-vs-asteris), [FunnelKit vs Asteris](/funnelkit-vs-asteris).

---

## Related

- [All 21 Asteris modules](/modules)
- [Pricing tiers and what's included](/pricing)
- [Asteris Free — 6 modules, no licence](/free)
- [Free vs paid feature matrix](/docs/free-vs-paid)
- [Best WooCommerce plugins (curated list)](/best-woocommerce-plugins)
- [Essential WooCommerce plugins](/essential-woocommerce-plugins)
- [FunnelKit vs Asteris](/funnelkit-vs-asteris)
- [Roadmap — what's coming](/roadmap)
