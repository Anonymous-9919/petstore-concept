/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("fs");
const html = fs.readFileSync(".firecrawl/petcentral-home.html", "utf8");
// capture href BEFORE the block id
const re = /<a\s+href="([^"]+)"[^>]*id="block-slide_([^"]+)"[\s\S]*?<picture>([\s\S]*?)<\/picture>/g;
let m, i = 0;
while ((m = re.exec(html)) && i < 12) {
  i++;
  const pic = m[3];
  const mobSrc = (pic.match(/srcset="([^"]*mobile[^"]*)"/) || [])[1] || "";
  const deskSrc = (pic.match(/<img[^>]*src="([^"]+)"/) || [])[1] || "";
  const deskName = deskSrc.split("?")[0].split("/").pop();
  console.log(
    "PC" + i,
    "| href:", m[1].replace("https://www.petcentral.ae", ""),
    "| mobFile:", decodeURIComponent(mobSrc.split("?")[0].split("/").pop()) || "(none)",
    "| dskFile:", decodeURIComponent(deskName)
  );
}
console.log("---OUR SLIDES---");
const b = require("../src/data/banners.json");
b.hero_slides.forEach((s, n) =>
  console.log("our" + (n + 1), "| href:", s.href, "| title:", s.title_en.slice(0, 40))
);
