"use client";

import { useState } from "react";

interface Review {
  user: string;
  rating: number;
  comment: string;
}

interface FAQ {
  question: string;
  answer: string;
}

interface Specification {
  key: string;
  value: string;
}

interface ProductTabsProps {
  description?: string;
  reviews?: Review[];
  faq?: FAQ[];
  specifications?: Specification[];
}

export default function ProductTabs({ description, reviews, faq, specifications }: ProductTabsProps) {
  const [activeTab, setActiveTab] = useState<"details" | "reviews" | "faq" | "specs">("details");

  const tabs = ["details", "reviews", "faq", "specs"];

  return (
    <div className="mt-10">
      {/* Tab Buttons */}
      <div className="flex gap-4 border-b border-white/20 mb-6">
        {tabs.map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 font-semibold rounded-t-lg ${
              activeTab === tab ? "bg-orange-500 text-white" : "text-gray-300 hover:text-white"
            }`}
            onClick={() => setActiveTab(tab as any)}
          >
            {tab === "details"
              ? "Details"
              : tab === "reviews"
              ? "Reviews"
              : tab === "faq"
              ? "FAQ"
              : "Specifications"}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="bg-white/10 backdrop-blur-md rounded-xl p-6 text-gray-200">
        {activeTab === "details" && <p>{description || "No description available."}</p>}

        {activeTab === "reviews" && (
          <div className="flex flex-col gap-4">
            {reviews?.length ? (
              reviews.map((r, i) => (
                <div key={i} className="border-b border-white/20 pb-2">
                  <p className="text-yellow-400">⭐ {r.rating}</p>
                  <p className="font-semibold">{r.user}</p>
                  <p>{r.comment}</p>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        )}

        {activeTab === "faq" && (
          <div className="flex flex-col gap-4">
            {faq?.length ? (
              faq.map((f, i) => (
                <div key={i}>
                  <p className="font-semibold">{f.question}</p>
                  <p>{f.answer}</p>
                </div>
              ))
            ) : (
              <p>No FAQs available.</p>
            )}
          </div>
        )}

        {activeTab === "specs" && (
          <div className="grid grid-cols-2 gap-4">
            {specifications?.length ? (
              specifications.map((s, i) => (
                <div key={i} className="flex justify-between">
                  <span className="font-semibold">{s.key}</span>
                  <span>{s.value}</span>
                </div>
              ))
            ) : (
              <p>No specifications available.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
