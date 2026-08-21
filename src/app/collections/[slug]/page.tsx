import { redirect } from "next/navigation";
import Link from "next/link";
import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import productsData from "@/data/products.json";
import { getCollectionProducts } from "@/lib/collections";
import { ProductCard } from "@/components/product/ProductCard";
import type { Product } from "@/lib/types";

type Params = Promise<{ slug: string }>;

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const products = (Array.isArray(productsData) ? productsData : (productsData as { products: Product[] }).products) as Product[];
  const { def, items } = getCollectionProducts(products, slug);

  // Unknown collection -> hand off to search
  if (!def) {
    const query = decodeURIComponent(slug).replace(/-/g, " ");
    redirect(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 page-container py-10">
        <h1 className="section-heading mb-2">{def!.title_en}</h1>
        <p className="text-sm text-gray-500 mb-6" dir="ltr">
          {items.length} {items.length === 1 ? "product" : "products"}
        </p>
        {items.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-gray-500 mb-4">No products in this collection yet.</p>
            <Link href="/" className="text-[var(--color-primary)] font-semibold underline">
              Back to home
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {items.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
