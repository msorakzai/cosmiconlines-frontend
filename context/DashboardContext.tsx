"use client";
import React, { createContext, useContext, useState, ReactNode } from "react";

// ✅ Type definitions for context
interface DashboardContextType {
  activeSection: string;
  setActiveSection: (section: string) => void;
}

// ✅ Default values
const DashboardContext = createContext<DashboardContextType>({
  activeSection: "StoreSetup",
  setActiveSection: () => {},
});

// ✅ Provider component
export const DashboardProvider = ({ children }: { children: ReactNode }) => {
  const [activeSection, setActiveSection] = useState("StoreSetup");

  return (
    <DashboardContext.Provider value={{ activeSection, setActiveSection }}>
      {children}
    </DashboardContext.Provider>
  );
};

// ✅ Custom hook (default export, matches your imports)
export default function useDashboard() {
  return useContext(DashboardContext);
}
