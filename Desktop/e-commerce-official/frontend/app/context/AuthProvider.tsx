"use client";
import React, { useState, createContext, useContext, useEffect } from "react";
interface AuthContextType {
  auth: { accessToken: string; user: { name: string } | null } | null;
  setAuth: React.Dispatch<React.SetStateAction<{ accessToken: string; user: { name: string } } | null>>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);
export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [auth, setAuth] = useState<{ accessToken: string; user: { name: string }; loading?: boolean } | null>({
    accessToken: "",
    //@ts-ignore
    user: null,
    loading: true,
  });

  console.log(auth);
  return <AuthContext.Provider value={{ auth, setAuth }}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
export default AuthContext;
