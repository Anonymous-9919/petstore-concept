"use client";

import { useState, useEffect, useMemo } from "react";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProductCard } from "@/components/product/ProductCard";
import { useLanguageStore } from "@/lib/store";
import { getBestPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function BestSellersPage() {
  const lang = useLanguageStore((s) => s.lang);
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      const raw = mod.default as unknown as Product[] | { products: Product[] };
      const all = (Array.isArray(raw) ? raw : raw.products) as Product[];
      // "Best sellers" = products currently on sale (discounted off their regular price)
      const onSale = all
        .filter((p) => {
          const best = parseFloat(getBestPrice(p));
          const reg = p.regular_price ? parseFloat(p.regular_price) : 0;
          return reg > best && reg > 0;
        })
        .sort((a, b) => {
          const da = 1 - parseFloat(getBestPrice(a)) / (parseFloat(a.regular_price) || 1);
          const db = 1 - parseFloat(getBestPrice(b)) / (parseFloat(b.regular_price) || 1);
          return db - da; // biggest discount first
        });
      setProducts(onSale);
    });
  }, []);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 page-container py-8">
        <h1 className="section-heading mb-2">
          {lang === "ar" ? "الأكثر مبيعاً" : "Best Sellers"}
        </h1>
        <p className="text-sm text-gray-500 mb-6">
          {lang === "ar"
            ? "منتجات مختارة بأسعار مخفضة لفترة محدودة"
            : "Hand-picked products at special limited-time prices"}
        </p>
        {products.length === 0 ? (
          <div className="py-20 text-center text-gray-400">Loading…</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
