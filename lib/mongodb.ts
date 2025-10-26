import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    if (mongoose.connection.readyState >= 1) return;
    await mongoose.connect(process.env.MONGODB_URI!);
    console.log("✅ MongoDB Connected");
  } catch (error) {
    console.error("MongoDB connection failed:", error);
  }
};
