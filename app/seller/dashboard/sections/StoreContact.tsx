"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

export default function StoreContact() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [locked, setLocked] = useState(false);

  useEffect(() => {
    const lockedFlag = localStorage.getItem("storeContactLocked") === "true";
    setLocked(lockedFlag);

    if (lockedFlag) {
      setEmail(localStorage.getItem("storeContactEmail") || "");
      setPhone(localStorage.getItem("storeContactPhone") || "");
      setWhatsapp(localStorage.getItem("storeContactWhatsapp") || "");
      setInstagram(localStorage.getItem("storeContactInstagram") || "");
      setFacebook(localStorage.getItem("storeContactFacebook") || "");
      setTiktok(localStorage.getItem("storeContactTiktok") || "");
    }
  }, []);

  const handleNext = () => {
    if (!email || !phone) {
      alert("Email and phone are required.");
      return;
    }
    if (!/\S+@\S+\.\S+/.test(email)) {
      alert("Please enter a valid email address.");
      return;
    }

    localStorage.setItem("storeContactEmail", email);
    localStorage.setItem("storeContactPhone", phone);
    localStorage.setItem("storeContactWhatsapp", whatsapp);
    localStorage.setItem("storeContactInstagram", instagram);
    localStorage.setItem("storeContactFacebook", facebook);
    localStorage.setItem("storeContactTiktok", tiktok);
    localStorage.setItem("storeContactLocked", "true");

    router.push("/seller/dashboard-wizard?tab=Currency");
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-8 rounded-xl shadow-md space-y-6 text-gray-800">
      <h2 className="text-2xl font-bold text-purple-700">📞 Contact & Socials</h2>
      <p className="text-gray-600">Provide your store's contact info and social media links.</p>

      <div className="space-y-4">
        <label>Email *</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="e.g. seller@store.com"
          className="w-full border px-3 py-2 rounded"
        />

        <label>Phone *</label>
        <input
          type="tel"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="e.g. +92 300 1234567"
          className="w-full border px-3 py-2 rounded"
        />

        <label>WhatsApp (Optional)</label>
        <input
          type="text"
          value={whatsapp}
          onChange={(e) => setWhatsapp(e.target.value)}
          placeholder="WhatsApp number"
          className="w-full border px-3 py-2 rounded"
        />

        <label>Instagram (Optional)</label>
        <input
          type="text"
          value={instagram}
          onChange={(e) => setInstagram(e.target.value)}
          placeholder="https://instagram.com/yourstore"
          className="w-full border px-3 py-2 rounded"
        />

        <label>Facebook (Optional)</label>
        <input
          type="text"
          value={facebook}
          onChange={(e) => setFacebook(e.target.value)}
          placeholder="https://facebook.com/yourstore"
          className="w-full border px-3 py-2 rounded"
        />

        <label>TikTok (Optional)</label>
        <input
          type="text"
          value={tiktok}
          onChange={(e) => setTiktok(e.target.value)}
          placeholder="https://tiktok.com/@yourstore"
          className="w-full border px-3 py-2 rounded"
        />
      </div>

      <div className="mt-6">
        <button
          onClick={handleNext}
          className="px-6 py-3 bg-purple-600 text-white font-semibold rounded-lg hover:bg-purple-700 transition"
        >
          💱 Next: Currency & Pricing
        </button>
      </div>
    </div>
  );
}
