"use client";

import { useState } from "react";
import Link from "next/link";
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { useAccountStore } from "@/lib/auth";
import { t } from "@/lib/i18n";
import { formatPrice } from "@/lib/utils";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";

export default function CartPage() {
  const lang = useLanguageStore((s) => s.lang);
  const { items, removeItem, updateQuantity, totalPrice } = useCartStore();
  const user = useAccountStore((s) => s.user);
  const total = totalPrice();
  const [noteOpen, setNoteOpen] = useState(false);
  const [note, setNote] = useState("");

  const tt = (en: string, ar: string) => (lang === "ar" ? ar : en);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />

      <main className="flex-1 page-container pt-12 pb-16">
        {/* Breadcrumb */}
        <nav className="pdp-breadcrumb !mb-8">
          <Link href="/">{t("cart.home", lang)}</Link>
          <span>/</span>
          <span>{t("cart.title", lang)}</span>
        </nav>

        {items.length === 0 ? (
          /* Empty state - source layout */
          <div className="text-center py-16">
            <ShoppingCart size={46} className="mx-auto text-gray-300 mb-4" />
            <h1 className="text-2xl font-bold text-gray-900 mb-3">{t("cart.title", lang)}</h1>
            <p className="text-gray-500 mb-2">{t("cart.empty", lang)}</p>
            {!user && (
              <p className="text-sm text-gray-500 mb-6">
                {tt("Have an account?", "Ù„Ø¯ÙŠÙƒ Ø­Ø³Ø§Ø¨ØŸ")}{" "}
                <Link href="/account" className="font-semibold text-[var(--color-primary)] underline">
                  {tt("Log in to check out faster.", "Ø³Ø¬Ù‘Ù„ Ø§Ù„Ø¯Ø®ÙˆÙ„ Ù„Ø¥ØªÙ…Ø§Ù… Ø£Ø³Ø±Ø¹.")}
                </Link>
              </p>
            )}
            <Link href="/" className="inline-block px-6 py-3 rounded-lg bg-[var(--color-primary)] text-white font-semibold text-sm hover:opacity-90">
              {tt("Continue shopping", "Ù…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØ³ÙˆÙ‚")}
            </Link>
          </div>
        ) : (
          <>
            {/* Title row: heading + continue shopping link (source layout) */}
            <div className="flex items-center justify-between flex-wrap gap-3 mb-8">
              <h1 className="section-heading !mb-0">{t("cart.title", lang)}</h1>
              <Link href="/" className="text-sm font-semibold text-[var(--color-primary)] underline underline-offset-2">
                {tt("Continue shopping", "Ù…ÙˆØ§ØµÙ„Ø© Ø§Ù„ØªØ³ÙˆÙ‚")}
              </Link>
            </div>

            {/* Cart table: Product | Total | Quantity | Total */}
            <div className="cart-table" role="table" aria-label={t("cart.title", lang)}>
              <div className="cart-table-head hidden md:grid" role="row">
                <span>{lang === "ar" ? "Ø§Ù„Ù…Ù†ØªØ¬" : "Product"}</span>
                <span>{lang === "ar" ? "Ø§Ù„Ø³Ø¹Ø±" : "Total"}</span>
                <span>{lang === "ar" ? "Ø§Ù„ÙƒÙ…ÙŠØ©" : "Quantity"}</span>
                <span className="text-right">{lang === "ar" ? "Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ" : "Total"}</span>
              </div>

              {items.map((item) => (
                <div key={item.key} className="cart-row" role="row">
                  {/* Product */}
                  <div className="cart-product" role="cell">
                    <Link href={`/product/${item.product_id}`} className="shrink-0 w-20 h-20 rounded-lg overflow-hidden bg-white border border-black/5">
                      <img src={item.image} alt={item.name} className="w-full h-full object-contain" />
                    </Link>
                    <Link
                      href={`/product/${item.product_id}`}
                      className="text-sm font-semibold leading-snug hover:text-[var(--color-primary)] line-clamp-2"
                    >
                      {item.name}
                    </Link>
                  </div>

                  {/* Price */}
                  <div className="cart-cell" data-label={lang === "ar" ? "Ø§Ù„Ø³Ø¹Ø±" : "Price"} dir="ltr">
                    {formatPrice(item.price, "KD", 3)}
                  </div>

                  {/* Quantity */}
                  <div className="cart-cell" role="cell">
                    <div className="pdp-qty !h-10">
                      <button
                        aria-label="Decrease quantity"
                        onClick={() => item.quantity <= 1 ? removeItem(item.key) : updateQuantity(item.key, item.quantity - 1)}
                      >
                        <Minus size={14} />
                      </button>
                      <b>{item.quantity}</b>
                      <button aria-label="Increase quantity" onClick={() => updateQuantity(item.key, item.quantity + 1)}>
                        <Plus size={14} />
                      </button>
                    </div>
                  </div>

                  {/* Line total + remove */}
                  <div className="cart-cell font-bold relative" data-label={lang === "ar" ? "Ø§Ù„Ø¥Ø¬Ù…Ø§Ù„ÙŠ" : "Total"} dir="ltr">
                    {formatPrice((parseFloat(item.price) * item.quantity).toFixed(3), "KD", 3)}
                    <button
                      onClick={() => removeItem(item.key)}
                      aria-label="Remove"
                      className="absolute top-1/2 -translate-y-1/2 ltr:right-0 rtl:left-0 text-gray-300 hover:text-red-500 md:hidden"
                    >
                      <Trash2 size={15} />
                    </button>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label="Remove"
                    className="hidden md:block text-gray-400 hover:text-red-500 self-start justify-self-end"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer: instructions + subtotal/checkout (source 2-col footer) */}
            <div className="cart-footer-grid mt-10">
              <div>
                <button
                  onClick={() => setNoteOpen((v) => !v)}
                  className="text-sm font-semibold text-gray-700 underline underline-offset-2"
                >
                  {lang === "ar" ? "ØªØ¹Ù„ÙŠÙ…Ø§Øª Ø®Ø§ØµØ© Ø¨Ø§Ù„Ø·Ù„Ø¨" : "Order special instructions"}
                </button>
                {noteOpen && (
                  <textarea
                    value={note}
                    onChange={(e) => setNote(e.target.value)}
                    rows={4}
                    placeholder={lang === "ar" ? "ÙƒÙŠÙ ÙŠÙ…ÙƒÙ†Ù†Ø§ Ù…Ø³Ø§Ø¹Ø¯ØªÙƒØŸ" : "How can we help you?"}
                    className="mt-3 w-full border border-black/15 rounded-lg p-3 text-sm"
                  />
                )}
              </div>

              <div className="lg:justify-self-end w-full lg:max-w-xs">
                <div className="flex items-center justify-between py-3 border-b border-black/5">
                  <span className="text-base font-semibold">{t("cart.subtotal", lang)}</span>
                  <span className="text-lg font-bold" dir="ltr">{formatPrice(total.toFixed(3), "KD", 3)}</span>
                </div>
                <p className="text-[12px] text-gray-500 mt-2 mb-4">
                  {tt("Tax included. Shipping calculated at checkout.", "Ø´Ø§Ù…Ù„ Ø§Ù„Ø¶Ø±ÙŠØ¨Ø©. ÙŠÙØ­Ø³Ø¨ Ø§Ù„Ø´Ø­Ù† Ø¹Ù†Ø¯ Ø§Ù„Ø¯ÙØ¹.")}
                </p>
                <Link
                  href="/cart"
                  className="w-full h-12 flex items-center justify-center rounded-lg bg-[var(--color-primary)] text-white font-bold text-sm hover:opacity-90"
                >
                  {tt("Check out", "Ø¥ØªÙ…Ø§Ù… Ø§Ù„Ø´Ø±Ø§Ø¡")}
                </Link>
                <div className="flex items-center justify-center gap-2 mt-4 text-[12px] text-gray-500">
                  <span>{tt("Free delivery on orders over KD 10", "ØªÙˆØµÙŠÙ„ Ù…Ø¬Ø§Ù†ÙŠ Ù„Ù„Ø·Ù„Ø¨Ø§Øª ÙÙˆÙ‚ 10 Ø¯.Ùƒ")}</span>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
      <Footer />
    </div>
  );
}
