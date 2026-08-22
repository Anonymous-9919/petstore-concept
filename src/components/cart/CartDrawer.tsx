"use client";

import Link from "next/link";
import { X, Minus, Plus, Trash2, ShoppingBag, User } from "lucide-react";
import { useCartStore } from "@/lib/store";
import { useUiStore } from "@/lib/ui-store";
import { useAccountStore } from "@/lib/auth";
import { useLanguageStore } from "@/lib/store";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const open = useUiStore((s) => s.cartOpen);
  const setOpen = useUiStore((s) => s.setCartOpen);
  const items = useCartStore((s) => s.items);
  const updateQuantity = useCartStore((s) => s.updateQuantity);
  const removeItem = useCartStore((s) => s.removeItem);
  const lang = useLanguageStore((s) => s.lang);
  const user = useAccountStore((s) => s.user);

  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);
  const subtotal = items.reduce((sum, i) => sum + parseFloat(i.price) * i.quantity, 0);

  return (
    <div
      className={`fixed inset-0 z-[60] transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      aria-hidden={!open}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />

      {/* Panel - left in EN (LTR), right in AR (RTL), same as menu */}
      <div
        className={`absolute inset-y-0 w-[88%] max-w-[420px] bg-white shadow-2xl flex flex-col transition-transform duration-300 ${
          open ? "translate-x-0" : (lang === "ar" ? "translate-x-full" : "-translate-x-full")
        } ${lang === "ar" ? "right-0" : "left-0"}`}
        role="dialog"
        aria-label={t("Shopping cart", "سلة التسوق")}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 h-14 border-b border-black/5">
          <h2 className="font-bold text-[15px] flex items-center gap-2">
            <ShoppingBag size={17} />
            {t("Your cart", "سلتك")}
          </h2>
          <button onClick={() => setOpen(false)} aria-label="Close cart">
            <X size={20} />
          </button>
        </div>

        {items.length === 0 ? (
          /* Empty state */
          <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
            <ShoppingBag size={44} className="text-gray-300 mb-4" />
            <p className="text-lg font-semibold mb-2">{t("Your cart is empty", "سلتك فارغة")}</p>
            <Link
              href="/"
              onClick={() => setOpen(false)}
              className="mt-3 text-sm font-semibold text-[var(--color-primary)] underline underline-offset-2"
            >
              {t("Continue shopping", "مواصلة التسوق")}
            </Link>
            {!user && (
              <p className="mt-8 text-sm text-gray-500 flex items-center gap-1.5">
                <User size={15} />
                {t("Have an account?", "لديك حساب؟")}
                <Link href="/account" onClick={() => setOpen(false)} className="font-semibold text-gray-800 underline">
                  {t("Log in to check out faster.", "سجّل الدخول لإتمام أسرع.")}
                </Link>
              </p>
            )}
          </div>
        ) : (
          <>
            {/* Items */}
            <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
              {items.map((item) => (
                <div key={item.key} className="flex gap-3 pb-4 border-b border-black/5 last:border-0">
                  <img
                    src={item.image || "/assets/logo-v3.png"}
                    alt={item.name}
                    className="w-16 h-16 rounded-lg object-cover bg-white border border-black/5"
                  />
                  <div className="flex-1 min-w-0">
                    <Link
                      href={`/product/${item.product_id}`}
                      onClick={() => setOpen(false)}
                      className="block text-[13.5px] font-semibold leading-snug line-clamp-2 hover:text-[var(--color-primary)]"
                    >
                      {item.name}
                    </Link>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center border border-black/10 rounded-lg overflow-hidden">
                        <button
                          className="w-7 h-7 flex items-center justify-center hover:bg-black/5"
                          aria-label="Decrease quantity"
                          onClick={() =>
                            item.quantity <= 1 ? removeItem(item.key) : updateQuantity(item.key, item.quantity - 1)
                          }
                        >
                          <Minus size={13} />
                        </button>
                        <b className="min-w-6 text-center text-[13px]">{item.quantity}</b>
                        <button
                          className="w-7 h-7 flex items-center justify-center hover:bg-black/5"
                          aria-label="Increase quantity"
                          onClick={() => updateQuantity(item.key, item.quantity + 1)}
                        >
                          <Plus size={13} />
                        </button>
                      </div>
                      <span className="text-sm font-bold" dir="ltr">
                        {formatPrice((parseFloat(item.price) * item.quantity).toFixed(3), "KD", 3)}
                      </span>
                    </div>
                  </div>
                  <button
                    onClick={() => removeItem(item.key)}
                    aria-label="Remove item"
                    className="self-start text-gray-400 hover:text-red-500"
                  >
                    <Trash2 size={15} />
                  </button>
                </div>
              ))}
            </div>

            {/* Footer */}
            <div className="border-t border-black/10 px-5 py-4 bg-white">
              <div className="flex items-center justify-between mb-1">
                <span className="text-sm font-semibold">{t("Subtotal", "المجموع الفرعي")}</span>
                <span className="text-base font-bold" dir="ltr">{formatPrice(subtotal.toFixed(3), "KD", 3)}</span>
              </div>
              <p className="text-[11.5px] text-gray-500 mb-3">
                {t("Tax included. Shipping calculated at checkout.", "شامل الضريبة. يُحسب الشحن عند الدفع.")}
              </p>

              {/* Free delivery progress */}
              {subtotal < 10 && (
                <p className="text-[12px] text-[var(--color-primary)] font-semibold mb-3">
                  {t(`Add KD ${(10 - subtotal).toFixed(3)} more for FREE delivery!`, `أضف ${(10 - subtotal).toFixed(3)} د.ك للحصول على توصيل مجاني!`)}
                </p>
              )}

              <div className="grid grid-cols-2 gap-2">
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="h-11 flex items-center justify-center rounded-lg border-2 border-[var(--color-primary)] text-[var(--color-primary)] font-bold text-sm hover:bg-orange-50"
                >
                  {t("View Cart", "عرض السلة")}
                </Link>
                <Link
                  href="/cart"
                  onClick={() => setOpen(false)}
                  className="h-11 flex items-center justify-center rounded-lg bg-[var(--color-primary)] text-white font-bold text-sm hover:opacity-90"
                >
                  {t("Check out", "إتمام الشراء")}
                </Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
