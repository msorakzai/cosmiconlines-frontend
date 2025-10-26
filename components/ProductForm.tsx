"use client";
import { useState, useEffect } from "react";

export interface ProductFormData {
  id?: string;
  name: string;
  description: string;
  price: number | string;
  salePrice?: number | string;
  currency: string;
  category: string;
  brand?: string;
  tags?: string;
  sku?: string;
  stock: number | string;
  stockStatus: "in_stock" | "out_of_stock";
  shippingTime?: string;
  imageUrl?: string;
  gallery: string[];
  metaTitle?: string;
  metaDescription?: string;
}

interface Props {
  onSubmit: (data: ProductFormData) => void;
  initialData?: Partial<ProductFormData>;
}

export default function ProductForm({ onSubmit, initialData = {} }: Props) {
  const [form, setForm] = useState<ProductFormData>({
    name: "",
    description: "",
    price: "",
    salePrice: "",
    currency: "PKR",
    category: "",
    brand: "",
    tags: "",
    sku: "",
    stock: "",
    stockStatus: "in_stock",
    shippingTime: "",
    imageUrl: "",
    gallery: [],
    metaTitle: "",
    metaDescription: "",
    ...initialData,
  });

  const [errors, setErrors] = useState<Partial<Record<keyof ProductFormData, string>>>({});

  useEffect(() => {
    if (initialData) {
      setForm((prev) => ({
        ...prev,
        ...initialData,
        price: initialData.price?.toString() || "",
        salePrice: initialData.salePrice?.toString() || "",
        stock: initialData.stock?.toString() || "",
        gallery: initialData.gallery || [],
      }));
    }
  }, [initialData]);

  const validate = () => {
    const newErrors: Partial<Record<keyof ProductFormData, string>> = {};
    if (!form.name.trim()) newErrors.name = "Name is required";
    if (!form.price || parseFloat(form.price as string) <= 0) newErrors.price = "Valid price required";
    if (!form.category) newErrors.category = "Category is required";
    return newErrors;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleGalleryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const urls = e.target.value.split(",").map((url) => url.trim());
    setForm((prev) => ({ ...prev, gallery: urls }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    onSubmit({
      ...form,
      price: parseFloat(form.price as string),
      salePrice: parseFloat(form.salePrice as string) || undefined,
      stock: parseInt(form.stock as string) || 0,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white text-black rounded-xl shadow-lg p-6 space-y-6 max-w-4xl mx-auto font-inter"
    >
      <div className="text-2xl font-bold text-indigo-600">
        {initialData?.id ? "✏️ Update Product" : "➕ Add New Product"}
      </div>

      {/* Basic Info */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold mb-1">Product Name</div>
          <input
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Product Name"
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          {errors.name && <div className="text-red-500 text-sm mt-1">{errors.name}</div>}
        </div>

        <div>
          <div className="font-semibold mb-1">Category</div>
          <select
            name="category"
            value={form.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-indigo-500"
          >
            <option value="">Select Category</option>
            <option value="Electronics">Electronics</option>
            <option value="Fashion">Fashion</option>
            <option value="Books">Books</option>
            <option value="Gaming">Gaming</option>
            <option value="Accessories">Accessories</option>
          </select>
          {errors.category && <div className="text-red-500 text-sm mt-1">{errors.category}</div>}
        </div>
      </div>

      {/* Pricing */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "price", label: "Price", value: form.price, error: errors.price },
          { name: "salePrice", label: "Sale Price", value: form.salePrice },
          { name: "currency", label: "Currency", value: form.currency },
        ].map(({ name, label, value, error }) => (
          <div key={name}>
            <div className="font-semibold mb-1">{label}</div>
            <input
              name={name}
              type="text"
              value={value as string}
              onChange={handleChange}
              placeholder={label}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
            {error && <div className="text-red-500 text-sm mt-1">{error}</div>}
          </div>
        ))}
      </div>

      {/* Description */}
      <div>
        <div className="font-semibold mb-1">Description</div>
        <textarea
          name="description"
          value={form.description}
          onChange={handleChange}
          rows={4}
          placeholder="Product Description"
          className="w-full border border-gray-300 rounded-lg px-4 py-2"
        />
      </div>

      {/* Inventory */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {[
          { name: "stock", label: "Stock Quantity", value: form.stock },
          { name: "shippingTime", label: "Shipping Time", value: form.shippingTime },
        ].map(({ name, label, value }) => (
          <div key={name}>
            <div className="font-semibold mb-1">{label}</div>
            <input
              name={name}
              value={value as string}
              onChange={handleChange}
              placeholder={label}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        ))}

        <div>
          <div className="font-semibold mb-1">Stock Status</div>
          <select
            name="stockStatus"
            value={form.stockStatus}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          >
            <option value="in_stock">✅ In Stock</option>
            <option value="out_of_stock">❌ Out of Stock</option>
          </select>
        </div>
      </div>

      {/* Media */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[
          { name: "imageUrl", label: "Featured Image URL", value: form.imageUrl },
          {
            name: "gallery",
            label: "Gallery URLs",
            value: form.gallery.join(","),
            onChange: handleGalleryChange,
          },
        ].map(({ name, label, value, onChange }) => (
          <div key={name}>
            <div className="font-semibold mb-1">{label}</div>
            <input
              name={name}
              value={value}
              onChange={onChange || handleChange}
              placeholder={label}
              className="w-full border border-gray-300 rounded-lg px-4 py-2"
            />
          </div>
        ))}
      </div>

      {/* SEO Metadata */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <div className="font-semibold mb-1">Meta Title (SEO)</div>
          <input
            name="metaTitle"
            value={form.metaTitle}
            onChange={handleChange}
            placeholder="Meta Title"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>

        <div>
          <div className="font-semibold mb-1">Meta Description (SEO)</div>
          <textarea
            name="metaDescription"
            value={form.metaDescription}
            onChange={handleChange}
            rows={2}
            placeholder="Meta Description"
            className="w-full border border-gray-300 rounded-lg px-4 py-2"
          />
        </div>
      </div>

      {/* Submit Button */}
      <div className="pt-6 text-right">
        <button
          type="submit"
          className="inline-block px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-500 transition shadow-md hover:shadow-lg"
        >
          {initialData?.id ? "✏️ Update Product" : "➕ Add Product"}
        </button>
      </div>
    </form>
  );
}
