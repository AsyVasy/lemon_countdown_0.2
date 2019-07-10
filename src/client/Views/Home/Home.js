import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UrlAPI } from "../../utils/constants";
import Header from "../../Components/Header/Header.js";

class Home extends Component {
  state = {
    allCountdowns: []
  };

  componentDidMount() {
    this.callApi(UrlAPI + "/countdown")
      .then(res => {
        console.log(res);
        this.setState({ allCountdowns: res });
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

  render() {
    console.log("const url -->", UrlAPI);

    return (
      <>
        <div>Je suis la home</div>
        <Header />
        <Link to="/new-countdown">Créer un nouveau compte à rebours</Link>{" "}
      </>
    );
  }
}

export default Home;
