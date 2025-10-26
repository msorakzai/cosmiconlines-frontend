'use client';

export default function BuyerDashboardHome() {
  return (
    <div>
      <h2 className="text-2xl font-bold text-gray-800 mb-2">
        Welcome to your Buyer Dashboard 🎉
      </h2>
      <p className="text-gray-600">
        From here you can manage your orders, wishlist, and account settings.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10">
        <div className="p-6 bg-white shadow rounded-lg text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-indigo-600">🛍️ Orders</h3>
          <p className="text-sm text-gray-500 mt-2">
            View your past and current orders.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-indigo-600">❤️ Wishlist</h3>
          <p className="text-sm text-gray-500 mt-2">
            Manage items you love.
          </p>
        </div>
        <div className="p-6 bg-white shadow rounded-lg text-center hover:shadow-lg transition">
          <h3 className="text-lg font-semibold text-indigo-600">👤 Profile</h3>
          <p className="text-sm text-gray-500 mt-2">
            Update your details and preferences.
          </p>
        </div>
      </div>
    </div>
  );
}
