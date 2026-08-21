"use client";

import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";
import { HeartHandshake, Truck, ShieldCheck, Sparkles, PawPrint, Users } from "lucide-react";

const T = {
  title: { en: "About Us", ar: "من نحن" },
  subtitle: {
    en: "Your dependable partner in pethood - Kuwait's trusted destination for premium pet food, accessories and supplies.",
    ar: "شريكك الموثوق في عالم الحيوانات الأليفة - وجهة الكويت الأولى لأفضل الأعلاف والإكسسوارات واللوازم.",
  },
  storyTitle: { en: "Our Story", ar: "قصتنا" },
  story1: {
    en: "Pet Store began with a simple belief: pets are family. From a small passion project in Kuwait, we grew into the country's most trusted online pet store - serving thousands of pet parents who want nothing but the best for their companions.",
    ar: "بدأ متجر بت ستور بفكرة بسيطة: الحيوانات الأليفة عائلة. من مشروع صغير مدفوع بالشغف في الكويت، أصبحنا أكثر متجر أليف موثوق إلكترونياً في البلاد، ونخدم آلاف آباء الحيوانات الذين يريدون الأفضل لرفاقهم.",
  },
  story2: {
    en: "Today we stock everything from premium nutrition and freeze-dried raw diets to toys, grooming essentials and habitats - for dogs, cats, birds, fish and small pets - sourced only from world-renowned brands.",
    ar: "اليوم نوفر كل شيء من التغذية الفاخرة والأغذية المجمدة نيئة إلى الألعاب وأدوات العناية والمساكن - للكلاب والقطط والطيور والأسماك والحيوانات الصغيرة - ومن علامات تجارية عالمية معروفة فقط.",
  },
  values: [
    { icon: ShieldCheck, en: ["Quality First", "Every product is hand-picked from trusted global brands and stored with care."], ar: ["الجودة أولاً", "كل منتج مختار بعناية من علامات موثوقة ويُخزَّن بأعلى المعايير."] },
    { icon: Truck, en: ["Fast Delivery", "Same-day delivery across Kuwait, free on orders over KD 10."], ar: ["توصيل سريع", "توصيل في نفس اليوم لجميع مناطق الكويت، مجاناً للطلبات فوق 10 د.ك."] },
    { icon: HeartHandshake, en: ["Pet-Parent Care", "Real animal lovers on support, ready to help you choose right."], ar: ["رعاية آباء الحيوانات", "عشاق حقيقيون للحيوانات في فريق الدعم لمساعدتك في الاختيار الصحيح."] },
    { icon: Sparkles, en: ["Always Improving", "New brands, new categories and better experiences, every month."], ar: ["تحسين مستمر", "علامات جديدة وفئات جديدة وتجربة أفضل كل شهر."] },
  ],
  stats: [
    { n: "500+", en: ["Premium products"], ar: ["منتجاً فاخراً"] },
    { n: "30+", en: ["Trusted brands"], ar: ["علامة موثوقة"] },
    { n: "100%", en: ["Genuine goods"], ar: ["منتجات أصلية"] },
    { n: "24h", en: ["Kuwait-wide delivery"], ar: ["توصيل لكل الكويت"] },
  ],
  ctaTitle: { en: "Ready to spoil your pet?", ar: "جاهز لإسعاد حيوانك الأليف؟" },
  ctaText: {
    en: "Explore hundreds of hand-picked products for every companion.",
    ar: "استكشف مئات المنتجات المختارة بعناية لكل رفيق.",
  },
  ctaBtn: { en: "Shop Now", ar: "تسوق الآن" },
};

export default function AboutPage() {
  const lang = useLanguageStore((s) => s.lang);
  const t = (o: Record<string, string>) => o[lang];
  const dir = lang === "ar" ? "rtl" : "ltr";

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1" dir={dir}>
        {/* Hero band */}
        <section className="about-hero">
          <div className="page-container about-hero-inner">
            <PawPrint size={44} strokeWidth={1.6} className="text-white/90 mb-3" />
            <h1 className="about-hero-title">{t(T.title)}</h1>
            <p className="about-hero-sub">{t(T.subtitle)}</p>
          </div>
        </section>

        {/* Stats strip */}
        <section className="page-container">
          <div className="about-stats">
            {T.stats.map((s, i) => (
              <div key={i} className="about-stat">
                <div className="about-stat-n">{s.n}</div>
                <div className="about-stat-l">{t({ en: s.en[0], ar: s.ar[0] })}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Story */}
        <section className="page-container about-story">
          <div className="about-story-card">
            <Users size={26} className="about-card-icon" />
            <h2 className="about-h2">{t(T.storyTitle)}</h2>
            <p className="about-p">{t(T.story1)}</p>
            <p className="about-p">{t(T.story2)}</p>
          </div>
        </section>

        {/* Values */}
        <section className="page-container">
          <div className="about-values">
            {T.values.map((v, i) => (
              <div key={i} className="about-value-card">
                <v.icon size={28} className="about-card-icon" />
                <h3>{lang === "ar" ? v.ar[0] : v.en[0]}</h3>
                <p>{lang === "ar" ? v.ar[1] : v.en[1]}</p>
              </div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="page-container pb-14">
          <div className="about-cta">
            <h2>{t(T.ctaTitle)}</h2>
            <p>{t(T.ctaText)}</p>
            <Link href="/" className="about-cta-btn">{t(T.ctaBtn)}</Link>
          </div>
        </section>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
