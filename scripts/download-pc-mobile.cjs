/* eslint-disable @typescript-eslint/no-require-imports */
const { execSync } = require("child_process");
const files = {
  1: "nulo_summer_sale_mobile_banner-_final_jpg_1171x.jpg?v=1781013986",
  2: "Inaba_back_in_stock_Petcentral_mobile-_final_jpg_1171x.jpg?v=1780558606",
  3: "nulo_mobile-_Banners_final_jpg_1171x.jpg?v=1780668441",
  4: "Petcentral_3_mobile-_Banners_final_jpg_1171x.jpg?v=1780668441",
  6: "Petcentral_2_mobile-_Banners_final_jpg_1171x.jpg?v=1780668441",
  7: "royal_canine__mobile-_Banners_final_jpg_1171x.jpg?v=1780668440",
};
Object.entries(files).forEach(([n, f]) => {
  const url = "https://www.petcentral.ae/cdn/shop/files/" + encodeURI(f);
  const out = "public/assets/hero-slide" + n + "-mobile-v4.jpg";
  const ps = "Invoke-WebRequest -Uri '" + url + "' -UseBasicParsing -OutFile '" + out + "'";
  execSync("powershell -Command \"" + ps.replace(/'/g, "\\\"") + "\"", { stdio: "inherit", timeout: 90000 });
  console.log("downloaded slide" + n);
});
