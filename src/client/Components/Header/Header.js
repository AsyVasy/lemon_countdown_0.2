import React from "react";
import { Link } from "react-router-dom";

import "./header.scss";

function Header() {
  return (
    <>
      <div className="App">Je suis le header</div> <Link to="/home"> LOGO</Link>{" "}
      <div className="yellowLine" />
    </>
  );
}

export default Header;
