import StoreClient from "./StoreClient";
import { stores } from "@/data/stores";

export default function StorePage({ params }: { params: { storeId: string } }) {
  const store = stores.find((s) => s.id === params.storeId);
  const products = store?.products || [];

  if (!store) {
    return (
      <div className="p-10 text-red-400 text-center">
        ⚠️ Store not found.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <StoreClient store={{ ...store, products }} />
    </div>
  );
}

export async function generateStaticParams() {
  return stores.map((s) => ({
    storeId: s.id,
  }));
}
