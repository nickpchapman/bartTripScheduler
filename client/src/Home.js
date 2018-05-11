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
      stnLookup: false,
      currentSchedule: false
    };
  }

  componentDidMount() {
    this.getStationList();
  }

  getStationList() {
    axios
      .get("/stnList")
      .then(response => {
        this.setState({
          stnList: response.data.station,
          stnLookup: response.data.lookup
        });
      })
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
      .then(response => {
        this.setState({ currentSchedule: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div className="Home">
        <h1 className="App-title">Bart Trip Planner</h1>
        <Form
          stnList={this.state.stnList}
          getNewSchedule={this.getTripSchedule.bind(this)}
        />
        <AllTrips
          currentTrips={this.state.currentSchedule}
          stnLookup={this.state.stnLookup}
        />
      </div>
    );
  }
}

export default Home;
