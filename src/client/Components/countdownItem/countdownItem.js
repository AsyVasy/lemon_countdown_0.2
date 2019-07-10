import React, { Component } from "react";
import { Link } from "react-router-dom";

import "./countdownItem.scss";

class CountdownItem extends Component {
  render() {
    console.log("props--> ", this.props);

    return (
      <>
        {" "}
        <Link to="/edit-countdown">
          <div className="item">{this.props.name}</div>
        </Link>
      </>
    );
  }
}

export default CountdownItem;
