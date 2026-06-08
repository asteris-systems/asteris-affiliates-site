/**
 * Canonical SEO data for every page on asterisaffiliates.com.
 * Source: seo/seo-implementation.md (Phase 2 + 3.5 patch, 8 Jun 2026)
 *
 * Each entry contains title, description, OG/Twitter image filename, and an
 * array of pre-validated JSON-LD blocks (99/99 valid in Phase 3 re-fire).
 *
 * Pages import their entry by pathname into <SEOHead slug="..." />.
 */

export interface SeoEntry {
  title: string;
  description: string;
  ogImage: string;          // filename in /public/ — e.g. "og-home.png"
  noindex?: boolean;        // e.g. /thank-you
  jsonLd: object[];         // schema.org blocks
}

const SITE = 'https://asterisaffiliates.com';
const ORG = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Asteris Affiliates',
  url: SITE,
  logo: `${SITE}/logo.png`,
};
const PUB = {
  '@type': 'Organization',
  name: 'Asteris Affiliates',
  logo: { '@type': 'ImageObject', url: `${SITE}/logo.png` },
};
const PUBLISHED = '2026-06-08';

const breadcrumb = (items: { name: string; url: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: items.map((it, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: it.name,
    item: it.url,
  })),
});

const OFFERS = [
  { '@type': 'Offer', name: 'Starter', price: '149', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE}/pricing` },
  { '@type': 'Offer', name: 'Pro',     price: '299', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE}/pricing` },
  { '@type': 'Offer', name: 'Agency',  price: '549', priceCurrency: 'USD', availability: 'https://schema.org/InStock', url: `${SITE}/pricing` },
];

const SOFTWARE_APP = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: 'Asteris Affiliates',
  operatingSystem: 'WordPress',
  applicationCategory: 'BusinessApplication',
  url: SITE,
  offers: OFFERS,
};

const compareFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'How much does Asteris Affiliates cost?', acceptedAnswer: { '@type': 'Answer', text: 'Asteris Affiliates starts at $149/yr with two-tier referrals included, and runs self-hosted so your data stays in your own WordPress.' } },
    { '@type': 'Question', name: 'Is two-tier included?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, two-tier referrals are included from the Starter tier, where some rivals charge extra or omit it.' } },
  ],
};

const migrateFaq = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    { '@type': 'Question', name: 'Will I lose my affiliates or history?', acceptedAnswer: { '@type': 'Answer', text: 'No. You export affiliates and referral history and import them into Asteris Affiliates, preserving balances.' } },
    { '@type': 'Question', name: 'How long does migration take?', acceptedAnswer: { '@type': 'Answer', text: 'Most stores migrate in well under a day; the guide covers each step.' } },
  ],
};

const compareArticle = (headline: string, slug: string, ogImage: string) => ({
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline,
  author: { '@type': 'Organization', name: 'Asteris Affiliates' },
  publisher: PUB,
  datePublished: PUBLISHED,
  image: `${SITE}/${ogImage}`,
  mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}${slug}` },
});

const howTo = (name: string, steps: { name: string; text: string }[]) => ({
  '@context': 'https://schema.org',
  '@type': 'HowTo',
  name,
  step: steps.map(s => ({ '@type': 'HowToStep', name: s.name, text: s.text })),
});

// ── PER-PAGE DATA ────────────────────────────────────────────────────────────

export const SEO_DATA: Record<string, SeoEntry> = {

  '/': {
    title: 'WordPress Affiliate Plugin, Self-Hosted — Asteris Affiliates',
    description: 'Run your own affiliate program on WordPress, WooCommerce, EDD or Surecart. Self-hosted, two-tier referrals included, from $149/yr. Compare to AffiliateWP.',
    ogImage: 'og-home.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }]),
      SOFTWARE_APP,
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Is Asteris Affiliates self-hosted?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. It runs inside your own WordPress, WooCommerce, EDD or Surecart install; your affiliate data stays on your server.' } },
          { '@type': 'Question', name: 'Does it include two-tier referrals?', acceptedAnswer: { '@type': 'Answer', text: 'Yes, two-tier (MLM) referrals are included from the Starter tier, with no separate add-on.' } },
          { '@type': 'Question', name: 'How much is it?', acceptedAnswer: { '@type': 'Answer', text: 'Starter is $149, Pro $299 and Agency $549 a year, with a free tier for up to 25 affiliates.' } },
        ],
      },
    ],
  },

  '/pricing': {
    title: 'Pricing — Asteris Affiliates',
    description: 'Asteris Affiliates: Starter $149, Pro $299, Agency $549 a year. Unlimited affiliates, two-tier referrals included, self-hosted, 14-day guarantee.',
    ogImage: 'og-pricing.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Asteris Affiliates pricing', url: `${SITE}/pricing` }]),
      {
        '@context': 'https://schema.org', '@type': 'Product',
        name: 'Asteris Affiliates',
        description: 'Self-hosted affiliate-program plugin for WordPress, WooCommerce, EDD and Surecart, with two-tier referrals included.',
        image: `${SITE}/og-pricing.png`,
        brand: { '@type': 'Brand', name: 'Asteris Affiliates' },
        offers: OFFERS,
      },
    ],
  },

  '/features': {
    title: 'Features — Asteris Affiliates for WordPress',
    description: 'Two-tier referrals, AI swipe-copy, Stripe Connect + PayPal payouts, vanity links, EDD + Surecart adapters. 23 features in Asteris Affiliates v1.1.0, from $149/yr.',
    ogImage: 'og-features.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: '23 features in v1.1.0', url: `${SITE}/features` }]),
      SOFTWARE_APP,
    ],
  },

  '/free': {
    title: 'Free WooCommerce Affiliate Plugin — Asteris Affiliates',
    description: 'Start free: up to 25 affiliates, core tracking and manual payouts, self-hosted. Upgrade to Starter ($149/yr) for unlimited affiliates and auto-payout.',
    ogImage: 'og-free.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Free affiliate plugin tier', url: `${SITE}/free` }]),
      {
        '@context': 'https://schema.org', '@type': 'SoftwareApplication',
        name: 'Asteris Affiliates', operatingSystem: 'WordPress', applicationCategory: 'BusinessApplication',
        url: SITE,
        offers: [{ '@type': 'Offer', price: '0', priceCurrency: 'USD', name: 'Free', availability: 'https://schema.org/InStock', url: `${SITE}/free` }],
      },
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What does the free tier include?', acceptedAnswer: { '@type': 'Answer', text: 'Up to 25 affiliates, core tracking and manual payouts, self-hosted.' } },
          { '@type': 'Question', name: 'When should I upgrade?', acceptedAnswer: { '@type': 'Answer', text: 'Upgrade to Starter ($149/yr) for unlimited affiliates, Stripe Connect + PayPal auto-payout, and two-tier referrals.' } },
        ],
      },
    ],
  },

  '/demo': {
    title: 'Demo — Try Asteris Affiliates in Your Browser',
    description: 'Asteris Affiliates runs in WordPress Playground — launch a full affiliate program in your browser, no install. See the portal, tracking and payouts live.',
    ogImage: 'og-demo.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Live demo in WordPress Playground', url: `${SITE}/demo` }]),
      {
        '@context': 'https://schema.org', '@type': 'WebPage',
        name: 'Live demo in WordPress Playground',
        url: `${SITE}/demo`,
        mainEntity: { '@type': 'SoftwareApplication', name: 'Asteris Affiliates', operatingSystem: 'WordPress', applicationCategory: 'BusinessApplication' },
      },
    ],
  },

  '/migrate': {
    title: 'Migrate to Asteris Affiliates — AffiliateWP, SliceWP, More',
    description: 'Switch from AffiliateWP, SliceWP, Tapfiliate, YITH or Solid Affiliate. Keep your affiliates and history. Self-hosted, two-tier included, from $149/yr.',
    ogImage: 'og-migrate.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Migrate to Asteris Affiliates', url: `${SITE}/migrate` }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Migrate to Asteris Affiliates', url: `${SITE}/migrate` },
    ],
  },

  '/affiliatewp-vs-asteris': {
    title: 'AffiliateWP Alternative — Asteris Affiliates Compared',
    description: 'AffiliateWP is the established option but charges extra for two-tier referrals. Asteris Affiliates includes two-tier and is self-hosted, from $149/yr. Compare.',
    ogImage: 'og-vs-affiliatewp.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'AffiliateWP vs Asteris Affiliates', url: `${SITE}/affiliatewp-vs-asteris` }]),
      compareArticle('AffiliateWP vs Asteris Affiliates', '/affiliatewp-vs-asteris', 'og-vs-affiliatewp.png'),
      compareFaq,
    ],
  },

  '/slicewp-vs-asteris': {
    title: 'SliceWP Alternative — Asteris Affiliates Compared',
    description: 'SliceWP Pro lacks two-tier referrals. Asteris Affiliates includes two-tier and AI swipe-copy, self-hosted, from $149/yr. Compare features and pricing.',
    ogImage: 'og-vs-slicewp.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'SliceWP vs Asteris Affiliates', url: `${SITE}/slicewp-vs-asteris` }]),
      compareArticle('SliceWP vs Asteris Affiliates', '/slicewp-vs-asteris', 'og-vs-slicewp.png'),
      compareFaq,
    ],
  },

  '/tapfiliate-vs-asteris': {
    title: 'Tapfiliate Alternative — Self-Hosted Asteris Affiliates',
    description: "Tapfiliate is SaaS, with your affiliate data on their servers. Asteris Affiliates is self-hosted at $149/yr, so your data stays in your WordPress. Compare it.",
    ogImage: 'og-vs-tapfiliate.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Tapfiliate vs Asteris Affiliates', url: `${SITE}/tapfiliate-vs-asteris` }]),
      compareArticle('Tapfiliate vs Asteris Affiliates', '/tapfiliate-vs-asteris', 'og-vs-tapfiliate.png'),
      compareFaq,
    ],
  },

  '/solid-affiliate-vs-asteris': {
    title: 'Solid Affiliate Alternative — Asteris Affiliates Compared',
    description: 'Solid Affiliate is WooCommerce-only. Asteris Affiliates adds two-tier referrals, AI swipe-copy and EDD + Surecart support, from $149/yr. Compare features.',
    ogImage: 'og-vs-solid.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Solid Affiliate vs Asteris Affiliates', url: `${SITE}/solid-affiliate-vs-asteris` }]),
      compareArticle('Solid Affiliate vs Asteris Affiliates', '/solid-affiliate-vs-asteris', 'og-vs-solid.png'),
      compareFaq,
    ],
  },

  '/easy-affiliate-vs-asteris': {
    title: 'Easy Affiliate Alternative — Asteris Affiliates Compared',
    description: 'Easy Affiliate runs on MemberPress. Asteris Affiliates is a standalone self-hosted plugin with two-tier referrals included, from $149/yr. Compare features.',
    ogImage: 'og-vs-easy.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Easy Affiliate vs Asteris Affiliates', url: `${SITE}/easy-affiliate-vs-asteris` }]),
      compareArticle('Easy Affiliate vs Asteris Affiliates', '/easy-affiliate-vs-asteris', 'og-vs-easy.png'),
      compareFaq,
    ],
  },

  '/best-woocommerce-affiliate-plugin': {
    title: 'Best WooCommerce Affiliate Plugin — 2026 Comparison',
    description: 'A side-by-side comparison of WooCommerce affiliate plugins: AffiliateWP, SliceWP, Solid Affiliate, YITH and Asteris Affiliates. Features and trade-offs.',
    ogImage: 'og-best-woo.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Best WooCommerce affiliate plugins', url: `${SITE}/best-woocommerce-affiliate-plugin` }]),
      compareArticle('Best WooCommerce affiliate plugins', '/best-woocommerce-affiliate-plugin', 'og-best-woo.png'),
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'What is the best WooCommerce affiliate plugin?', acceptedAnswer: { '@type': 'Answer', text: 'It depends on budget and features: AffiliateWP is the established option, SliceWP is lightweight, Solid Affiliate is WooCommerce-only, and Asteris Affiliates includes two-tier and AI swipe-copy from $149/yr.' } },
          { '@type': 'Question', name: 'Do any include two-tier referrals as standard?', acceptedAnswer: { '@type': 'Answer', text: 'Asteris Affiliates includes two-tier from Starter; several rivals charge extra or omit it.' } },
        ],
      },
    ],
  },

  '/woocommerce-affiliate-program-guide': {
    title: 'How to Start a WooCommerce Affiliate Program (2026)',
    description: 'A step-by-step guide to launching a WooCommerce affiliate program: choose a plugin, set commissions, recruit affiliates and pay out. Self-hosted approach.',
    ogImage: 'og-guide-woo.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'How to start a WooCommerce affiliate program', url: `${SITE}/woocommerce-affiliate-program-guide` }]),
      compareArticle('How to start a WooCommerce affiliate program', '/woocommerce-affiliate-program-guide', 'og-guide-woo.png'),
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'How do I start a WooCommerce affiliate program?', acceptedAnswer: { '@type': 'Answer', text: 'Install an affiliate plugin, set your commission rate, create an affiliate sign-up page, approve affiliates and pay commissions on completed orders.' } },
          { '@type': 'Question', name: 'Do I need a SaaS service?', acceptedAnswer: { '@type': 'Answer', text: 'No. A self-hosted plugin keeps the program and data inside your own WordPress.' } },
        ],
      },
    ],
  },

  '/migrate/from-affiliatewp': {
    title: 'Migrate from AffiliateWP to Asteris Affiliates',
    description: 'Move from AffiliateWP to Asteris Affiliates: export affiliates and referrals, import, and keep your history. Self-hosted, two-tier included, $149/yr.',
    ogImage: 'og-mig-affwp.png',
    jsonLd: [
      ORG,
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Migrate', url: `${SITE}/migrate` },
        { name: 'Migrate from AffiliateWP', url: `${SITE}/migrate/from-affiliatewp` },
      ]),
      howTo('Migrate from AffiliateWP', [
        { name: 'Export from AffiliateWP', text: 'In WordPress admin, go to Affiliates → Tools → Export/Import and export affiliates and referrals as CSV.' },
        { name: 'Install Asteris Affiliates', text: 'Install and activate Asteris Affiliates, then run the 4-step onboarding wizard.' },
        { name: 'Map and import the AffiliateWP data', text: 'Use the importer to map AffiliateWP fields to Asteris Affiliates; affiliates, referral history and balances are preserved.' },
        { name: 'Reconcile and pay out', text: 'Confirm balances against AffiliateWP, set commission rates, then run the first payout via PayPal or bank transfer.' },
      ]),
      migrateFaq,
    ],
  },

  '/migrate/from-slicewp': {
    title: 'Migrate from SliceWP to Asteris Affiliates',
    description: 'Move from SliceWP to Asteris Affiliates without losing affiliates or history. Gain two-tier referrals and AI swipe-copy, from $149/yr. Step-by-step guide.',
    ogImage: 'og-mig-slice.png',
    jsonLd: [
      ORG,
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Migrate', url: `${SITE}/migrate` },
        { name: 'Migrate from SliceWP', url: `${SITE}/migrate/from-slicewp` },
      ]),
      howTo('Migrate from SliceWP', [
        { name: 'Export from SliceWP', text: 'In WordPress admin, open SliceWP → Affiliates and export affiliates and commissions to CSV.' },
        { name: 'Install Asteris Affiliates', text: 'Install and activate Asteris Affiliates, then run the 4-step onboarding wizard.' },
        { name: 'Map and import the SliceWP data', text: 'Use the importer to map SliceWP fields to Asteris Affiliates; affiliates, referral history and balances are preserved.' },
        { name: 'Reconcile and pay out', text: 'Confirm balances against SliceWP, set commission rates, then run the first payout via PayPal or bank transfer.' },
      ]),
      migrateFaq,
    ],
  },

  '/migrate/from-tapfiliate': {
    title: 'Migrate from Tapfiliate to Self-Hosted Asteris Affiliates',
    description: "Leave Tapfiliate's SaaS and bring your affiliate program in-house. Export from Tapfiliate, import to Asteris Affiliates, own your data. From $149/yr.",
    ogImage: 'og-mig-tap.png',
    jsonLd: [
      ORG,
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Migrate', url: `${SITE}/migrate` },
        { name: 'Migrate from Tapfiliate', url: `${SITE}/migrate/from-tapfiliate` },
      ]),
      howTo('Migrate from Tapfiliate', [
        { name: 'Export from Tapfiliate', text: 'In your Tapfiliate SaaS dashboard, open Affiliates and export the affiliate list and commissions as CSV.' },
        { name: 'Install Asteris Affiliates', text: 'Install and activate Asteris Affiliates, then run the 4-step onboarding wizard.' },
        { name: 'Map and import the Tapfiliate data', text: 'Use the importer to map Tapfiliate fields to Asteris Affiliates; affiliates, referral history and balances are preserved.' },
        { name: 'Reconcile and pay out', text: 'Confirm balances against Tapfiliate, set commission rates, then run the first payout via PayPal or bank transfer.' },
      ]),
      migrateFaq,
    ],
  },

  '/migrate/from-yith': {
    title: 'Migrate from YITH Affiliates to Asteris Affiliates',
    description: 'Move from YITH WooCommerce Affiliates to Asteris Affiliates for two-tier referrals, auto-payout and AI swipe-copy. Keep your data. From $149/yr.',
    ogImage: 'og-mig-yith.png',
    jsonLd: [
      ORG,
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Migrate', url: `${SITE}/migrate` },
        { name: 'Migrate from YITH Affiliates', url: `${SITE}/migrate/from-yith` },
      ]),
      howTo('Migrate from YITH Affiliates', [
        { name: 'Export from YITH', text: 'In WordPress admin, open YITH → Affiliates → Tools and export affiliates + commissions to CSV.' },
        { name: 'Install Asteris Affiliates', text: 'Install and activate Asteris Affiliates, then run the 4-step onboarding wizard.' },
        { name: 'Map and import the YITH data', text: 'Use the importer to map YITH fields to Asteris Affiliates; affiliates, referral history and balances are preserved.' },
        { name: 'Reconcile and pay out', text: 'Confirm balances against YITH, set commission rates, then run the first payout via PayPal or bank transfer.' },
      ]),
      migrateFaq,
    ],
  },

  '/migrate/from-solid-affiliate': {
    title: 'Migrate from Solid Affiliate to Asteris Affiliates',
    description: 'Switch from Solid Affiliate to Asteris Affiliates: keep WooCommerce tracking, add two-tier referrals and EDD + Surecart support. From $149/yr. Step-by-step.',
    ogImage: 'og-mig-solid.png',
    jsonLd: [
      ORG,
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Migrate', url: `${SITE}/migrate` },
        { name: 'Migrate from Solid Affiliate', url: `${SITE}/migrate/from-solid-affiliate` },
      ]),
      howTo('Migrate from Solid Affiliate', [
        { name: 'Export from Solid Affiliate', text: 'In WordPress admin, open Solid Affiliate → Tools → Export and export affiliates and commissions as CSV.' },
        { name: 'Install Asteris Affiliates', text: 'Install and activate Asteris Affiliates, then run the 4-step onboarding wizard.' },
        { name: 'Map and import the Solid Affiliate data', text: 'Use the importer to map Solid Affiliate fields to Asteris Affiliates; affiliates, referral history and balances are preserved.' },
        { name: 'Reconcile and pay out', text: 'Confirm balances against Solid Affiliate, set commission rates, then run the first payout via PayPal or bank transfer.' },
      ]),
      migrateFaq,
    ],
  },

  '/founder': {
    title: 'Founder Story — Asteris Affiliates',
    description: 'Why a small Australian team built a self-hosted affiliate plugin with AffiliateWP-grade features at SliceWP pricing. The story behind Asteris Affiliates.',
    ogImage: 'og-founder.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Why I built Asteris Affiliates', url: `${SITE}/founder` }]),
      {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Why I built Asteris Affiliates',
        author: { '@type': 'Person', name: 'Nick Lord' },
        publisher: PUB,
        datePublished: PUBLISHED,
        image: `${SITE}/og-founder.png`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/founder` },
      },
    ],
  },

  '/roadmap': {
    title: 'Roadmap — Asteris Affiliates',
    description: 'What is shipped and what is next for Asteris Affiliates: the v1.1.0 feature set and the v1.2 ranking-system reporting. Velocity-decided, no fixed dates.',
    ogImage: 'og-roadmap.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Asteris Affiliates roadmap', url: `${SITE}/roadmap` }]),
      {
        '@context': 'https://schema.org', '@type': 'Article',
        headline: 'Asteris Affiliates roadmap',
        author: { '@type': 'Organization', name: 'Asteris Affiliates' },
        publisher: PUB,
        datePublished: PUBLISHED,
        image: `${SITE}/og-roadmap.png`,
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/roadmap` },
      },
    ],
  },

  '/changelog': {
    title: 'Changelog — Asteris Affiliates',
    description: 'Every Asteris Affiliates release, version by version. Currently v1.1.0, released 8 June 2026. What changed, what was added and what was fixed.',
    ogImage: 'og-changelog.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Changelog', url: `${SITE}/changelog` }]),
      {
        '@context': 'https://schema.org', '@type': 'TechArticle',
        headline: 'Changelog',
        author: { '@type': 'Organization', name: 'Asteris Affiliates' },
        publisher: PUB,
        datePublished: PUBLISHED,
        about: { '@type': 'SoftwareApplication', name: 'Asteris Affiliates', softwareVersion: '1.1.0' },
        mainEntityOfPage: { '@type': 'WebPage', '@id': `${SITE}/changelog` },
      },
    ],
  },

  '/support': {
    title: 'Support — Asteris Affiliates',
    description: 'Get help with Asteris Affiliates. Documentation, getting-started guide and contact for a small Australian team during business hours. Self-hosted plugin.',
    ogImage: 'og-support.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Support', url: `${SITE}/support` }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Support', url: `${SITE}/support` },
    ],
  },

  '/docs/getting-started': {
    title: 'Getting Started — Asteris Affiliates',
    description: 'Install Asteris Affiliates, run the onboarding wizard, set commission rates and approve your first affiliate. A step-by-step getting-started guide.',
    ogImage: 'og-docs-gs.png',
    jsonLd: [
      ORG,
      breadcrumb([
        { name: 'Home', url: `${SITE}/` },
        { name: 'Docs', url: `${SITE}/docs` },
        { name: 'Getting started', url: `${SITE}/docs/getting-started` },
      ]),
      howTo('Getting started with Asteris Affiliates', [
        { name: 'Install the plugin', text: 'Download from your asterisaffiliates.com account, upload via Plugins → Add New → Upload, activate.' },
        { name: 'Run the onboarding wizard', text: 'Open Affiliates → Onboarding. Capture business details, payout method, commission default in 4 steps.' },
        { name: 'Set commission rates', text: 'Use the default percentage, or set per-product overrides via WC → Products → tab "Asteris Affiliates".' },
        { name: 'Approve your first affiliate', text: 'Affiliates sign up at /affiliate-portal. Approve from Affiliates → Pending → Approve.' },
      ]),
      {
        '@context': 'https://schema.org', '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'Do I need anything before installing?', acceptedAnswer: { '@type': 'Answer', text: 'WordPress 6.4+ and PHP 8.1+. WooCommerce, EDD or Surecart for the cart adapter if you want commission tracking on orders.' } },
          { '@type': 'Question', name: 'How long does setup take?', acceptedAnswer: { '@type': 'Answer', text: 'Most stores are running in 15 minutes from install to first affiliate approved.' } },
        ],
      },
    ],
  },

  '/why-asteris': {
    title: 'Why Asteris Affiliates — 31 modules, $149/yr, your database',
    description: 'Six reasons stores switch to Asteris: one plugin instead of six, your data forever, Stripe Connect at 0.25%, three carts in one, cloud-assist fraud, locked launch pricing.',
    ogImage: 'og-home.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Why Asteris', url: `${SITE}/why-asteris` }]),
      SOFTWARE_APP,
      {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        mainEntity: [
          { '@type': 'Question', name: 'AffiliateWP has been around since 2014. Is Asteris risky?', acceptedAnswer: { '@type': 'Answer', text: 'Longevity is not a feature. Asteris is built by a small team shipping a release every 1–2 weeks. The plugin is GPL-2.0+, your data stays in your database, and you keep the code forever even if the company changes shape.' } },
          { '@type': 'Question', name: 'What happens if Asteris goes out of business?', acceptedAnswer: { '@type': 'Answer', text: 'The plugin is GPL-2.0+. The code is yours forever. The data is in your database. If our licence server vanished tomorrow your plugin would keep working — you would just stop receiving updates.' } },
          { '@type': 'Question', name: 'Why not just use SliceWP — it is cheaper?', acceptedAnswer: { '@type': 'Answer', text: 'SliceWP Pro is $299/yr — more than our $149 Starter — and ships fewer modules. No MLM, no AI swipe-copy, no cloud-assist fraud, no Stripe Connect, no EDD adapter, no Surecart adapter.' } },
          { '@type': 'Question', name: 'I am on Easy Digital Downloads or Surecart, not WooCommerce.', acceptedAnswer: { '@type': 'Answer', text: 'Both adapters ship in core. Same admin, same portal. Most WP affiliate plugins are WC-only or charge $79/yr for the EDD bridge.' } },
          { '@type': 'Question', name: 'What is the catch with the locked pricing?', acceptedAnswer: { '@type': 'Answer', text: 'None. As long as your subscription is active, you pay what you signed up for — for life. Cancel and re-subscribe later, you pay the then-current rate.' } },
        ],
      },
    ],
  },

  '/modules': {
    title: 'All 31 Modules — Asteris Affiliates',
    description: '31 modules in Asteris Affiliates v1.1.0: MLM, AI swipe-copy, Stripe Connect + PayPal payouts, cloud-assist fraud, EDD + Surecart adapters, REST API. 6 differentiators.',
    ogImage: 'og-features.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'All modules', url: `${SITE}/modules` }]),
      SOFTWARE_APP,
    ],
  },

  '/partners': {
    title: 'Asteris Partners — 30% recurring on every Asteris Affiliates customer',
    description: "Earn 30% recurring lifetime commission promoting Asteris Affiliates. Agency, creator, consultant, dev programs. Stripe Connect or PayPal payouts. No exclusivity.",
    ogImage: 'og-home.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Partners program', url: `${SITE}/partners` }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Asteris Partners program', url: `${SITE}/partners` },
    ],
  },

  '/contact': {
    title: 'Contact — Asteris Affiliates',
    description: 'Get in touch with Asteris Affiliates. Email a small Australian team during business hours. Pre-sales questions, support, migration help.',
    ogImage: 'og-legal.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Contact', url: `${SITE}/contact` }]),
      { '@context': 'https://schema.org', '@type': 'ContactPage', name: 'Contact', url: `${SITE}/contact` },
    ],
  },

  '/terms': {
    title: 'Terms of Service — Asteris Affiliates',
    description: 'The terms governing your use of the Asteris Affiliates website and subscription: accounts, billing, renewals, cancellation, liability and governing law.',
    ogImage: 'og-legal.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Terms of Service', url: `${SITE}/terms` }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Terms of Service', url: `${SITE}/terms` },
    ],
  },

  '/privacy': {
    title: 'Privacy Policy — Asteris Affiliates',
    description: 'How Asteris Affiliates collects, uses and protects personal data, and the rights you can exercise. Cloud-assist fraud detection is opt-in and hashed.',
    ogImage: 'og-legal.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Privacy Policy', url: `${SITE}/privacy` }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Privacy Policy', url: `${SITE}/privacy` },
    ],
  },

  '/refund-policy': {
    title: 'Refund Policy — Asteris Affiliates',
    description: 'Asteris Affiliates offers a 14-day refund on new subscriptions. How eligibility works and how to request one. Your consumer rights are preserved.',
    ogImage: 'og-legal.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Refund Policy', url: `${SITE}/refund-policy` }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Refund Policy', url: `${SITE}/refund-policy` },
    ],
  },

  '/license': {
    title: 'Licence — Asteris Affiliates',
    description: 'The Asteris Affiliates plugin licence: the code is GPL; your subscription covers updates, support and the licence key across your tier\'s sites.',
    ogImage: 'og-legal.png',
    jsonLd: [
      ORG,
      breadcrumb([{ name: 'Home', url: `${SITE}/` }, { name: 'Licence (EULA)', url: `${SITE}/license` }]),
      { '@context': 'https://schema.org', '@type': 'WebPage', name: 'Licence (EULA)', url: `${SITE}/license` },
    ],
  },

};
