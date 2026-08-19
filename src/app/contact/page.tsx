"use client";

import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { useLanguageStore } from "@/lib/store";
import { Phone, Mail, MapPin } from "lucide-react";

export default function ContactPage() {
  const lang = useLanguageStore((s) => s.lang);

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-bold mb-6" style={{ color: "var(--color-primary)" }}>
          {lang === "ar" ? "تواصل معنا" : "Contact Us"}
        </h1>
        <div className="grid md:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-semibold mb-4">{lang === "ar" ? "معلومات الاتصال" : "Contact Information"}</h2>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <Phone size={20} style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="font-medium">{lang === "ar" ? "الهاتف" : "Phone"}</p>
                  <a href="tel:+96598805010" className="text-gray-600 hover:underline">+965 98805010</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Mail size={20} style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="font-medium">{lang === "ar" ? "البريد الإلكتروني" : "Email"}</p>
                  <a href="mailto:petstorekw@gmail.com" className="text-gray-600 hover:underline">petstorekw@gmail.com</a>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <MapPin size={20} style={{ color: "var(--color-primary)" }} />
                <div>
                  <p className="font-medium">{lang === "ar" ? "العنوان" : "Address"}</p>
                  <p className="text-gray-600">{lang === "ar" ? "الكويت" : "Kuwait"}</p>
                </div>
              </div>
            </div>
          </div>
          <div>
            <h2 className="text-xl font-semibold mb-4">{lang === "ar" ? "أرسل لنا رسالة" : "Send us a Message"}</h2>
            <form className="space-y-4">
              <input type="text" placeholder={lang === "ar" ? "الاسم" : "Name"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <input type="email" placeholder={lang === "ar" ? "البريد الإلكتروني" : "Email"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <textarea rows={4} placeholder={lang === "ar" ? "الرسالة" : "Message"} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-orange-500" />
              <button type="submit" className="btn-primary w-full">{lang === "ar" ? "إرسال" : "Send"}</button>
            </form>
          </div>
        </div>
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
