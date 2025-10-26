"use client";

import { Suspense } from "react";
import SearchPageContent from "./SearchPageContent";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="text-gray-400 p-10">Loading search...</div>}>
      <SearchPageContent />
    </Suspense>
  );
}
