import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UrlAPI } from "../../utils/constants";
import Matrix from "./../../assets/matrix.jpg";
import Cuisine from "./../../assets/cuisine.jpeg";

import "./countdownItem.scss";

class CountdownItem extends Component {
  callApi = async (url, params) => {
    const response = await fetch(url, params);
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
    const Background = this.props.name_theme === "matrix" ? Matrix : Cuisine;

    return (
      <>
        <div className="itemWrapper">
          <div className="picture">
            <img className="Background" src={Background} />
            <p className="countdown_name">{this.props.name}</p>
          </div>
          <div className="commands">
            <Link
              to={{
                pathname: "/play-countdown",
                state: {
                  id_countdown: this.props.id
                }
              }}
            >
              <i className="fas fa-play fa-2x CommandItem" />
            </Link>
            <Link
              to={{
                pathname: "/edit-countdown",
                state: {
                  id_countdown: this.props.id
                }
              }}
            >
              <i className="fas fa-pen fa-2x CommandItem" />
            </Link>
            {/* <button
              className="delete_button"
              
            >
              Supprimer
            </button> */}
            <i
              className="fas fa-trash-alt fa-2x CommandItem"
              onClick={e => this.handleClick(e)}
            />
          </div>
        </div>
      </>
    );
  }
}

export default CountdownItem;
