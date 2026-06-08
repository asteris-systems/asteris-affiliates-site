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
        { label: '← Back to asterisaffiliates.com', link: '/' },
        {
          label: 'Start here',
          items: [
            { label: 'Docs home', link: '/docs' },
            { label: 'Getting started', link: '/docs/getting-started' },
            { label: 'Onboarding wizard', link: '/docs/onboarding-wizard' },
            { label: 'Free vs paid', link: '/docs/free-vs-paid' },
            { label: 'Licensing', link: '/docs/licensing' },
            { label: 'Changelog', link: '/docs/changelog' },
          ],
        },
        {
          label: 'Affiliate management',
          items: [
            { label: 'Approving + rejecting', link: '/docs/affiliates/manage' },
            { label: 'Suspension + reinstatement', link: '/docs/affiliates/suspension' },
            { label: 'Admin impersonation ("View as")', link: '/docs/affiliates/impersonation' },
            { label: 'Bulk actions + CSV export', link: '/docs/affiliates/bulk-actions' },
            { label: 'Affiliate portal (front-end)', link: '/docs/affiliates/portal' },
          ],
        },
        {
          label: 'Commissions',
          items: [
            { label: 'Default commission rates', link: '/docs/commissions/rates' },
            { label: 'Per-product overrides', link: '/docs/commissions/per-product' },
            { label: 'Two-tier (MLM) referrals', link: '/docs/commissions/two-tier' },
            { label: 'Refunds + chargebacks', link: '/docs/commissions/refunds' },
          ],
        },
        {
          label: 'Payouts',
          items: [
            { label: 'PayPal API auto-batch', link: '/docs/payouts/paypal-api' },
            { label: 'Bank transfer', link: '/docs/payouts/bank-transfer' },
            { label: 'Manual payouts', link: '/docs/payouts/manual' },
            { label: 'Thresholds + schedules', link: '/docs/payouts/thresholds' },
          ],
        },
        {
          label: 'Growth + marketing',
          items: [
            { label: 'AI swipe-copy generator', link: '/docs/growth/ai-swipe-copy' },
            { label: 'Vanity /go/ landing pages', link: '/docs/growth/landing-pages' },
            { label: 'A/B email testing', link: '/docs/growth/ab-email-testing' },
            { label: 'Email throttling', link: '/docs/growth/email-throttling' },
          ],
        },
        {
          label: 'Fraud + security',
          items: [
            { label: 'Cloud-assist fraud detection', link: '/docs/fraud/cloud-assist' },
            { label: 'Self-referral prevention', link: '/docs/fraud/self-referral' },
            { label: 'IP throttling', link: '/docs/fraud/ip-throttling' },
          ],
        },
        {
          label: 'Integrations',
          items: [
            { label: 'WooCommerce (native)', link: '/docs/integrations/woocommerce' },
            { label: 'Easy Digital Downloads', link: '/docs/integrations/edd' },
            { label: 'Surecart', link: '/docs/integrations/surecart' },
            { label: 'Custom cart adapter', link: '/docs/integrations/custom-adapter' },
          ],
        },
        {
          label: 'For developers',
          items: [
            { label: 'REST API', link: '/docs/dev/rest-api' },
            { label: 'WP-CLI commands', link: '/docs/dev/wp-cli' },
            { label: 'Hooks + filters', link: '/docs/dev/hooks-filters' },
          ],
          collapsed: true,
        },
        {
          label: 'Troubleshooting',
          items: [
            { label: 'License issues', link: '/docs/troubleshooting/license' },
            { label: 'Tracking issues', link: '/docs/troubleshooting/tracking' },
            { label: 'Payout issues', link: '/docs/troubleshooting/payouts' },
          ],
        },
      ],
    }),
  ],
});
