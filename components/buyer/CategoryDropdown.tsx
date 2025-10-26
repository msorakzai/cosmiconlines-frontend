"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const categories = ["Electronics", "Fashion", "Jewelry", "Home", "Sports"];

export default function CategoryDropdown() {
  const [selected, setSelected] = useState("");
  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelected(e.target.value);
    if (e.target.value) {
      router.push(`/products?category=${encodeURIComponent(e.target.value)}`);
    }
  };

  return (
    <select value={selected} onChange={handleChange} style={{ padding: "8px", marginBottom: "20px" }}>
      <option value="">Select Category</option>
      {categories.map((cat) => (
        <option key={cat} value={cat}>{cat}</option>
      ))}
    </select>
  );
}
