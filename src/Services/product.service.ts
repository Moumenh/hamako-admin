import { axiosInstance } from "./axiosInstance";

type request<T> = {
  status: boolean;
  body: T;
};

export type Option = {
  id: number;
  name: string;
  createdAt: Date;
  updatedAt: Date;
};

export type OptionValue = {
  id: number;
  value: string;
  optionId: number;
  createdAt: Date;
  updatedAt: Date;
};

const getOptions = async () => {
  const { data } = await axiosInstance.get<
    request<
      (Option & {
        values: OptionValue[];
      })[]
    >
  >("product/option");
  return data;
};

const createProduct = async (payload) => {
  const { data } = await axiosInstance.post("product", payload)
  console.log({ data });
  return data
}

export { getOptions, createProduct };
