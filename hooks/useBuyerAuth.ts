'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

interface Buyer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  address?: string;
  role: 'buyer' | 'seller';
}

export function useBuyerAuth() {
  const router = useRouter();
  const [buyer, setBuyer] = useState<Buyer | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('buyerToken');

    if (!token) {
      // Not logged in → redirect to login page
      router.push('/buyer/login');
      setLoading(false);
      return;
    }

    // Simulate fetching buyer profile using token
    const fetchBuyer = async () => {
      try {
        // TODO: Replace this mock fetch with a real API call to /api/buyer/me
        const mockData: Buyer = {
          id: 'buyer123',
          name: 'Shakeel Ahmed',
          email: 'shakeel@hybridmarket.com',
          phone: '03001234567',
          address: 'Karachi, Pakistan',
          role: 'buyer', // or 'seller' if already upgraded
        };

        setBuyer(mockData);

        // 🚀 If buyer already became seller, redirect to seller dashboard
        if (mockData.role === 'seller') {
          router.push('/seller/dashboard');
        }
      } catch (err) {
        console.error('Auth error:', err);
        localStorage.removeItem('buyerToken');
        router.push('/buyer/login');
      } finally {
        setLoading(false);
      }
    };

    fetchBuyer();
  }, [router]);

  const logout = () => {
    localStorage.removeItem('buyerToken');
    setBuyer(null);
    router.push('/buyer/login');
  };

  return { buyer, loading, logout };
}
