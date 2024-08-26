"use client";
import { createContext, useContext } from "react";
import { useLocalStorageState } from "../hooks/useLocalStorageState";

const DeviceContext = createContext<{ deviceInfo: { device_unique_id: string; operating_system: string; type: string; operating_system_version: string }; setDeviceUniqueId: any } | undefined>(undefined);
const generateUniqueId = (os: string, version: string) => {
  const randomComponent = Date.now().toString(36) + Math.random().toString(36).substr(2);
  return `${version}${randomComponent}`;
};
const getDeviceType = () => {
  const ua = global?.window?.navigator.userAgent;
  if (/mobile/i.test(ua)) return "Mobile";
  if (/tablet/i.test(ua)) return "Tablet";
  return "Desktop";
};

const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
  const operating_system = global?.window?.navigator.appVersion;
  const operating_system_version = operating_system?.split(" ")[0];
  const [deviceInfo, setDeviceUniqueId] = useLocalStorageState(
    {
      device_unique_id: generateUniqueId(operating_system, operating_system_version),
      operating_system,
      operating_system_version,
      type: getDeviceType(),
    },
    "deviceInfo",
    true
  );
  return <DeviceContext.Provider value={{ deviceInfo, setDeviceUniqueId }}>{children}</DeviceContext.Provider>;
};
const useDevice = () => {
  const context = useContext(DeviceContext);
  if (!context) {
    throw new Error("useDevice must be used within a DeviceProvider");
  }
  return context;
};

export { DeviceProvider, useDevice };
