'use client';

import { useState, useEffect } from 'react';
import { User, Mail, Phone, MapPin, Upload, Save, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * 👤 HYBRID MARKETPLACE — BUYER PROFILE PAGE
 * Features:
 * - Upload profile picture (preview)
 * - Editable user fields
 * - Validation + animated success
 * - API-ready structure (/api/buyer/profile)
 */

export default function BuyerProfilePage() {
  const [buyer, setBuyer] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    image: '',
  });

  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  // 🔹 Fetch user data (mock or API)
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        // const res = await fetch('/api/buyer/profile', { headers: { Authorization: `Bearer ${localStorage.getItem('buyerToken')}` }});
        // const data = await res.json();
        const mock = {
          name: 'John Doe',
          email: 'johndoe@example.com',
          phone: '+92 300 1234567',
          address: 'Karachi, Pakistan',
          image: '/default-avatar.png',
        };
        setBuyer(mock);
        setPreview(mock.image);
      } catch (err) {
        console.error(err);
      }
    };
    fetchProfile();
  }, []);

  // 🔹 Handle image upload
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
      setBuyer((prev) => ({ ...prev, image: file.name }));
    }
  };

  // 🔹 Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!buyer.name || !buyer.email) {
      return setError('Name and email are required.');
    }

    setLoading(true);

    try {
      // const res = await fetch('/api/buyer/profile', {
      //   method: 'POST',
      //   headers: { 'Content-Type': 'application/json', Authorization: `Bearer ${localStorage.getItem('buyerToken')}` },
      //   body: JSON.stringify(buyer),
      // });
      // const data = await res.json();

      setTimeout(() => {
        setLoading(false);
        setSuccess(true);
      }, 800);
    } catch (err) {
      setError('Failed to update profile.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-sm rounded-2xl p-6">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <User className="text-blue-600" /> My Profile
      </h2>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-green-600"
        >
          <CheckCircle size={60} className="mb-2" />
          <p className="font-semibold text-lg">Profile updated successfully!</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-5">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          {/* Profile Image Upload */}
          <div className="flex items-center gap-5">
            <div className="relative">
              <img
                src={preview || '/default-avatar.png'}
                alt="Profile"
                className="w-24 h-24 rounded-full object-cover border"
              />
              <label className="absolute bottom-0 right-0 bg-blue-600 p-1.5 rounded-full cursor-pointer hover:bg-blue-700 transition">
                <Upload size={16} className="text-white" />
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageChange}
                />
              </label>
            </div>
            <div>
              <p className="text-gray-700 font-medium">{buyer.name || 'Your Name'}</p>
              <p className="text-sm text-gray-500">{buyer.email || 'Your Email'}</p>
            </div>
          </div>

          {/* Name */}
          <div>
            <label className="block text-sm font-medium mb-1">Full Name</label>
            <div className="flex items-center border rounded-lg px-3">
              <User size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full py-2 outline-none text-gray-800"
                value={buyer.name}
                onChange={(e) => setBuyer({ ...buyer, name: e.target.value })}
                placeholder="Enter your full name"
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium mb-1">Email Address</label>
            <div className="flex items-center border rounded-lg px-3">
              <Mail size={18} className="text-gray-400 mr-2" />
              <input
                type="email"
                className="w-full py-2 outline-none text-gray-800"
                value={buyer.email}
                onChange={(e) => setBuyer({ ...buyer, email: e.target.value })}
                placeholder="Enter your email"
              />
            </div>
          </div>

          {/* Phone */}
          <div>
            <label className="block text-sm font-medium mb-1">Phone Number</label>
            <div className="flex items-center border rounded-lg px-3">
              <Phone size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full py-2 outline-none text-gray-800"
                value={buyer.phone}
                onChange={(e) => setBuyer({ ...buyer, phone: e.target.value })}
                placeholder="Enter your phone number"
              />
            </div>
          </div>

          {/* Address */}
          <div>
            <label className="block text-sm font-medium mb-1">Address</label>
            <div className="flex items-center border rounded-lg px-3">
              <MapPin size={18} className="text-gray-400 mr-2" />
              <input
                type="text"
                className="w-full py-2 outline-none text-gray-800"
                value={buyer.address}
                onChange={(e) => setBuyer({ ...buyer, address: e.target.value })}
                placeholder="Enter your address"
              />
            </div>
          </div>

          {/* Save Button */}
          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-medium text-white transition flex items-center justify-center gap-2 ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Saving...' : <><Save size={18} /> Save Changes</>}
          </button>
        </form>
      )}
    </div>
  );
}
