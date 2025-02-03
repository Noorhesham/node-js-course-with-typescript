import axios from "@/api/axios";
import { useAuth } from "@/context/AuthProvider";
const useLogout = () => {
  const { setAuth } = useAuth();
  const logout = async () => {
    setAuth(null);
    try {
      await axios.get("/auth/logout", { withCredentials: true });
    } catch (error) {
      console.log(error);
    }
  };
  return logout;
};
export default useLogout;
