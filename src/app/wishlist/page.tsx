"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Heart, ArrowLeft } from "lucide-react";
import { useLanguageStore, useWishlistStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

export default function WishlistPage() {
  const lang = useLanguageStore((s) => s.lang);
  const { productIds } = useWishlistStore();
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      const all = mod.default as Product[];
      setProducts(all.filter((p) => productIds.includes(p.id)));
    });
  }, [productIds]);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("wishlist.title", lang)}</h1>

        {products.length === 0 ? (
          <div className="text-center py-20">
            <Heart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">{t("wishlist.empty", lang)}</p>
            <Link href="/" className="btn-primary">
              <ArrowLeft size={16} /> {t("cart.continue_shopping", lang)}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
