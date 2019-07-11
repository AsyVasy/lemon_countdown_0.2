import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./countdownItem.scss";

class CountdownItem extends Component {
  render() {
    console.log("props--> ", this.props);

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
      </>
    );
  }
}

export default CountdownItem;
