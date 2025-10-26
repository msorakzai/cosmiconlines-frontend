"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaUserShield, FaGoogle, FaFacebook } from "react-icons/fa";

export default function SellerLoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/seller/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      // ✅ Real session from backend
      localStorage.setItem("sellerToken", data.token);
      localStorage.setItem("sellerLoggedIn", "true");
      localStorage.setItem("sellerId", String(data.ownerId));
      localStorage.setItem("storeId", data.storeId);
      localStorage.setItem("storeName", data.storeName);

      setLoading(false);
      router.push("/seller/dashboard?tab=StoreProfile");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleSocialLogin = async (provider: string) => {
    alert(`Social login with ${provider} (mock)`);

    // ✅ Optional: Replace with real OAuth later
    localStorage.setItem("sellerToken", btoa(provider));
    localStorage.setItem("sellerLoggedIn", "true");
    localStorage.setItem("sellerId", "1");
    localStorage.setItem("storeId", "store-1760647285094");
    localStorage.setItem("storeName", "Skizi Mart");

    router.push("/seller/dashboard?tab=StoreProfile");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <FaUserShield className="text-4xl text-orange-400 mb-2" />
          <h1 className="text-3xl font-extrabold text-center text-orange-400">🔐 Seller Login</h1>
          <p className="text-sm text-gray-400 text-center mt-1">
            Access your dashboard, manage stores, and start selling.
          </p>
        </div>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-1">Seller Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="seller@example.com"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="********"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login to Dashboard"}
          </button>
        </form>

        <div className="text-center my-4 text-gray-400">or continue with</div>

        <div className="flex justify-center gap-4">
          <button onClick={() => handleSocialLogin("Google")} className="bg-red-500 p-3 rounded-full">
            <FaGoogle />
          </button>
          <button onClick={() => handleSocialLogin("Facebook")} className="bg-blue-600 p-3 rounded-full">
            <FaFacebook />
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-5">
          Don’t have a store?{" "}
          <Link href="/seller" className="text-orange-400 hover:underline hover:text-orange-300 font-medium">
            Become a Seller
          </Link>
        </p>

        <p className="text-xs text-center mt-2 text-muted">
          Are you a buyer?{" "}
          <Link href="/buyer/auth" className="text-blue-400 hover:underline">
            Buyer Login
          </Link>
        </p>
      </div>
    </main>
  );
}
