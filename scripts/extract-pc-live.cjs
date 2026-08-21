const fs = require("fs");
const html = fs.readFileSync(".firecrawl/petcentral-home-live.html", "utf8");
const re = /<a\s+href="([^"]+)"[^>]*id="block-slide_([^"]+)"[\s\S]*?<picture>([\s\S]*?)<\/picture>/g;
let m, i = 0;
while ((m = re.exec(html)) && i < 14) {
  i++;
  const pic = m[3];
  const mobSrc = (pic.match(/srcset="([^"]*mobile[^"]*)"/) || [])[1] || "";
  const deskSrc = (pic.match(/<img[^>]*src="([^"]+)"/) || [])[1] || "";
  console.log(
    "LIVE" + i,
    "| href:", m[1].replace("https://www.petcentral.ae", ""),
    "| mob:", decodeURIComponent(mobSrc.split("?")[0].split("/").pop()) || "(none)",
    "| dsk:", decodeURIComponent(deskSrc.split("?")[0].split("/").pop())
  );
}
