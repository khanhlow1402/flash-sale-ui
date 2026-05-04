import axios from "axios";
import { BASE_URLS, USER_ID, USE_MOCK } from "./config";

// Mock cart lưu trong memory tạm
let mockCart = [];

export const getCart = async () => {
  if (USE_MOCK) return { data: mockCart };
  return axios.get(`${BASE_URLS.cart}/cart?userId=${USER_ID}`);
};

export const addToCart = async (product, quantity = 1) => {
  if (USE_MOCK) {
    const existing = mockCart.find((item) => item.productId === product.id);
    if (existing) {
      existing.quantity += quantity;
    } else {
      mockCart.push({
        productId: product.id,
        name: product.name,
        price: product.price,
        quantity,
      });
    }
    return { data: { success: true } };
  }
  return axios.post(`${BASE_URLS.cart}/cart/add`, {
    userId: USER_ID,
    productId: product.id,
    quantity,
  });
};

export const clearMockCart = () => {
  mockCart = [];
};
