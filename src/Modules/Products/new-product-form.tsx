import { useProductForm } from "./context/product.context";
import { Input, Checkbox, Box, Button } from "@chakra-ui/react";
import Options from "./options";

const NewProductForm = () => {
  const { handleAddingProduct, register, isVariant } = useProductForm();
  return register ? (
    <form onSubmit={handleAddingProduct}>
      <Box>
        <Input type="text" placeholder="Product Name" mb="4" {...register("name", { minLength: 3 })} />
        <Input type="text" placeholder="Product Slug" mb="4" {...register("slug", { required: true })} />
        <Input type="text" placeholder="Product description" mb="4" {...register("description", { minLength: 6 })} />
        <Box mb="4">
          <Checkbox {...register("isActive", { value: "true" })} mr="4">
            is Active
          </Checkbox>
          <Checkbox {...register("isVariant")}>is variant Product</Checkbox>
        </Box>
      </Box>
      {isVariant && <Options />}
      <Button type="submit">Submit</Button>
    </form>
  ) : null;
};

export default NewProductForm;
