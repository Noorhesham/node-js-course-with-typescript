"use client"
import React, { useState, createContext, useContext, useEffect } from "react";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "./AuthProvider";

const PersistContext = createContext<any | undefined>(undefined);
export const PersistProvider = ({ children }: { children: React.ReactNode }) => {
  const refersh = useRefreshToken();
  const { auth } = useAuth();
  useEffect(() => {

    const verifyRefreshToken = async () => {
      await refersh();
    };
    !auth?.accessToken && verifyRefreshToken();
  }, []);
  return <PersistContext.Provider value={{ refersh }}>{children}</PersistContext.Provider>;
};

export default PersistContext;
