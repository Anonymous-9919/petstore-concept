"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useLanguageStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { CategoryCard } from "@/components/category/CategoryCard";

interface CategoryConfig {
  id: string;
  title_en: string;
  title_ar: string;
  slug: string;
  image: string;
}

let cachedCategories: CategoryConfig[] | null = null;

async function loadCategories(): Promise<CategoryConfig[]> {
  if (cachedCategories) return cachedCategories;
  const mod = await import("@/data/banners.json");
  cachedCategories = mod.default.category_banners;
  return cachedCategories;
}

export function CategoryGrid() {
  const lang = useLanguageStore((s) => s.lang);
  const [categories, setCategories] = useState<CategoryConfig[]>([]);

  useEffect(() => {
    loadCategories().then(setCategories);
  }, []);

  if (categories.length === 0) return null;

  return (
    <section className="max-w-7xl mx-auto px-4 md:px-6 py-8 md:py-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg md:text-xl font-bold text-gray-900">
          {t("home.explore_categories", lang)}
        </h2>
        <Link
          href="/category"
          className="text-sm font-semibold flex items-center gap-1 hover:underline"
          style={{ color: "var(--color-primary)" }}
        >
          {t("home.view_all", lang)} →
        </Link>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3 md:gap-4">
        {categories.map((cat: CategoryConfig) => (
          <CategoryCard
            key={cat.id}
            name={cat.title_en}
            name_ar={cat.title_ar}
            slug={cat.slug}
            image={cat.image}
          />
        ))}
      </div>
    </section>
  );
}
