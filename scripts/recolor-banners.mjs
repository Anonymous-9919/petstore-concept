import sharp from "sharp";
import fs from "fs";
import path from "path";

const ASSETS = path.join(process.cwd(), "public", "assets");
const BACKUP = path.join(ASSETS, "banners-originals-backup");

// Banners with confirmed blue/purple accents (see analyze-banners.mjs output)
const files = [
  "pc-promo-banner.jpg", "pc-promo-banner-mobile.jpg",
  "promo-stella.jpg", "promo-stella-mobile.jpg",
  "promo-royalcanin.jpg", "promo-royalcanin-mobile.jpg",
  "accessory-dogbeds.jpg", "accessory-dogbeds-mobile.jpg",
  "accessory-essentials.jpg", "accessory-essentials-mobile.jpg",
];

// ---- selective cool->orange hue remap -------------------------------------
// weight ramps in so colors outside the blue/purple band keep their hue
function shiftWeight(hue) {
  if (hue <= 170 || hue >= 350) return 0;
  if (hue < 190) return (hue - 170) / 20;        // 170..190 ramp in
  if (hue <= 320) return 1;                       // full band: blue -> purple
  return 1 - (hue - 320) / 30;                    // 320..350 ramp out
}
function targetHue(hue) {
  const t = Math.min(Math.max((hue - 185) / 145, 0), 1);
  return 20 + t * 22;                             // all cool tones -> 20..42 deg
}

function processPixel(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return [r, g, b];
  const sat = d / max;
  let h;
  if (max === r) h = (((g - b) / d + 6) % 6) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;

  const w = shiftWeight(h);
  if (w === 0) return [r, g, b];

  // desaturated pixels barely count as an "accent" - scale by saturation
  const sw = w * Math.min(sat / 0.18, 1);
  const h2 = h + (targetHue(h) - h) * sw;

  // HSL-ish rotate back to RGB preserving luminance ratio
  const hn = ((h2 % 360) + 360) % 360 / 60;
  const c = sat * max;                 // chroma relative to current max
  const x = c * (1 - Math.abs((hn % 2) - 1));
  let r2, g2, b2;
  const m = max - c;
  const seg = Math.floor(hn);
  [r2, g2, b2] =
    seg === 0 ? [c, x, 0] : seg === 1 ? [x, c, 0] : seg === 2 ? [0, c, x] :
    seg === 3 ? [0, x, c] : seg === 4 ? [x, 0, c] : [c, 0, x];
  return [
    Math.round(r2 + m),
    Math.round(g2 + m),
    Math.round(b2 + m),
  ];
}

fs.mkdirSync(BACKUP, { recursive: true });

for (const f of files) {
  const src = path.join(ASSETS, f);
  const bak = path.join(BACKUP, f);
  if (!fs.existsSync(src)) { console.log(`SKIP missing ${f}`); continue; }
  if (!fs.existsSync(bak)) fs.copyFileSync(src, bak);   // one-time backup

  const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const [r, g, b] = processPixel(data[i], data[i + 1], data[i + 2]);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
  }
  await sharp(data, { raw: info })
    .jpeg({ quality: 92, mozjpeg: true })
    .toFile(src + ".tmp");
  fs.renameSync(src + ".tmp", src);
  console.log(`recolored ${f} (backup: ${fs.existsSync(bak) ? "ok" : "MISSING"})`);
}
console.log("done");
