import { axiosInstance, BaseResponse } from "./axiosInstance";

type OptionValue = {
  id: number;
  optionId: number;
  value: string;
  createdAt: Date;
  updatedAt: Date;
};

type Option = {
  id: number;
  name: string;
  values: OptionValue[];
  createdAt: Date;
  updatedAt: Date;
};

const getOptions = async () => {
  const { data } = await axiosInstance.get<BaseResponse<Option[]>>("product/option");
  return data;
};

// TODO: define parameters type
const createOption = async (payload) => {
  const { data } = await axiosInstance.post<BaseResponse<Option[]>>("product/option", payload);
  return data;
};

// TODO: define parameters type
const updateOption = async (payload) => {
  const { id, ...otherParams } = payload;
  const { data } = await axiosInstance.put<BaseResponse<Option[]>>(`product/option/${id}`, otherParams);
  return data;
};

export { getOptions, createOption, updateOption };
export type { Option };
