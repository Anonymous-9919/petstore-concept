"use client";

import Link from "next/link";
import { useLanguageStore } from "@/lib/store";

interface CategoryCardProps {
  name: string;
  name_ar?: string;
  slug: string;
  image: string;
  count?: number;
}

export function CategoryCard({ name, name_ar, slug, image, count }: CategoryCardProps) {
  const lang = useLanguageStore((s) => (s.lang));
  const displayName = lang === "ar" ? (name_ar || name) : name;

  return (
    <Link href={`/category/${slug}`} className="group">
      <div className="category-card">
        <div className="category-card-circle">
          <img
            src={image}
            alt={displayName}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="category-card-label">{displayName}</p>
      </div>
    </Link>
  );
}
