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

export { getOptions };
export type { Option };
