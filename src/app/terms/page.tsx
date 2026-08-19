"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";

export default function TermsPage() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
          {lang === "ar" ? "الشروط والأحكام" : "Terms & Conditions"}
        </h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>
            {lang === "ar"
              ? "مرحباً بك في متجر الحيوانات الأليفة. باستخدامك لموقعنا فإنك توافق على هذه الشروط."
              : "Welcome to Pet Store. By using our website, you agree to these terms and conditions."}
          </p>
          <h2 className="text-xl font-semibold text-gray-800">{lang === "ar" ? "الطلبات" : "Orders"}</h2>
          <p>
            {lang === "ar"
              ? "جميع الطلبات خاضعة للتوفر. نحتفظ بحق رفض أو إلغاء أي طلب."
              : "All orders are subject to availability. We reserve the right to refuse or cancel any order."}
          </p>
          <h2 className="text-xl font-semibold text-gray-800">{lang === "ar" ? "الأسعار" : "Pricing"}</h2>
          <p>
            {lang === "ar"
              ? "جميع الأسعار بالدينار الكويتي وتشمل ضريبة القيمة المضافة ما لم يُذكر خلاف ذلك."
              : "All prices are in Kuwaiti Dinar and include VAT unless otherwise stated."}
          </p>
          <h2 className="text-xl font-semibold text-gray-800">{lang === "ar" ? "المرتجعات" : "Returns"}</h2>
          <p>
            {lang === "ar"
              ? "يمكنك إرجاع المنتجات خلال 14 يوماً من الاستلام بحالتها الأصلية."
              : "You may return products within 14 days of receipt in their original condition."}
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
