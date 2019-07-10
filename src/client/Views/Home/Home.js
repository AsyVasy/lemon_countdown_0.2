import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UrlAPI } from "../../utils/constants";
import Header from "../../Components/Header/Header.js";
import CountdownItem from "../../Components/countdownItem/countdownItem";

class Home extends Component {
  state = {
    allCountdowns: []
  };

  componentDidMount() {
    this.callApi(UrlAPI + "/countdown")
      .then(res => {
        console.log(res);
        this.setState({ allCountdowns: res[1] });
      })
      .catch(err => console.log(err));
  }

  callApi = async url => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    // console.log(body);
    return body;
  };

  displayCountdowns = () => {
    const { allCountdowns } = this.state;
    return allCountdowns.map(e => <CountdownItem name={e.name} />);
  };

  render() {
    const { allCountdowns } = this.state;
    return (
      <>
        <Header />
        <h2>Vos comptes à rebours existants</h2>
        {allCountdowns.length > 0 ? (
          (<p>Vos comptes à rebours existants</p>, this.displayCountdowns())
        ) : (
          <p>Vous n'avez pas encore créé de compte à rebours</p>
        )}{" "}
        <Link to="/new-countdown">Créer un nouveau compte à rebours</Link>
      </>
    );
  }
}

export default Home;
