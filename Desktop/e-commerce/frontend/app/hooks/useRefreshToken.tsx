import axios from "../api/axios"; // Use a public axios instance without interceptors
import { useAuth } from "../context/AuthProvider";

const useRefreshToken = () => {
  const { setAuth } = useAuth();


  const refresh = async () => {
    try {
      setAuth((prev) => ({ ...prev, loading: true }));
      const res = await axios.get("/auth/refresh", {
        withCredentials: true, // Send refresh token cookie
      });
      
      console.log("Refresh response:", res.data);

      // Ensure correct token key
      const newAccessToken = res.data.accessToken || res.data.token;

      if (!newAccessToken) {
        console.error("No access token returned from refresh!");
        throw new Error("Failed to refresh token");
      }

      setAuth((prev) => ({
        ...prev,
        accessToken: newAccessToken,
        user: res.data.data?.user ?? prev.user, // Ensure user data is updated
        loading: false,
      }));

      return newAccessToken;
    } catch (error) {
      setAuth((prev) => ({ ...prev, loading: false }));
      console.error("Error refreshing token:", error);
      throw error; // Stop the infinite loop
    }
  };

  return refresh;
};

export default useRefreshToken;
