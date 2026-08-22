"use client";

import { useState, useEffect, useMemo, use } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProductCard } from "@/components/product/ProductCard";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { formatPrice, getBestPrice, cn } from "@/lib/utils";
import { getProductBySlug } from "@/lib/data";
import storeData from "@/data/store.json";
import type { Product } from "@/lib/types";
import {
  ChevronRight, Minus, Plus, ShoppingCart, Truck,
  Headset, Banknote, RotateCcw, ShieldCheck,
} from "lucide-react";

const store = storeData as unknown as { phone: string };

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const lang = useLanguageStore((s) => s.lang);
  const addItem = useCartStore((s) => s.addItem);
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);

  useEffect(() => {
    import("@/data/products.json").then((mod) => {
      const raw = mod.default as unknown as Product[] | { products: Product[] };
      const all = (Array.isArray(raw) ? raw : raw.products) as Product[];
      const found = all.find((p) => p.slug === slug) || null;
      setProduct(found);
      if (found) {
        const cats = new Set((found.categories || []).map((c) => c.slug));
        setRelated(all.filter((p) => p.id !== found.id && (p.categories || []).some((c) => cats.has(c.slug))).slice(0, 8));
      }
    });
  }, [slug]);

  const name = product ? (lang === "ar" && product.ar_name ? product.ar_name : product.name) : "";
  const best = product ? getBestPrice(product) : "0";
  const regular = product?.regular_price && parseFloat(product.regular_price) > parseFloat(best)
    ? product.regular_price : null;
  const discount = regular ? Math.round((1 - parseFloat(best) / parseFloat(regular)) * 100) : 0;
  const images = useMemo(() => (product ? (Array.isArray(product.images) ? product.images.map((i) => i.src) : []) : []), [product]);
  const inStock = product?.stock_status !== "outofstock";

  const addToCart = () => {
    if (!product) return;
    addItem({
      key: `${product.id}-default`,
      product_id: product.id,
      variation_id: 0,
      quantity: qty,
      name: lang === "ar" && product.ar_name ? product.ar_name : product.name,
      price: best,
      image: images[0] || "",
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 page-container py-6">
        {/* Breadcrumb - Home / Title */}
        <nav className="pdp-breadcrumb">
          <Link href="/">{lang === "ar" ? "الرئيسية" : "Home"}</Link>
          <ChevronRight size={13} className="rtl:rotate-180" />
          <span className="truncate">{name}</span>
        </nav>

        {!product ? (
          <div className="py-24 text-center text-gray-400">Loading…</div>
        ) : (
          <>
            <div className="pdp-grid">
              {/* Left column: gallery + description (keeps sticky info
                  pinned while all content scrolls - source-site behaviour) */}
              <div className="pdp-gallery">
                <div className="pdp-main-img">
                  {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={images[activeImg] || images[0]} alt={name} />
                </div>
                {images.length > 1 && (
                  <div className="pdp-thumbs">
                    {images.map((src, i) => (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        key={i}
                        src={src}
                        alt=""
                        className={cn("pdp-thumb", i === activeImg && "active")}
                        onClick={() => setActiveImg(i)}
                      />
                    ))}
                  </div>
                )}
              </div>

              {/* Info column (sticky on desktop) */}
              <div className="pdp-info">
                {discount > 0 && <span className="badge badge-sale mb-3 inline-block">Sale</span>}
                <h1 className="pdp-title">{name}</h1>

                {/* Price row */}
                <div className="pdp-price-row" dir="ltr">
                  <span className="pdp-price-current">{formatPrice(best, "KD", 3)}</span>
                  {regular && (
                    <span className="pdp-price-regular">{formatPrice(regular, "KD", 3)}</span>
                  )}
                  {discount > 0 && <span className="pdp-discount-chip">{discount}% OFF</span>}
                </div>

                {/* Stock note */}
                <p className={cn("pdp-stock", !inStock && "out")}>
                  {inStock
                    ? (lang === "ar" ? "متوفر - جاهز للشحن" : "In stock - ready to ship")
                    : (lang === "ar" ? "غير متوفر حالياً" : "Out of stock")}
                </p>

                {/* Delivery banner */}
                <div className="pdp-delivery-banner">
                  <Truck size={20} />
                  <div>
                    <h3>{lang === "ar" ? "في طريقه إليك" : "On Its Way By"}</h3>
                    <span>{lang === "ar" ? "توصيل في اليوم التالي" : "Next Day Delivery"}</span>
                  </div>
                </div>

                {/* Quantity + Add to cart */}
                <div className="pdp-buy-row">
                  <div className="pdp-qty">
                    <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={15} /></button>
                    <b>{qty}</b>
                    <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}><Plus size={15} /></button>
                  </div>
                  <button
                    className="pdp-add-btn"
                    disabled={!inStock}
                    onClick={addToCart}
                  >
                    <ShoppingCart size={17} />
                    {inStock
                      ? (lang === "ar" ? "أضف إلى السلة" : "Add to cart")
                      : (lang === "ar" ? "غير متوفر" : "Out of stock")}
                  </button>
                </div>

                {/* Shop with confidence */}
                <div className="pdp-confidence">
                  <h3>{lang === "ar" ? "تسوق بثقة" : "Shop with Confidence"}</h3>
                  <div className="pdp-confidence-row">
                    <div><Headset size={18} /><span dir="ltr">{store.phone}</span></div>
                    <div><Banknote size={18} /><span>{lang === "ar" ? "الدفع عند الاستلام" : "Pay on delivery"}</span></div>
                    <div><RotateCcw size={18} /><span>{lang === "ar" ? "إرجاع سهل" : "Easy returns"}</span></div>
                    <div><ShieldCheck size={18} /><span>{lang === "ar" ? "دفع آمن" : "Secure payment"}</span></div>
                  </div>
                </div>
              </div>

              {/* Description lives in the LEFT column (under the gallery) so the
                  sticky info column stays pinned while everything scrolls */}
              <div className="pdp-left-extra">
                {(product.description || product.ar_description) && (
                  <section className="pdp-desc">
                    <h2>{lang === "ar" ? "وصف المنتج" : "Description"}</h2>
                    <div
                      className="pdp-desc-body"
                      dangerouslySetInnerHTML={{ __html: lang === "ar" && product.ar_description ? product.ar_description : product.description || "" }}
                    />
                  </section>
                )}
              </div>
            </div>

            {/* Related products */}
            {related.length > 0 && (
              <section className="pdp-related">
                <h2>{lang === "ar" ? "منتجات ذات صلة" : "You may also like"}</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
                  {related.map((p) => (
                    <ProductCard key={p.id} product={p} />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
