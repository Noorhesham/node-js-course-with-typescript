import axios from "axios";
const BASE_URL = "http://localhost:3000";

// https://product-managment-system.onrender.com/api
export default axios.create({ baseURL: BASE_URL });
//اول حاجه هعمل جلوبال اكسيوس عشان نقدر نستعمله في الابلكيشن كله
// ده (config)دي هيكون بدايتها اللينك الي فوق بنفس ال  (instance)اي اكسيوس ريكوست هتتعمل بال)
//فكر فيها زي نسخه من اكسيوس لكن مطبق عليها اعدادات معينه بمزاجك انت
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});
