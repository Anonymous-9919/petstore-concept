import sharp from "sharp";
import fs from "fs";
import path from "path";

const ASSETS = path.join(process.cwd(), "public", "assets");

// Age-group banners still carrying light purple backgrounds
const files = [
  "age-puppy-dog.jpg", "age-puppy-dog-mobile.jpg",
  "age-adult-dog.jpg", "age-adult-dog-mobile.jpg",
  "age-senior-dog.jpg", "age-senior-dog-mobile.jpg",
  "age-kitten-cat.jpg", "age-kitten-cat-mobile.jpg",
  "age-adult-cat.jpg", "age-adult-cat-mobile.jpg",
  "age-senior-cat.jpg", "age-senior-cat-mobile.jpg",
];

// ---- selective purple->light-orange hue remap ------------------------------
function shiftWeight(hue) {
  if (hue <= 222 || hue >= 338) return 0;
  if (hue < 242) return (hue - 222) / 20;        // 222..242 ramp in
  if (hue <= 315) return 1;                       // full violet/purple band
  return 1 - (hue - 315) / 23;                    // 315..338 ramp out
}
function targetHue(hue) {
  const t = Math.min(Math.max((hue - 222) / 116, 0), 1);
  return 26 + t * 12;                             // all purples -> 26..38 deg
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

  // catch pastel/light purples too: low saturation ramp (protects true neutrals)
  const sw = w * Math.min(sat / 0.05, 1);
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

for (const f of files) {
  const src = path.join(ASSETS, f);
  if (!fs.existsSync(src)) { console.log(`SKIP missing ${f}`); continue; }

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
  console.log(`recolored ${f}`);
}
console.log("done");
