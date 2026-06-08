// Generate OG image for asterisaffiliates.com (1200x630).
// Mint gradient + brand tagline.
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const W = 1200, H = 630;
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%"  stop-color="#06D6A0"/>
      <stop offset="55%" stop-color="#0a8a6a"/>
      <stop offset="100%" stop-color="#0a0a0a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#g)"/>
  <text x="50%" y="32%" text-anchor="middle" font-family="Arial,sans-serif" font-weight="700" font-size="30" fill="#fff" opacity="0.9" letter-spacing="6">★  ASTERIS AFFILIATES</text>
  <text x="50%" y="51%" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="68" fill="#fff">AffiliateWP-grade features.</text>
  <text x="50%" y="65%" text-anchor="middle" font-family="Arial,sans-serif" font-weight="900" font-size="68" fill="#fff">SliceWP pricing. Forever.</text>
  <text x="50%" y="84%" text-anchor="middle" font-family="Arial,sans-serif" font-weight="500" font-size="28" fill="#fff" opacity="0.9">$149/yr · self-hosted · GPL-2.0 · asterisaffiliates.com</text>
</svg>`;
await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(__dirname, '..', 'public', 'og-home.png'));
console.log('✓ public/og-home.png');
