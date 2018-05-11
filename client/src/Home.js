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
      stnList: [],
      tripSchedule: []
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

  getTripSchedule(tripType, startStn, endStn, tripDate, tripTime) {
    let context = this;

    axios
      .get("/newSchedule", {
        params: {
          type: tripType,
          orig: startStn,
          dest: endStn,
          date: tripDate,
          time: tripTime
        }
      })
      .then(function(response) {
        console.log("data back", response.data);
        context.setState({ tripSchedule: response.data.trip });
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
        <Form
          stnList={this.state.stnList}
          getNewSchedule={this.getTripSchedule.bind(this)}
        />
        <AllTrips />
      </div>
    );
  }
}

export default Home;
