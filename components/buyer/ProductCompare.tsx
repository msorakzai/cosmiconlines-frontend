import { useState } from "react";

interface Product {
  id: string;
  name: string;
  views?: number;
  clicks?: number;
  conversionRate?: number;
  stock?: number;
  price?: number;
}

interface Props {
  products: Product[];
}

export default function ProductCompare({ products = [] }: Props) {
  const [selected, setSelected] = useState<string[]>([]);

  const toggleSelect = (id: string) => {
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((pid) => pid !== id) : [...prev, id]
    );
  };

  const selectedProducts = products.filter((p) => selected.includes(p.id));

  return (
    <div className="mt-8 p-6 bg-white rounded-xl shadow hover:shadow-lg transition">
      <h3 className="text-xl font-bold mb-2">📊 Compare Products</h3>
      <p className="text-gray-500 text-sm mb-4">
        Select up to 3 products to compare performance
      </p>

      <div className="flex flex-wrap gap-4 mb-6">
        {products.map((p) => (
          <label key={p.id} className="flex items-center gap-2 text-sm">
            <input
              type="checkbox"
              checked={selected.includes(p.id)}
              onChange={() => toggleSelect(p.id)}
              disabled={selected.length >= 3 && !selected.includes(p.id)}
              className="w-4 h-4 accent-blue-500"
            />
            {p.name}
          </label>
        ))}
      </div>

      {selectedProducts.length > 0 && (
        <div className="overflow-x-auto">
          <table className="w-full border border-gray-200 rounded-lg">
            <thead className="bg-gray-100 text-left">
              <tr>
                <th className="px-4 py-2 border-b">Name</th>
                <th className="px-4 py-2 border-b">Views</th>
                <th className="px-4 py-2 border-b">Clicks</th>
                <th className="px-4 py-2 border-b">Conversion %</th>
                <th className="px-4 py-2 border-b">Stock</th>
                <th className="px-4 py-2 border-b">Price</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((p) => (
                <tr key={p.id} className="hover:bg-gray-50">
                  <td className="px-4 py-2 border-b">{p.name}</td>
                  <td className="px-4 py-2 border-b">{p.views || 0}</td>
                  <td className="px-4 py-2 border-b">{p.clicks || 0}</td>
                  <td className="px-4 py-2 border-b">{p.conversionRate || 0}%</td>
                  <td className="px-4 py-2 border-b">{p.stock || 0}</td>
                  <td className="px-4 py-2 border-b">Rs {p.price || 0}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
