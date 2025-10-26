import mongoose, { Schema, model, models } from "mongoose";

const ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    stock: { type: Number, default: 0 },
    category: { type: String },
    images: [{ type: String }],
    sellerId: { type: String, required: true },
  },
  { timestamps: true }
);

export const Product = models.Product || model("Product", ProductSchema);
