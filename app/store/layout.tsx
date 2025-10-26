export const metadata = {
  title: "CosmicOnline Store",
  description: "Explore products and campaigns from top sellers.",
};

export default function StoreLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-white text-gray-800">
      {children}
    </div>
  );
}
