"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";

export default function PrivacyPage() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
          {lang === "ar" ? "سياسة الخصوصية" : "Privacy Policy"}
        </h1>
        <div className="prose prose-gray max-w-none space-y-4 text-gray-600">
          <p>
            {lang === "ar"
              ? "نحترم خصوصيتك ونلتزم بحماية بياناتك الشخصية."
              : "We respect your privacy and are committed to protecting your personal data."}
          </p>
          <h2 className="text-xl font-semibold text-gray-800">{lang === "ar" ? "جمع المعلومات" : "Information Collection"}</h2>
          <p>
            {lang === "ar"
              ? "نجمع المعلومات التي تقدمها طواعيةً عند التسجيل أو الشراء."
              : "We collect information you voluntarily provide when registering or making a purchase."}
          </p>
          <h2 className="text-xl font-semibold text-gray-800">{lang === "ar" ? "استخدام المعلومات" : "Information Use"}</h2>
          <p>
            {lang === "ar"
              ? "نستخدم معلوماتك لمعالجة الطلبات وتحسين خدماتنا."
              : "We use your information to process orders and improve our services."}
          </p>
          <h2 className="text-xl font-semibold text-gray-800">{lang === "ar" ? "حماية المعلومات" : "Data Protection"}</h2>
          <p>
            {lang === "ar"
              ? "ن采取 إجراءات أمنية مناسبة لحماية معلوماتك من الوصول غير المصرح به."
              : "We implement appropriate security measures to protect your information from unauthorized access."}
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
