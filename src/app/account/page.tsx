"use client";

import { useState } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { useAccountStore } from "@/lib/auth";
import { User, LogOut, Package, ShoppingCart, Heart, MapPin } from "lucide-react";

export default function AccountPage() {
  const lang = useLanguageStore((s) => s.lang);
  const user = useAccountStore((s) => s.user);
  const register = useAccountStore((s) => s.register);
  const login = useAccountStore((s) => s.login);
  const logout = useAccountStore((s) => s.logout);
  const cartCount = useCartStore((s) => s.items.reduce((n, i) => n + i.quantity, 0));

  const [mode, setMode] = useState<"login" | "register">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const t = (en: string, ar: string) => (lang === "ar" ? ar : en);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const res = mode === "login" ? await login(email, password) : await register(name, email, password);
    if (!res.ok) setError(res.error || "Something went wrong");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 page-container pt-20 pb-32">
        {!user ? (
          /* ---------------- LOGIN / REGISTER ---------------- */
          <div className="max-w-md mx-auto">
            <div className="text-center mb-12">
              <div className="w-16 h-16 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center mx-auto mb-5 shadow-lg shadow-orange-500/20">
                <User size={30} />
              </div>
              <h1 className="section-heading !mb-2">{t("Welcome to your account", "مرحباً بك في حسابك")}</h1>
              <p className="text-sm text-gray-500 leading-relaxed">
                {t(
                  "Sign in to sync your cart and order history across devices.",
                  "سجّل الدخول لمزامنة سلتك وسجل طلباتك عبر جميع الأجهزة."
                )}
              </p>
            </div>

            <div className="flex gap-2 mb-7 bg-black/[0.04] rounded-xl p-1.5">
              {(["login", "register"] as const).map((m) => (
                <button
                  key={m}
                  onClick={() => { setMode(m); setError(""); }}
                  className={`flex-1 py-3 text-sm font-bold rounded-lg transition-all ${
                    mode === m
                      ? "bg-[var(--color-primary)] text-white shadow-md"
                      : "text-gray-500 hover:text-gray-800"
                  }`}
                >
                  {m === "login" ? t("Sign in", "تسجيل الدخول") : t("Create account", "إنشاء حساب")}
                </button>
              ))}
            </div>

            <form onSubmit={submit} className="space-y-4">
              {mode === "register" && (
                <input
                  type="text" required placeholder={t("Full name", "الاسم الكامل")}
                  value={name} onChange={(e) => setName(e.target.value)}
                  className="account-input"
                />
              )}
              <input
                type="email" required placeholder={t("Email address", "البريد الإلكتروني")}
                value={email} onChange={(e) => setEmail(e.target.value)}
                className="account-input"
              />
              <input
                type="password" required placeholder={t("Password", "كلمة المرور")}
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="account-input"
              />
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" className="account-submit">
                {mode === "login" ? t("Sign in", "تسجيل الدخول") : t("Create my account", "أنشئ حسابي")}
              </button>
            </form>
          </div>
        ) : (
          /* ---------------- LOGGED IN DASHBOARD ---------------- */
          <div className="max-w-3xl mx-auto">
            <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-[var(--color-primary)] text-white flex items-center justify-center text-xl font-bold">
                  {user.name.charAt(0).toUpperCase()}
                </div>
                <div>
                  <h1 className="section-heading !mb-1">{user.name}</h1>
                  <p className="text-sm text-gray-500" dir="ltr">{user.email}</p>
                </div>
              </div>
              <button onClick={logout} className="btn-outline flex items-center gap-2 text-sm">
                <LogOut size={15} /> {t("Log out", "تسجيل الخروج")}
              </button>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <Link href="/cart" className="account-card">
                <ShoppingCart size={22} />
                <h3>{t("Your Cart", "سلتك")}</h3>
                <p>{cartCount} {t("items waiting", "منتجات بانتظارك")}</p>
              </Link>
              <Link href="/wishlist" className="account-card">
                <Heart size={22} />
                <h3>{t("Wishlist", "قائمة الأمنيات")}</h3>
                <p>{t("Saved for later", "محفوظة لللاحقاً")}</p>
              </Link>
            </div>

            <div className="account-card !cursor-default">
              <Package size={22} />
              <h3>{t("Order History", "سجل الطلبات")}</h3>
              <p className="mb-3">
                {t(
                  "No orders yet. Your purchases will appear here once you complete an order.",
                  "لا توجد طلبات بعد. ستظهر مشترياتك هنا بعد إتمام الطلب."
                )}
              </p>
              <Link href="/" className="text-sm font-semibold text-[var(--color-primary)] underline">
                {t("Start shopping", "ابدأ التسوق")}
              </Link>
            </div>

            <div className="account-card mt-4 !cursor-default opacity-80">
              <MapPin size={22} />
              <h3>{t("Addresses", "العناوين")}</h3>
              <p>{t("Manage delivery addresses after your first order.", "أدر عناوين التوصيل بعد أول طلب.")}</p>
            </div>
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
