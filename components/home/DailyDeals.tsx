"use client";

import { Deal } from "@/lib/api";

interface DailyDealsProps {
  deals: Deal[];
  onAddToCart?: (deal: Deal) => void; // Optional for modularity
}

export default function DailyDeals({ deals, onAddToCart }: DailyDealsProps) {
  const handleAddToCart = (deal: Deal) => {
    if (onAddToCart) {
      onAddToCart(deal);
    } else {
      alert(`Added ${deal.name} to cart!`);
    }
  };

  if (deals.length === 0) {
    return (
      <p style={{ textAlign: "center", color: "#999", marginTop: "30px" }}>
        No deals available today. Check back tomorrow!
      </p>
    );
  }

  return (
    <div style={{
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
      gap: "20px"
    }}>
      {deals.map((deal) => (
        <div key={deal.id} style={{
          backgroundColor: "#fff",
          border: "1px solid #e0e0e0",
          borderRadius: "10px",
          padding: "15px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          transition: "transform 0.2s, box-shadow 0.2s",
          cursor: "pointer",
        }}
        onMouseEnter={e => {
          e.currentTarget.style.transform = "scale(1.03)";
          e.currentTarget.style.boxShadow = "0 5px 15px rgba(0,0,0,0.15)";
        }}
        onMouseLeave={e => {
          e.currentTarget.style.transform = "scale(1)";
          e.currentTarget.style.boxShadow = "0 2px 10px rgba(0,0,0,0.05)";
        }}>
          {deal.image && (
            <img
              src={deal.image}
              alt={deal.name}
              style={{
                width: "120px",
                height: "120px",
                objectFit: "contain",
                marginBottom: "15px"
              }}
            />
          )}
          <h3 style={{ fontWeight: 500, marginBottom: "10px", color: "#333" }}>{deal.name}</h3>
          <p style={{ fontSize: "0.9rem", color: "#666", marginBottom: "10px" }}>{deal.description}</p>
          <span style={{ fontWeight: "bold", color: "#ff6600", marginBottom: "5px" }}>{deal.discount}</span>
          <span style={{ fontWeight: 600, fontSize: "1.1rem", color: "#333", marginBottom: "15px" }}>${deal.price}</span>
          <button
            onClick={() => handleAddToCart(deal)}
            style={{
              backgroundColor: "#ff6600",
              color: "#fff",
              border: "none",
              padding: "8px 15px",
              borderRadius: "8px",
              cursor: "pointer",
              fontWeight: "500",
              transition: "background-color 0.2s"
            }}
            onMouseEnter={e => (e.currentTarget.style.backgroundColor = "#e65c00")}
            onMouseLeave={e => (e.currentTarget.style.backgroundColor = "#ff6600")}
          >
            Add to Cart
          </button>
        </div>
      ))}
    </div>
  );
}
