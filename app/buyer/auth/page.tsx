"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { FaGoogle, FaFacebook, FaApple, FaUser } from "react-icons/fa";

export default function HybridAuthPage() {
  const router = useRouter();
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    const { name, email, password } = formData;

    if (!email || !password || (!isLogin && !name)) {
      setError("Please fill all required fields.");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch(isLogin ? "/api/buyer/auth/login" : "/api/buyer/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, password }),
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.message);

      localStorage.setItem("buyerToken", data.token);
      localStorage.setItem("buyerLoggedIn", "true");

      setLoading(false);
      router.push("/buyer/dashboard");
    } catch (err: any) {
      setError(err.message || "Something went wrong");
      setLoading(false);
    }
  };

  const handleSocialLogin = (provider: string) => {
    alert(`Social login with ${provider} (mock)`);
    localStorage.setItem("buyerToken", btoa(provider));
    localStorage.setItem("buyerLoggedIn", "true");
    router.push("/buyer/dashboard");
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-gray-900 to-black text-white px-6">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-lg border border-gray-700">
        <div className="flex flex-col items-center mb-6">
          <FaUser className="text-4xl text-orange-400 mb-2" />
          <h1 className="text-3xl font-extrabold text-center text-orange-400">
            {isLogin ? "🔑 Buyer Login" : "🪐 Buyer Sign Up"}
          </h1>
          <p className="text-sm text-gray-400 text-center mt-1">
            {isLogin
              ? "Access your account and start shopping."
              : "Create your buyer account and join the marketplace."}
          </p>
        </div>

        {error && <p className="text-red-400 text-sm mb-4 text-center">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-5">
          {!isLogin && (
            <div>
              <label className="block text-sm font-medium mb-1">Full Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
              />
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="you@example.com"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="********"
              className="w-full p-3 rounded-lg bg-gray-900 border border-gray-700 focus:ring-2 focus:ring-orange-500 outline-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg font-semibold transition disabled:opacity-50"
          >
            {loading ? (isLogin ? "Logging in..." : "Creating Account...") : isLogin ? "Login" : "Sign Up"}
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
          <button onClick={() => handleSocialLogin("Apple")} className="bg-gray-300 p-3 rounded-full text-black">
            <FaApple />
          </button>
        </div>

        <p className="text-center text-sm text-gray-400 mt-5">
          {isLogin ? "Don’t have an account?" : "Already have an account?"}{" "}
          <button
            onClick={() => setIsLogin(!isLogin)}
            className="text-orange-400 hover:underline hover:text-orange-300"
          >
            {isLogin ? "Sign Up" : "Login"}
          </button>
        </p>

        <p className="text-xs text-center mt-2 text-muted">
          Are you a seller?{" "}
          <Link href="/seller/auth/login" className="text-blue-400 hover:underline">
            Seller Login
          </Link>
        </p>
      </div>
    </main>
  );
}
