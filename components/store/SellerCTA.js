import { useRouter } from 'next/router';
import { useState } from 'react';
import { toast } from 'react-toastify';
import API from '../lib/api'; // ✅ If SellerCTA is in components/

export default function SellerCTA() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleStartSelling = async () => {
    setLoading(true);
    try {
      const res = await API.get('/store/me'); // ✅ Check if store exists
      if (res.data?.id) {
        router.push('/seller/dashboard'); // ✅ Store exists → go to dashboard
      } else {
        router.push('/seller/register'); // ❌ No store → go to registration
      }
    } catch (err) {
      toast.error('❌ Store fetch failed');
      router.push('/seller/register'); // ❌ API failed → fallback to registration
    } finally {
      setLoading(false);
    }
  };

  return (
    <section
      style={{
        marginTop: '40px',
        padding: '40px 20px',
        background: 'linear-gradient(to right, #1a1a40, #2c2c6c)',
        color: '#e0e0ff',
        borderRadius: '12px',
        textAlign: 'center',
        boxShadow: '0 0 12px rgba(0,0,0,0.6)',
      }}
    >
      <h2 style={{ fontFamily: 'Orbitron, sans-serif', marginBottom: '16px' }}>
        🧑‍💻 Become a Seller
      </h2>
      <p style={{
        fontSize: '16px',
        marginBottom: '24px',
        maxWidth: '600px',
        margin: '0 auto',
        lineHeight: '1.6',
      }}>
        Launch your own store, showcase your products, and join a galaxy of trusted sellers. CosmicOnlines empowers you to orbit your own brand.
      </p>
      <button
        onClick={handleStartSelling}
        disabled={loading}
        style={{
          padding: '14px 28px',
          backgroundColor: loading ? '#999' : '#4db8ff',
          color: '#000',
          fontWeight: 'bold',
          borderRadius: '10px',
          fontSize: '18px',
          boxShadow: '0 0 10px #4db8ff',
          cursor: loading ? 'not-allowed' : 'pointer',
          transition: 'transform 0.3s ease',
        }}
        onMouseEnter={(e) => {
          if (!loading) e.currentTarget.style.transform = 'scale(1.05)';
        }}
        onMouseLeave={(e) => {
          if (!loading) e.currentTarget.style.transform = 'scale(1)';
        }}
      >
        {loading ? 'Checking Store...' : '🚀 Start Selling'}
      </button>
    </section>
  );
}
