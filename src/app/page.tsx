"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { TrustBadges } from "@/components/home/TrustBadges";
import { HeroSlider } from "@/components/home/HeroSlider";
import { ProductCard } from "@/components/product/ProductCard";
import { CategoryCard } from "@/components/category/CategoryCard";
import type { Product } from "@/lib/types";

// Category display groups for homepage
const categoryGroups = [
  {
    title: "home.shop_dog",
    slug: "dog",
    categories: [
      { name: "Dog Dry Food", name_ar: "طعام كلاب جاف", slug: "dog-dry-food", image: "/assets/2d36fa870d4a.jpg" },
      { name: "Dog Wet Food", name_ar: "طعام كلاب رطب", slug: "dog-wet-food", image: "/assets/c7fd71bf4b74.jpg" },
      { name: "Dog Treats", name_ar: "مكافآت كلاب", slug: "dog-treats", image: "/assets/b3c8e7344237.jpg" },
      { name: "Dog Toys", name_ar: "ألعاب كلاب", slug: "dog-toys", image: "/assets/622efdc77bdc.jpg" },
    ],
  },
  {
    title: "home.shop_cat",
    slug: "cat",
    categories: [
      { name: "Cat Dry Food", name_ar: "طعام قطط جاف", slug: "cat-dry-food", image: "/assets/4c833de33386.jpg" },
      { name: "Cat Wet Food", name_ar: "طعام قطط رطب", slug: "cat-wet-food", image: "/assets/ae41631e64c8.jpg" },
      { name: "Cat Treats", name_ar: "مكافآت قطط", slug: "cat-treats", image: "/assets/d656136dadd3.jpg" },
      { name: "Cat Toys", name_ar: "ألعاب قطط", slug: "cat-toys", image: "/assets/f5f4f2160a1c.jpg" },
    ],
  },
  {
    title: "home.shop_by_category",
    slug: "all",
    categories: [
      { name: "Bird Food", name_ar: "طعام طيور", slug: "bird-food", image: "/assets/9066017a0998.jpg" },
      { name: "Fish Food", name_ar: "طعام أسماك", slug: "fish-food", image: "/assets/bd39b65e6726.jpg" },
      { name: "Healthcare & Supplements", name_ar: "المكملات الغذائية", slug: "healthcare-supplements", image: "/assets/e1e1e89a6a75.jpg" },
      { name: "Grooming & Hygiene", name_ar: "العناية والنظافة", slug: "grooming-hygiene", image: "/assets/4db27e1bf21e.jpg" },
      { name: "Cat Litter and Boxes", name_ar: "تراب وصناديق قطط", slug: "cat-litter-and-boxes", image: "/assets/d56fd873e1a0.jpg" },
      { name: "Pet Beds & Houses", name_ar: "أسرّة وبيوت", slug: "pet-beds-houses", image: "/assets/62786599c89d.jpg" },
    ],
  },
];

export default function HomePage() {
  const lang = useLanguageStore((s) => s.lang);
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      const all = mod.default as Product[];
      setFeaturedProducts(all.filter(p => p.stock_status === "instock").slice(0, 8));
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1">
        {/* Hero Slider */}
        <HeroSlider />

        {/* Trust Badges */}
        <TrustBadges />

        {/* Shop by Pet Type */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
          {categoryGroups.map((group, gi) => (
            <div key={group.slug} className={gi > 0 ? "mt-10" : ""}>
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-lg md:text-xl font-bold text-gray-900">
                  {t(group.title, lang)}
                </h2>
                <Link
                  href={`/category/${group.slug}`}
                  className="text-sm font-semibold flex items-center gap-1 hover:underline"
                  style={{ color: "var(--color-primary)" }}
                >
                  {t("home.view_all", lang)} <ArrowRight size={14} />
                </Link>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                {group.categories.map((cat) => (
                  <CategoryCard
                    key={cat.slug}
                    name={cat.name}
                    name_ar={cat.name_ar}
                    slug={cat.slug}
                    image={cat.image}
                  />
                ))}
              </div>
            </div>
          ))}
        </section>

        {/* Featured Products */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12 bg-[var(--color-bg-alt)]">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg md:text-xl font-bold text-gray-900">
              {t("home.featured_products", lang)}
            </h2>
            <Link
              href="/category"
              className="text-sm font-semibold flex items-center gap-1 hover:underline"
              style={{ color: "var(--color-primary)" }}
            >
              {t("home.view_all", lang)} <ArrowRight size={14} />
            </Link>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </section>

        {/* Trust section */}
        <section className="max-w-7xl mx-auto px-4 md:px-6 py-10 md:py-16">
          <h2 className="text-lg md:text-xl font-bold text-gray-900 text-center mb-8">
            {t("home.trust_title", lang)}
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { title: "home.trust_support", desc: "home.trust_support_desc", icon: "💬" },
              { title: "home.trust_delivery", desc: "home.trust_delivery_desc", icon: "🚚" },
              { title: "home.trust_returns", desc: "home.trust_returns_desc", icon: "↩️" },
              { title: "home.trust_secure", desc: "home.trust_secure_desc", icon: "🔒" },
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-3xl mb-2">{item.icon}</div>
                <h3 className="font-bold text-sm text-gray-800 mb-1">{t(item.title, lang)}</h3>
                <p className="text-xs text-gray-500">{t(item.desc, lang)}</p>
              </div>
            ))}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
