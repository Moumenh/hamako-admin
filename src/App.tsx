import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./Components/layout";

import Home from "./Modules/Home";
import OrdersPage from "./Pages/orders-page";
import Products from "./Modules/Products";

import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/*" element={<Products />} />
          <Route path="orders/*" element={<OrdersPage />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
