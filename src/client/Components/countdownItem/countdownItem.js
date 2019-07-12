import React, { Component } from "react";
import { Link } from "react-router-dom";
import { UrlAPI } from "../../utils/constants";
import Matrix from "./../../assets/matrix.jpg";
import Cuisine from "./../../assets/cuisine.jpeg";
import Plongee from "./../../assets/plongee.jpg";
import Escapegame from "./../../assets/escapegame.jpg";
import Default from "./../../assets/default-vignette.jpg";

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
      .then(response => {
        console.log(response);
        if (response) {
          this.props.handleDelete();
        }
        return response;
      })
      .catch(err => console.log(err));
  }

  renderBackground(param) {
    switch (param) {
      case "matrix":
        return Matrix;
      case "cuisine":
        return Cuisine;
      case "plongee":
        return Plongee;
      case "escapegame":
        return Escapegame;
      default:
        return Default;
    }
  }

  render() {
    return (
      <>
        <div className="itemWrapper">
          <div className="picture">
            <img
              className="Background"
              src={this.renderBackground(this.props.name_theme)}
            />
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
