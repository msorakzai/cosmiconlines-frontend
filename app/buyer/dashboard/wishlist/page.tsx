'use client';

import { useState } from 'react';
import { ShoppingCart, Trash2 } from 'lucide-react';

export default function BuyerWishlistPage() {
  // 🧩 Temporary demo data (replace with real API later)
  const [wishlistItems, setWishlistItems] = useState([
    {
      id: 1,
      name: 'Noise Cancelling Headphones',
      price: 1999,
      image: 'https://cdn.pixabay.com/photo/2016/11/29/12/54/headphones-1868612_1280.jpg',
    },
    {
      id: 2,
      name: 'Smartwatch Series 7',
      price: 3499,
      image: 'https://cdn.pixabay.com/photo/2017/01/22/19/20/smart-watch-2003991_1280.jpg',
    },
    {
      id: 3,
      name: 'Portable Bluetooth Speaker',
      price: 1299,
      image: 'https://cdn.pixabay.com/photo/2016/03/05/19/02/speaker-1236278_1280.jpg',
    },
  ]);

  // 🗑 Remove item
  const removeFromWishlist = (id: number) => {
    setWishlistItems((prev) => prev.filter((item) => item.id !== id));
  };

  // 🛒 Add to cart (mock for now)
  const addToCart = (item: any) => {
    alert(`Added "${item.name}" to cart ✅`);
  };

  return (
    <div className="max-w-5xl mx-auto p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">💖 Your Wishlist</h2>

      {wishlistItems.length === 0 ? (
        <div className="text-center text-gray-500 mt-20">
          <p className="text-lg">You haven’t saved any products yet.</p>
          <p className="text-sm mt-2">
            Browse the marketplace and click “❤️ Add to Wishlist” to save your favorite items.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlistItems.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-xl shadow-sm border hover:shadow-lg transition overflow-hidden"
            >
              <img
                src={item.image}
                alt={item.name}
                className="h-48 w-full object-cover"
              />
              <div className="p-4 space-y-2">
                <h3 className="text-lg font-semibold text-gray-800 truncate">
                  {item.name}
                </h3>
                <p className="text-indigo-600 font-medium">Rs {item.price.toLocaleString()}</p>

                <div className="flex gap-2 pt-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="flex-1 flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white text-sm font-medium py-2 rounded-lg"
                  >
                    <ShoppingCart size={16} /> Add to Cart
                  </button>

                  <button
                    onClick={() => removeFromWishlist(item.id)}
                    className="flex items-center justify-center p-2 border border-red-500 text-red-500 rounded-lg hover:bg-red-500 hover:text-white transition"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
