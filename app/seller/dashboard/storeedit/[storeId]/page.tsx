import StoreEditClient from "./StoreEditClient";
import { stores } from "@/data/stores";

export default function StoreEditPage({ params }: { params: { storeId: string } }) {
  const store = stores.find((s) => s.id === params.storeId);
  return <StoreEditClient store={store} />;
}

export async function generateStaticParams() {
  return stores.map((s) => ({
    storeId: s.id,
  }));
}
