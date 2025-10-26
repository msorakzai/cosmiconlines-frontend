'use client';

import { useState } from 'react';
import { Lock, KeyRound, CheckCircle } from 'lucide-react';
import { motion } from 'framer-motion';

/**
 * 🔐 HYBRID MARKETPLACE — CHANGE PASSWORD PAGE
 * Features:
 * - Secure password form
 * - Frontend validation
 * - Animated success state
 * - Ready for backend API integration (/api/buyer/change-password)
 */

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    // ✅ Frontend validation
    if (!oldPassword || !newPassword || !confirmPassword) {
      return setError('Please fill in all fields.');
    }
    if (newPassword.length < 6) {
      return setError('New password must be at least 6 characters.');
    }
    if (newPassword !== confirmPassword) {
      return setError('New passwords do not match.');
    }

    setLoading(true);

    try {
      // Example API call (replace with real one)
      // const res = await fetch('/api/buyer/change-password', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Authorization: `Bearer ${localStorage.getItem('buyerToken')}`,
      //   },
      //   body: JSON.stringify({ oldPassword, newPassword }),
      // });
      // const data = await res.json();

      // if (!res.ok) throw new Error(data.message || 'Failed to change password');

      setTimeout(() => {
        setSuccess(true);
        setOldPassword('');
        setNewPassword('');
        setConfirmPassword('');
        setLoading(false);
      }, 800);
    } catch (err: any) {
      setError(err.message || 'Something went wrong.');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-2xl shadow-sm">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        <Lock className="text-blue-600" /> Change Password
      </h2>

      {success ? (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="flex flex-col items-center text-green-600"
        >
          <CheckCircle size={60} className="mb-2" />
          <p className="font-semibold text-lg">Password updated successfully!</p>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-3 py-2 rounded-md text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="block text-sm font-medium mb-1">Old Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <KeyRound size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full py-2 outline-none text-gray-800"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                placeholder="Enter your current password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">New Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full py-2 outline-none text-gray-800"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                placeholder="Enter new password"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Confirm New Password</label>
            <div className="flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-gray-400 mr-2" />
              <input
                type="password"
                className="w-full py-2 outline-none text-gray-800"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="Re-enter new password"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2.5 rounded-lg font-medium text-white transition ${
              loading ? 'bg-blue-400' : 'bg-blue-600 hover:bg-blue-700'
            }`}
          >
            {loading ? 'Updating...' : 'Change Password'}
          </button>
        </form>
      )}
    </div>
  );
}
