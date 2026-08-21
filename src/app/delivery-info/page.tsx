"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";
import { Truck, Clock, MapPin, BadgeDollarSign, PackageCheck, ShieldQuestion } from "lucide-react";

const T = {
  title: { en: "Delivery Information", ar: "معلومات التوصيل" },
  subtitle: {
    en: "Fast, careful delivery to every corner of Kuwait - here is exactly how it works.",
    ar: "توصيل سريع وآمن إلى كل أنحاء الكويت - إليك كيف تعمل الخدمة بالتفصيل.",
  },
  cards: [
    { icon: Truck, en: ["Free Delivery", "On all orders over KD 10 - automatically applied at checkout."], ar: ["توصيل مجاني", "لجميع الطلبات فوق 10 د.ك - يُطبَّق تلقائياً عند الدفع."] },
    { icon: Clock, en: ["Same-Day Delivery", "Order before 2 PM and receive your order the very same day."], ar: ["توصيل في نفس اليوم", "اطلب قبل الساعة 2 ظهراً واستلم طلبك في نفس اليوم."] },
    { icon: MapPin, en: ["All Kuwait Covered", "We deliver to every governorate and area in Kuwait."], ar: ["كل مناطق الكويت", "نوصل إلى جميع المحافظات والمناطق في الكويت."] },
    { icon: BadgeDollarSign, en: ["Simple Charges", "A flat KD 1 delivery fee for orders under KD 10."], ar: ["رسوم بسيطة", "رسوم توصيل ثابتة 1 د.ك فقط للطلبات أقل من 10 د.ك."] },
  ],
  stepsTitle: { en: "How it works", ar: "كيف تطلب؟" },
  steps: [
    { en: ["Place your order", "Add products to your cart and checkout in under a minute."], ar: ["أتمم طلبك", "أضف المنتجات إلى السلة وأكمل الدفع في أقل من دقيقة."] },
    { en: ["We pack with care", "Your items are inspected and securely packed the same day."], ar: ["نجهّز طلبك بعناية", "نفحص منتجاتك ونغلّفها بأمان في نفس اليوم."] },
    { en: ["Fast doorstep delivery", "Our courier brings everything straight to your door."], ar: ["توصيل سريع حتى الباب", "يصلك الطلب مباشرة إلى باب منزلك."] },
  ],
  noteTitle: { en: "Good to know", ar: "معلومات مفيدة" },
  notes: [
    { en: "You will receive an SMS/WhatsApp confirmation when your order is on its way.", ar: "ستصلك رسالة تأكيد عبر الرسائل أو واتساب عندما يكون طلبك في الطريق." },
    { en: "Cash on delivery is available for all areas.", ar: "الدفع عند الاستلام متاح لجميع المناطق." },
    { en: "Perishable items (frozen/raw food) are delivered in insulated packaging.", ar: "تُسلَّم المنتجات الحساسة (المجمدة/النيئة) في عبوات حافظة للحرارة." },
  ],
  faqTitle: { en: "Common questions", ar: "أسئلة شائعة" },
  faqs: [
    { q: { en: "When will my order arrive?", ar: "متى يصل طلبي؟" }, a: { en: "Orders before 2 PM arrive the same day; later orders arrive next day.", ar: "الطلبات قبل 2 ظهراً تصل في نفس اليوم، وما بعدها يصل في اليوم التالي." } },
    { q: { en: "Is delivery really free?", ar: "هل التوصيل مجاني فعلاً؟" }, a: { en: "Yes - free over KD 10, otherwise a flat KD 1 fee.", ar: "نعم - مجاناً فوق 10 د.ك، وإلا فرسوم ثابتة 1 د.ك." } },
    { q: { en: "Can I track my order?", ar: "هل يمكنني تتبع طلبي؟" }, a: { en: "You'll get status updates by WhatsApp/SMS until delivery.", ar: "ستصلك تحديثات الحالة عبر واتساب/رسائل حتى التسليم." } },
  ],
};

export default function DeliveryInfoPage() {
  const lang = useLanguageStore((s) => s.lang);
  const t = (o: Record<string, string>) => o[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1" dir={dir}>
        <section className="about-hero">
          <div className="page-container about-hero-inner">
            <Truck size={44} strokeWidth={1.6} className="text-white/90 mb-3" />
            <h1 className="about-hero-title">{t(T.title)}</h1>
            <p className="about-hero-sub">{t(T.subtitle)}</p>
          </div>
        </section>

        <section className="page-container pt-10">
          <div className="about-values">
            {T.cards.map((c, i) => (
              <div key={i} className="about-value-card">
                <c.icon size={28} className="about-card-icon" />
                <h3>{lang === "ar" ? c.ar[0] : c.en[0]}</h3>
                <p>{lang === "ar" ? c.ar[1] : c.en[1]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Steps */}
        <section className="page-container pt-4">
          <h2 className="about-h2 text-center">{t(T.stepsTitle)}</h2>
          <div className="about-steps">
            {T.steps.map((s, i) => (
              <div key={i} className="about-step">
                <div className="about-step-n">{i + 1}</div>
                <h3>{lang === "ar" ? s.ar[0] : s.en[0]}</h3>
                <p>{lang === "ar" ? s.ar[1] : s.en[1]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Notes + FAQ */}
        <section className="page-container grid md:grid-cols-2 gap-6 pb-14">
          <div className="about-story-card">
            <PackageCheck size={26} className="about-card-icon" />
            <h2 className="about-h2">{t(T.noteTitle)}</h2>
            <ul className="about-list">
              {T.notes.map((n, i) => (
                <li key={i}>{lang === "ar" ? n.ar : n.en}</li>
              ))}
            </ul>
          </div>
          <div className="about-story-card">
            <ShieldQuestion size={26} className="about-card-icon" />
            <h2 className="about-h2">{t(T.faqTitle)}</h2>
            <div className="space-y-4">
              {T.faqs.map((f, i) => (
                <div key={i}>
                  <p className="font-semibold text-[15px] mb-1">{t(f.q)}</p>
                  <p className="about-p !mb-0">{t(f.a)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
