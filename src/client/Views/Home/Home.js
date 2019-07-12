import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UrlAPI } from "../../utils/constants";
import Header from "../../Components/Header/Header.js";
import CountdownItem from "../../Components/countdownItem/countdownItem";

import "./Home.scss";

class Home extends Component {
  state = {
    allCountdowns: []
  };

  componentDidMount() {
    this.callApi(UrlAPI + "/countdown")
      .then(res => {
        this.setState({ allCountdowns: res[1] });
      })
      .catch(err => console.log(err));
  }

  callApi = async url => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleDeleteChild = () => {
    this.callApi(UrlAPI + "/countdown")
      .then(res => {
        this.setState({ allCountdowns: res[1] });
      })
      .catch(err => console.log(err));
  };

  displayCountdowns = () => {
    const { allCountdowns } = this.state;
    return allCountdowns.map(e => (
      <CountdownItem
        name={e.name}
        id={e.id}
        key={e.id}
        name_theme={e.name_theme}
        handleDelete={this.handleDeleteChild}
      />
    ));
  };

  render() {
    const { allCountdowns } = this.state;
    console.log("results -->", allCountdowns);
    return (
      <>
        <Header />
        <h2 className="home-title">Vos comptes à rebours existants</h2>
        {allCountdowns.length > 0 ? (
          <div className="contain">
            <div className="list">{this.displayCountdowns()} </div>
          </div>
        ) : (
          <p>Vous n'avez pas encore créé de compte à rebours</p>
        )}{" "}
        <div className="bouton">
          <h1>+</h1>
        </div>
        <Link to="/new-countdown">Créer un nouveau compte à rebours</Link>
      </>
    );
  }
}

export default Home;
