export interface ProductImage {
  id: number;
  src: string;
  name: string;
  alt: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  image?: string;
  parent?: number;
}

export interface ProductAttribute {
  id: number;
  name: string;
  slug: string;
  options: ProductAttributeOption[];
}

export interface ProductAttributeOption {
  id: number;
  name: string;
  slug: string;
  price?: number;
  image?: string | null;
}

export interface ProductVariation {
  id: number;
  name: string;
  price: string;
  regular_price: string;
  sale_price: string;
  stock_status: "instock" | "outofstock";
  attributes: { id: number; name: string; option: string }[];
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: ProductImage[];
  categories: ProductCategory[];
  attributes: ProductAttribute[];
  variations: ProductVariation[];
  stock_status: "instock" | "outofstock";
  average_rating: string;
  rating_count: number;
  on_sale: boolean;
  featured: boolean;
  date_created: string;
}

export interface Category {
  id: number;
  name: string;
  slug: string;
  image: string;
  description: string;
  parent: number;
  count: number;
  subcategories?: Category[];
  pet_type?: "dog" | "cat" | "bird" | "fish" | "small_pets" | "shop";
}

export interface MegaMenuItem {
  label: string;
  label_ar: string;
  slug: string;
  pet_type: string;
  subcategories: {
    label: string;
    label_ar: string;
    slug: string;
    items: { label: string; label_ar: string; slug: string }[];
  }[];
  promo_image?: string;
}

export interface NavItem {
  id: string;
  label: string;
  label_ar: string;
  slug: string;
  image?: string;
  image_alt?: string;
  subcategories: {
    label: string;
    label_ar: string;
    items: { label: string; label_ar: string; slug: string }[];
  }[];
}

export interface CartItem {
  key: string;
  product_id: number;
  variation_id: number;
  quantity: number;
  name: string;
  price: string;
  image: string;
  variation?: string;
}

export interface StoreSettings {
  name: string;
  name_ar: string;
  slogan: string;
  slogan_ar: string;
  logo: string;
  logo_ar: string;
  currency: string;
  currency_symbol: string;
  currency_decimals: number;
  phone: string;
  whatsapp: string;
  email: string;
  instagram: string;
  address: string;
  address_ar: string;
  free_delivery_threshold: number;
  delivery_charge: number;
}

export type ThemeName = "orange";
export type LangCode = "en" | "ar";
export type SortOption = "featured" | "price_asc" | "price_desc" | "newest" | "name_asc" | "name_desc";
export type ViewMode = "grid" | "list";
