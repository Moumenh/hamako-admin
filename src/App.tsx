import { Routes, Route } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import Layout from "./Components/layout";

import Home from "./Modules/Home";
import Products from "./Modules/Products";
import Orders from "./Modules/Orders";
import Options from "./Modules/Options";

import "./App.css";

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="products/*" element={<Products />} />
          <Route path="orders/*" element={<Orders />} />
          <Route path="options/*" element={<Options />} />
        </Routes>
      </Layout>
    </QueryClientProvider>
  );
};

export default App;
