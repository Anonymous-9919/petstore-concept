import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { CartItem, ThemeName, LangCode } from "./types";

// --- Theme Store ---
interface ThemeState {
  theme: ThemeName;
  setTheme: (theme: ThemeName) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: "orange",
      setTheme: (theme) => set({ theme }),
    }),
    { name: "petstore-theme" }
  )
);

// --- Language Store ---
interface LanguageState {
  lang: LangCode;
  setLang: (lang: LangCode) => void;
}

export const useLanguageStore = create<LanguageState>()(
  persist(
    (set) => ({
      lang: "en",
      setLang: (lang) => set({ lang }),
    }),
    { name: "petstore-lang" }
  )
);

// --- Cart Store ---
interface CartState {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (key: string) => void;
  updateQuantity: (key: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: () => number;
  totalPrice: () => number;
}

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) =>
        set((state) => {
          const existing = state.items.find((i) => i.key === item.key);
          if (existing) {
            return {
              items: state.items.map((i) =>
                i.key === item.key ? { ...i, quantity: i.quantity + item.quantity } : i
              ),
            };
          }
          return { items: [...state.items, item] };
        }),
      removeItem: (key) =>
        set((state) => ({ items: state.items.filter((i) => i.key !== key) })),
      updateQuantity: (key, quantity) =>
        set((state) => ({
          items:
            quantity <= 0
              ? state.items.filter((i) => i.key !== key)
              : state.items.map((i) => (i.key === key ? { ...i, quantity } : i)),
        })),
      clearCart: () => set({ items: [] }),
      totalItems: () => get().items.reduce((sum, item) => sum + item.quantity, 0),
      totalPrice: () =>
        get().items.reduce((sum, item) => sum + parseFloat(item.price) * item.quantity, 0),
    }),
    { name: "petstore-cart" }
  )
);

// --- Wishlist Store ---
interface WishlistState {
  productIds: number[];
  addItem: (id: number) => void;
  removeItem: (id: number) => void;
  isInWishlist: (id: number) => boolean;
}

export const useWishlistStore = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      addItem: (id) =>
        set((state) => ({
          productIds: state.productIds.includes(id)
            ? state.productIds
            : [...state.productIds, id],
        })),
      removeItem: (id) =>
        set((state) => ({
          productIds: state.productIds.filter((pid) => pid !== id),
        })),
      isInWishlist: (id) => get().productIds.includes(id),
    }),
    { name: "petstore-wishlist" }
  )
);
