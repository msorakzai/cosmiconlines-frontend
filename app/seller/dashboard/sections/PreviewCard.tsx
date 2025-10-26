"use client";

type Props = {
  title: string;
  price: string;
  imageUrl: string;
  category: string;
};

export default function PreviewCard({ title, price, imageUrl, category }: Props) {
  return (
    <div className="max-w-sm bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
      <img
        src={imageUrl}
        alt={title}
        className="w-full h-48 object-cover border-b border-gray-100"
      />
      <div className="p-4 space-y-2">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-sm text-gray-500">Category: {category}</p>
        <p className="text-xl font-bold text-green-600">{price}</p>
        <button className="mt-2 px-4 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">
          Publish Listing
        </button>
      </div>
    </div>
  );
}
