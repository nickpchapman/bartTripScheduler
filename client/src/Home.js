import React, { Component } from "react";
import axios from "axios";

import AllTrips from "./AllTrips.js";
import Form from "./Form.js";
import "bulma/css/bulma.css";
import "./Home.css";

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
        <section className="hero is-info is-fullheight is-bold">
          <div className="hero-head">
            <div className="container main-container">
              <h1 className="title">Bart Trip Planner</h1>
              <h2 className="subtitle">plan your next ride!</h2>
              <Form
                stnList={this.state.stnList}
                getNewSchedule={this.getTripSchedule.bind(this)}
              />
              <AllTrips
                currentTrips={this.state.currentSchedule}
                stnLookup={this.state.stnLookup}
              />
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
