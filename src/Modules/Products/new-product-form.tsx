import { useMemo } from "react";
import { useQuery } from "react-query";
import Select from "react-select";
import { Input, Checkbox, Box, Button } from "@chakra-ui/react";
import { useProductForm } from "./context/product.context";
import { getCategories } from "../../Services";
import Options from "./options";
import { Controller } from "react-hook-form";
import VariantForm from "./variant-form";

const NewProductForm = () => {
  const { handleAddingProduct, register, isVariant, control } =
    useProductForm();

  const { data: categoriesApi } = useQuery("categories", getCategories);
  const formattedCategories = useMemo(() => {
    if (categoriesApi?.status) {
      return categoriesApi.body.map((category) => ({
        label: category.name,
        value: category.id,
        category,
      }));
    }
  }, [categoriesApi]);

  return register ? (
    <form onSubmit={handleAddingProduct}>
      <Box>
        <Input
          type="text"
          variant="filled"
          placeholder="Product Name"
          mb="4"
          {...register("name", { minLength: 3 })}
        />
        <Input
          type="text"
          variant="filled"
          placeholder="Product Slug"
          mb="4"
          {...register("slug", { required: true })}
        />
        <Input
          type="text"
          variant="filled"
          placeholder="Product description"
          mb="4"
          {...register("description", { minLength: 6 })}
        />
        <Controller
          name="categoryIds"
          control={control}
          render={({ field: { onChange, value } }) => (
            <Select
              placeholder="Select categories"
              isMulti
              options={formattedCategories}
              value={formattedCategories?.filter((cat) =>
                value?.includes(cat.value)
              )}
              onChange={(categories) =>
                onChange(categories?.map((category) => category.value))
              }
              styles={{
                container: (provider) => ({
                  ...provider,
                  marginBottom: 16,
                }),
              }}
            />
          )}
          rules={{ required: true }}
        />
        <Box mb="4">
          <Checkbox {...register("isActive", { value: true } as any)} mr="4">
            is Active
          </Checkbox>
          <Checkbox {...register("isVariant")}>is variant Product</Checkbox>
        </Box>
      </Box>
      {isVariant ? <Options /> : <VariantForm index="0" />}
      <Button type="submit">Submit</Button>
    </form>
  ) : null;
};

export default NewProductForm;
