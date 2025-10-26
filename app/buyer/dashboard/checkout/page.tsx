'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { CreditCard, Truck, CheckCircle } from 'lucide-react';

export default function BuyerCheckoutPage() {
  const router = useRouter();

  // 🧾 Temporary demo data (replace later with cart context or backend)
  const [cartItems] = useState([
    { id: 1, name: 'Noise Cancelling Headphones', price: 1999, quantity: 1 },
    { id: 2, name: 'Smartwatch Series 7', price: 3499, quantity: 2 },
  ]);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    city: '',
    postalCode: '',
  });

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  // 🧮 Handle input change
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // 🚀 Handle place order
  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.name || !formData.address || !formData.phone) {
      alert('Please fill in all required fields.');
      return;
    }

    // 🛍 Simulate order placement
    alert('✅ Order placed successfully!');
    router.push('/buyer/dashboard/orders');
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">🧾 Checkout</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 🏠 Billing Form */}
        <div className="lg:col-span-2 bg-white p-6 rounded-xl border shadow-sm">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Billing Details</h3>

          <form onSubmit={handlePlaceOrder} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={formData.name}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500"
              />
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500"
                required
              />
              <input
                type="text"
                name="city"
                placeholder="City"
                value={formData.city}
                onChange={handleChange}
                className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500"
              />
            </div>

            <textarea
              name="address"
              placeholder="Complete Address"
              value={formData.address}
              onChange={handleChange}
              rows={3}
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500"
              required
            />

            <input
              type="text"
              name="postalCode"
              placeholder="Postal Code"
              value={formData.postalCode}
              onChange={handleChange}
              className="border rounded-lg px-4 py-2 w-full focus:ring-2 focus:ring-indigo-500"
            />

            {/* 💳 Payment Section */}
            <div className="mt-6">
              <h4 className="font-semibold text-gray-800 mb-2">Payment Method</h4>
              <div className="flex items-center gap-3">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" defaultChecked /> 
                  <CreditCard size={18} /> Credit / Debit Card
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="radio" name="payment" /> 
                  <Truck size={18} /> Cash on Delivery
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium mt-6 flex items-center justify-center gap-2"
            >
              <CheckCircle size={18} /> Place Order
            </button>
          </form>
        </div>

        {/* 💰 Order Summary */}
        <div className="bg-white rounded-xl border shadow-sm p-6 h-fit">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">Order Summary</h3>

          <ul className="space-y-3 mb-4">
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between text-gray-700">
                <span>
                  {item.name} × {item.quantity}
                </span>
                <span>Rs {(item.price * item.quantity).toLocaleString()}</span>
              </li>
            ))}
          </ul>

          <hr className="my-3" />

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Subtotal</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>

          <div className="flex justify-between text-gray-600 mb-2">
            <span>Shipping</span>
            <span>Free</span>
          </div>

          <div className="flex justify-between text-lg font-bold text-gray-800 mt-2">
            <span>Total</span>
            <span>Rs {subtotal.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
