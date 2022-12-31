import { createContext, useContext, ReactNode, FormEvent, useState } from "react";
import { useForm, useFieldArray, UseFormRegister, UseFormTrigger, FormProvider, Control } from "react-hook-form";

export type Variants = {
  sku?: string;
  upc?: string;
  retailPrice?: string;
  salePrice?: string;
  storePrice?: string;
  options?: any;
  isDeleted?: boolean;
}

type FormData = {
  name: string;
  slug: string;
  description: string;
  isActive: string;
  isVariant: boolean;
  variants: Variants[];
  categoryIds: number[];
};

export interface OptionValue {
  id: number;
  label: string;
  value: string;
}

export interface Option {
  id: string;
  name: string;
  values: OptionValue[];
}

export interface Combination {
  id: string;
  options: OptionValue[];
}

export interface OptionSelection {
  label: string;
  option: Option;
  selectedValues: OptionValue[];
  value: string;
}

interface SelectedOption {
  [key: string]: OptionSelection;
}

type ProductContextDefaultValues = {
  isVariant?: boolean;
  variants?: Variants[];
  setVariants?: (combinations: Combination[]) => void;
  handleAddingProduct?: (e: FormEvent<HTMLFormElement>) => void;
  register?: UseFormRegister<FormData>;
  trigger?: UseFormTrigger<FormData>;
  selectedOptions: SelectedOption;
  setSelectedOptions: React.Dispatch<React.SetStateAction<SelectedOption>>
  control?: Control<FormData>;
}

const ProductContext = createContext<ProductContextDefaultValues>({
  selectedOptions: {},
  setSelectedOptions: () => {}
});

export const ProductContextProvider = ({ onSubmit, children }: { onSubmit: any; children: ReactNode }) => {
  const [selectedOptions, setSelectedOptions] = useState<SelectedOption>({})

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    trigger,
    getValues,
    control,
  } = useForm<FormData>();

  const {
    fields: variants,
    replace,
  } = useFieldArray({
    control,
    name: "variants",
  });

  const isVariant = watch("isVariant");

  const setVariants = (combinations: Combination[]) => {
    const variant = getValues("variants");
    const variants = combinations.map((combination, i) => ({
      ...combination,
      sku: variant?.[i]?.sku || "",
      upc: variant?.[i]?.upc || "",
      retailPrice: variant?.[i]?.retailPrice || "",
      salePrice: variant?.[i]?.salePrice || "",
      storePrice: variant?.[i]?.storePrice || "",
    }));
    replace(variants);
  }

  const handleAddingProduct = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const options = Object.entries(selectedOptions)
      .map(([_, { option, selectedValues }]) => ({ id: option.id, selections: selectedValues  }))
    handleSubmit((data) => onSubmit({ ...data, options }))(e);
  }

  return (
    <ProductContext.Provider
      value={{ isVariant, variants, setVariants, handleAddingProduct, register, trigger, selectedOptions, setSelectedOptions, control }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProductForm = () => {
  const context = useContext(ProductContext)
  if (!context) {
    throw new Error("useProductForm must be a child of ProductFormContext")
  }
  return context
}