// src/components/store/HeaderNav.tsx
"use client";

import { useRouter } from "next/navigation";
import Logo from "@/components/store/Logo";
import SearchBar from "@/components/store/SearchBar";
import CategoryDropdown from "@/components/buyer/CategoryDropdown";
import  CartIcon  from "@/components/buyer/CartIcon";
import ProfileMenu from "@/components/store/ProfileMenu";

const HeaderNav = () => {
  const router = useRouter();

  return (
    <header className="w-full border-b bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-screen-xl mx-auto px-4 py-3 flex items-center justify-between">
        {/* Left: Logo */}
        <div className="flex items-center gap-4">
          <Logo />
        </div>

        {/* Center: Search + Categories */}
        <div className="flex-1 mx-6 hidden md:flex items-center gap-4">
          <SearchBar />
          <CategoryDropdown />
        </div>

        {/* Right: Cart + Profile */}
        <div className="flex items-center gap-4">
          <CartIcon />
          <ProfileMenu />
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
