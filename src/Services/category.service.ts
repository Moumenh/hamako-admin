import { axiosInstance, PagingResponse } from "./axiosInstance";

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
  const { data } = await axiosInstance.get<PagingResponse<Category[]>>("category");
  return data;
};

export { getCategories };