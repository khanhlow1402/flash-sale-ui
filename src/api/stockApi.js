import axios from "axios";
import { BASE_URLS, USE_MOCK } from "./config";
import { mockProducts } from "../mock/mockData";

export const getStock = async (productId) => {
  if (USE_MOCK) {
    const p = mockProducts.find((p) => p.id === productId);
    return { data: { stock: p?.stock ?? 0 } };
  }
  return axios.get(`${BASE_URLS.stock}/stock/${productId}`);
};
