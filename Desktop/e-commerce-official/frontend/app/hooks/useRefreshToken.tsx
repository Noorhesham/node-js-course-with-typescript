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
        console.warn("No access token returned from refresh. Logging out...");
        setAuth({ accessToken: null, user: null, loading: false }); // Clear auth state
        return null; // Indicate no token
      }

      setAuth((prev) => ({
        ...prev,
        accessToken: newAccessToken,
        user: res.data.data?.user ?? prev.user, // Ensure user data is updated
        loading: false,
      }));

      return newAccessToken;
    } catch (error) {
      console.warn("Error refreshing token:", error.response?.data || error.message);

      // If refresh token is invalid, log out the user
      setAuth({ accessToken: null, user: null, loading: false });

      return null; // Indicate refresh failure without throwing
    }
  };

  return refresh;
};

export default useRefreshToken;
