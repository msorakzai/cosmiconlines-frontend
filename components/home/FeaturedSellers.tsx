"use client";

import { Seller } from "@/lib/api";

interface FeaturedSellersProps {
  sellers: Seller[];
  onClickSeller?: (seller: Seller) => void; // Optional for modularity
}

export default function FeaturedSellers({ sellers, onClickSeller }: FeaturedSellersProps) {
  if (!sellers || sellers.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#999", marginTop: "30px" }}>
        No featured sellers available right now.
      </p>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
      gap: "20px"
    }}>
      {sellers.map((seller) => (
        <div
          key={seller.id}
          onClick={() => onClickSeller?.(seller)}
          style={{
            backgroundColor: "#fff",
            border: "1px solid #e0e0e0",
            borderRadius: "10px",
            padding: "15px",
            textAlign: "center",
            cursor: "pointer",
            transition: "transform 0.2s, box-shadow 0.2s",
          }}
          onMouseEnter={e => {
            e.currentTarget.style.transform = "scale(1.03)";
            e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
          }}
          onMouseLeave={e => {
            e.currentTarget.style.transform = "scale(1)";
            e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
          }}
        >
          {seller.avatar && (
            <img
              src={seller.avatar}
              alt={seller.name}
              style={{
                width: "100px",
                height: "100px",
                borderRadius: "50%",
                marginBottom: "10px",
                objectFit: "cover"
              }}
            />
          )}
          <h3 style={{ fontWeight: 500, color: "#333" }}>{seller.name}</h3>
        </div>
      ))}
    </div>
  );
}
