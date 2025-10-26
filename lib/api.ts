// src/lib/api.ts
import axios from "axios";

// ------------------- Axios instance -------------------
export const API = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001",
  withCredentials: true,
});

// ------------------- Types -------------------
export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  description?: string;
  image?: string;
};

export type Seller = {
  id: string;
  name: string;
  avatar: string;
};

export type Deal = {
  id: string;
  name: string;
  price: number;
  discount: string;
  description?: string;
  image?: string;
};

export type Store = {
  id: string;
  name: string;
  description: string;
  owner: Seller;
  avatar?: string;
  category?: string;
  bio?: string;
  theme?: string;
  logoUrl?: string;
  bannerUrl?: string;
  email?: string;
  status?: string;
};

// ------------------- API Functions -------------------

// 🔹 Daily Deals
export async function fetchDailyDeals(): Promise<Deal[]> {
  try {
    const { data } = await API.get("/deals/daily");
    return data;
  } catch (err) {
    console.warn("❌ fetchDailyDeals failed", err);
    return [
      { id: "1", name: "Wireless Headphones", price: 99, discount: "20% OFF", description: "High-quality sound", image: "/images/headphones.png" },
      { id: "2", name: "Smart Watch", price: 199, discount: "15% OFF", description: "Track your fitness", image: "/images/smartwatch.png" },
      { id: "3", name: "Gemstone Ring", price: 299, discount: "10% OFF", description: "Elegant design", image: "/images/ring.png" },
    ];
  }
}

// 🔹 Featured Products
export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const { data } = await API.get("/products/featured");
    return data;
  } catch (err) {
    console.warn("❌ fetchFeaturedProducts failed", err);
    return [
      { id: "1", name: "Wireless Headphones", category: "Electronics", price: 99, image: "/images/headphones.png" },
      { id: "2", name: "Smart Watch", category: "Electronics", price: 199, image: "/images/smartwatch.png" },
      { id: "3", name: "Designer T-Shirt", category: "Fashion", price: 49, image: "/images/tshirt.png" },
      { id: "4", name: "Gemstone Ring", category: "Jewelry", price: 299, image: "/images/ring.png" },
    ];
  }
}

// 🔹 Search Products
export async function searchProducts(query: string): Promise<Product[]> {
  if (!query) return [];
  try {
    const { data } = await API.get("/products/search", { params: { q: query } });
    return data;
  } catch (err) {
    console.warn("❌ searchProducts failed", err);
    // fallback example
    return [
      { id: "1", name: "Wireless Headphones", category: "Electronics", price: 99, image: "/images/headphones.png" },
      { id: "2", name: "Smart Watch", category: "Electronics", price: 199, image: "/images/smartwatch.png" },
    ].filter(p => p.name.toLowerCase().includes(query.toLowerCase()));
  }
}

// 🔹 Featured Sellers
export async function fetchFeaturedSellers(): Promise<Seller[]> {
  try {
    const { data } = await API.get("/sellers/featured");
    return data;
  } catch (err) {
    console.warn("❌ fetchFeaturedSellers failed", err);
    return [
      { id: "1", name: "TechStore", avatar: "/avatars/seller1.png" },
      { id: "2", name: "FashionHub", avatar: "/avatars/seller2.png" },
      { id: "3", name: "JewelryWorld", avatar: "/avatars/seller3.png" },
    ];
  }
}

// 🔹 Fetch Store by Owner ID
export async function fetchStoreByOwner(ownerId: string): Promise<Store | null> {
  if (!ownerId) return null;
  try {
    const { data } = await API.get(`/store`, { params: { ownerId } });
    return data;
  } catch (err) {
    console.warn("❌ fetchStoreByOwner failed", err);
    return null;
  }
}

// 🔹 Store + Products by Store ID
export async function fetchStoreData(storeId: string): Promise<{ store: Store; products: Product[] }> {
  try {
    const { data } = await API.get(`/stores/${storeId}`);
    return data;
  } catch (err) {
    console.warn("❌ fetchStoreData failed", err);
    // fallback store
    const store: Store = {
      id: storeId,
      name: "TechStore",
      description: "Your one-stop shop for electronics and gadgets.",
      owner: { id: "1", name: "John Doe", avatar: "/avatars/seller1.png" },
      avatar: "/store-avatars/store1.png",
      category: "Electronics",
      bio: "Fallback store bio",
      theme: "default",
      logoUrl: "/images/logo.png",
      bannerUrl: "/images/banner.png",
      email: "info@techstore.com",
      status: "active",
    };
    const products: Product[] = [
      { id: "1", name: "Wireless Headphones", category: "Electronics", price: 99, image: "/images/headphones.png" },
      { id: "2", name: "Smart Watch", category: "Electronics", price: 199, image: "/images/smartwatch.png" },
      { id: "3", name: "Designer T-Shirt", category: "Fashion", price: 49, image: "/images/tshirt.png" },
      { id: "4", name: "Gemstone Ring", category: "Jewelry", price: 299, image: "/images/ring.png" },
    ];
    return { store, products };
  }
}
