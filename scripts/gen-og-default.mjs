// Generate the default 1200×630 social-card image at public/og-default.png.
// Uses Sharp (already a dep) to rasterise an inline SVG. Run with:
//   node scripts/gen-og-default.mjs
// Re-run any time the design needs to change. Per-page OG images are
// banked in the 120-asset manifest; this is the fallback shipped now.
import { mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import sharp from 'sharp';

const W = 1200, H = 630;
const out = 'public/og-default.png';

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${W}" height="${H}" viewBox="0 0 ${W} ${H}">
  <defs>
    <linearGradient id="bg" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#0a0a0a"/>
      <stop offset="100%" stop-color="#1a1a1a"/>
    </linearGradient>
  </defs>
  <rect width="${W}" height="${H}" fill="url(#bg)"/>

  <!-- Orange star top-left -->
  <path d="M 110 140 L 132 200 L 196 204 L 146 244 L 164 306 L 110 270 L 56 306 L 74 244 L 24 204 L 88 200 Z"
        fill="#06D6A0" transform="translate(0,0)"/>

  <!-- Main wordmark -->
  <text x="80" y="380" fill="#ffffff" font-family="-apple-system, Inter, Segoe UI, sans-serif" font-size="84" font-weight="900" letter-spacing="-3">Asteris</text>
  <text x="80" y="460" fill="#ffffff" font-family="-apple-system, Inter, Segoe UI, sans-serif" font-size="84" font-weight="900" letter-spacing="-3">for WooCommerce</text>

  <!-- Tagline -->
  <text x="80" y="540" fill="#bbbbbb" font-family="-apple-system, Inter, Segoe UI, sans-serif" font-size="30" font-weight="500">
    19 modules. One plugin. One bill.
  </text>

  <!-- Yellow accent strip -->
  <rect x="0" y="${H - 12}" width="${W}" height="12" fill="#fff19a"/>

  <!-- Orange accent corner -->
  <rect x="${W - 220}" y="0" width="220" height="12" fill="#06D6A0"/>
</svg>`;

mkdirSync(dirname(out), { recursive: true });
await sharp(Buffer.from(svg)).png().toFile(out);
console.log('Wrote ' + out + ' (' + W + 'x' + H + ')');
