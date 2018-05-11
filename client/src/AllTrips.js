import React, { Component } from "react";
import "./AllTrips.css";
import OneTrip from "./OneTrip.js";

class AllTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTripInfo: false
    };
  }

  //only attempt to render trip info if props have been received
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = prevState;
    if (!prevState.hasTripInfo && nextProps.currentTrips) {
      newState.hasTripInfo = true;
    }
    return newState;
  }

  render() {
    console.log("all trips props", this.props);
    let { destination, origin, schedule, tripType } = this.props.currentTrips;
    let stnLook = this.props.stnLookup;
    return (
      <div>
        {!this.state.hasTripInfo ? (
          <div>select a new schedule</div>
        ) : (
          <div class="box trip-list-box">
            <div class="is-size-3 has-text-centered">
              {`${stnLook[origin]} to ${stnLook[destination]}`}
            </div>
            <div class="is-size-3">
              {`${tripType} by ${schedule.time} on ${schedule.date}`}
            </div>
            {schedule.request.trip.map(tripInfo => <OneTrip trip={tripInfo} />)}
          </div>
        )}
      </div>
    );
  }
}

export default AllTrips;
