import React, { createContext, useContext, useState } from "react";

interface NavContextType {
  title: string;
  setTitle: (title: string) => void;
}

const NavContext = createContext<NavContextType | undefined>(undefined);

export const NavProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [title, setTitle] = useState("Main Page");

  return <NavContext.Provider value={{ title, setTitle }}>{children}</NavContext.Provider>;
};

export const useNav = () => {
  const context = useContext(NavContext);
  if (!context) {
    throw new Error("useNav must be used within a NavProvider");
  }
  return context;
};
