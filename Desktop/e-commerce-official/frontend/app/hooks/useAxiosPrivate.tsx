import { useEffect } from "react";
import useRefreshToken from "./useRefreshToken";
import { useAuth } from "../context/AuthProvider";
import { axiosPrivate } from "../api/axios";

const useAxiosPrivate = () => {
  const refresh = useRefreshToken();
  const { auth, setAuth } = useAuth(); // Make sure you have a `setAuth` function in your context

  useEffect(() => {
    const requestIntercept = axiosPrivate.interceptors.request.use(
      (config) => {
        if (!config.headers["Authorization"]) {
          config.headers["Authorization"] = `Bearer ${auth?.accessToken}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );

    const responseIntercept = axiosPrivate.interceptors.response.use(
      (response) => response,
      async (error) => {
        const prevRequest = error?.config;

        if (error?.response?.status === 401 && !prevRequest?.sent) {
          prevRequest.sent = true; // ✅ Prevent infinite loop
          try {
            const newAccessToken = await refresh();
            prevRequest.headers["Authorization"] = `Bearer ${newAccessToken}`;
            return axiosPrivate(prevRequest); // ✅ Retry request with new token
          } catch (refreshError) {
            console.error("Token refresh failed:", refreshError);
            return Promise.reject(refreshError); // ✅ Stop looping if refresh fails
          }
        }
        return Promise.reject(error);
      }
    );

    return () => {
      axiosPrivate.interceptors.request.eject(requestIntercept);
      axiosPrivate.interceptors.response.eject(responseIntercept);
    };
  }, [auth, refresh, setAuth]); // ✅ Include `setAuth` to ensure state updates properly

  return axiosPrivate;
};

export default useAxiosPrivate;
