"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";

export default function DeliveryInfoPage() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
          {lang === "ar" ? "معلومات التوصيل" : "Delivery Information"}
        </h1>
        <div className="prose prose-gray max-w-none space-y-6">
          <div className="bg-orange-50 p-6 rounded-lg">
            <h2 className="text-xl font-semibold mb-2">{lang === "ar" ? "توصيل مجاني" : "Free Delivery"}</h2>
            <p className="text-gray-600">
              {lang === "ar"
                ? "توصيل مجاني للطلبات فوق 10 د.ك"
                : "Free delivery on orders over KD 10"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">{lang === "ar" ? "توصيل في نفس اليوم" : "Same Day Delivery"}</h2>
            <p className="text-gray-600">
              {lang === "ar"
                ? "طلبات قبل الساعة 2ظ تُسلَّم في نفس اليوم"
                : "Orders placed before 2 PM are delivered same day"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">{lang === "ar" ? "مناطق التوصيل" : "Delivery Areas"}</h2>
            <p className="text-gray-600">
              {lang === "ar"
                ? "نوصّل لجميع مناطق الكويت"
                : "We deliver to all areas in Kuwait"}
            </p>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-2">{lang === "ar" ? "رسوم التوصيل" : "Delivery Charges"}</h2>
            <p className="text-gray-600">
              {lang === "ar"
                ? "رسوم توصيل 1 د.ك للطلبات تحت 10 د.ك"
                : "Delivery charge of KD 1 for orders under KD 10"}
            </p>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
