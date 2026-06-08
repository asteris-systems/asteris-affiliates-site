import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import starlight from '@astrojs/starlight';

// https://astro.build/config
export default defineConfig({
  site: 'https://asterisaffiliates.com',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
  integrations: [
    sitemap({
      changefreq: 'weekly',
      priority: 0.7,
    }),
    starlight({
      title: 'Asteris Docs',
      description: 'Guides, module references, and migration walkthroughs for Asteris Affiliates.',
      // Brand-token CSS for the marketing site lives at ./src/styles/global.css and is
      // imported directly by Layout.astro. Do NOT inject it into Starlight — its
      // body{background:...} clashes with Starlight's dark-mode theming and produces
      // white headings on a light body. Starlight uses its own scoped CSS variables
      // (--sl-color-*) and handles auto/light/dark cleanly without our overrides.
      customCss: ['./src/styles/starlight-brand.css'],
      components: {
        // Override the title link so "Asteris Docs" lands you at /docs instead of /
        SiteTitle: './src/components/StarlightSiteTitle.astro',
      },
      sidebar: [
        // First entry — visible "back to marketing site" affordance at top of every docs page.
        { label: '← Back to asterisaffiliates.com', link: '/' },
        {
          label: 'Start here',
          items: [
            { label: 'Docs home', link: '/docs' },
            { label: 'Getting started', link: '/docs/getting-started' },
            { label: 'Free vs paid', link: '/docs/free-vs-paid' },
            { label: 'Free + paid together', link: '/docs/free-and-paid-together' },
            { label: 'Licensing', link: '/docs/licensing' },
            { label: 'Troubleshooting', link: '/docs/troubleshooting' },
            { label: 'Conflicts', link: '/docs/conflicts' },
            { label: 'Changelog', link: '/docs/changelog' },
          ],
        },
        {
          label: 'Modules',
          // Explicit list (was autogenerate) so order is by display title, not filename.
          // Includes Live Monitor (added 2026-06-07 — Module 26 ship).
          items: [
            { label: 'AI Suite',                       link: '/docs/modules/ai-suite' },
            { label: 'Analytics',                      link: '/docs/modules/analytics' },
            { label: 'Asteris Coupons',                link: '/docs/modules/coupons' },
            { label: 'Asteris Links',                  link: '/docs/modules/links' },
            { label: 'Back in Stock',                  link: '/docs/modules/back-in-stock' },
            { label: 'Delivery Timeline',              link: '/docs/modules/delivery-timeline' },
            { label: 'Feature Labels',                 link: '/docs/modules/feature-labels' },
            { label: 'Free Shipping Bar',              link: '/docs/modules/free-shipping-bar' },
            { label: 'Live Monitor',                   link: '/docs/modules/live-monitor' },
            { label: 'Min/Max Quantity',               link: '/docs/modules/min-max-quantity' },
            { label: 'PDF Invoices and Packing Slips', link: '/docs/modules/pdf-invoices' },
            { label: 'Product Badges',                 link: '/docs/modules/product-badges' },
            { label: 'Product Filtering',              link: '/docs/modules/product-filtering' },
            { label: 'Quote / Enquiry',                link: '/docs/modules/quote' },
            { label: 'SEO',                            link: '/docs/modules/seo' },
            { label: 'Sequential Order Numbers',       link: '/docs/modules/sequential-order-numbers' },
            { label: 'Side Cart',                      link: '/docs/modules/side-cart' },
            { label: 'Stock Urgency',                  link: '/docs/modules/stock-urgency' },
            { label: 'Trust Badges',                   link: '/docs/modules/trust-badges' },
            { label: 'Variation Swatches',             link: '/docs/modules/variation-swatches' },
            { label: 'Wishlist',                       link: '/docs/modules/wishlist' },
          ],
          collapsed: true,
        },
        {
          label: 'Security + privacy',
          items: [
            { label: 'Security architecture', link: '/docs/security' },
            { label: 'Data handling (GDPR)', link: '/docs/data-handling' },
            { label: 'Cookie compliance', link: '/docs/cookie-compliance' },
          ],
        },
        {
          label: 'For developers + agencies',
          items: [
            { label: 'API reference (hooks + filters)', link: '/docs/api-reference' },
            { label: 'WP-CLI commands (v1.1)', link: '/docs/wp-cli' },
            { label: 'WordPress Multisite (v1.1)', link: '/docs/multisite' },
            { label: 'Account portal (v1.1)', link: '/docs/account-portal' },
          ],
          collapsed: true,
        },
        // Migrations sidebar omitted from /docs by design — migration walkthroughs
        // live in marketing (content/marketing/migrate__from-*.md) and render at
        // /migrate/from-*, which is the user-facing migration story for v1.0.
        // If/when migration content moves into /docs (post-launch), re-add a
        // group here pointing at src/content/docs/docs/migrations/.
      ],
    }),
  ],
});
