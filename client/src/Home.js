import React, { Component } from "react";
import "./Home.css";

import Form from "./Form.js";
import AllTrips from "./AllTrips.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <div className="Home">
        <h1 className="App-title">Bart Trip Planner</h1>
        Home Component
        <Form />
        <AllTrips />
      </div>
    );
  }
}

export default Home;
