"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch?: () => void; // optional search button click
}

const SearchBar: React.FC<SearchBarProps> = ({ value, onChange, onSearch }) => {
  return (
    <div style={{ marginBottom: "20px", display: "flex", justifyContent: "center" }}>
      <input
        type="text"
        placeholder="Search products..."
        value={value}
        onChange={onChange}
        style={{
          width: "100%",
          maxWidth: "500px",
          padding: "12px 16px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          fontSize: "1rem",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      />
      <button
        onClick={onSearch}
        style={{
          padding: "12px 20px",
          marginLeft: "10px",
          backgroundColor: "#ff6600",
          color: "#fff",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
