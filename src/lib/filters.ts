import type { Product } from "./types";

export interface FilterState {
  pets: string[];
  cats: string[];
  brands: string[];
  lifestage: string[];
  avail: string[]; // "in" | "out"
  onSale: boolean;
  priceMin: number | null;
  priceMax: number | null;
  sort: string;
}

export const emptyFilters = (): FilterState => ({
  pets: [], cats: [], brands: [], lifestage: [], avail: [],
  onSale: false, priceMin: null, priceMax: null, sort: "featured",
});

export function bestPriceOf(p: Product): number {
  return parseFloat(p.sale_price || p.price || "0") || 0;
}
export function regularPriceOf(p: Product): number {
  return parseFloat(p.regular_price || "0") || 0;
}

const hasCat = (p: Product, slug: string) => (p.categories || []).some((c) => c.slug === slug);

const PET_GROUPS: Record<string, string[]> = {
  dog: ["dog-dry-food", "dog-wet-food", "dog-treats", "dog-toys", "dog-accessories", "dog-freeze-dried-food"],
  cat: ["cat-dry-food", "cat-wet-food", "cat-treats", "cat-toys", "cat-accessories", "cat-litter-and-boxes", "cat-scratchers"],
  bird: ["bird-food", "bird-toys", "bird-cage", "bird-needs-accessories"],
  fish: ["fish-food", "fish-needs-accessories"],
  rabbit: ["rabbit-needs-accessories"],
  hamster: ["hamster-needs-accessories"],
  reptile: ["reptile-food", "reptile-needs-accessories"],
};

function petOf(p: Product): string | null {
  for (const [pet, slugs] of Object.entries(PET_GROUPS)) {
    if ((p.categories || []).some((c) => slugs.includes(c.slug))) return pet;
  }
  return null;
}

const KNOWN_BRANDS = new Set([
  "Bioline", "Moochie", "Petiva", "Padovan", "Nandog", "Petbite", "Protein",
  "Haisenpet", "Dubba", "Optimanova", "Amanova", "Hillbons", "Kitty", "Protien",
]);

export function brandOf(p: Product): string | null {
  const w = (p.name || "").split(" ")[0];
  return KNOWN_BRANDS.has(w) ? w : null;
}

function lifestageOf(p: Product): string[] {
  const n = (p.name || "").toLowerCase();
  const out: string[] = [];
  if (n.includes("puppy")) out.push("puppy");
  if (n.includes("kitten")) out.push("kitten");
  if (n.includes("adult")) out.push("adult");
  if (n.includes("senior")) out.push("senior");
  return out;
}

interface FacetGroup {
  key: "pets" | "cats" | "brands" | "lifestage" | "avail";
  title_en: string;
  title_ar: string;
  options: { value: string; label_en: string; label_ar: string; count: number }[];
}

const AR_PET: Record<string, string> = { dog: "كلب", cat: "قطة", bird: "طائر", fish: "سمكة", rabbit: "أرنب", hamster: "هامستر", reptile: "زواحف" };
const AR_LIFE: Record<string, string> = { puppy: "جرو", kitten: "قط صغير", adult: "بالغ", senior: "مسنّ" };
const AR_BRAND: Record<string, string> = {};

export function buildFacets(items: Product[]): FacetGroup[] {
  const countBy = (fn: (p: Product) => string[]) => {
    const m = new Map<string, number>();
    items.forEach((p) => {
      const vals = fn(p);
      if (Array.isArray(vals)) {
        vals.forEach((v) => m.set(v, (m.get(v) || 0) + 1));
      } else if (typeof vals === "string" && vals) {
        m.set(vals, (m.get(vals) || 0) + 1);
      }
    });
    return m;
  };

  const pets = countBy((p) => { const v = petOf(p); return v ? [v] : []; });
  const cats = countBy((p) => (p.categories || []).map((c) => c.name));
  const catSlugMap = new Map<string, string>();
  items.forEach((p) => (p.categories || []).forEach((c) => catSlugMap.set(c.name, c.slug)));
  const brands = countBy((p) => { const b = brandOf(p); return b ? [b] : []; });
  const life = countBy(lifestageOf);
  const stockIn = items.filter((p) => p.stock_status !== "outofstock").length;

  const toOpts = (m: Map<string, number>, ar?: Record<string, string>) =>
    [...m.entries()].sort((a, b) => b[1] - a[1]).map(([v, count]) => ({
      value: v, label_en: v, label_ar: (ar && ar[v]) || v, count,
    }));

  const groups: FacetGroup[] = [];
  if (pets.size > 1) groups.push({ key: "pets", title_en: "Pet", title_ar: "الحيوان", options: toOpts(pets, AR_PET) });
  groups.push({ key: "cats", title_en: "Category", title_ar: "الفئة", options: toOpts(cats).map(o => ({ ...o, value: catSlugMap.get(o.value) || o.value })) });
  if (brands.size > 1) groups.push({ key: "brands", title_en: "Brand", title_ar: "العلامة التجارية", options: toOpts(brands, AR_BRAND) });
  if (life.size > 0) groups.push({ key: "lifestage", title_en: "Lifestage", title_ar: "المرحلة العمرية", options: toOpts(life, AR_LIFE) });
  if (stockIn !== items.length && stockIn > 0)
    groups.push({ key: "avail", title_en: "Availability", title_ar: "التوفر", options: [
      { value: "in", label_en: "In stock", label_ar: "متوفر", count: stockIn },
      { value: "out", label_en: "Out of stock", label_ar: "غير متوفر", count: items.length - stockIn },
    ]});
  return groups;
}

export function priceBounds(items: Product[]): [number, number] {
  let min = Infinity, max = 0;
  items.forEach((p) => {
    const v = bestPriceOf(p);
    if (v > 0) { min = Math.min(min, v); max = Math.max(max, v); }
  });
  return [Number.isFinite(min) ? Math.floor(min * 100) / 100 : 0, max];
}

export function applyFilters(items: Product[], f: FilterState): Product[] {
  let out = items.filter((p) => {
    if (f.pets.length && !f.pets.includes(petOf(p) || "")) return false;
    if (f.cats.length && !(p.categories || []).some((c) => f.cats.includes(c.slug))) return false;
    if (f.brands.length && !f.brands.includes(brandOf(p) || "")) return false;
    if (f.lifestage.length) {
      const ls = lifestageOf(p);
      if (!f.lifestage.some((l) => ls.includes(l))) return false;
    }
    if (f.avail.length === 1) {
      const isInStock = p.stock_status !== "outofstock";
      if (f.avail[0] === "in" && !isInStock) return false;
      if (f.avail[0] === "out" && isInStock) return false;
    }
    if (f.onSale) {
      const reg = regularPriceOf(p), sale = bestPriceOf(p);
      if (!(reg > sale)) return false;
    }
    const v = bestPriceOf(p);
    if (f.priceMin != null && v < f.priceMin) return false;
    if (f.priceMax != null && v > f.priceMax) return false;
    return true;
  });

  switch (f.sort) {
    case "price-asc": out = [...out].sort((a, b) => bestPriceOf(a) - bestPriceOf(b)); break;
    case "price-desc": out = [...out].sort((a, b) => bestPriceOf(b) - bestPriceOf(a)); break;
    case "az": out = [...out].sort((a, b) => a.name.localeCompare(b.name)); break;
    case "za": out = [...out].sort((a, b) => b.name.localeCompare(a.name)); break;
    case "discount":
      out = [...out].sort((a, b) => {
        const da = regularPriceOf(a) ? 1 - bestPriceOf(a) / regularPriceOf(a) : 0;
        const db = regularPriceOf(b) ? 1 - bestPriceOf(b) / regularPriceOf(b) : 0;
        return db - da;
      });
      break;
    default: break; // featured = original order
  }
  return out;
}

export const SORT_OPTIONS = [
  { value: "featured", en: "Featured", ar: "مميز" },
  { value: "discount", en: "Biggest discount", ar: "أكبر خصم" },
  { value: "price-asc", en: "Price, low to high", ar: "السعر: من الأقل" },
  { value: "price-desc", en: "Price, high to low", ar: "السعر: من الأعلى" },
  { value: "az", en: "Alphabetically, A-Z", ar: "أبجدياً A-Z" },
  { value: "za", en: "Alphabetically, Z-A", ar: "أبجدياً Z-A" },
];
