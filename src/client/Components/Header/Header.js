import React from "react";
import { Link } from "react-router-dom";
import logo from "./../../assets/lemoncd.png";

import "./header.scss";

function Header() {
  return (
    <>
      <div className="whiteHeader">
        <Link to="/home">
          <img className="logo" src={logo} alt="Logo" />
        </Link>
      </div>
      <div className="yellowLine" />
    </>
  );
}

export default Header;
