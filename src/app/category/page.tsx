"use client";

import { useState, useEffect } from "react";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { CategoryCard } from "@/components/category/CategoryCard";
import type { Category } from "@/lib/types";

export default function AllCategoriesPage() {
  const lang = useLanguageStore((s) => s.lang);
  const [categories, setCategories] = useState<Category[]>([]);

  useEffect(() => {
    import("@/data/categories.json").then((mod) => {
      setCategories(mod.default as Category[]);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">
          {t("home.shop_by_category", lang)}
        </h1>
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3 md:gap-4">
          {categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              name={cat.name}
              name_ar={cat.name}
              slug={cat.slug}
              image={cat.image}
            />
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}
