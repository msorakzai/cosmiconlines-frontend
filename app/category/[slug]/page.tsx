import CategoryClient from "./CategoryClient";
import { marketplaceCategories } from "@/data/categories";

export default function CategoryPage({ params }: { params: { slug: string } }) {
  return <CategoryClient slug={params.slug} />;
}

export async function generateStaticParams() {
  const slugs = Object.values(marketplaceCategories)
    .flat()
    .map((name) => ({
      slug: name.toLowerCase().replace(/[^a-z0-9]+/g, "-"),
    }));

  return slugs;
}
