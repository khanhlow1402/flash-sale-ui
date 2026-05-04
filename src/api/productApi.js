import axios from "axios";
import { BASE_URLS, USE_MOCK } from "./config";
import { mockProducts } from "../mock/mockData";

export const getProducts = async () => {
  if (USE_MOCK) return { data: mockProducts };
  return axios.get(`${BASE_URLS.product}/products`);
};

export const getProductById = async (id) => {
  if (USE_MOCK) return { data: mockProducts.find((p) => p.id === id) };
  return axios.get(`${BASE_URLS.product}/products/${id}`);
};
