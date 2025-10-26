"use client";

import { createContext, useContext, useState, useEffect } from "react";

interface AuthContextType {
  currentUser: { id: string } | null;
}

const AuthContext = createContext<AuthContextType>({ currentUser: null });

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [currentUser, setCurrentUser] = useState<{ id: string } | null>(null);

  useEffect(() => {
    // TODO: fetch current user from localStorage / API
    const user = { id: "real-user-id" }; 
    setCurrentUser(user);
  }, []);

  return (
    <AuthContext.Provider value={{ currentUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
