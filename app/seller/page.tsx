"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Info } from "lucide-react";

type CategoryKey =
  | "E-Commerce Retail"
  | "Pharmacy & Health"
  | "Grocery & Mart"
  | "Digital Services"
  | "Food & Beverage"
  | "Local Services"
  | "Others";

interface FormData {
  name: string;
  address: string;
  email: string;
  password: string;
  confirmPassword: string;
  category: CategoryKey | "";
  subCategory: string;
  ownerId: number;
  productRange?: string;
  warehouseLocation?: string;
  deliveryPartner?: string;
  licenseNumber?: string;
  medicalRegistration?: string;
  labAffiliation?: string;
  coldStorageAvailable?: boolean;
  deliveryRadius?: string;
  portfolioUrl?: string;
  serviceType?: string;
  experienceLevel?: string;
  kitchenType?: string;
  cuisineTags?: string;
  serviceArea?: string;
  certification?: string;
  emergencySupport?: boolean;
  customTags?: string;
  description?: string;
}

export default function SellerWizard() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<FormData>({
    name: "", address: "", email: "", password: "", confirmPassword: "",
    category: "", subCategory: "", ownerId: 123,
    coldStorageAvailable: false, emergencySupport: false
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const categories: Record<CategoryKey, string[]> = {
    "E-Commerce Retail": ["Electronics & Gadgets", "Fashion & Apparel", "Home & Kitchen", "Books & Stationery", "Mobile & Accessories", "Toys & Baby Products", "Furniture & Decor", "Sports & Fitness", "Beauty & Personal Care"],
    "Pharmacy & Health": ["Medicines", "Supplements", "Medical Equipment", "Wellness Products", "Clinics & Labs"],
    "Grocery & Mart": ["Cash & Carry", "Supermarket", "Bakery", "Fresh Produce", "Frozen Items", "Beverages"],
    "Digital Services": ["Web Design", "Software Development", "Hosting & Domains", "Online Courses", "Freelance Services"],
    "Food & Beverage": ["Restaurants", "Cafes", "Catering", "Cloud Kitchens"],
    "Local Services": ["Event Planners", "Repair Services", "Cleaning Services", "Tailoring"],
    "Others": ["General Store", "Mixed Category", "Unlisted"],
  };

  const inputClasses = "w-full p-3 rounded bg-gray-800 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-400";

  const handleChange = (field: keyof FormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: "" }));
  };

  const validateStep = () => {
    const newErrors: Record<string, string> = {};
    if (step === 1) {
      if (!formData.name) newErrors.name = "Required";
      if (!formData.address) newErrors.address = "Required";
      if (!formData.email) newErrors.email = "Required";
    }
    if (step === 2) {
      if (!formData.category) newErrors.category = "Required";
      if (!formData.subCategory) newErrors.subCategory = "Required";
    }
    if (step === 4) {
      if (!formData.password) newErrors.password = "Required";
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => validateStep() && setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleSubmit = async () => {
    if (!validateStep()) return;
    setLoading(true);
    try {
      const res = await fetch("/api/store", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData)
      });

      const json = await res.json();
      if (!res.ok) throw new Error(json.message || "Failed to create store");

      router.push("/seller/dashboard?tab=list");

    } catch (err) {
      console.error("Store creation error:", err);
      alert("Something went wrong. Check console for details.");
    } finally {
      setLoading(false);
    }
  };

  const renderField = (label: string, field: keyof FormData, tooltip?: string, checkbox?: boolean) => {
    return checkbox ? (
      <label key={field.toString()} className="flex items-center gap-2">
        <input type="checkbox" checked={!!formData[field]} onChange={e => handleChange(field, e.target.checked)} className="w-5 h-5 accent-orange-400" />
        {label}
      </label>
    ) : (
      <div key={field.toString()} className="relative">
        <input
          type="text"
          placeholder={label}
          value={formData[field] as string || ""}
          onChange={e => handleChange(field, e.target.value)}
          className={inputClasses}
        />
        {tooltip && (
          <Info className="absolute right-3 top-3 w-4 h-4 text-gray-400 cursor-pointer">
            <title>{tooltip}</title>
          </Info>
        )}
        {errors[field] && <span className="text-red-400 text-sm">{errors[field]}</span>}
      </div>
    );
  };

  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <motion.div key="step1" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-300">Store Info</h2>
            {renderField("Store Name", "name")}
            {renderField("Address", "address")}
            {renderField("Email", "email")}
          </motion.div>
        );
      case 2:
        return (
          <motion.div key="step2" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-300">Business Category</h2>
            <select value={formData.category} onChange={e => { handleChange("category", e.target.value as CategoryKey); handleChange("subCategory", ""); }} className={inputClasses}>
              <option value="">Select Main Category</option>
              {(Object.keys(categories) as CategoryKey[]).map(cat => <option key={cat} value={cat}>{cat}</option>)}
            </select>
            {errors.category && <span className="text-red-400 text-sm">{errors.category}</span>}
            {formData.category && (
              <select value={formData.subCategory} onChange={e => handleChange("subCategory", e.target.value)} className={inputClasses}>
                <option value="">Select Subcategory</option>
                {categories[formData.category].map(sub => <option key={sub} value={sub}>{sub}</option>)}
              </select>
            )}
            {errors.subCategory && <span className="text-red-400 text-sm">{errors.subCategory}</span>}
          </motion.div>
        );
      case 3:
        return (
          <motion.div key="step3" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-300">Additional Details</h2>
            {formData.category === "E-Commerce Retail" && (
              <>
                {renderField("Product Range", "productRange")}
                {renderField("Warehouse Location", "warehouseLocation")}
                {renderField("Delivery Partner", "deliveryPartner")}
              </>
            )}
            {formData.category === "Pharmacy & Health" && (
              <>
                {renderField("License Number", "licenseNumber")}
                {renderField("Medical Registration", "medicalRegistration")}
                {renderField("Lab Affiliation", "labAffiliation")}
              </>
            )}
            {formData.category === "Grocery & Mart" && (
              <>
                {renderField("Cold Storage Available", "coldStorageAvailable", undefined, true)}
                {renderField("Delivery Radius (km)", "deliveryRadius")}
              </>
            )}
            {formData.category === "Digital Services" && (
              <>
                {renderField("Portfolio URL", "portfolioUrl")}
                {renderField("Service Type", "serviceType")}
                {renderField("Experience Level", "experienceLevel")}
              </>
            )}
            {formData.category === "Food & Beverage" && (
              <>
                {renderField("Kitchen Type", "kitchenType")}
                {renderField("Cuisine Tags", "cuisineTags")}
              </>
            )}
            {formData.category === "Local Services" && (
              <>
                {renderField("Service Area", "serviceArea")}
                {renderField("Certification", "certification")}
                {renderField("Emergency Support Available", "emergencySupport", undefined, true)}
              </>
            )}
            {formData.category === "Others" && (
              <>
                {renderField("Custom Tags", "customTags")}
                {renderField("Description", "description")}
              </>
            )}
          </motion.div>
        );
      case 4:
        return (
          <motion.div key="step4" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="space-y-4">
            <h2 className="text-lg font-semibold text-orange-300">Login Credentials</h2>
            {renderField("Password", "password")}
            {renderField("Confirm Password", "confirmPassword")}
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <main className="min-h-screen bg-[#0f172a] text-white py-12 px-4">
      <div className="max-w-xl mx-auto bg-[#1e293b] p-8 rounded-xl shadow-lg space-y-6">
        <h1 className="text-3xl font-bold text-orange-400 text-center mb-4">🛍️ Hybrid Marketplace Signup</h1>

        {/* Step Progress */}
        <div className="flex justify-between mb-6">
          {[1, 2, 3, 4].map(s => (
            <div
              key={s}
              className={`flex-1 h-1 mx-1 rounded ${s <= step ? "bg-orange-400" : "bg-gray-600"}`}
            ></div>
          ))}
        </div>

        <AnimatePresence mode="wait">{renderStep()}</AnimatePresence>

        <div className="flex justify-between mt-6">
          {step > 1 && (
            <button
              onClick={prevStep}
              className="px-4 py-2 bg-gray-600 rounded hover:bg-gray-500 transition"
            >
              Back
            </button>
          )}
          {step < 4 ? (
            <button
              onClick={nextStep}
              className="px-4 py-2 bg-orange-500 rounded hover:bg-orange-600 transition"
            >
              Next
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={loading}
              className="px-4 py-2 bg-green-500 rounded hover:bg-green-600 transition"
            >
              {loading ? "Submitting..." : "Create Store"}
            </button>
          )}
        </div>
      </div>
    </main>
  );
}
