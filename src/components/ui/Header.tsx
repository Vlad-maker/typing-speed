import React from "react";
import { FunctionComponent } from "react";
import logo from "../../assets/img/logo.svg";
import "../../style/ui/header.scss";

const Header: FunctionComponent = () => {
  return (
    <header className="container header">
      <div className="header-container">
        <img src={logo} alt="site logo" />

        <h1 className="large-header">Typing Speed</h1>
      </div>
    </header>
  );
};

export default Header;
