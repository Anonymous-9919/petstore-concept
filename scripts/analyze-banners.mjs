import sharp from "sharp";
import path from "path";

const files = [
  "pc-promo-banner.jpg", "pc-promo-banner-mobile.jpg",
  "promo-stella.jpg", "promo-stella-mobile.jpg",
  "promo-royalcanin.jpg", "promo-royalcanin-mobile.jpg",
  "age-puppy-dog.jpg", "age-puppy-dog-mobile.jpg",
  "age-adult-dog.jpg", "age-adult-dog-mobile.jpg",
  "age-senior-dog.jpg", "age-senior-dog-mobile.jpg",
  "age-kitten-cat.jpg", "age-kitten-cat-mobile.jpg",
  "age-adult-cat.jpg", "age-adult-cat-mobile.jpg",
  "age-senior-cat.jpg", "age-senior-cat-mobile.jpg",
  "accessory-dogbeds.jpg", "accessory-dogbeds-mobile.jpg",
  "accessory-essentials.jpg", "accessory-essentials-mobile.jpg",
];

const ASSETS = path.join(process.cwd(), "public", "assets");

function rgbToHue(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b);
  const d = max - min;
  if (d === 0) return { hue: -1, sat: 0, light: max / 255 };
  const sat = d / max;
  let h;
  if (max === r) h = ((g - b) / d + 6) % 6;
  else if (max === g) h = (b - r) / d + 2;
  else h = (r - g) / d + 4;
  return { hue: h * 60, sat, light: max / 255 };
}

for (const f of files) {
  try {
    const { data, info } = await sharp(path.join(ASSETS, f))
      .resize(200, 200, { fit: "inside" })
      .raw()
      .toBuffer({ resolveWithObject: true });
    const ch = info.channels;
    let total = 0, cool = 0;
    // buckets: purple(250-320), blue(190-250), orange(15-45)
    let purple = 0, blue = 0, orange = 0;
    for (let i = 0; i < data.length; i += ch) {
      total++;
      const { hue, sat } = rgbToHue(data[i], data[i + 1], data[i + 2]);
      if (hue < 0 || sat < 0.18) continue;
      if (hue >= 250 && hue <= 330) purple++;
      else if (hue >= 185 && hue < 250) blue++;
      else if (hue >= 15 && hue <= 45) orange++;
    }
    const pct = (n) => ((n / total) * 100).toFixed(1).padStart(5);
    console.log(`${f.padEnd(34)} purple:${pct(purple)}%  blue:${pct(blue)}%  orange:${pct(orange)}%`);
  } catch (e) {
    console.log(`${f.padEnd(34)} MISSING/SKIP (${e.message.slice(0, 40)})`);
  }
}
