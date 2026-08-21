import type { Product } from "./types";

export interface CollectionDef {
  title_en: string;
  title_ar: string;
  /** returns true when a product belongs in this collection */
  match: (p: Product) => boolean;
}

const hasCat = (p: Product, slug: string) =>
  (p.categories || []).some((c) => c.slug === slug);

const nameHas = (p: Product, ...words: string[]) => {
  const n = (p.name || "").toLowerCase();
  return words.some((w) => n.includes(w));
};

/**
 * Banner-driven collections. Every banner slug resolves here to a real,
 * populated product set. Unknown slugs fall back to search redirect.
 */
export const COLLECTIONS: Record<string, CollectionDef> = {
  // ---- brand banners -> closest real product sets -------------------------
  nulo: {
    title_en: "Premium Dry Food",
    title_ar: "أغذية جافة فاخرة",
    match: (p) => hasCat(p, "dog-dry-food") || hasCat(p, "cat-dry-food"),
  },
  inaba: {
    title_en: "Cat Wet Food & Treats",
    title_ar: "أغذية قطط رطبة ومكافآت",
    match: (p) => hasCat(p, "cat-wet-food") || hasCat(p, "cat-treats"),
  },
  intersand: {
    title_en: "Litter & Boxes",
    title_ar: "رمل القطط والصناديق",
    match: (p) => hasCat(p, "cat-litter-and-boxes"),
  },
  "stella-chewys": {
    title_en: "Dog Treats",
    title_ar: "مكافآت الكلاب",
    match: (p) => hasCat(p, "dog-treats"),
  },
  "royal-canin": {
    title_en: "Dry Food Collection",
    title_ar: "تشكيلة الأغذية الجافة",
    match: (p) => hasCat(p, "dog-dry-food") || hasCat(p, "cat-dry-food"),
  },
  primal: {
    title_en: "Cat Dry Food",
    title_ar: "أغذية القطط الجافة",
    match: (p) => hasCat(p, "cat-dry-food"),
  },

  // ---- age-group banners ---------------------------------------------------
  "puppy-dog-food": {
    title_en: "Puppy Food",
    title_ar: "طعام الجراء",
    match: (p) => nameHas(p, "puppy") && (hasCat(p, "dog-dry-food") || hasCat(p, "dog-wet-food")),
  },
  "adult-dog-food": {
    title_en: "Adult Dog Food",
    title_ar: "طعام الكلاب البالغة",
    match: (p) => nameHas(p, "adult") && (hasCat(p, "dog-dry-food") || hasCat(p, "dog-wet-food")),
  },
  "senior-dog-food": {
    title_en: "Dog Food",
    title_ar: "طعام الكلاب",
    match: (p) => hasCat(p, "dog-dry-food") || hasCat(p, "dog-wet-food"),
  },
  "kitten-cat-food": {
    title_en: "Kitten Food",
    title_ar: "طعام القطط الصغيرة",
    match: (p) => nameHas(p, "kitten") && (hasCat(p, "cat-dry-food") || hasCat(p, "cat-wet-food")),
  },
  "adult-cat-food": {
    title_en: "Adult Cat Food",
    title_ar: "طعام القطط البالغة",
    match: (p) => nameHas(p, "adult") && (hasCat(p, "cat-dry-food") || hasCat(p, "cat-wet-food")),
  },
  "senior-cat-food": {
    title_en: "Cat Food",
    title_ar: "طعام القطط",
    match: (p) => hasCat(p, "cat-dry-food") || hasCat(p, "cat-wet-food"),
  },

  // ---- accessory banners ----------------------------------------------------
  "dog-beds": {
    title_en: "Pet Beds & Houses",
    title_ar: "أسرّة ومنازل الحيوانات",
    match: (p) => hasCat(p, "pet-beds-houses"),
  },
  "dog-supplies": {
    title_en: "Dog Accessories",
    title_ar: "إكسسوارات الكلاب",
    match: (p) => hasCat(p, "dog-accessories"),
  },
};

export function getCollectionProducts(
  products: Product[],
  slug: string
): { def?: CollectionDef; items: Product[] } {
  const def = COLLECTIONS[slug];
  if (!def) return { items: [] };
  return { def, items: products.filter(def.match) };
}
