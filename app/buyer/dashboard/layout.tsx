'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  Home,
  ShoppingBag,
  Heart,
  ShoppingCart,
  User,
  Bell,
  Lock,
  Trash2,
  LogOut,
  Store,
} from 'lucide-react';
import { useBuyerAuth } from '@/hooks/useBuyerAuth';
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BuyerDashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { buyer, logout } = useBuyerAuth();
  const [unreadCount, setUnreadCount] = useState<number>(0);

  // 🔹 Fetch notifications count dynamically
  useEffect(() => {
    const fetchUnread = async () => {
      try {
        const res = await fetch('/api/buyer/notifications');
        const data = await res.json();
        if (data?.notifications) {
          setUnreadCount(data.notifications.length > 2 ? 2 : 1);
        }
      } catch (error) {
        console.error('Failed to fetch notifications:', error);
      }
    };
    fetchUnread();
  }, []);

  // 🔹 Clear count when on notifications page (null-safe)
  useEffect(() => {
    if (pathname?.includes('/buyer/dashboard/notifications')) {
      setUnreadCount(0);
    }
  }, [pathname]);

  const navItems = [
    { label: 'Home', href: '/buyer/dashboard', icon: <Home size={18} /> },
    { label: 'Orders', href: '/buyer/dashboard/orders', icon: <ShoppingBag size={18} /> },
    { label: 'Wishlist', href: '/buyer/dashboard/wishlist', icon: <Heart size={18} /> },
    { label: 'Cart', href: '/buyer/dashboard/cart', icon: <ShoppingCart size={18} /> },
    { label: 'Profile', href: '/buyer/dashboard/profile', icon: <User size={18} /> },
    {
      label: 'Notifications',
      href: '/buyer/dashboard/notifications',
      icon: <Bell size={18} />,
      badge: unreadCount,
    },
    { label: 'Change Password', href: '/buyer/dashboard/profile/change-password', icon: <Lock size={18} /> },
    { label: 'Delete Account', href: '/buyer/dashboard/profile/delete-account', icon: <Trash2 size={18} /> },
    { label: 'Become a Seller', href: '/seller', icon: <Store size={18} />, highlight: true },
  ];

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b px-6 py-4 flex justify-between items-center shadow-sm sticky top-0 z-20">
        <h1 className="text-xl font-bold text-indigo-600">Buyer Dashboard</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-700">
            Welcome, <strong>{buyer?.name || 'Guest'}</strong> 👋
          </span>
          <button
            onClick={logout}
            className="flex items-center gap-1 text-red-500 hover:text-red-700 text-sm font-medium"
          >
            <LogOut size={16} /> Logout
          </button>
        </div>
      </header>

      {/* Body */}
      <div className="flex flex-1 min-h-0">
        {/* Sidebar */}
        <aside className="w-64 bg-white border-r p-5 space-y-2 shadow-sm sticky top-[64px] self-start h-[calc(100vh-64px)] overflow-y-auto">
          {navItems.map((item) => {
            const isActive =
              pathname === item.href ||
              (pathname?.startsWith(item.href) && item.href !== '/buyer/dashboard');

            return (
              <motion.div key={item.href} whileHover={{ scale: 1.02 }} transition={{ duration: 0.2 }}>
                <Link
                  href={item.href}
                  className={`relative flex items-center gap-3 px-3 py-2 rounded-md font-medium transition-all duration-200 ${
                    isActive
                      ? 'bg-indigo-600 text-white shadow'
                      : item.highlight
                      ? 'bg-amber-100 text-amber-700 hover:bg-amber-200'
                      : 'text-gray-700 hover:bg-indigo-100 hover:text-indigo-700'
                  }`}
                >
                  {item.icon}
                  <span>{item.label}</span>

                  {/* 🔴 Notification Badge */}
                  <AnimatePresence>
                    {item.badge && item.badge > 0 && (
                      <motion.span
                        key="badge"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        exit={{ scale: 0 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                        className="ml-auto bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded-full"
                      >
                        {item.badge}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </Link>
              </motion.div>
            );
          })}
        </aside>

        {/* Main content */}
        <main className="flex-1 flex justify-center bg-gray-50 overflow-y-auto">
          <div className="w-full max-w-5xl p-8">
            <div className="bg-white rounded-2xl shadow-sm p-6 min-h-[75vh]">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Footer */}
      <footer className="bg-gray-100 text-center text-sm text-gray-500 py-4 border-t mt-auto">
        <div className="flex flex-wrap justify-center gap-3 mb-2 text-lg">
          <span>💳 Visa</span>
          <span>💳 MasterCard</span>
          <span>💳 PayPal</span>
          <span>💳 Stripe</span>
          <span>💳 JCB</span>
          <span>💳 Diners Club</span>
        </div>
        <p>© 2025 CosmicOnlines Hybrid Marketplace. All rights reserved.</p>
      </footer>
    </div>
  );
}
