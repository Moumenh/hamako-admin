import {
  Routes,
  Route,
} from "react-router-dom";

import Layout from './Components/layout';

import Home from "./Modules/Home";
import OrdersPage from './Pages/orders-page';
import Products from './Modules/Products';

import './App.css'

const App = () => {

  return (
    <Layout>
      <Routes >
        <Route path="/" element={<Home />} />
        <Route path="products/*" element={<Products />} />
        <Route path="orders/*" element={<OrdersPage />} />
      </Routes>
    </Layout>
  )
}

export default App
