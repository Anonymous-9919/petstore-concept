"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Search,
  ShoppingCart,
  Heart,
  Menu,
  X,
} from "lucide-react";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { NavItem } from "@/lib/types";
import storeData from "@/data/store.json";

let navDataCache: NavItem[] | null = null;

async function loadNavData(): Promise<NavItem[]> {
  if (navDataCache) return navDataCache;
  const mod = await import("@/data/nav-data.json");
  navDataCache = mod.default.nav;
  return navDataCache;
}

const store: any = storeData;

export function Header() {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const cartItems = useCartStore((s) => s.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [navData, setNavData] = useState<NavItem[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    loadNavData().then(setNavData);
  }, []);

  const handleMouseEnter = useCallback((slug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(slug);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
    }, 200);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setMobileOpen(false);
    }
  };

  const activeMegaData = navData.find((m) => m.slug === activeMenu);

  return (
    <>
      <header className="sticky top-0 z-50" style={{ backgroundColor: "var(--color-bg-header)" }}>
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center justify-between h-12 md:h-14 gap-3">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[var(--color-text-inverse)] p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - left side */}
            <Link href="/" className="flex-shrink-0 flex items-center">
              <img
                src={store.logo || "/assets/logo.png"}
                alt={store.name}
                className="h-10 w-auto object-contain"
              />
            </Link>

            {/* Search bar - middle */}
            <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-xl mx-4">
              <div className="flex w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={lang === "ar" ? "ابحث عن المنتجات..." : "Search products, brands..."}
                  className="flex-1 px-4 py-2 rounded-l-lg text-sm text-gray-900 bg-white border-0 focus:outline-none focus:ring-0"
                />
                <button
                  type="submit"
                  className="px-4 py-2 bg-white/20 hover:bg-white/30 text-[var(--color-text-inverse)] rounded-r-lg transition-colors"
                  aria-label="Search"
                >
                  <Search size={18} />
                </button>
              </div>
            </form>

            {/* Actions - right side */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="text-[var(--color-text-inverse)] text-xs font-semibold px-2 py-1 rounded border border-white/30 hover:bg-white/20 transition-colors"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>

              {/* Mobile search */}
              <button
                className="md:hidden text-[var(--color-text-inverse)] p-1"
                aria-label="Search"
                onClick={() => router.push("/search")}
              >
                <Search size={22} />
              </button>

              {/* Wishlist */}
              <Link
                href="/wishlist"
                className="text-[var(--color-text-inverse)] p-1 relative"
                aria-label="Wishlist"
              >
                <Heart size={22} />
              </Link>

              {/* Cart */}
              <Link
                href="/cart"
                className="text-[var(--color-text-inverse)] p-1 relative"
                aria-label="Cart"
              >
                <ShoppingCart size={22} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[var(--color-primary)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Desktop Mega Menu Navigation */}
        {navData.length > 0 && (
          <nav className="hidden md:block border-t border-white/20">
            <div className="max-w-7xl mx-auto px-6">
              <div className="flex items-center gap-0">
                {navData.map((item) => (
                  <div
                    key={item.slug}
                    className="relative group"
                    onMouseEnter={() => handleMouseEnter(item.slug)}
                    onMouseLeave={handleMouseLeave}
                  >
                    <Link
                      href={`/${item.slug}`}
                      className={`flex items-center gap-1 px-3 lg:px-4 py-2.5 text-[var(--color-text-inverse)] text-sm font-medium hover:bg-white/10 transition-all nav-underline`}
                    >
                      {lang === "ar" ? item.label_ar : item.label}
                    </Link>

                    {/* Mega Menu Dropdown - PetCentral style */}
                    {activeMenu === item.slug && activeMegaData && (
                      <div className="absolute left-0 top-full bg-white shadow-xl border border-gray-100 animate-fade-in" style={{ width: "640px" }}>
                        <div className="flex">
                          {/* Subcategories sidebar */}
                          <div className="w-3/5 p-6">
                            <div className="grid grid-cols-3 gap-6">
                              {activeMegaData.subcategories.slice(0, 6).map((sub) => (
                                <div key={sub.label} className="mega-menu-sidebar">
                                  <h4 className="mega-group-title">{lang === "ar" ? sub.label_ar : sub.label}</h4>
                                  <div className="mega-group-items">
                                    {sub.items.map((subItem) => (
                                      <Link
                                        key={subItem.slug}
                                        href={`/category/${subItem.slug}`}
                                        className="mega-group-link"
                                        onClick={() => setActiveMenu(null)}
                                      >
                                        {lang === "ar" ? subItem.label_ar : subItem.label}
                                      </Link>
                                    ))}
                                  </div>
                                </div>
                              ))}
                            </div>
                            <Link
                              href={`/category/${activeMegaData.slug}`}
                              className="mt-4 text-sm font-semibold flex items-center gap-1 transition-colors"
                              style={{ color: "var(--color-primary)" }}
                              onClick={() => setActiveMenu(null)}
                            >
                              {t("home.view_all", lang)} {lang === "ar" ? activeMegaData.label_ar : activeMegaData.label}
                            </Link>
                          </div>

                          {/* Image area */}
                          <div className="w-2/5 flex items-center justify-center p-6 bg-gradient-to-br from-gray-50 to-white">
                            <img
                              src={item.image || "/assets/mega-default.png"}
                              alt={lang === "ar" ? item.label_ar : item.label}
                              className="mega-menu-image"
                              onError={(e) => {
                                (e.target as HTMLImageElement).src = "/assets/placeholder-pet.png";
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </nav>
        )}
      </header>

      {/* Mobile Slide-out Menu */}
      <div className={`fixed inset-0 z-50 md:hidden transition-transform duration-300 ${mobileOpen ? "translate-x-0" : "translate-x-full"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => setMobileOpen(false)} />
        <div className="absolute inset-y-0 right-0 w-80 bg-white shadow-xl overflow-y-auto animate-slide-in-right">
          <div className="p-4">
            <div className="flex items-center justify-between mb-6">
              <h2 className="font-bold text-lg">Menu</h2>
              <button onClick={() => setMobileOpen(false)}>
                <X size={24} />
              </button>
            </div>

            {/* Language toggle in mobile */}
            <div className="flex gap-2 mb-4">
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="text-sm border rounded px-3 py-1 font-semibold flex-1"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>
            </div>

            {/* Mobile menu categories */}
            {navData.map((item) => (
              <div key={item.slug} className="border-b border-gray-100">
                <Link
                  href={`/${item.slug}`}
                  className="block py-3 font-semibold text-gray-800"
                  onClick={() => setMobileOpen(false)}
                >
                  {lang === "ar" ? item.label_ar : item.label}
                </Link>
                {item.subcategories && (
                  <div className="pl-4 pb-2">
                    {item.subcategories.map((sub, subIdx) => (
                      <div key={`${item.slug}-${subIdx}`} className="mb-2">
                        <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                          {lang === "ar" ? sub.label_ar : sub.label}
                        </div>
                        {sub.items.map((subItem) => (
                          <Link
                            key={subItem.slug}
                            href={`/category/${subItem.slug}`}
                            className="block py-1 text-sm text-gray-600 hover:text-orange-600"
                            onClick={() => setMobileOpen(false)}
                          >
                            {lang === "ar" ? subItem.label_ar : subItem.label}
                          </Link>
                        ))}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
