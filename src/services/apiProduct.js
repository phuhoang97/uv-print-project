import axios from "axios";

const BASE_URL = "https://ecommerce-printer-be.vercel.app/api";

const api = axios.create({
  baseURL: BASE_URL,
});

export const fetchProducts = () => {
  return api.get("/products");
};

export const getProductById = (id) => {
  return api.get(`/products/${id}`);
};
