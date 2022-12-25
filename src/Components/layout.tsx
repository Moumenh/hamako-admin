import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps;

const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  return (
    <div className="layout">
      <header className="header"></header>
      <main className="main">
        <section className="side-bar">
          <span>
            <h1 onClick={() => navigate("/")}>Statistics</h1>
          </span>
          <span>
            <h1 onClick={() => navigate("products")}>Products</h1>
          </span>
          <span>
            <h1 onClick={() => navigate("orders")}>Orders</h1>
          </span>
        </section>
        <section className="content">
          <div>{children}</div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
