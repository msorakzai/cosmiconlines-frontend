import ProductClient from "./ProductClient";
import { products } from "@/data/products";

export default function ProductPage({ params }: { params: { productId: string } }) {
  return <ProductClient productId={params.productId} />;
}

export async function generateStaticParams() {
  return products.map((p) => ({
    productId: p.id.toString(),
  }));
}
