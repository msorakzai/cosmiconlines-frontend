"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const marketplaceCategories: Record<string, string[]> = {
  "E-Commerce Retail": [
    "Electronics & Gadgets", "Fashion & Apparel", "Home & Kitchen",
    "Books & Stationery", "Mobile & Accessories", "Toys & Baby Products",
    "Furniture & Decor", "Sports & Fitness", "Beauty & Personal Care",
  ],
  "Pharmacy & Health": ["Medicines", "Supplements", "Medical Equipment", "Wellness Products", "Clinics & Labs"],
  "Grocery & Mart": ["Cash & Carry", "Supermarket", "Bakery", "Fresh Produce", "Frozen Items", "Beverages"],
  "Digital Services": ["Web Design", "Software Development", "Hosting & Domains", "Online Courses", "Freelance Services"],
  "Food & Beverage": ["Restaurants", "Cafes", "Catering", "Cloud Kitchens"],
  "Local Services": ["Event Planners", "Repair Services", "Cleaning Services", "Tailoring"],
  "Others": ["General Store", "Mixed Category", "Unlisted"],
};

const fulfillmentModels = [
  "Own Stock (Inventory in seller’s control)",
  "Dropshipping (Supplier ships directly)",
  "Third-Party Supplier (Seller manages delivery)",
  "Marketplace Fulfilled (Platform handles delivery)",
  "Mixed Model (Combination of above)",
];

const supplierRegistry: Record<string, { icon: string; location: string; platform: string; method: string }> = {
  "CJ Dropshipping": { icon: "🔁", location: "Yiwu, China", platform: "cjdropshipping.com", method: "API Key" },
  "Eprolo": { icon: "🔁", location: "Shenzhen, China", platform: "eprolo.com", method: "API Key" },
  "AliExpress": { icon: "🌐", location: "China / Global", platform: "aliexpress.com", method: "Webhook" },
  "Amazon FBA": { icon: "🏢", location: "Global Warehouses", platform: "amazon.com", method: "Webhook" },
  "Spocket": { icon: "🚚", location: "US / EU", platform: "spocket.co", method: "API Key" },
};

const fontOptions = ["Sans-serif", "Serif", "Rounded"];
const countries = ["Pakistan", "India", "United Arab Emirates", "Saudi Arabia", "United Kingdom", "United States", "Canada", "Australia"];

type Step =
  | "Category"
  | "Details"
  | "Model"
  | "Branding"
  | "Contact"
  | "Preview";

export default function StoreWizard() {
  const router = useRouter();
  const isLocal = typeof window !== "undefined" && window.location.hostname === "localhost";
  const BASE_URL = isLocal ? "http://localhost:3001" : "https://api.skizimart.com";

  const [step, setStep] = useState<Step>("Category");

  // ---------- Category ----------
  const [category, setCategory] = useState("");
  const [subCategories, setSubCategories] = useState<string[]>([]);
  const [customSub, setCustomSub] = useState("");
  const [catLocked, setCatLocked] = useState(false);

  // ---------- Details ----------
  const [storeName, setStoreName] = useState("");
  const [tagline, setTagline] = useState("");
  const [description, setDescription] = useState("");
  const [street, setStreet] = useState("");
  const [city, setCity] = useState("");
  const [region, setRegion] = useState("");
  const [postal, setPostal] = useState("");
  const [country, setCountry] = useState("Pakistan");
  const [detailsLocked, setDetailsLocked] = useState(false);

  // ---------- Model ----------
  const [model, setModel] = useState("");
  const [entityName, setEntityName] = useState("");
  const [sourceLocation, setSourceLocation] = useState("");
  const [channel, setChannel] = useState("");
  const [integrationMethod, setIntegrationMethod] = useState("");
  const [syncToken, setSyncToken] = useState("");
  const [enableSync, setEnableSync] = useState(false);
  const [modelLocked, setModelLocked] = useState(false);

  // ---------- Branding ----------
  const [logo, setLogo] = useState<File | null>(null);
  const [cover, setCover] = useState<File | null>(null);
  const [themeColor, setThemeColor] = useState("#6B46C1");
  const [fontStyle, setFontStyle] = useState("Sans-serif");
  const [brandingLocked, setBrandingLocked] = useState(false);

  // ---------- Contact ----------
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [instagram, setInstagram] = useState("");
  const [facebook, setFacebook] = useState("");
  const [tiktok, setTiktok] = useState("");
  const [contactLocked, setContactLocked] = useState(false);
  const [loading, setLoading] = useState(false);

  // ---------- Load LocalStorage ----------
  useEffect(() => {
    // Category
    const catFlag = localStorage.getItem("storeCategoryLocked") === "true";
    setCatLocked(catFlag);
    if (catFlag) {
      setCategory(localStorage.getItem("storeCategory") || "");
      setSubCategories(JSON.parse(localStorage.getItem("storeSubCategory") || "[]"));
    }

    // Details
    const detFlag = localStorage.getItem("storeDetailLocked") === "true";
    setDetailsLocked(detFlag);
    if (detFlag) {
      setStoreName(localStorage.getItem("storeName") || "");
      setTagline(localStorage.getItem("storeTagline") || "");
      setDescription(localStorage.getItem("storeDescription") || "");
      setStreet(localStorage.getItem("storeStreet") || "");
      setCity(localStorage.getItem("storeCity") || "");
      setRegion(localStorage.getItem("storeRegion") || "");
      setPostal(localStorage.getItem("storePostal") || "");
      setCountry(localStorage.getItem("storeCountry") || "Pakistan");
    }

    // Model
    const modelFlag = localStorage.getItem("storeFulfillmentLocked") === "true";
    setModelLocked(modelFlag);
    if (modelFlag) {
      setModel(localStorage.getItem("storeFulfillmentModel") || "");
      setEntityName(localStorage.getItem("storeFulfillmentEntity") || "");
      setSourceLocation(localStorage.getItem("storeFulfillmentLocation") || "");
      setChannel(localStorage.getItem("storeFulfillmentChannel") || "");
      setIntegrationMethod(localStorage.getItem("storeFulfillmentMethod") || "");
      setSyncToken(localStorage.getItem("storeFulfillmentToken") || "");
      setEnableSync(localStorage.getItem("storeFulfillmentSync") === "true");
    }

    // Branding
    const brandingFlag = localStorage.getItem("storeBrandingLocked") === "true";
    setBrandingLocked(brandingFlag);
    if (brandingFlag) {
      setThemeColor(localStorage.getItem("storeThemeColor") || "#6B46C1");
      setFontStyle(localStorage.getItem("storeFontStyle") || "Sans-serif");
    }

    // Contact
    const contactFlag = localStorage.getItem("storeContactLocked") === "true";
    setContactLocked(contactFlag);
    if (contactFlag) {
      setEmail(localStorage.getItem("storeContactEmail") || "");
      setPhone(localStorage.getItem("storeContactPhone") || "");
      setWhatsapp(localStorage.getItem("storeContactWhatsapp") || "");
      setInstagram(localStorage.getItem("storeContactInstagram") || "");
      setFacebook(localStorage.getItem("storeContactFacebook") || "");
      setTiktok(localStorage.getItem("storeContactTiktok") || "");
    }

    // Determine first incomplete step
    if (!catFlag) setStep("Category");
    else if (!detFlag) setStep("Details");
    else if (!modelFlag) setStep("Model");
    else if (!brandingFlag) setStep("Branding");
    else if (!contactFlag) setStep("Contact");
    else setStep("Preview");
  }, []);

  // ---------- Helper Functions ----------
  const toggleSubCategory = (sub: string) => {
    setSubCategories((prev) =>
      prev.includes(sub) ? prev.filter((s) => s !== sub) : [...prev, sub]
    );
  };

  const handleAddCustomSub = () => {
    const trimmed = customSub.trim();
    if (trimmed && !subCategories.includes(trimmed)) {
      setSubCategories([...subCategories, trimmed]);
      setCustomSub("");
    }
  };

  const requiresSupplierInfo = [
    "Dropshipping (Supplier ships directly)",
    "Third-Party Supplier (Seller manages delivery)",
    "Mixed Model (Combination of above)",
  ];

  const handleSupplierAutoFill = (name: string) => {
    setEntityName(name);
    if (supplierRegistry[name]) {
      setSourceLocation(supplierRegistry[name].location);
      setChannel(supplierRegistry[name].platform);
      setIntegrationMethod(supplierRegistry[name].method);
    } else {
      setSourceLocation("");
      setChannel("");
      setIntegrationMethod("");
    }
  };

  const handleNextStep = async () => {
    switch (step) {
      case "Category":
        if (!category || subCategories.length === 0) {
          alert("Please select category and at least one sub-category.");
          return;
        }
        localStorage.setItem("storeCategory", category);
        localStorage.setItem("storeSubCategory", JSON.stringify(subCategories));
        localStorage.setItem("storeCategoryLocked", "true");
        setCatLocked(true);
        setStep("Details");
        break;

      case "Details":
        if (!storeName || !street || !city || !country) {
          alert("Please complete required store details.");
          return;
        }
        localStorage.setItem("storeName", storeName);
        localStorage.setItem("storeTagline", tagline);
        localStorage.setItem("storeDescription", description);
        localStorage.setItem("storeStreet", street);
        localStorage.setItem("storeCity", city);
        localStorage.setItem("storeRegion", region);
        localStorage.setItem("storePostal", postal);
        localStorage.setItem("storeCountry", country);
        localStorage.setItem("storeDetailLocked", "true");
        setDetailsLocked(true);
        setStep("Model");
        break;

      case "Model":
        if (!model) {
          alert("Please select your Store model.");
          return;
        }
        if (requiresSupplierInfo.includes(model)) {
          if (!entityName || !sourceLocation || !channel || !integrationMethod) {
            alert("Please complete all supplier and integration fields.");
            return;
          }
          if (enableSync && !syncToken) {
            alert("Please provide sync token to enable integration.");
            return;
          }
        }
        localStorage.setItem("storeFulfillmentModel", model);
        localStorage.setItem("storeFulfillmentEntity", entityName);
        localStorage.setItem("storeFulfillmentLocation", sourceLocation);
        localStorage.setItem("storeFulfillmentChannel", channel);
        localStorage.setItem("storeFulfillmentMethod", integrationMethod);
        localStorage.setItem("storeFulfillmentToken", syncToken);
        localStorage.setItem("storeFulfillmentSync", enableSync.toString());
        localStorage.setItem("storeFulfillmentLocked", "true");
        setModelLocked(true);
        setStep("Branding");
        break;

      case "Branding":
        if (!logo) {
          alert("Please upload your store logo.");
          return;
        }
        localStorage.setItem("storeThemeColor", themeColor);
        localStorage.setItem("storeFontStyle", fontStyle);
        localStorage.setItem("storeBrandingLocked", "true");
        setBrandingLocked(true);
        setStep("Contact");
        break;

      case "Contact":
        if (!email || !phone) {
          alert("Email and phone are required.");
          return;
        }
        if (!/\S+@\S+\.\S+/.test(email)) {
          alert("Please enter a valid email address.");
          return;
        }
        setLoading(true);
        try {
          localStorage.setItem("storeContactEmail", email);
          localStorage.setItem("storeEmail", email);
          localStorage.setItem("storeContactPhone", phone);
          localStorage.setItem("storeContactWhatsapp", whatsapp);
          localStorage.setItem("storeContactInstagram", instagram);
          localStorage.setItem("storeContactFacebook", facebook);
          localStorage.setItem("storeContactTiktok", tiktok);
          localStorage.setItem("storeContactLocked", "true");
          setContactLocked(true);

          await fetch(`${BASE_URL}/api/store/contact`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sellerId: localStorage.getItem("sellerId"),
              email,
              phone,
              whatsapp,
              instagram,
              facebook,
              tiktok,
            }),
          });

          await fetch(`${BASE_URL}/webhook/sync-social`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              sellerId: localStorage.getItem("sellerId"),
              socials: { instagram, facebook, tiktok },
            }),
          });

          setStep("Preview");
        } catch (err) {
          console.error(err);
          alert("Failed to sync contact info.");
        } finally {
          setLoading(false);
        }
        break;

      default:
        break;
    }
  };

  const handlePrevStep = () => {
    switch (step) {
      case "Details":
        setStep("Category");
        break;
      case "Model":
        setStep("Details");
        break;
      case "Branding":
        setStep("Model");
        break;
      case "Contact":
        setStep("Branding");
        break;
      case "Preview":
        setStep("Contact");
        break;
    }
  };

  return (
    <div className="max-w-3xl mx-auto p-6 bg-white rounded-xl shadow space-y-6">
      <h1 className="text-3xl font-bold text-purple-700">🛒 Store Setup Wizard</h1>
      <p className="text-sm text-gray-500">Step: {step}</p>

      {/* ---------- Step Content ---------- */}
      {step === "Category" && (
        <div className="space-y-4">
          <label className="font-medium">Main Category</label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="">-- Select Category --</option>
            {Object.keys(marketplaceCategories).map((cat) => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>

          {category && (
            <div className="space-y-2">
              <p className="font-medium">Sub Categories</p>
              {marketplaceCategories[category].map((sub) => (
                <label key={sub} className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={subCategories.includes(sub)}
                    onChange={() => toggleSubCategory(sub)}
                    className="h-4 w-4 text-purple-600"
                  />
                  {sub}
                </label>
              ))}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={customSub}
                  onChange={(e) => setCustomSub(e.target.value)}
                  placeholder="Custom sub-category"
                  className="flex-1 border px-3 py-2 rounded"
                />
                <button onClick={handleAddCustomSub} className="px-3 py-2 bg-purple-600 text-white rounded">Add</button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* ---------- More steps will go here ---------- */}
      <div className="flex gap-4 mt-4">
        {step !== "Category" && (
          <button onClick={handlePrevStep} className="px-4 py-2 border rounded hover:bg-gray-100">
            ← Back
          </button>
        )}
        <button
          onClick={handleNextStep}
          disabled={loading}
          className="px-4 py-2 bg-purple-600 text-white rounded hover:bg-purple-700 disabled:opacity-50"
        >
          {loading ? "Processing..." : "Next →"}
        </button>
      </div>
    </div>
  );
}
