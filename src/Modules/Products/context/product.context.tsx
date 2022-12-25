import { createContext, useContext, ReactNode, FormEvent } from "react";
import { useForm, useFieldArray, UseFormRegister, UseFormTrigger, FormProvider } from "react-hook-form";

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

type ProductContextDefaultValues = {
  isVariant?: boolean;
  variants?: Variants[];
  setVariants?: (combinations: Combination[]) => void;
  handleAddingProduct?: (e: FormEvent<HTMLFormElement>) => void;
  register?: UseFormRegister<FormData>;
  trigger?: UseFormTrigger<FormData>;
}

const ProductContext = createContext<ProductContextDefaultValues>({});

export const ProductContextProvider = ({ onSubmit, children }: { onSubmit: any; children: ReactNode }) => {
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
    handleSubmit(onSubmit)(e)
  }

  return (
    <ProductContext.Provider
      value={{ isVariant, variants, setVariants, handleAddingProduct, register, trigger }}
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