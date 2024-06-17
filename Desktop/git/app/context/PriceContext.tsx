"use client";
import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

type PriceContextType = {
  count: number;
  setCount: (count: number) => void;
  variance: string[];
  setVariance: any;resetVariance:any
};
const priceContext = createContext<PriceContextType | undefined>(undefined);

function PriceProvider({ children }: { children: React.ReactNode }) {
  const [variance, setVariance] = useState<string[]>([]);
  const [count, setCount] = useState<number>(1);
const resetVariance=()=>{
  setVariance([])
}

  const contextValue: PriceContextType = {
    variance,
    setCount,
    count,resetVariance,
    setVariance,
  };
  return <priceContext.Provider value={contextValue}>{children}</priceContext.Provider>;
}

function usePrice() {
  const context = useContext(priceContext);
  if (!context) throw new Error("useColor must be used within a ColorProvider");
  return context;
}

export { PriceProvider, usePrice };
