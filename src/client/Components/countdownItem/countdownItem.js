import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UrlAPI } from "../../utils/constants";

import "./countdownItem.scss";

class CountdownItem extends Component {
  callApi = async url => {
    const response = await fetch(url);
    const body = await response.json();
    if (response.status !== 200) throw Error(body.message);
    return body;
  };

  handleClick(event) {
    const fetch_param = {
      method: "DELETE",
      headers: { "content-type": "application/json" }
    };
    this.callApi(UrlAPI + "/countdown/" + this.props.id, fetch_param)
      .then(res => {
        console.log("res depuis le back -->", res);
      })
      .catch(err => console.log(err));
  }

  render() {
    return (
      <>
        <div className="item">{this.props.name}</div>
        <Link to="/play-countdown">play</Link>
        <Link
          to={{
            pathname: "/edit-countdown",
            state: {
              id_countdown: this.props.id
            }
          }}
        >
          edit
        </Link>
        <button className="delete_button" onClick={e => this.handleClick(e)}>
          Supprimer
        </button>
      </>
    );
  }
}

export default CountdownItem;
