import { useNavigate } from "react-router-dom";
import { useMutation } from "react-query";

import { ProductContextProvider } from "./context/product.context";
import NewProductForm from "./new-product-form";

import { createProduct } from "../../Services";

const NewProduct = () => {
  const navigate = useNavigate();
  const {mutate, data} = useMutation(createProduct)
  console.log({ dataTrial: data });
  const onSubmit = (data: any) => { // TODO: define form data type
    console.log("hereeee nowww")
    console.log({ data })
    mutate(data)
  }

  return (
    <ProductContextProvider onSubmit={onSubmit}>
      <NewProductForm />
    </ProductContextProvider>
  );
};

export default NewProduct;
