import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.scss";
import logo from "../../assets/lemoncd.png";

function LandingPage() {
  return (
    <>
      <section className="landing">
        <figure className="logo1">
          <img src={logo} alt="logo" />
        </figure>

        <div className="subtitle">
          Bienvenue sur le générateur de compte à rebours!
        </div>
        <div className="link11">
          <button className="btn btn-primary">
            <Link to="/new-countdown"> ENTRER</Link>{" "}
          </button>
        </div>
      </section>
    </>
  );
}

export default LandingPage;
