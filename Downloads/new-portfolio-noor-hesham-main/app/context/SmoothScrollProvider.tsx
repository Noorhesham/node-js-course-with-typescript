"use client";
import React, { createContext, useEffect, useLayoutEffect, useState } from "react";
import useLocoScroll from "../hooks/useLocoScroll";

export const SmoothScrollContext = createContext({
  locoScroll: null,
});

export const SmoothScrollProvider = ({ children, options }: { children: React.ReactNode; options?: any }) => {
  const { locoScroll } = useLocoScroll();

  return <SmoothScrollContext.Provider value={{ locoScroll }}>{children}</SmoothScrollContext.Provider>;
};
export const useSmoothScroll = () => React.useContext(SmoothScrollContext);
SmoothScrollContext.displayName = "SmoothScrollContext";
SmoothScrollProvider.displayName = "SmoothScrollProvider";
