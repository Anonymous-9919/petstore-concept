const sharp = require("sharp");
const fs = require("fs");
const path = require("path");

const ASSETS = "public/assets";
const BACKUP = path.join(ASSETS, "banners-originals-backup");
fs.mkdirSync(BACKUP, { recursive: true });

function shiftWeight(h) {
  if (h <= 55 || h >= 358) return 0;
  if (h < 65) return (h - 55) / 10;
  return 1;
}
function targetHue(h) {
  const t = Math.min(Math.max((h - 60) / 300, 0), 1);
  return 24 + t * 16;
}
function processPixel(r, g, b) {
  const max = Math.max(r, g, b), min = Math.min(r, g, b), d = max - min;
  if (d === 0) return [r, g, b];
  const sat = d / max;
  let h;
  if (max === r) h = (((g - b) / d + 6) % 6) * 60;
  else if (max === g) h = ((b - r) / d + 2) * 60;
  else h = ((r - g) / d + 4) * 60;
  const w = shiftWeight(h);
  if (w === 0) return [r, g, b];
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
  return [Math.round(r2 + m), Math.round(g2 + m), Math.round(b2 + m)];
}

async function recolorCool(file) {
  const src = path.join(ASSETS, file);
  const bak = path.join(BACKUP, file);
  if (!fs.existsSync(bak)) fs.copyFileSync(src, bak); // one-time pristine backup
  const { data, info } = await sharp(bak).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    const [r, g, b] = processPixel(data[i], data[i + 1], data[i + 2]);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
  }
  await sharp(data, { raw: info }).jpeg({ quality: 90, mozjpeg: true }).toFile(src + ".tmp");
  fs.renameSync(src + ".tmp", src);
  console.log("recolored", file);
}

(async () => {
  // 1) all mobile carousel banners
  for (let n = 1; n <= 8; n++) await recolorCool(`hero-slide${n}-mobile-v4.jpg`);
  // 2) slide4 desktop -> lighter: brightness lift on top of cool remap
  const src4 = path.join(ASSETS, "hero-slide4-v3.jpg");
  const bak4 = path.join(BACKUP, "hero-slide4-v2.jpg");
  if (!fs.existsSync(bak4)) fs.copyFileSync(path.join(ASSETS, "hero-slide4-v2.jpg"), bak4);
  const { data, info } = await sharp(bak4).raw().toBuffer({ resolveWithObject: true });
  const ch = info.channels;
  for (let i = 0; i < data.length; i += ch) {
    let [r, g, b] = processPixel(data[i], data[i + 1], data[i + 2]);
    // lift toward light orange: blend 45% toward a light orange base, preserve whites
    r = Math.round(r * 0.55 + 255 * 0.45);
    g = Math.round(g * 0.55 + 213 * 0.45);
    b = Math.round(b * 0.55 + 160 * 0.45);
    data[i] = r; data[i + 1] = g; data[i + 2] = b;
  }
  await sharp(data, { raw: info }).jpeg({ quality: 92, mozjpeg: true }).toFile(src4 + ".tmp");
  fs.renameSync(src4 + ".tmp", src4);
  console.log("slide4 desktop lightened -> hero-slide4-v3.jpg");

  // update banners.json reference for slide4 desktop
  let bj = fs.readFileSync("src/data/banners.json", "utf8");
  if (bj.includes("/assets/hero-slide4-v2.jpg")) {
    bj = bj.split("/assets/hero-slide4-v2.jpg").join("/assets/hero-slide4-v3.jpg");
    fs.writeFileSync("src/data/banners.json", bj);
    console.log("banners.json -> hero-slide4-v3.jpg");
  }
})();
