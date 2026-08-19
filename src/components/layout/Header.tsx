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
  Phone,
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
      <header className="site-header">
        {/* Main Header Row - Orange bg with logo, search, icons */}
        <div className="page-container">
          <div className="header-main">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - left side */}
            <Link href="/" className="header-logo">
              <span className="header-logo-text">PET STORE</span>
            </Link>

            {/* Search bar - center, pill-shaped */}
            <form onSubmit={handleSearch} className="header-search hidden md:block relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={lang === "ar" ? "ابحث عن المنتجات..." : "Search......."}
              />
              <button type="submit" aria-label="Search">
                <Search size={20} />
              </button>
            </form>

            {/* Actions - right side */}
            <div className="header-actions">
              {/* Language toggle */}
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="text-xs font-semibold px-2 py-1 rounded border border-white/30 text-white hover:bg-white/20 transition-colors"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>

              {/* Mobile search */}
              <button
                className="md:hidden header-action-btn"
                aria-label="Search"
                onClick={() => router.push("/search")}
              >
                <Search size={20} />
              </button>

              {/* Wishlist */}
              <Link href="/wishlist" className="header-action-btn" aria-label="Wishlist">
                <Heart size={20} />
              </Link>

              {/* Cart */}
              <Link href="/cart" className="header-action-btn relative" aria-label="Cart">
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[var(--color-primary)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>

              {/* Phone - desktop */}
              <a href="tel:+96598805010" className="header-phone hidden lg:flex">
                <Phone size={16} />
                <span>{store.phone}</span>
              </a>
            </div>
          </div>
        </div>

        {/* Navigation Bar - Same orange bg, white text, hidden on mobile */}
        <div className="nav-bar hidden md:block">
          <div className="nav-bar-inner">
            <div className="nav-items">
              {navData.map((item) => (
                <div
                  key={item.slug}
                  className="relative h-full"
                  onMouseEnter={() => handleMouseEnter(item.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={`/${item.slug}`}
                    className="nav-item"
                  >
                    {lang === "ar" ? item.label_ar : item.label}
                  </Link>

                  {/* Mega Menu Dropdown - PetCentral pixel-perfect */}
                  {activeMenu === item.slug && activeMegaData && (
                    <div className="mega-menu">
                      <div className="mega-menu-inner">
                        {/* 4/5 columns area */}
                        <div className="mega-menu-columns">
                          {activeMegaData.subcategories.slice(0, 4).map((sub) => (
                            <div key={sub.label} className="mega-menu-col">
                              <Link
                                href={`/category/${sub.items[0]?.slug || activeMegaData.slug}`}
                                className="mega-menu-col-title"
                                onClick={() => setActiveMenu(null)}
                              >
                                {lang === "ar" ? sub.label_ar : sub.label}
                              </Link>
                              <ul>
                                {sub.items.map((subItem) => (
                                  <li key={subItem.slug}>
                                    <Link
                                      href={`/category/${subItem.slug}`}
                                      onClick={() => setActiveMenu(null)}
                                    >
                                      {lang === "ar" ? subItem.label_ar : subItem.label}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ))}
                        </div>

                        {/* 1/5 image area */}
                          <div className="mega-menu-image">
                            <img
                              src={item.image || `/assets/mega-${item.id}.png`}
                              alt={lang === "ar" ? item.label_ar : item.label}
                            />
                          <Link
                            href={`/category/${activeMegaData.slug}`}
                            className="mega-shop-now"
                            onClick={() => setActiveMenu(null)}
                          >
                            {t("general.shop_now", lang)}!
                          </Link>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}

              {/* Extra nav items */}
              <Link href="/category" className="nav-item">
                {lang === "ar" ? "تسوق حسب البراند" : "Shop by brand"}
              </Link>
              <Link href="/category" className="nav-item">
                {lang === "ar" ? "الأكثر مبيعاً" : "Best sellers"}
              </Link>
            </div>
          </div>
        </div>
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
