"use client";

import { useState, useEffect, useMemo, use, useRef } from "react";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { ProductCard } from "@/components/product/ProductCard";
import { useLanguageStore, useCartStore } from "@/lib/store";
import { useUiStore } from "@/lib/ui-store";
import { formatPrice, getBestPrice, cn } from "@/lib/utils";
import { getProductBySlug } from "@/lib/data";
import storeData from "@/data/store.json";
import type { Product } from "@/lib/types";
import {
  ChevronRight, Minus, Plus, ShoppingCart, Truck, Zap,
  Headset, Banknote, RotateCcw, ShieldCheck,
} from "lucide-react";
import { useRouter } from "next/navigation";

const store = storeData as unknown as { phone: string };

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const lang = useLanguageStore((s) => s.lang);
  const addItem = useCartStore((s) => s.addItem);
  const setCartOpen = useUiStore((s) => s.setCartOpen);
  const router = useRouter();
  const [product, setProduct] = useState<Product | null>(null);
  const [related, setRelated] = useState<Product[]>([]);
  const [activeImg, setActiveImg] = useState(0);
  const [qty, setQty] = useState(1);
  const trackRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    getProductBySlug(slug).then((found) => {
      setProduct(found);
      if (found) {
        const cats = new Set((found.categories || []).map((c) => c.slug));
        import("@/data/products.json").then((mod) => {
          const raw = mod.default as unknown as Product[] | { products: Product[] };
          const all = (Array.isArray(raw) ? raw : raw.products) as Product[];
          setRelated(all.filter((p) => p.id !== found.id && (p.categories || []).some((c) => cats.has(c.slug))).slice(0, 8));
        });
      }
    });
  }, [slug]);

  const name = product ? (lang === "ar" && product.ar_name ? product.ar_name : product.name) : "";
  const best = product ? getBestPrice(product) : "0";
  const regular = product?.regular_price && parseFloat(product.regular_price) > parseFloat(best)
    ? product.regular_price : null;
  const discount = regular ? Math.round((1 - parseFloat(best) / parseFloat(regular)) * 100) : 0;
  const images = useMemo(() => (product ? (Array.isArray(product.images) ? product.images.map((i) => i.src) : []) : []), [product]);
  const hasThumbs = images.length > 1;
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
    setCartOpen(true);
  };

  const buyNow = () => {
    addToCart();
    setCartOpen(false);
    router.push("/cart");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 page-container py-6 w-full max-w-full overflow-x-hidden">
        {/* Breadcrumb */}
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
              {/* LEFT COLUMN: gallery + description.
                  Sticky info column releases when this ends */}
              <div className="pdp-left">
                <div className={cn("pdp-gallery", hasThumbs ? "has-thumbs" : "no-thumbs")}>
                  {/* Main image - swipeable strip on mobile, big frame on desktop */}
                  <div className="pdp-main-img-wrap">
                    <div
                      ref={trackRef}
                      className="pdp-mobile-slider"
                    >
                      {images.map((src, i) => (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          key={i}
                          src={src}
                          alt={name}
                          className={cn("pdp-main-img", !hasThumbs && i > 0 && "hidden", i !== activeImg && hasThumbs && "hidden md:block")}
                          onClick={() => setActiveImg(i)}
                        />
                      ))}
                    </div>
                    {discount > 0 && <span className="badge badge-sale">-{discount}%</span>}
                  </div>
                  {hasThumbs && (
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

              {/* INFO COLUMN (sticky on desktop) */}
              <div className="pdp-info">
                {discount > 0 && <span className="badge badge-sale mb-3 inline-block">Sale</span>}
                <h1 className="pdp-title">{name}</h1>

                <div className="pdp-price-row" dir="ltr">
                  <span className="pdp-price-current">{formatPrice(best, "KD", 3)}</span>
                  {regular && <span className="pdp-price-regular">{formatPrice(regular, "KD", 3)}</span>}
                  {discount > 0 && <span className="pdp-discount-chip">{discount}% OFF</span>}
                </div>

                <p className={cn("pdp-stock", !inStock && "out")}>
                  {inStock
                    ? (lang === "ar" ? "متوفر - جاهز للشحن" : "In stock - ready to ship")
                    : (lang === "ar" ? "غير متوفر حالياً" : "Out of stock")}
                </p>

                <div className="pdp-delivery-banner">
                  <Truck size={20} />
                  <div>
                    <h3>{lang === "ar" ? "في طريقه إليك" : "On Its Way By"}</h3>
                    <span>{lang === "ar" ? "توصيل في اليوم التالي" : "Next Day Delivery"}</span>
                  </div>
                </div>

                {/* Qty above, buttons below (source mobile/desktop pattern) */}
                <div className="pdp-buy-stack">
                  <div className="pdp-qty">
                    <button aria-label="Decrease quantity" onClick={() => setQty((q) => Math.max(1, q - 1))}><Minus size={15} /></button>
                    <b>{qty}</b>
                    <button aria-label="Increase quantity" onClick={() => setQty((q) => q + 1)}><Plus size={15} /></button>
                  </div>
                  <div className="pdp-buy-row">
                    <button className="pdp-add-btn" disabled={!inStock} onClick={addToCart}>
                      <ShoppingCart size={17} />
                      {inStock
                        ? (lang === "ar" ? "أضف إلى السلة" : "Add to cart")
                        : (lang === "ar" ? "غير متوفر" : "Out of stock")}
                    </button>
                    <button className="pdp-buy-now" disabled={!inStock} onClick={buyNow}>
                      <Zap size={16} />
                      {lang === "ar" ? "اشترِ الآن" : "Buy Now"}
                    </button>
                  </div>
                </div>

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
            </div>

            {related.length > 0 && <RelatedCarousel items={related} lang={lang} />}
          </>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}

function RelatedCarousel({ items, lang }: { items: Product[]; lang: string }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [page, setPage] = useState(0);
  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
  const perView = isMobile ? 2 : 5;

  const onScroll = () => {
    const el = trackRef.current;
    if (!el) return;
    const pages = Math.ceil(el.scrollWidth / el.clientWidth);
    setPage(Math.min(pages - 1, Math.round((el.scrollLeft / el.scrollWidth) * pages)));
  };
  const pages = Math.max(1, Math.ceil(items.length / perView));

  return (
    <section className="pdp-related">
      <h2>{lang === "ar" ? "منتجات ذات صلة" : "You may also like"}</h2>
      <div className="pdp-related-track" ref={trackRef} onScroll={onScroll}>
        {items.map((p) => (
          <div key={p.id} className="pdp-related-item">
            <ProductCard product={p} />
          </div>
        ))}
      </div>
      {pages > 1 && (
        <div className="pdp-related-dots">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to slide ${i + 1}`}
              className={i === page ? "active" : ""}
              onClick={() => {
                const el = trackRef.current;
                if (el) el.scrollTo({ left: (el.scrollWidth / pages) * i, behavior: "smooth" });
              }}
            />
          ))}
        </div>
      )}
    </section>
  );
}
