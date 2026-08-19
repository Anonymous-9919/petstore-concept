"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";

export default function AboutPage() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
          {lang === "ar" ? "من نحن" : "About Us"}
        </h1>
        <div className="prose prose-gray max-w-none">
          <p className="text-gray-600 leading-relaxed mb-4">
            {lang === "ar"
              ? "متجر الحيوانات الأليفة الموثوق في الكويت يقدم أعلاف حيوانات فاخرة وإكسسوارات ولوازم للكلاب والقطط والطيور والأسماك والحيوانات الصغيرة."
              : "Kuwait's trusted pet store offering premium pet food, accessories, and supplies for dogs, cats, birds, fish, and small pets."}
          </p>
          <p className="text-gray-600 leading-relaxed mb-4">
            {lang === "ar"
              ? "نقدم أفضل المنتجات من العلامات التجارية العالمية المعروفة لضمان صحة وسعادة حيواناتك الأليفة."
              : "We offer the best products from world-renowned brands to ensure the health and happiness of your pets."}
          </p>
          <p className="text-gray-600 leading-relaxed">
            {lang === "ar"
              ? "توصيل مجاني للطلبات فوق 10 د.ك - توصيل في نفس اليوم متاح!"
              : "Free delivery on orders over KD 10 - Same day delivery available!"}
          </p>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
