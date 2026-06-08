// Generate logo.png 512x512 — 5-pointed mint star on rounded-black tile.
// Matches Asteris Affiliates brand colour #06D6A0.
import sharp from 'sharp';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
const __dirname = dirname(fileURLToPath(import.meta.url));

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
  <rect width="512" height="512" rx="80" fill="#0a0a0a"/>
  <!-- 5-pointed star: centred at (256, 256), outer radius 180 -->
  <path d="M256 64 L302.4 194.4 L440 200 L332.8 282.4 L372 416 L256 338.4 L140 416 L179.2 282.4 L72 200 L209.6 194.4 Z"
        fill="#06D6A0"/>
</svg>`;

await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toFile(join(__dirname, '..', 'public', 'logo.png'));
console.log('✓ public/logo.png (512×512, mint star)');
