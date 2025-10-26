"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StoreRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // TODO: Replace with actual seller storeId from session or context
    const sellerStoreId = "store-1760647285094"; // Replace with dynamic value

    if (sellerStoreId) {
      router.push(`/store/${sellerStoreId}`);
    }
  }, [router]);

  return (
    <main className="min-h-screen flex items-center justify-center text-gray-500">
      Redirecting to your store...
    </main>
  );
}
