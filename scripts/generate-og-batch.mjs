// Generate ALL per-page OG PNGs (1200x630) per og-image-spec.md.
// Mint #06D6A0 → black gradient. One wordmark line + one headline + one sub-line.
import sharp from 'sharp';
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));
const out = join(__dirname, '..', 'public');

const PAGES = [
  ['og-home.png',          'Affiliate plugin for WordPress, self-hosted'],
  ['og-pricing.png',       'Asteris Affiliates pricing'],
  ['og-features.png',      '23 features in v1.1.0'],
  ['og-free.png',          'Free affiliate plugin tier'],
  ['og-demo.png',          'Live demo in WordPress Playground'],
  ['og-migrate.png',       'Migrate to Asteris Affiliates'],
  ['og-vs-affiliatewp.png','AffiliateWP vs Asteris Affiliates'],
  ['og-vs-slicewp.png',    'SliceWP vs Asteris Affiliates'],
  ['og-vs-tapfiliate.png', 'Tapfiliate vs Asteris Affiliates'],
  ['og-vs-solid.png',      'Solid Affiliate vs Asteris Affiliates'],
  ['og-vs-easy.png',       'Easy Affiliate vs Asteris Affiliates'],
  ['og-best-woo.png',      'Best WooCommerce affiliate plugins'],
  ['og-guide-woo.png',     'Start a WooCommerce affiliate program'],
  ['og-mig-affwp.png',     'Migrate from AffiliateWP'],
  ['og-mig-slice.png',     'Migrate from SliceWP'],
  ['og-mig-tap.png',       'Migrate from Tapfiliate'],
  ['og-mig-yith.png',      'Migrate from YITH Affiliates'],
  ['og-mig-solid.png',     'Migrate from Solid Affiliate'],
  ['og-founder.png',       'Why I built Asteris Affiliates'],
  ['og-roadmap.png',       'Asteris Affiliates roadmap'],
  ['og-changelog.png',     'Changelog'],
  ['og-support.png',       'Support'],
  ['og-docs-gs.png',       'Getting started'],
  ['og-legal.png',         'Asteris Affiliates'],
];

const W = 1200, H = 630;
const SUB = 'from $149/yr · self-hosted';

function escapeXml(s) {
  return s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&apos;');
}

function svg(headline) {
  // Auto-shrink headline if very long
  const h = escapeXml(headline);
  const fs = h.length > 38 ? 56 : 68;
  return `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
    <defs>
      <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0%"  stop-color="#06D6A0"/>
        <stop offset="55%" stop-color="#0a8a6a"/>
        <stop offset="100%" stop-color="#0a0a0a"/>
      </linearGradient>
    </defs>
    <rect width="${W}" height="${H}" fill="url(#g)"/>
    <text x="50%" y="32%" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="30" fill="#fff" opacity="0.9" letter-spacing="6">★  ASTERIS AFFILIATES</text>
    <text x="50%" y="55%" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="${fs}" fill="#fff">${h}</text>
    <text x="50%" y="80%" text-anchor="middle" font-family="Arial,sans-serif" font-weight="500" font-size="28" fill="#fff" opacity="0.9">${SUB}</text>
  </svg>`;
}

for (const [file, headline] of PAGES) {
  const path = join(out, file);
  await sharp(Buffer.from(svg(headline))).png({ compressionLevel: 9 }).toFile(path);
  console.log(`→ ${file}`);
}
console.log(`\n${PAGES.length} OG images generated.`);
