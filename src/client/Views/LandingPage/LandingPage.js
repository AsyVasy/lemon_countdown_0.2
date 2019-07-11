import React from "react";
import { Link } from "react-router-dom";
import "./landingpage.scss";
import  logo  from "../../assets/lemoncd.png";



function LandingPage() {
  return (
    <>
    <section className="create1">
          <figure className="logo1">
            <img src={logo} alt="logo"/>
          </figure>
      
        </section>
      <div className="link11">
      <button className="btn btn-primary"><Link to="/home"> Créer un compteur</Link>{" "}</button>
      
      </div>
      <div className="link12">
      <Link to="/home"> Voir tous les compteurs</Link>{" "}
      </div>

      
    </>
  );
}

export default LandingPage;
