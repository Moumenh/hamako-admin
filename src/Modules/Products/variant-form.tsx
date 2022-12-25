import { Input, Box, Flex } from "@chakra-ui/react";
import { useProductForm } from "./context/product.context";

const VariantForm = ({ variant, index }: any) => {
  const { register } = useProductForm();

  return register ? (
    <Flex mb="4" alignItems="center">
      <Flex minWidth="170px">
        {variant?.options?.map((o: any, i: number) => (
          <Box key={o.id} mr="1">
            {o.value} {i !== variant.options.length - 1 && "/"}
          </Box>
        ))}
      </Flex>
      <Input type="text" w="120px" mr="4" placeholder="Sku" {...register(`variants.${index}.sku`)} />
      <Input type="text" w="120px" mr="4" placeholder="Upc" {...register(`variants.${index}.upc`)} />
      <Input type="text" w="120px" mr="4" placeholder="Retail price" {...register(`variants.${index}.retailPrice`)} />
      <Input type="text" w="120px" mr="4" placeholder="Sale price" {...register(`variants.${index}.salePrice`)} />
      <Input type="text" w="120px" mr="4" placeholder="Store price" {...register(`variants.${index}.storePrice`, { required: true })} />
    </Flex>
  ) : null;
};

export default VariantForm;
