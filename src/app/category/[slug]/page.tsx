"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CollectionBrowser } from "@/components/collection/CollectionBrowser";
import type { Product } from "@/lib/types";

const categoryNames: Record<string, { en: string; ar: string }> = {
  "dog": { en: "Dog", ar: "الكلاب" },
  "cat": { en: "Cat", ar: "القطط" },
  "birds": { en: "Birds", ar: "الطيور" },
  "fish": { en: "Fish", ar: "الأسماك" },
  "small-pets": { en: "Small Pets", ar: "الحيوانات الصغيرة" },
  "shop-by-need": { en: "Shop By Need", ar: "تسوق حسب الحاجة" },
  "dog-dry-food": { en: "Dog Dry Food", ar: "طعام كلاب جاف" },
  "dog-wet-food": { en: "Dog Wet Food", ar: "طعام كلاب رطب" },
  "dog-treats": { en: "Dog Treats", ar: "مكافآت كلاب" },
  "dog-toys": { en: "Dog Toys", ar: "ألعاب كلاب" },
  "dog-accessories": { en: "Dog Accessories", ar: "اكسسوارات كلاب" },
  "cat-dry-food": { en: "Cat Dry Food", ar: "طعام قطط جاف" },
  "cat-wet-food": { en: "Cat Wet Food", ar: "طعام قطط رطب" },
  "cat-treats": { en: "Cat Treats", ar: "مكافآت قطط" },
  "cat-toys": { en: "Cat Toys", ar: "ألعاب قطط" },
  "cat-accessories": { en: "Cat Accessories", ar: "اكسسوارات قطط" },
  "cat-litter-and-boxes": { en: "Cat Litter & Boxes", ar: "تراب وصناديق قطط" },
  "cat-scratchers": { en: "Cat Scratchers", ar: "خداشات قطط" },
  "bird-food": { en: "Bird Food", ar: "طعام طيور" },
  "bird-toys": { en: "Bird Toys", ar: "ألعاب طيور" },
  "bird-cage": { en: "Bird Cage", ar: "أقفاص طيور" },
  "bird-needs-accessories": { en: "Bird Accessories", ar: "اكسسوارات طيور" },
  "fish-food": { en: "Fish Food", ar: "طعام أسماك" },
  "fish-needs-accessories": { en: "Fish Accessories", ar: "اكسسوارات أسماك" },
  "rabbit-needs-accessories": { en: "Rabbit", ar: "الأرانب" },
  "hamster-needs-accessories": { en: "Hamster", ar: "الهامستر" },
  "reptile-food": { en: "Reptile Food", ar: "طعام زواحف" },
  "reptile-needs-accessories": { en: "Reptile Accessories", ar: "اكسسوارات زواحف" },
  "pet-cage": { en: "Pet Cages", ar: "أقفاص حيوانات" },
  "pet-beds-houses": { en: "Pet Beds & Houses", ar: "أسرّة وبيوت" },
  "pets-carrier-travel-bags": { en: "Carrier & Travel Bags", ar: "حقائب سفر" },
  "healthcare-supplements": { en: "Healthcare & Supplements", ar: "المكملات الغذائية" },
  "grooming-hygiene": { en: "Grooming & Hygiene", ar: "العناية والنظافة" },
  "pet-milk": { en: "Pet Milk", ar: "حليب حيوانات" },
  "special-offer": { en: "Special Offers", ar: "عروض خاصة" },
};

function CategoryInner({ slug }: { slug: string }) {
  const lang = useLanguageStore((s) => s.lang);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      const all = mod.default as Product[];
      const filtered = all.filter((p) => {
        if (!p.categories || p.categories.length === 0) return false;
        if (p.categories.some((c) => c.slug === slug)) return true;
        if (slug === "dog" && p.categories.some((c) => c.slug.startsWith("dog"))) return true;
        if (slug === "cat" && p.categories.some((c) => c.slug.startsWith("cat"))) return true;
        if (slug === "birds" && p.categories.some((c) => c.slug.startsWith("bird"))) return true;
        if (slug === "fish" && p.categories.some((c) => c.slug.startsWith("fish"))) return true;
        if (slug === "small-pets" && p.categories.some((c) =>
          ["rabbit", "hamster", "reptile", "pet-cage"].some(s => c.slug.includes(s))
        )) return true;
        return false;
      });
      setProducts(filtered);
      setLoading(false);
    });
  }, [slug]);

  const catName = categoryNames[slug] || { en: slug, ar: slug };

  return (
    <>
      {/* Breadcrumb */}
      <div className="page-container py-3">
        <div className="flex items-center gap-1 text-xs text-gray-500 flex-wrap">
          <Link href="/" className="hover:text-[var(--color-primary)] transition-colors">
            {t("breadcrumb.home", lang)}
          </Link>
          <span>/</span>
          <span>{lang === "ar" ? catName.ar : catName.en}</span>
        </div>
      </div>

      {/* Title */}
      <div className="page-container pt-10 pb-8">
        <h1 className="section-heading">{lang === "ar" ? catName.ar : catName.en}</h1>
      </div>

      {/* Detailed faceted browser takes over everywhere */}
      <div className="page-container pb-16">
        {loading ? (
          <div className="text-center py-20 text-gray-500">{t("general.loading", lang)}</div>
        ) : (
          <CollectionBrowser items={products} />
        )}
      </div>
    </>
  );
}

export default function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const [slug, setSlug] = useState("");

  useEffect(() => {
    params.then(p => setSlug(p.slug));
  }, [params]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1">
        {slug ? <CategoryInner slug={slug} /> : <div className="py-12 text-center text-gray-500">{t("general.loading", "en")}</div>}
      </main>
      <Footer />
    </div>
  );
}
