import React, { Component } from "react";
import "./Home.css";

import axios from "axios";
import "bulma/css/bulma.css";

import Form from "./Form.js";
import AllTrips from "./AllTrips.js";

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      stnList: []
    };
  }

  componentDidMount() {
    this.getStationList();
  }

  getStationList() {
    let context = this;
    axios
      .get("/stnList")
      .then(function(response) {
        context.setState({ stnList: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Home">
        <h1 className="App-title">Bart Trip Planner</h1>
        Home Component
        <Form stnList={this.state.stnList} />
        <AllTrips />
      </div>
    );
  }
}

export default Home;
