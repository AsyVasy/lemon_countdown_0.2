import React from "react";
import { Link } from "react-router-dom";

function LandingPage() {
  return (
    <>
      <div className="App">Je suis la landing page</div>{" "}
      <Link to="/home"> aller à la home</Link>{" "}
    </>
  );
}

export default LandingPage;
