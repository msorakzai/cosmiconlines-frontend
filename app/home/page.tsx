// src/app/home/page.tsx
import { Suspense } from "react";
import HomePageClient from "@/components/home/HomePageClient";

export default function HomePage() {
  return (
    <Suspense
      fallback={
        <div className="text-center mt-20 text-gray-500 text-lg">
          Loading Marketplace...
        </div>
      }
    >
      <HomePageClient />
    </Suspense>
  );
}
