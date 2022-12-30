import { Routes, Route } from "react-router-dom";
import OrdersListing from "./orders-listing";

const Orders = () => {
  return (
    <Routes>
      <Route path="/" element={<OrdersListing />} />
    </Routes>
  );
};

export default Orders;
