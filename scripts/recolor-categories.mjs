import sharp from "sharp";
import fs from "fs";
import path from "path";

const ASSETS = path.join(process.cwd(), "public", "assets");
const BACKUP = path.join(ASSETS, "banners-originals-backup");

// Explore Pet Food Categories tiles - purple tint -> brand orange
const files = [
  "cat-dog-food.png",
  "cat-dog-treats.png",
  "cat-cat-food.png",
  "cat-cat-treats.png",
  "cat-cat-litter.png",
  "cat-offers.png",
];

// ---- selective purple/magenta -> orange hue remap --------------------------
function shiftWeight(hue) {
  if (hue <= 222 || hue >= 358) return 0;
  if (hue < 240) return (hue - 222) / 18;        // 222..240 ramp in
  return 1;                                       // full violet/purple/magenta band
}
function targetHue(hue) {
  const t = Math.min(Math.max((hue - 222) / 136, 0), 1);
  return 26 + t * 12;                             // -> 26..38 deg
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

  const sw = w * Math.min(sat / 0.03, 1);         // catch pastels, protect neutrals
  if (sw <= 0) return [r, g, b];
  const h2 = h + (targetHue(h) - h) * sw;

  const hn = ((h2 % 360) + 360) % 360 / 60;
  const c = sat * max;
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
  if (!fs.existsSync(bak)) fs.copyFileSync(src, bak);
  // always process from the pristine backup so repeated runs never double-shift
  const input = bak;

  const { data, info } = await sharp(input).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const [r, g, b] = processPixel(data[i], data[i + 1], data[i + 2]);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
  }
  await sharp(data, { raw: info }).png().toFile(src + ".tmp");
  fs.renameSync(src + ".tmp", src);
  console.log(`recolored ${f} (channels: ${ch})`);
}
console.log("done");
