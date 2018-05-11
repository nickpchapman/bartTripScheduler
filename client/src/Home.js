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
    axios
      .get("/stnList")
      .then(
        function(response) {
          this.setState({ stnList: response.data });
        }.bind(this)
      )
      .catch(function(error) {
        console.log(error);
      });
  }

  getTripSchedule(tripType, startStn, endStn, tripDate, tripTime) {
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
      .then(
        function(response) {
          console.log("data back", response.data);
          this.setState({ tripSchedule: response.data.trip });
        }.bind(this)
      )
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
