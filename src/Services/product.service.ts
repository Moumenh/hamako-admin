import { axiosInstance } from "./axiosInstance";

type request<T> = {
  status: boolean;
  body: T;
};

const createProduct = async (payload) => {
  const { data } = await axiosInstance.post("product", payload)
  return data
}

const getProductListing = async (payload) => {
  const { data } = await axiosInstance.get("product", {
    params: payload
  })
  return data
}

export { createProduct, getProductListing };
