"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Search,
  ShoppingCart,
  Heart,
  User,
  Menu,
  X,
  ChevronDown,
  ChevronRight,
  Phone,
} from "lucide-react";
import { useLanguageStore, useThemeStore, useCartStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import type { MegaMenuItem } from "@/lib/types";

const megaMenuData: MegaMenuItem[] = [
  {
    label: "Dog",
    label_ar: "الكلاب",
    slug: "dog",
    pet_type: "dog",
    subcategories: [
      {
        label: "Food",
        label_ar: "الطعام",
        slug: "food",
        items: [
          { label: "Dry Food", label_ar: "طعام جاف", slug: "dog-dry-food" },
          { label: "Wet Food", label_ar: "طعام رطب", slug: "dog-wet-food" },
          { label: "Treats", label_ar: "مكافآت", slug: "dog-treats" },
        ],
      },
      {
        label: "Accessories",
        label_ar: "اكسسوارات",
        slug: "accessories",
        items: [
          { label: "Dog Toys", label_ar: "ألعاب", slug: "dog-toys" },
          { label: "Dog Accessories", label_ar: "اكسسوارات", slug: "dog-accessories" },
        ],
      },
      {
        label: "Healthcare",
        label_ar: "الرعاية الصحية",
        slug: "healthcare",
        items: [
          { label: "Healthcare & Supplements", label_ar: "المكملات", slug: "healthcare-supplements" },
          { label: "Grooming & Hygiene", label_ar: "العناية والنظافة", slug: "grooming-hygiene" },
        ],
      },
    ],
  },
  {
    label: "Cat",
    label_ar: "القطط",
    slug: "cat",
    pet_type: "cat",
    subcategories: [
      {
        label: "Food",
        label_ar: "الطعام",
        slug: "food",
        items: [
          { label: "Dry Food", label_ar: "طعام جاف", slug: "cat-dry-food" },
          { label: "Wet Food", label_ar: "طعام رطب", slug: "cat-wet-food" },
          { label: "Treats", label_ar: "مكافآت", slug: "cat-treats" },
          { label: "Pet Milk", label_ar: "حليب", slug: "pet-milk" },
        ],
      },
      {
        label: "Litter & Boxes",
        label_ar: "تراب وصناديق",
        slug: "litter",
        items: [
          { label: "Cat Litter & Boxes", label_ar: "تراب وصناديق", slug: "cat-litter-and-boxes" },
        ],
      },
      {
        label: "Accessories",
        label_ar: "اكسسوارات",
        slug: "accessories",
        items: [
          { label: "Cat Toys", label_ar: "ألعاب", slug: "cat-toys" },
          { label: "Cat Accessories", label_ar: "اكسسوارات", slug: "cat-accessories" },
          { label: "Cat Scratchers", label_ar: "خداشات", slug: "cat-scratchers" },
        ],
      },
    ],
  },
  {
    label: "Birds",
    label_ar: "الطيور",
    slug: "birds",
    pet_type: "bird",
    subcategories: [
      {
        label: "Bird Food",
        label_ar: "الطعام",
        slug: "food",
        items: [
          { label: "Bird Food", label_ar: "طعام الطيور", slug: "bird-food" },
        ],
      },
      {
        label: "Accessories",
        label_ar: "اكسسوارات",
        slug: "accessories",
        items: [
          { label: "Bird Toys", label_ar: "ألعاب الطيور", slug: "bird-toys" },
          { label: "Bird Cage", label_ar: "أقفاص الطيور", slug: "bird-cage" },
          { label: "Bird Needs & Accessories", label_ar: "احتياجات الطيور", slug: "bird-needs-accessories" },
        ],
      },
    ],
  },
  {
    label: "Fish",
    label_ar: "الأسماك",
    slug: "fish",
    pet_type: "fish",
    subcategories: [
      {
        label: "Food",
        label_ar: "الطعام",
        slug: "food",
        items: [
          { label: "Fish Food", label_ar: "طعام الأسماك", slug: "fish-food" },
        ],
      },
      {
        label: "Accessories",
        label_ar: "اكسسوارات",
        slug: "accessories",
        items: [
          { label: "Fish Needs & Accessories", label_ar: "احتياجات الأسماك", slug: "fish-needs-accessories" },
        ],
      },
    ],
  },
  {
    label: "Small Pets",
    label_ar: "حيوانات صغيرة",
    slug: "small-pets",
    pet_type: "small_pets",
    subcategories: [
      {
        label: "Rabbit",
        label_ar: "الأرانب",
        slug: "rabbit",
        items: [
          { label: "Rabbit Needs & Accessories", label_ar: "احتياجات الأرانب", slug: "rabbit-needs-accessories" },
        ],
      },
      {
        label: "Hamster",
        label_ar: "الهامستر",
        slug: "hamster",
        items: [
          { label: "Hamster Needs & Accessories", label_ar: "احتياجات الهامستر", slug: "hamster-needs-accessories" },
        ],
      },
      {
        label: "Reptile",
        label_ar: "الزواحف",
        slug: "reptile",
        items: [
          { label: "Reptile Food", label_ar: "طعام الزواحف", slug: "reptile-food" },
          { label: "Reptile Needs & Accessories", label_ar: "احتياجات الزواحف", slug: "reptile-needs-accessories" },
        ],
      },
      {
        label: "Cages",
        label_ar: "أقفاص",
        slug: "cages",
        items: [
          { label: "Pet Cage", label_ar: "أقفاص الحيوانات", slug: "pet-cage" },
        ],
      },
    ],
  },
  {
    label: "Shop By Need",
    label_ar: "تسوق حسب الحاجة",
    slug: "shop-by-need",
    pet_type: "shop",
    subcategories: [
      {
        label: "Beds & Houses",
        label_ar: "أسرّة وبيوت",
        slug: "beds",
        items: [
          { label: "Pet Beds & Houses", label_ar: "أسرّة وبيوت", slug: "pet-beds-houses" },
        ],
      },
      {
        label: "Travel",
        label_ar: "السفر",
        slug: "travel",
        items: [
          { label: "Carrier & Travel Bags", label_ar: "حقائب السفر", slug: "pets-carrier-travel-bags" },
        ],
      },
      {
        label: "Healthcare",
        label_ar: "الرعاية الصحية",
        slug: "healthcare",
        items: [
          { label: "Healthcare & Supplements", label_ar: "المكملات الغذائية", slug: "healthcare-supplements" },
          { label: "Grooming & Hygiene", label_ar: "العناية والنظافة", slug: "grooming-hygiene" },
        ],
      },
      {
        label: "Special Offers",
        label_ar: "عروض خاصة",
        slug: "offers",
        items: [
          { label: "Special Offer", label_ar: "عروض خاصة", slug: "special-offer" },
        ],
      },
    ],
  },
];

export function Header() {
  const lang = useLanguageStore((s) => s.lang);
  const setLang = useLanguageStore((s) => s.setLang);
  const theme = useThemeStore((s) => s.theme);
  const setTheme = useThemeStore((s) => s.setTheme);
  const cartItems = useCartStore((s) => s.items);
  const totalItems = cartItems.reduce((sum, i) => sum + i.quantity, 0);

  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string | null>(null);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const handleMouseEnter = useCallback((slug: string) => {
    if (timeoutRef.current) clearTimeout(timeoutRef.current);
    setActiveMenu(slug);
    setActiveSubmenu(null);
  }, []);

  const handleMouseLeave = useCallback(() => {
    timeoutRef.current = setTimeout(() => {
      setActiveMenu(null);
      setActiveSubmenu(null);
    }, 150);
  }, []);

  const handleSubmenuEnter = useCallback((slug: string) => {
    setActiveSubmenu(slug);
  }, []);

  const handleSubmenuLeave = useCallback(() => {
    setActiveSubmenu(null);
  }, []);

  useEffect(() => {
    return () => {
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchQuery.trim())}`;
    }
  };

  const activeMegaData = megaMenuData.find((m) => m.slug === activeMenu);

  return (
    <>
      <header className="sticky top-0 z-50" style={{ backgroundColor: "var(--color-bg-header)" }}>
        {/* Top bar: Logo + Search + Actions */}
        <div className="max-w-7xl mx-auto px-3 md:px-6">
          <div className="flex items-center justify-between h-14 md:h-16 gap-3">
            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-[var(--color-text-inverse)] p-1"
              onClick={() => setMobileOpen(!mobileOpen)}
              aria-label="Menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>

            {/* Logo */}
            <Link href="/" className="flex-shrink-0">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 md:w-10 md:h-10 bg-white rounded-full flex items-center justify-center">
                  <span className="text-lg md:text-xl font-bold" style={{ color: "var(--color-primary)" }}>
                    PS
                  </span>
                </div>
                <div className="hidden sm:block text-[var(--color-text-inverse)]">
                  <div className="font-bold text-sm md:text-base leading-tight">PET STORE</div>
                  <div className="text-[10px] md:text-xs opacity-80 leading-tight">{t("header.slogan", lang)}</div>
                </div>
              </div>
            </Link>

            {/* Search bar - desktop */}
            <form
              onSubmit={handleSearch}
              className="hidden md:flex flex-1 max-w-xl mx-4"
            >
              <div className="flex w-full">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder={t("header.search_placeholder", lang)}
                  className="flex-1 px-4 py-2 rounded-l-lg text-sm text-gray-900 bg-white border-0 focus:outline-none focus:ring-2 focus:ring-white/50"
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

            {/* Actions */}
            <div className="flex items-center gap-1 md:gap-3">
              {/* Theme selector */}
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as "blue" | "orange")}
                className="hidden lg:block text-xs bg-white/20 text-[var(--color-text-inverse)] border border-white/30 rounded px-1.5 py-1 focus:outline-none cursor-pointer"
              >
                <option value="blue" className="text-gray-900">{t("theme.blue", lang)}</option>
                <option value="orange" className="text-gray-900">{t("theme.orange", lang)}</option>
              </select>

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
                onClick={() => setSearchOpen(!searchOpen)}
                aria-label="Search"
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
                  <span className="absolute -top-1 -right-1 bg-[var(--color-accent)] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                    {totalItems}
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>

        {/* Mobile search bar */}
        {searchOpen && (
          <div className="md:hidden px-3 pb-3 animate-fade-in">
            <form onSubmit={handleSearch} className="flex">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t("header.search_placeholder", lang)}
                className="flex-1 px-4 py-2 rounded-l-lg text-sm text-gray-900 bg-white border-0 focus:outline-none"
                autoFocus
              />
              <button
                type="submit"
                className="px-4 py-2 bg-white/20 text-[var(--color-text-inverse)] rounded-r-lg"
                aria-label="Search"
              >
                <Search size={18} />
              </button>
            </form>
          </div>
        )}

        {/* Desktop Mega Menu Navigation */}
        <nav className="hidden md:block border-t border-white/20">
          <div className="max-w-7xl mx-auto px-6">
            <div className="flex items-center gap-0">
              {megaMenuData.map((item) => (
                <div
                  key={item.slug}
                  className="relative"
                  onMouseEnter={() => handleMouseEnter(item.slug)}
                  onMouseLeave={handleMouseLeave}
                >
                  <button
                    className={`flex items-center gap-1 px-3 lg:px-4 py-2.5 text-[var(--color-text-inverse)] text-sm font-medium transition-colors hover:bg-white/10 ${
                      activeMenu === item.slug ? "bg-white/10" : ""
                    }`}
                  >
                    {lang === "ar" ? item.label_ar : item.label}
                    <ChevronDown size={14} className={`transition-transform ${activeMenu === item.slug ? "rotate-180" : ""}`} />
                  </button>

                  {/* Mega Menu Dropdown */}
                  {activeMenu === item.slug && activeMegaData && (
                    <div
                      className="absolute left-0 top-full bg-white shadow-xl rounded-b-lg border border-gray-100 animate-fade-in"
                      style={{ width: "640px", minHeight: "320px" }}
                    >
                      <div className="flex">
                        {/* Subcategories list */}
                        <div className="w-48 bg-gray-50 rounded-bl-lg p-4">
                          {activeMegaData.subcategories.map((sub) => (
                            <div
                              key={sub.slug}
                              className="mb-3"
                              onMouseEnter={() => handleSubmenuEnter(sub.slug)}
                              onMouseLeave={handleSubmenuLeave}
                            >
                              <Link
                                href={`/category/${sub.slug === "food" || sub.slug === "accessories" || sub.slug === "healthcare" || sub.slug === "litter" || sub.slug === "offers" || sub.slug === "beds" || sub.slug === "travel" || sub.slug === "rabbit" || sub.slug === "hamster" || sub.slug === "reptile" || sub.slug === "cages" ? activeMegaData.subcategories.flatMap((s) => s.items).find((i) => i.slug.includes(sub.slug))?.slug || sub.slug : sub.slug}`}
                                className="text-sm font-semibold text-gray-800 hover:text-[var(--color-primary)] transition-colors block mb-1"
                              >
                                {lang === "ar" ? sub.label_ar : sub.label}
                              </Link>
                              <div className="flex flex-wrap gap-1">
                                {sub.items.map((item2) => (
                                  <Link
                                    key={item2.slug}
                                    href={`/category/${item2.slug}`}
                                    className="text-xs text-gray-500 hover:text-[var(--color-primary)] transition-colors block"
                                  >
                                    {lang === "ar" ? item2.label_ar : item2.label}
                                  </Link>
                                ))}
                              </div>
                            </div>
                          ))}
                          <Link
                            href={`/category/${activeMegaData.slug}`}
                            className="mt-4 text-sm font-semibold flex items-center gap-1 transition-colors"
                            style={{ color: "var(--color-primary)" }}
                          >
                            {t("home.view_all", lang)} {lang === "ar" ? activeMegaData.label_ar : activeMegaData.label}
                            <ChevronRight size={14} className="rtl-flip" />
                          </Link>
                        </div>

                        {/* Promo / Image area */}
                        <div className="flex-1 p-6 flex items-center justify-center bg-gradient-to-br from-gray-50 to-white">
                          <div className="text-center">
                            <div className="text-4xl mb-3">
                              {item.pet_type === "dog" && "🐕"}
                              {item.pet_type === "cat" && "🐈"}
                              {item.pet_type === "bird" && "🐦"}
                              {item.pet_type === "fish" && "🐠"}
                              {item.pet_type === "small_pets" && "🐹"}
                              {item.pet_type === "shop" && "🛒"}
                            </div>
                            <h3 className="text-lg font-bold text-gray-800 mb-1">
                              {lang === "ar" ? activeMegaData.label_ar : activeMegaData.label}
                            </h3>
                            <p className="text-sm text-gray-500">
                              {t("mega.best_sellers", lang)}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile Slide-out Menu */}
      {mobileOpen && (
        <>
          <div
            className="fixed inset-0 bg-black/50 z-50 md:hidden"
            onClick={() => setMobileOpen(false)}
          />
          <div className="fixed inset-y-0 left-0 w-80 bg-white z-50 md:hidden overflow-y-auto animate-slide-in-left">
            <div className="p-4">
              <div className="flex items-center justify-between mb-6">
                <h2 className="font-bold text-lg">Menu</h2>
                <button onClick={() => setMobileOpen(false)}>
                  <X size={24} />
                </button>
              </div>

              {/* Theme & Language in mobile menu */}
              <div className="flex gap-2 mb-4">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as "blue" | "orange")}
                  className="text-sm border rounded px-2 py-1 flex-1"
                >
                  <option value="blue">{t("theme.blue", lang)}</option>
                  <option value="orange">{t("theme.orange", lang)}</option>
                </select>
                <button
                  onClick={() => setLang(lang === "en" ? "ar" : "en")}
                  className="text-sm border rounded px-3 py-1 font-semibold"
                >
                  {lang === "en" ? "عربي" : "EN"}
                </button>
              </div>

              {/* Mobile menu categories */}
              {megaMenuData.map((item) => (
                <div key={item.slug} className="border-b border-gray-100">
                  <Link
                    href={`/category/${item.slug}`}
                    className="block py-3 font-semibold text-gray-800"
                    onClick={() => setMobileOpen(false)}
                  >
                    {lang === "ar" ? item.label_ar : item.label}
                  </Link>
                  {item.subcategories.map((sub) => (
                    <div key={sub.slug} className="pl-4 pb-2">
                      <div className="text-xs font-semibold text-gray-500 uppercase mb-1">
                        {lang === "ar" ? sub.label_ar : sub.label}
                      </div>
                      {sub.items.map((item2) => (
                        <Link
                          key={item2.slug}
                          href={`/category/${item2.slug}`}
                          className="block py-1 text-sm text-gray-600 hover:text-[var(--color-primary)]"
                          onClick={() => setMobileOpen(false)}
                        >
                          {lang === "ar" ? item2.label_ar : item2.label}
                        </Link>
                      ))}
                    </div>
                  ))}
                </div>
              ))}

              {/* Contact in mobile menu */}
              <div className="mt-6 pt-4 border-t">
                <a
                  href="https://wa.me/96598805010"
                  className="flex items-center gap-2 text-sm text-green-600 font-semibold"
                >
                  <Phone size={16} /> WhatsApp Us
                </a>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
