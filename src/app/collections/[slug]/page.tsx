import { AnnouncementBar } from "@/components/layout/AnnouncementBar";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import productsData from "@/data/products.json";
import { getCollectionProducts } from "@/lib/collections";
import { CollectionBrowser } from "@/components/collection/CollectionBrowser";
import type { Product } from "@/lib/types";

type Params = Promise<{ slug: string }>;

export default async function CollectionPage({ params }: { params: Params }) {
  const { slug } = await params;
  const products = (Array.isArray(productsData) ? productsData : (productsData as { products: Product[] }).products) as Product[];
  const { def, items } = getCollectionProducts(products, slug);

  // Unknown collection -> hand off to search
  if (!def) {
    const query = decodeURIComponent(slug).replace(/-/g, " ");
    return (
      <meta httpEquiv="refresh" content={`0; url=/search?q=${encodeURIComponent(query)}`} />
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <AnnouncementBar />
      <Header />
      <main className="flex-1 page-container pt-16 pb-20">
        <h1 className="section-heading mb-10">{def.title_en}</h1>
        <CollectionBrowser items={items} />
      </main>
      <Footer />
      <WhatsAppButton />
    </div>
  );
}
