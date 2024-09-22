import axios from "axios";
import { BASE_URL } from "./QueryFunctions";
import cookies from "js-cookie";

export default axios.create({ baseURL: BASE_URL });

export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    Authorization: `Bearer ${cookies.get("token")}`,
  },
  withCredentials: true,
});
