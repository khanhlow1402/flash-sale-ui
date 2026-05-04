import axios from "axios";
import { BASE_URLS, USER_ID, USE_MOCK } from "./config";

export const checkout = async (cartItems) => {
  if (USE_MOCK) {
    // Giả lập checkout thành công
    return {
      data: {
        orderId: "ORD_" + Date.now(),
        status: "success",
        message: "Đặt hàng thành công!",
      },
    };
  }
  return axios.post(`${BASE_URLS.order}/checkout`, { userId: USER_ID });
};
