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
  User,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";
import { useUiStore } from "@/lib/ui-store";
import { CartDrawer } from "@/components/cart/CartDrawer";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import type { NavItem } from "@/lib/types";

type MenuView =
  | { type: "root" }
  | { type: "cat"; slug: string }
  | { type: "sub"; slug: string; subIdx: number };
import storeData from "@/data/store.json";

let navDataCache: NavItem[] | null = null;

async function loadNavData(): Promise<NavItem[]> {
  if (navDataCache) return navDataCache;
  const mod = await import("@/data/nav-data.json");
  navDataCache = mod.default.nav;
  return navDataCache;
}

const store = storeData;

export function Header() {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const cartItems = useCartStore((s) => s.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);
  const router = useRouter();

  const [mobileOpen, setMobileOpen] = useState(false);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const [menuStack, setMenuStack] = useState<MenuView[]>([{ type: "root" }]);
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

  const handleMouseEnterWithMenu = useCallback(() => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
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
            {/* Mobile menu toggle - left corner */}
            <button
              className="md:hidden p-2 text-white"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo - center on mobile, left on desktop */}
            <Link href="/" className="header-logo">
              <img src="/assets/logo-v3.png" alt="Pet Store" className="header-logo-img" />
            </Link>

            {/* Search bar - center, pill-shaped, hidden on mobile */}
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
              {/* Language toggle - hidden on mobile */}
              <button
                onClick={() => setLang(lang === "en" ? "ar" : "en")}
                className="hidden md:inline-flex text-xs font-semibold px-2 py-1 rounded border border-white/30 text-white hover:bg-white/20 transition-colors"
              >
                {lang === "en" ? "عربي" : "EN"}
              </button>

              {/* Wishlist - desktop + mobile */}
              <Link href="/wishlist" className="flex items-center justify-center header-action-btn" aria-label="Wishlist">
                <Heart size={20} />
              </Link>

              {/* Account */}
              <Link href="/account" className="flex items-center justify-center header-action-btn" aria-label="Account">
                <User size={20} />
              </Link>

              {/* Cart - opens the side drawer (source-site UX) */}
              <button
                onClick={() => setCartOpen(true)}
                className="flex items-center justify-center header-action-btn relative"
                aria-label="Cart"
              >
                <ShoppingCart size={20} />
                {totalItems > 0 && (
                  <span className="absolute -top-1 -right-1 bg-white text-[var(--color-primary)] text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </button>

              {/* Phone - desktop (REMOVED) */}

            </div>
          </div>

          {/* Mobile search - full width search bar below header row on mobile (PetCentral .opened-search) */}
          <div className="md:hidden mobile-search-bar">
            <form onSubmit={handleSearch} className="header-search relative">
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
          </div>
        </div>

        {/* Navigation Bar - hidden on mobile */}
        <div className="nav-bar hidden md:block">
          <div className="nav-bar-inner">
            <div className="nav-items">
              {navData.map((item) => (
                <div
                  key={item.slug}
                  className="nav-item-wrapper"
                  onMouseEnter={() => handleMouseEnter(item.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <Link
                    href={item.href || `/${item.slug}`}
                    className="nav-item"
                  >
                    {lang === "ar" ? item.label_ar : item.label}
                  </Link>
                </div>
              ))}

              {/* Extra nav items */}
              <div className="nav-item-wrapper">
                <Link href="/category" className="nav-item">
                  {lang === "ar" ? "تسوق حسب الفئة" : "Shop by Category"}
                </Link>
              </div>
              <div className="nav-item-wrapper">
                <Link href="/best-sellers" className="nav-item">
                  {lang === "ar" ? "الأكثر مبيعاً" : "Best sellers"}
                </Link>
              </div>
            </div>

            {/* Phone number on nav bar - right side on desktop.
                dir=ltr so the number reads correctly in Arabic RTL mode */}
            <a href="tel:+96598805010" className="nav-phone">
              <Phone size={14} />
              <span dir="ltr" style={{ display: "inline-block", unicodeBidi: "isolate" }}>
                {store.phone}
              </span>
            </a>
          </div>

          {/* Mega Menu - positioned relative to .nav-bar (full width) */}
          {activeMenu && activeMegaData && (
            <div
              className="mega-menu"
              onMouseEnter={handleMouseEnterWithMenu}
              onMouseLeave={handleMouseLeave}
            >
              <div className="mega-menu-inner">
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

                <div className="mega-menu-image">
                  <img
                    src={activeMegaData.image || `/assets/mega-${activeMegaData.id}.png`}
                    alt={lang === "ar" ? activeMegaData.label_ar : activeMegaData.label}
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
      </header>

      {/* Side cart drawer - source-site UX */}
      <CartDrawer />

      {/* Mobile Slide-out Menu - PetCentral-style drill-down drawer.
          Opens from the LEFT in English (LTR), from the RIGHT in Arabic (RTL) */}
      <div className={`fixed inset-0 z-50 md:hidden transition-opacity duration-300 ${mobileOpen ? "opacity-100" : "opacity-0 pointer-events-none"}`}>
        <div className="absolute inset-0 bg-black/50" onClick={() => { setMobileOpen(false); setMenuStack([{ type: "root" }]); }} />
        <div
          className={`absolute inset-y-0 w-[85%] max-w-[360px] bg-[#fdf9fe] shadow-xl overflow-hidden flex flex-col ${lang === "ar" ? "right-0" : "left-0"}`}
        >
          {/* Drawer header */}
          <div className="flex items-center justify-between px-5 h-14 border-b border-black/5">
            <span className="font-bold text-[15px] text-gray-900">{lang === "ar" ? "القائمة" : "Menu"}</span>
            <button
              onClick={() => { setMobileOpen(false); setMenuStack([{ type: "root" }]); }}
              aria-label="Close menu"
            >
              <X size={22} />
            </button>
          </div>

          {/* Sliding panels */}
          <div className="flex-1 relative overflow-hidden">
            <div
              className="absolute inset-0 flex transition-transform duration-300 ease-out"
              style={{ width: `${menuStack.length * 100}%`, transform: `translateX(${lang === "ar" ? "" : "-"}${(menuStack.length - 1) * (100 / menuStack.length)}%)` }}
              dir={undefined}
            >
              {menuStack.map((view, depth) => (
                <div key={depth} className="w-full h-full overflow-y-auto" style={{ width: `${100 / menuStack.length}%` }}>
                  {/* ROOT */}
                  {view.type === "root" && (
                    <div className="py-2">
                      {navData.map((item) => (
                        <button
                          key={item.slug}
                          className="mobile-menu-row strong"
                          onClick={() => setMenuStack([...menuStack, { type: "cat", slug: item.slug }])}
                        >
                          <span>{lang === "ar" ? item.label_ar : item.label}</span>
                          <ChevronRight size={18} className="text-gray-400 rtl:rotate-180" />
                        </button>
                      ))}
                      <Link href="/category" className="mobile-menu-row body2" onClick={() => { setMobileOpen(false); }}>
                        <span>{lang === "ar" ? "تسوق حسب الفئة" : "Shop by Category"}</span>
                        <ChevronRight size={18} className="text-gray-400 rtl:rotate-180" />
                      </Link>
                      <Link href="/category" className="mobile-menu-row body2" onClick={() => { setMobileOpen(false); }}>
                        <span>{lang === "ar" ? "الأكثر مبيعاً" : "Best sellers"}</span>
                        <ChevronRight size={18} className="text-gray-400 rtl:rotate-180" />
                      </Link>

                      {/* Language toggle */}
                      <div className="px-5 pt-6">
                        <button
                          onClick={() => setLang(lang === "en" ? "ar" : "en")}
                          className="w-full text-sm border border-black/10 rounded-lg px-3 py-2.5 font-semibold"
                        >
                          {lang === "en" ? "العربية" : "English"}
                        </button>
                      </div>
                    </div>
                  )}

                  {/* CATEGORY LEVEL */}
                  {view.type === "cat" && (() => {
                    const cat = navData.find((c) => c.slug === view.slug);
                    if (!cat) return null;
                    return (
                      <div>
                        <button className="mobile-menu-back" onClick={() => setMenuStack(menuStack.slice(0, -1))}>
                          <ChevronLeft size={18} className="rtl:rotate-180" />
                          <span>{lang === "ar" ? "القائمة" : "Menu"}</span>
                        </button>
                        <div className="px-5 pt-4 pb-2">
                          <h3 className="text-[19px] font-bold text-gray-900">{lang === "ar" ? cat.label_ar : cat.label}</h3>
                        </div>
                        {(cat.subcategories || []).map((sub, idx) => (
                          <button
                            key={idx}
                            className="mobile-menu-row body2"
                            onClick={() => setMenuStack([...menuStack, { type: "sub", slug: cat.slug, subIdx: idx }])}
                          >
                            <span>{lang === "ar" ? sub.label_ar : sub.label}</span>
                            <ChevronRight size={18} className="text-gray-400 rtl:rotate-180" />
                          </button>
                        ))}
                      </div>
                    );
                  })()}

                  {/* SUBCATEGORY LEVEL */}
                  {view.type === "sub" && (() => {
                    const cat = navData.find((c) => c.slug === view.slug);
                    const sub = cat?.subcategories?.[view.subIdx];
                    if (!cat || !sub) return null;
                    return (
                      <div>
                        <button className="mobile-menu-back" onClick={() => setMenuStack(menuStack.slice(0, -1))}>
                          <ChevronLeft size={18} className="rtl:rotate-180" />
                          <span>{lang === "ar" ? cat.label_ar : cat.label}</span>
                        </button>
                        <div className="px-5 pt-4 pb-2">
                          <h3 className="text-[19px] font-bold text-gray-900">{lang === "ar" ? sub.label_ar : sub.label}</h3>
                        </div>
                        {sub.items.map((subItem) => (
                          <Link
                            key={subItem.slug}
                            href={`/category/${subItem.slug}`}
                            className="mobile-menu-row body2"
                            onClick={() => { setMobileOpen(false); setMenuStack([{ type: "root" }]); }}
                          >
                            <span>{lang === "ar" ? subItem.label_ar : subItem.label}</span>
                            <ChevronRight size={18} className="text-gray-400 rtl:rotate-180" />
                          </Link>
                        ))}
                      </div>
                    );
                  })()}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
