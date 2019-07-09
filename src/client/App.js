import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import LandingPage from "./Views/LandingPage/LandingPage";
import Home from "./Views/Home/Home";
import NewCountdown from "./Views/NewCountdown/NewCountdown";

import "./App.css";

class App extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route exact path="/" component={LandingPage} />
          <Route path="/home" component={Home} />
          <Route path="/new-countdown" component={NewCountdown} />
        </Switch>
      </Router>
    );
  }
}

export default App;
