/**
 * Competitor plugin pricing data — source for the v1.1 Interactive Comparator.
 *
 * Sourced from 02-specs/research/strategy/09_PRICE_CHECK_REGISTER.md
 * (Claude Web verified pricing, Apr-Jun 2026).
 *
 * Update process:
 *   1. Edit prices here when competitors change pricing
 *   2. Bump `verifiedDate` on the row you changed
 *   3. Cross-update 02-specs/modules.json `replaces[]` arrays so the
 *      home/pricing/modules pages stay in sync
 *
 * NOT used at v1.0 — referenced by src/components/Comparator.astro
 * (scaffolded but inert) for the v1.1 widget build.
 */

export type PluginCategory =
  | 'seo'
  | 'ai'
  | 'invoices'
  | 'swatches'
  | 'wishlist'
  | 'quote'
  | 'back_in_stock'
  | 'cart'
  | 'order_numbers'
  | 'filtering'
  | 'min_max'
  | 'links'
  | 'trust_badges'
  | 'shipping_bar'
  | 'stock_urgency'
  | 'delivery'
  | 'labels'
  | 'badges'
  | 'analytics';

/** Asteris module IDs (must match 02-specs/modules.json `id` field). */
export type AsterisModule =
  | 'ai_suite'
  | 'seo'
  | 'pdf_invoices'
  | 'variation_swatches'
  | 'wishlist'
  | 'quote_enquiry'
  | 'back_in_stock'
  | 'side_cart'
  | 'sequential_order_numbers'
  | 'product_filtering'
  | 'min_max_quantity'
  | 'links'
  | 'trust_badges'
  | 'free_shipping_bar'
  | 'stock_urgency'
  | 'delivery_timeline'
  | 'feature_labels'
  | 'product_badges'
  | 'analytics';

export type CompetitorPlugin = {
  id: string;
  name: string;
  vendor: string;
  yearlyUsd: number;
  /** Matching Asteris module ID, or null if Asteris doesn't cover this. */
  asterisModule: AsterisModule | null;
  category: PluginCategory;
  notes?: string;
  verifiedDate: string; // ISO YYYY-MM-DD
};

export const competitors: CompetitorPlugin[] = [
  // ── SEO ──
  { id: 'yoast-premium',        name: 'Yoast SEO Premium',           vendor: 'Yoast',         yearlyUsd: 129, asterisModule: 'seo', category: 'seo', notes: 'EUR €118.80; USD shown at Apr 2026 FX', verifiedDate: '2026-06-01' },
  { id: 'yoast-woo-seo',        name: 'Yoast WooCommerce SEO',       vendor: 'Yoast',         yearlyUsd: 69,  asterisModule: 'seo', category: 'seo', verifiedDate: '2026-06-01' },
  { id: 'rankmath-pro',         name: 'Rank Math PRO',               vendor: 'Rank Math',     yearlyUsd: 59,  asterisModule: 'seo', category: 'seo', verifiedDate: '2026-06-01' },
  { id: 'rankmath-business',    name: 'Rank Math BUSINESS',          vendor: 'Rank Math',     yearlyUsd: 199, asterisModule: 'seo', category: 'seo', verifiedDate: '2026-06-01' },
  { id: 'aioseo-pro',           name: 'All in One SEO Pro',          vendor: 'AIOSEO',        yearlyUsd: 99,  asterisModule: 'seo', category: 'seo', verifiedDate: '2026-06-01' },
  { id: 'seopress-pro',         name: 'SEOPress Pro',                vendor: 'SEOPress',      yearlyUsd: 99,  asterisModule: 'seo', category: 'seo', verifiedDate: '2026-06-01' },

  // ── AI content ──
  { id: 'ai-engine',            name: 'AI Engine',                   vendor: 'Jordy Meow',    yearlyUsd: 79,  asterisModule: 'ai_suite', category: 'ai', verifiedDate: '2026-06-01' },
  { id: 'getgenie',             name: 'GetGenie',                    vendor: 'GetGenie',      yearlyUsd: 99,  asterisModule: 'ai_suite', category: 'ai', verifiedDate: '2026-06-01' },
  { id: 'rankmath-content-ai',  name: 'Rank Math Content AI',        vendor: 'Rank Math',     yearlyUsd: 199, asterisModule: 'ai_suite', category: 'ai', verifiedDate: '2026-06-01' },

  // ── PDF Invoices ──
  { id: 'wp-overnight-pdf',     name: 'WP Overnight PDF Invoices Premium', vendor: 'WP Overnight (UpdraftPlus)', yearlyUsd: 79,  asterisModule: 'pdf_invoices', category: 'invoices', notes: 'Acquired by UpdraftPlus Jul 2023', verifiedDate: '2026-06-01' },
  { id: 'skyverge-pdf',         name: 'WC PDF Invoices (Skyverge)',  vendor: 'Skyverge',      yearlyUsd: 79,  asterisModule: 'pdf_invoices', category: 'invoices', verifiedDate: '2026-06-01' },

  // ── Variation Swatches ──
  { id: 'yith-swatches',        name: 'YITH WC Color and Label Variations', vendor: 'YITH', yearlyUsd: 99, asterisModule: 'variation_swatches', category: 'swatches', verifiedDate: '2026-06-01' },
  { id: 'wc-swatches',          name: 'WooCommerce Variation Swatches', vendor: 'WooCommerce', yearlyUsd: 99, asterisModule: 'variation_swatches', category: 'swatches', verifiedDate: '2026-06-01' },

  // ── Wishlist ──
  { id: 'yith-wishlist',        name: 'YITH WC Wishlist Premium',    vendor: 'YITH',          yearlyUsd: 105, asterisModule: 'wishlist', category: 'wishlist', verifiedDate: '2026-06-01' },
  { id: 'ti-wishlist',          name: 'TI WooCommerce Wishlist Premium', vendor: 'TemplateInvaders', yearlyUsd: 79, asterisModule: 'wishlist', category: 'wishlist', verifiedDate: '2026-06-01' },

  // ── Quote / Enquiry ──
  { id: 'yith-quote',           name: 'YITH WC Request a Quote',     vendor: 'YITH',          yearlyUsd: 99,  asterisModule: 'quote_enquiry', category: 'quote', verifiedDate: '2026-06-01' },
  { id: 'wc-quote',             name: 'WooCommerce Request a Quote', vendor: 'WooCommerce',   yearlyUsd: 99,  asterisModule: 'quote_enquiry', category: 'quote', verifiedDate: '2026-06-01' },

  // ── Back in Stock ──
  { id: 'wc-waitlist',          name: 'WooCommerce Waitlist',        vendor: 'WooCommerce',   yearlyUsd: 79,  asterisModule: 'back_in_stock', category: 'back_in_stock', verifiedDate: '2026-06-01' },
  { id: 'yith-waiting',         name: 'YITH Waiting List',           vendor: 'YITH',          yearlyUsd: 79,  asterisModule: 'back_in_stock', category: 'back_in_stock', verifiedDate: '2026-06-01' },

  // ── Side Cart / Funnels ──
  { id: 'cartflows-cart',       name: 'CartFlows Cart',              vendor: 'CartFlows',     yearlyUsd: 239, asterisModule: 'side_cart', category: 'cart', notes: 'Bundled with CartFlows Pro funnel suite', verifiedDate: '2026-06-01' },
  { id: 'funnelkit-cart',       name: 'FunnelKit Cart',              vendor: 'FunnelKit',     yearlyUsd: 99,  asterisModule: 'side_cart', category: 'cart', verifiedDate: '2026-06-01' },
  { id: 'wc-side-cart',         name: 'WooCommerce Side Cart',       vendor: 'XootiX',        yearlyUsd: 79,  asterisModule: 'side_cart', category: 'cart', verifiedDate: '2026-06-01' },

  // ── Sequential Order Numbers ──
  { id: 'skyverge-orderno',     name: 'Skyverge Sequential Order Numbers Pro', vendor: 'Skyverge', yearlyUsd: 79, asterisModule: 'sequential_order_numbers', category: 'order_numbers', verifiedDate: '2026-06-01' },

  // ── Product Filtering ──
  { id: 'iconic-filter',        name: 'Iconic WooCommerce Show Single Variations', vendor: 'Iconic', yearlyUsd: 79, asterisModule: 'product_filtering', category: 'filtering', verifiedDate: '2026-06-01' },
  { id: 'woof',                 name: 'WOOF Product Filter',         vendor: 'Realmag777',    yearlyUsd: 79,  asterisModule: 'product_filtering', category: 'filtering', verifiedDate: '2026-06-01' },
  { id: 'yith-filter',          name: 'YITH Ajax Product Filter',    vendor: 'YITH',          yearlyUsd: 99,  asterisModule: 'product_filtering', category: 'filtering', verifiedDate: '2026-06-01' },

  // ── Min/Max Quantity ──
  { id: 'wc-min-max',           name: 'WooCommerce Min/Max Quantities', vendor: 'WooCommerce', yearlyUsd: 79, asterisModule: 'min_max_quantity', category: 'min_max', verifiedDate: '2026-06-01' },
  { id: 'yith-min-max',         name: 'YITH WC Minimum Maximum Quantity', vendor: 'YITH',     yearlyUsd: 79,  asterisModule: 'min_max_quantity', category: 'min_max', verifiedDate: '2026-06-01' },

  // ── Asteris Links ──
  { id: 'pretty-links',         name: 'Pretty Links Pro',            vendor: 'Caseproof',     yearlyUsd: 99,  asterisModule: 'links', category: 'links', verifiedDate: '2026-06-01' },
  { id: 'thirsty-affiliates',   name: 'ThirstyAffiliates Pro',       vendor: 'Caseproof',     yearlyUsd: 99,  asterisModule: 'links', category: 'links', verifiedDate: '2026-06-01' },

  // ── Trust Badges ──
  { id: 'trust-badges-various', name: 'Trust Badges (various)',      vendor: 'Various',       yearlyUsd: 39,  asterisModule: 'trust_badges', category: 'trust_badges', notes: 'Wide variance; $39/yr typical', verifiedDate: '2026-06-01' },

  // ── Free Shipping Bar ──
  { id: 'wc-cart-notices',      name: 'WooCommerce Cart Notices',    vendor: 'WooCommerce',   yearlyUsd: 79,  asterisModule: 'free_shipping_bar', category: 'shipping_bar', verifiedDate: '2026-06-01' },

  // ── Stock Urgency ──
  { id: 'tyche-only-x-left',    name: 'Tyche Softwares Only X Left', vendor: 'Tyche',         yearlyUsd: 39,  asterisModule: 'stock_urgency', category: 'stock_urgency', verifiedDate: '2026-06-01' },

  // ── Delivery Timeline ──
  { id: 'yith-delivery-date',   name: 'YITH WC Delivery Date',       vendor: 'YITH',          yearlyUsd: 49,  asterisModule: 'delivery_timeline', category: 'delivery', verifiedDate: '2026-06-01' },

  // ── Feature / Product Labels + Badges ──
  { id: 'yith-product-labels',  name: 'YITH Product Labels',         vendor: 'YITH',          yearlyUsd: 94,  asterisModule: 'feature_labels', category: 'labels', verifiedDate: '2026-06-01' },
  { id: 'yith-wc-badges',       name: 'YITH WC Badges',              vendor: 'YITH',          yearlyUsd: 94,  asterisModule: 'product_badges', category: 'badges', verifiedDate: '2026-06-01' },

  // ── Analytics ──
  { id: 'monsterinsights',      name: 'MonsterInsights',             vendor: 'MonsterInsights', yearlyUsd: 99, asterisModule: 'analytics', category: 'analytics', verifiedDate: '2026-06-01' },
];

/** Asteris tier prices in USD/year. Lifetime is one-time, not annual. */
export const ASTERIS_PRICING = {
  free:      { yearly: 0,    oneTime: null, sites: 'unlimited (Free)' },
  starter:   { yearly: 149,  oneTime: null, sites: 1 },
  pro:       { yearly: 349,  oneTime: null, sites: 3 },
  agency:    { yearly: 549,  oneTime: null, sites: 'unlimited' },
  lifetime:  { yearly: null, oneTime: 249,  sites: 1 },
} as const;

export type AsterisTier = keyof typeof ASTERIS_PRICING;
