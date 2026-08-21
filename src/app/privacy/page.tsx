"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";
import { ShieldCheck, Database, Cookie, Lock, Mail, RefreshCcw } from "lucide-react";

const T = {
  title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
  subtitle: {
    en: "Your trust matters. This is exactly what we collect, why, and how we protect it.",
    ar: "ثقتك تهمنا. إليك بالتفصيل ما نجمعه، ولماذا، وكيف نحميه.",
  },
  updated: { en: "Last updated: January 2025", ar: "آخر تحديث: يناير 2025" },
  sections: [
    {
      icon: Database,
      en: ["What we collect", "Your name, contact details, delivery address, order history and optionally your WhatsApp number - nothing more. Browsing data (pages viewed) is collected anonymously to improve the store."],
      ar: ["ما نجمعه", "اسمك وبيانات التواصل وعنوان التوصيل وسجل طلباتك ورقم الواتساب (اختيارياً) - ولا شيء أكثر. كما نجمع بيانات تصفح مجهولة لتحسين المتجر."],
    },
    {
      icon: Lock,
      en: ["How we use it", "Strictly to process orders, arrange delivery, provide support and - only if you opt in - send you offers. We never sell or rent your personal data to anyone."],
      ar: ["كيف نستخدمها", "حصراً لمعالجة الطلبات وتنظيم التوصيل وتقديم الدعم - ولإرسال العروض فقط بموافقتك. نحن لا نبيع أو نؤجّر بياناتك الشخصية لأي جهة."],
    },
    {
      icon: Cookie,
      en: ["Cookies", "Essential cookies keep your cart and session working. Optional analytics cookies help us understand what shoppers love. You can disable them in your browser at any time."],
      ar: ["ملفات الارتباط", "الأساسية منها تحافظ على سلتك وجلستك، والاختيارية تساعدنا على فهم تفضيلات المتسوقين. يمكنك تعطيلها من متصفحك في أي وقت."],
    },
    {
      icon: ShieldCheck,
      en: ["Data security", "All traffic is encrypted (HTTPS), payments are handled by certified providers, and access to customer data is limited to trained staff only."],
      ar: ["أمن البيانات", "جميع الاتصالات مشفّرة (HTTPS)، والمدفوعات تُدار عبر مزودين معتمدين، والوصول إلى بيانات العملاء محصور بفريق مدرب فقط."],
    },
    {
      icon: RefreshCcw,
      en: ["Your rights", "You can request a copy of your data, correct it, or ask us to delete it entirely at any time - we respond within 48 hours."],
      ar: ["حقوقك", "يمكنك طلب نسخة من بياناتك أو تصحيحها أو حذفها نهائياً في أي وقت - ونرد خلال 48 ساعة."],
    },
    {
      icon: Mail,
      en: ["Contact us", "Questions about privacy? Email petstorekw@gmail.com or message us on WhatsApp +965 98805010."],
      ar: ["تواصل معنا", "أي سؤال عن الخصوصية؟ راسلنا على petstorekw@gmail.com أو واتساب +965 98805010."],
    },
  ],
};

export default function PrivacyPage() {
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
            <ShieldCheck size={44} strokeWidth={1.6} className="text-white/90 mb-3" />
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
