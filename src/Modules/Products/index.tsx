import { Routes, Route } from "react-router-dom";
import NewProduct from "./new-product";
import ProductListing from "./product-listing";
import EditProduct from "./edit-product";

const Products = () => {
  return (
    <Routes>
      <Route path="/" element={<ProductListing />} />
      <Route path="new" element={<NewProduct />} />
      <Route path=":id" element={<EditProduct />} />
    </Routes>
  );
}

export default Products;