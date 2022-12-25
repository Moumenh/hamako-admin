import { useNavigate } from "react-router-dom";
import { ProductContextProvider } from "./context/product.context";
import NewProductForm from "./new-product-form";

const NewProduct = () => {
  const navigate = useNavigate();
  
  const onSubmit = (data: any) => { // TODO: define form data type
    console.log("hereeee nowww")
    console.log({data})
  }

  return (
    <ProductContextProvider onSubmit={onSubmit}>
      <NewProductForm />
    </ProductContextProvider>
  );
};

export default NewProduct;
