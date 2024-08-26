"use client";
import { createContext, useContext, useEffect, useState } from "react";
import cookies from "js-cookie";
import { Server } from "../main/Server";
import { useQueryClient } from "@tanstack/react-query";
import { useLocalStorageState } from "../hooks/useLocalStorageState";
import { useDevice } from "./DeviceContext";

const AuthContext = createContext<any>(undefined);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const queryClient = useQueryClient();
  const { deviceInfo } = useDevice();
  const [login, setLogin] = useState<any>(false);
  const [dates, setDates] = useLocalStorageState(
    {
      last_update_date_general: "",
      last_update_date_user: "",
      last_update_date_user2: "",
    },
    "dates"
  );
  const token = cookies.get("jwt");
  const [generalSettings, setGeneralSettings] = useState<any>(() => queryClient.getQueryData(["general_settings"]));
  const [userSettings, setUserSettings] = useState<any>(() => queryClient.getQueryData(["user_settings"]));
  const [user2Settings, setUser2Settings] = useState<any>(() => queryClient.getQueryData(["user2_settings"]));
  const [loading, setLoading] = useState(true);
  console.log("auth context", generalSettings, userSettings, user2Settings);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await Server({
          method: "POST",
          resourceName: "MGS",
          body: {
            needed: ["general_settings", "user_settings", "user2_settings", "check_auth"],
            token,
            last_update_date_general: dates.last_update_date_general,
            last_update_date_user: dates.last_update_date_user,
            last_update_date_user2: dates.last_update_date_user2,
            device_id: deviceInfo.device_unique_id,
          },
        });

        // Handle general settings
        if ((res.general_settings?.data && res.status !== false) || !queryClient.getQueryData(["general_settings"])) {
          setGeneralSettings(res.general_settings);
          queryClient.setQueryData(["general_settings"], res.general_settings.data);
          setDates((prevDates: any) => ({
            ...prevDates,
            last_update_date_general: res.general_settings.data?.last_update_date,
          }));
        } else {
          // Keep the current state if no updates
          setGeneralSettings((prev: any) => prev || queryClient.getQueryData(["general_settings"]));
        }

        console.log(res.user_settings, res.user2_settings, res.general_settings);
        if (res.user_settings) {
          setUserSettings(res.user_settings);
          queryClient.setQueryData(["user_settings"], res.user_settings);
          setDates((prevDates: any) => ({
            ...prevDates,
            last_update_date_user: res.user_settings?.last_update_date,
          }));
        }
        if ((res.user2_settings?.data && res.status !== false) || !queryClient.getQueryData(["user2_settings"])) {
          setUser2Settings(res.user2_settings.data);
          queryClient.setQueryData(["user2_settings"], res.user2_settings.data);
          setDates((prevDates: any) => ({
            ...prevDates,
            last_update_date_user2: res.user2_settings?.data?.last_update_date,
          }));
        } else {
          setUser2Settings((prev: any) => prev || queryClient.getQueryData(["user2_settings"]));
        }
      } catch (error) {
        console.error("Error fetching settings:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [login, queryClient]);

  const handleLogout = () => {
    setLoading(true);
    cookies.remove("jwt");
    queryClient.removeQueries({ queryKey: ["user_settings"] });
    queryClient.removeQueries({ queryKey: ["user2_settings"] });
    const newDates = {
      last_update_date_general: dates.last_update_date_general,
      last_update_date_user: "",
      last_update_date_user2: "",
    };
    setDates(newDates);
    setUserSettings(undefined);
    setUser2Settings(undefined);
    setLoading(false);
  };
  // const invalidate = () => {
  //   queryClient.invalidateQueries(["user_settings"], { refetchActive: true, refetchInactive: true });
  // };
  return (
    <AuthContext.Provider value={{ generalSettings, userSettings, user2Settings, handleLogout, setLogin, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within a AuthProvider");
  }
  return context;
};

export { AuthProvider, useAuth };
