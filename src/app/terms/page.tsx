"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";
import { FileText, ShoppingCart, Truck, RotateCcw, CreditCard, Gavel, UserCheck, Copyright } from "lucide-react";

const T = {
  title: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
  subtitle: {
    en: "The simple, fair rules that keep Pet Store running smoothly for everyone.",
    ar: "قواعد بسيطة وعادلة تجعل تجربتك في متجر بت ستور سلسة للجميع.",
  },
  updated: { en: "Last updated: January 2025", ar: "آخر تحديث: يناير 2025" },
  sections: [
    {
      icon: Gavel,
      en: ["Agreement", "By browsing or ordering from Pet Store you agree to these terms. If you disagree with any part, please contact us before placing an order."],
      ar: ["الاتفاقية", "بتصفحك أو الطلب من متجر بت ستور فأنت توافق على هذه الشروط. إذا لم توافق على أي بند، يرجى التواصل معنا قبل إتمام الطلب."],
    },
    {
      icon: ShoppingCart,
      en: ["Orders & pricing", "All prices are in Kuwaiti Dinar (KD) and include VAT where applicable. We reserve the right to cancel orders with pricing errors; you would be notified and refunded immediately."],
      ar: ["الطلبات والأسعار", "جميع الأسعار بالدينار الكويتي وتشمل الضريبة حيث تنطبق. نحتفظ بحق إلغاء الطلبات ذات أخطاء التسعير مع إشعارك واسترداد المبلغ فوراً."],
    },
    {
      icon: Truck,
      en: ["Delivery", "Same-day delivery for orders placed before 2 PM across Kuwait. Free over KD 10, otherwise KD 1 flat. Someone must be available at the address to receive the order."],
      ar: ["التوصيل", "توصيل نفس اليوم للطلبات قبل 2 ظهراً في جميع أنحاء الكويت. مجاناً فوق 10 د.ك، وإلا فرسوم ثابتة 1 د.ك. يجب توفر شخص لاستلام الطلب في العنوان."],
    },
    {
      icon: RotateCcw,
      en: ["Returns", "Unopened products in original condition can be returned within 7 days of delivery. Frozen/raw foods cannot be returned for safety reasons."],
      ar: ["الإرجاع", "يمكن إرجاع المنتجات غير المفتوحة وبحالتها الأصلية خلال 7 أيام من الاستلام. لا يمكن إرجاع الأغذية المجمدة/النيئة لأسباب تتعلق بالسلامة."],
    },
    {
      icon: CreditCard,
      en: ["Payments", "We accept cash on delivery and major payment methods shown at checkout. Payment is processed securely through certified providers - we never store card details."],
      ar: ["الدفع", "نقبل الدفع عند الاستلام وطرق الدفع المعروضة في صفحة الشراء. تُعالَج المدفوعات بأمان عبر مزودين معتمدين - لا نخزّن بيانات البطاقات أبداً."],
    },
    {
      icon: UserCheck,
      en: ["Accounts & content", "You are responsible for keeping your account details accurate. Reviews must be lawful and respectful; abusive content may be removed."],
      ar: ["الحسابات والمحتوى", "أنت مسؤول عن دقة بيانات حسابك. يجب أن تكون المراجعات قانونية ومحترمة؛ وقد يُحذف المحتوى المسيء."],
    },
    {
      icon: Copyright,
      en: ["Intellectual property", "The Pet Store name, logo and site design are our property. Product names and brand logos belong to their respective owners."],
      ar: ["الملكية الفكرية", "اسم متجر بت ستور وشعاره وتصميم الموقع ملك لنا. أسماء المنتجات وشعارات العلامات ملك لأصحابها."],
    },
    {
      icon: FileText,
      en: ["Changes to these terms", "We may update these terms occasionally; the current version always lives on this page with its revision date."],
      ar: ["تغييرات الشروط", "قد نحدّث هذه الشروط من وقت لآخر، وتبقى النسخة الحالية معروضة في هذه الصفحة مع تاريخ التحديث."],
    },
  ],
};

export default function TermsPage() {
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
            <FileText size={44} strokeWidth={1.6} className="text-white/90 mb-3" />
            <h1 className="about-hero-title">{t(T.title)}</h1>
            <p className="about-hero-sub">{t(T.subtitle)}</p>
            <p className="text-white/70 text-sm mt-2">{t(T.updated)}</p>
          </div>
        </section>

        <section className="page-container pt-10 pb-14">
          <div className="about-values !grid-cols-1 md:!grid-cols-2">
            {T.sections.map((s, i) => (
              <div key={i} className="about-value-card">
                <s.icon size={26} className="about-card-icon" />
                <h3>{lang === "ar" ? s.ar[0] : s.en[0]}</h3>
                <p>{lang === "ar" ? s.ar[1] : s.en[1]}</p>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
