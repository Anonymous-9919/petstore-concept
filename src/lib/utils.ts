import type { ThemeName, LangCode } from "./types";

export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export function formatPrice(price: string | number, currency = "KD", decimals = 3): string {
  const num = typeof price === "string" ? parseFloat(price) : price;
  if (isNaN(num)) return `${currency} 0.000`;
  return `${currency} ${num.toFixed(decimals)}`;
}

export function calcDiscount(price: number, strikedPrice: number | null): number {
  if (!strikedPrice || strikedPrice <= price) return 0;
  return Math.round(((strikedPrice - price) / strikedPrice) * 100);
}

export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").trim();
}

export function truncate(str: string, len: number): string {
  if (str.length <= len) return str;
  return str.slice(0, len).trim() + "...";
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function getDirection(lang: LangCode): "ltr" | "rtl" {
  return lang === "ar" ? "rtl" : "ltr";
}

export function getDiscountPercent(price: number, salePrice: number | null): number {
  if (!salePrice || salePrice >= price) return 0;
  return Math.round(((price - salePrice) / price) * 100);
}

export function getThemeClass(theme: ThemeName): string {
  return `theme-${theme}`;
}

export function getBestPrice(product: { price: string; regular_price: string; sale_price: string }): string {
  if (product.sale_price && parseFloat(product.sale_price) > 0) return product.sale_price;
  return product.price || product.regular_price;
}

export function getProductImage(product: { images: { src: string; alt: string }[] }): string {
  if (product.images && product.images.length > 0) return product.images[0].src;
  return "/assets/placeholder.png";
}

export function sortProducts<T extends { name: string; price: string; date_created: string; featured: boolean }>(
  products: T[],
  sort: string
): T[] {
  const sorted = [...products];
  switch (sort) {
    case "price_asc":
      return sorted.sort((a, b) => parseFloat(a.price) - parseFloat(b.price));
    case "price_desc":
      return sorted.sort((a, b) => parseFloat(b.price) - parseFloat(a.price));
    case "newest":
      return sorted.sort((a, b) => new Date(b.date_created).getTime() - new Date(a.date_created).getTime());
    case "name_asc":
      return sorted.sort((a, b) => a.name.localeCompare(b.name));
    case "name_desc":
      return sorted.sort((a, b) => b.name.localeCompare(a.name));
    case "featured":
    default:
      return sorted.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
  }
}
