import { redirect } from "next/navigation";
import categoriesData from "@/data/categories.json";

type Params = Promise<{ slug: string }>;

// Slugs that are real categories -> /category/<slug>.
// Everything else is treated as a search term (brand or life-stage).
const CATEGORY_SLUGS = new Set(
  ((Array.isArray(categoriesData) ? categoriesData : (categoriesData as { categories?: { slug: string }[] }).categories) || []).map(
    (c) => c.slug
  )
);

// Life-stage collection names search better with shorter queries
const SEARCH_QUERY_MAP: Record<string, string> = {
  "puppy-dog-food": "puppy",
  "adult-dog-food": "adult dog",
  "senior-dog-food": "senior",
  "kitten-cat-food": "kitten",
  "adult-cat-food": "adult cat",
  "senior-cat-food": "senior cat",
  "stella-chewys": "stella",
  "dog-beds": "bed",
  "dog-supplies": "dog",
};

export default async function CollectionRedirect({ params }: { params: Params }) {
  const { slug } = await params;

  if (CATEGORY_SLUGS.has(slug)) {
    redirect(`/category/${slug}`);
  }

  const query = SEARCH_QUERY_MAP[slug] ?? decodeURIComponent(slug).replace(/-/g, " ");
  redirect(`/search?q=${encodeURIComponent(query)}`);
}
