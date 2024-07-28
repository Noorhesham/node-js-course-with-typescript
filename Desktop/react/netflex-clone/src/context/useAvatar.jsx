import { createContext, useContext, useEffect, useState } from "react";

const AvatarContext = createContext();
function AvatarProvider({ children }) {
  const [avatar, setAvatar] = useState(function () {
    const storedValue = localStorage.getItem("avatar");
    return storedValue ? storedValue : 1;
  });
  useEffect(function () {
    localStorage.setItem("avatar", Math.trunc(Math.random() * 4 + 1));
  }, []);

  return (
    <AvatarContext.Provider value={{ avatar }}>
      {children}
    </AvatarContext.Provider>
  );
}
function useAvatar() {
  const context = useContext(AvatarContext);
  if (context === undefined) throw new Error("used out of range");
  return context;
}
export { useAvatar, AvatarProvider };
