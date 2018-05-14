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
      allTripsInfo: false,
      stnList: [],
      stnLookup: false
    };

    this.getNewSchedule = this.getNewSchedule.bind(this);
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

  getNewSchedule(tripDate, destStn, originStn, tripTime, tripType) {
    axios
      .get("/newSchedule", {
        params: {
          date: tripDate,
          dest: destStn,
          orig: originStn,
          time: tripTime,
          type: tripType
        }
      })
      .then(response => {
        this.setState({ allTripsInfo: response.data });
      })
      .catch(function(error) {
        console.log(error);
      });
  }

  render() {
    return (
      <div>
        <section className="hero is-bold is-fullheight is-info ">
          <div className="hero-head">
            <div className="container main-container">
              <h1 className="title">BART Trip Planner</h1>
              <h2 className="subtitle">Now with more BART!</h2>
              <div className="columns">
                <div className="column is-narrow">
                  <Form
                    getNewSchedule={this.getNewSchedule}
                    stnList={this.state.stnList}
                  />
                </div>
                <div className="column">
                  {this.state.allTripsInfo && (
                    <AllTrips
                      allTripsData={this.state.allTripsInfo}
                      stnLookup={this.state.stnLookup}
                    />
                  )}
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    );
  }
}

export default Home;
