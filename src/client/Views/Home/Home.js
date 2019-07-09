import React, { Component } from "react";
import { Link } from "react-router-dom";

class Home extends Component {
  render() {
    return (
      <>
        <div>Je suis la home</div>
        <Link to="/new-countdown">Créer un nouveau compte à rebours</Link>{" "}
      </>
    );
  }
}

export default Home;
