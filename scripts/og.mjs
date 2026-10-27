// Generates public/og.png (1200x630), the default social share image. Run: node scripts/og.mjs
import sharp from 'sharp';
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <rect width="1200" height="630" fill="#F1F3EE"/>
  <g opacity=".5" stroke="#D4ECE0" stroke-width="1">${Array.from({length:60},(_,i)=>`<line x1="${i*30-630}" y1="630" x2="${i*30}" y2="0"/>`).join('')}</g>
  <circle cx="110" cy="110" r="26" fill="none" stroke="#0B7A57" stroke-width="5"/><circle cx="110" cy="110" r="10" fill="#B87D0E"/>
  <text x="152" y="124" font-family="DejaVu Sans, Arial, sans-serif" font-size="40" font-weight="700" fill="#13201B">bemba</text>
  <text x="80" y="330" font-family="DejaVu Sans, Arial, sans-serif" font-size="84" font-weight="700" fill="#13201B" letter-spacing="-2">Know the rules</text>
  <text x="80" y="425" font-family="DejaVu Sans, Arial, sans-serif" font-size="84" font-weight="700" fill="#0B7A57" letter-spacing="-2">before <tspan fill="#13201B">you land.</tspan></text>
  <text x="80" y="530" font-family="DejaVu Sans Mono, monospace" font-size="26" fill="#5B6862">VISA · VACCINES · ENTRY RULES · 54 AFRICAN COUNTRIES</text>
  <g transform="translate(1000 470) rotate(-8)"><rect x="-110" y="-40" width="220" height="80" rx="40" fill="#F5E6C2" stroke="#B87D0E" stroke-width="4"/><text x="0" y="12" text-anchor="middle" font-family="DejaVu Sans Mono, monospace" font-size="30" fill="#B87D0E">EVISA</text></g>
</svg>`;
await sharp(Buffer.from(svg)).png().toFile('public/og.png');
console.log('public/og.png written');
