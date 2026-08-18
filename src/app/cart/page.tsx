"use client";

import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart, ArrowLeft } from "lucide-react";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { t } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export default function CartPage() {
  const lang = useLanguageStore((s) => s.lang);
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const total = totalPrice();

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 max-w-7xl mx-auto px-4 md:px-6 py-8">
        <h1 className="text-2xl font-bold text-gray-900 mb-6">{t("cart.title", lang)}</h1>

        {items.length === 0 ? (
          <div className="text-center py-20">
            <ShoppingCart size={48} className="mx-auto text-gray-300 mb-4" />
            <p className="text-gray-500 mb-4">{t("cart.empty", lang)}</p>
            <Link href="/" className="btn-primary">
              <ArrowLeft size={16} /> {t("cart.continue_shopping", lang)}
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Cart items */}
            <div className="lg:col-span-2 space-y-3">
              {items.map((item) => (
                <div key={item.key} className="card p-4 flex gap-4">
                  <div className="w-20 h-20 bg-gray-50 rounded-lg overflow-hidden flex-shrink-0">
                    <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <Link href={`/product/${item.product_id}`} className="text-sm font-semibold text-gray-800 hover:text-[var(--color-primary)] line-clamp-1">
                      {item.name}
                    </Link>
                    <p className="text-sm font-bold mt-1" style={{ color: "var(--color-primary)" }}>
                      {formatPrice(parseFloat(item.price), "KD", 3)}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-[var(--color-border)] rounded-lg">
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity - 1)}
                          className="p-1 hover:bg-gray-50"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="px-3 py-1 text-sm font-semibold">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                          className="p-1 hover:bg-gray-50"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <button
                        onClick={() => removeItem(item.key)}
                        className="text-red-400 hover:text-red-600 transition-colors p-1"
                        aria-label="Remove"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Order summary */}
            <div className="lg:col-span-1">
              <div className="bg-white border border-[var(--color-border)] rounded-xl p-5 sticky top-36">
                <h2 className="font-bold text-lg mb-4">{t("checkout.order_summary", lang)}</h2>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("cart.subtotal", lang)}</span>
                    <span className="font-semibold">{formatPrice(total, "KD", 3)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-600">{t("cart.shipping", lang)}</span>
                    <span className="font-semibold text-green-600">
                      {total >= 10 ? t("cart.shipping_free", lang) : formatPrice(1, "KD", 3)}
                    </span>
                  </div>
                  <div className="border-t pt-3 flex justify-between">
                    <span className="font-bold">{t("cart.total", lang)}</span>
                    <span className="font-bold text-lg" style={{ color: "var(--color-primary)" }}>
                      {formatPrice(total >= 10 ? total : total + 1, "KD", 3)}
                    </span>
                  </div>
                </div>
                <button className="w-full mt-5 py-3 rounded-lg font-bold text-sm text-white flex items-center justify-center gap-2" style={{ backgroundColor: "var(--color-primary)" }}>
                  {t("cart.checkout", lang)}
                </button>
                <Link href="/" className="block text-center text-sm mt-3 hover:underline" style={{ color: "var(--color-primary)" }}>
                  {t("cart.continue_shopping", lang)}
                </Link>
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
