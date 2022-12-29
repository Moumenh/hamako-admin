import { axiosInstance } from "./axiosInstance";

type request<T> = {
  status: boolean;
  body: T;
  pagination: {
    count: number;
    pageSize: number;
    pageCount: number;
    pageNumber: number;
  };
};

export type Category = {
  id: number;
  name: string;
  slug: string;
  imageUrl: string;
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
};

const getCategories = async () => {
  const { data } = await axiosInstance.get<request<Category[]>>("category");
  return data;
};

export { getCategories };