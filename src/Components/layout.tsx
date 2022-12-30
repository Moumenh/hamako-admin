import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.css";
import { Button, useColorMode } from "@chakra-ui/react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps;

const Layout: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <div className="layout">
      <header className="header">
        <h1>Hamako</h1>
      </header>
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
          <Button style={{ marginTop: "auto" }} onClick={toggleColorMode}>
            {colorMode === "light" ? <MoonIcon/> : <SunIcon/>} 
          </Button>
        </section>
        <section className="content">
          <div>{children}</div>
        </section>
      </main>
    </div>
  );
};

export default Layout;
