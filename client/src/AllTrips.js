import React, { Component } from "react";
import "./AllTrips.css";

class AllTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasRecievedTrips: false
    };
  }

  //only render trip info if props have been received
  static getDerivedStateFromProps(nextProps, prevState) {
    let newState = prevState;
    if (!prevState.hasRecievedTrips && nextProps.currentTrips) {
      newState.hasRecievedTrips = true;
    }
    return newState;
  }

  render() {
    let { destination, origin, schedule, tripType } = this.props.currentTrips;
    return (
      <div>
        {!this.state.hasRecievedTrips ? (
          <div>select a new schedule</div>
        ) : (
          <div class="box trip-list-box">
            <div class="is-size-1 has-text-centered">{`${origin} to ${destination}`}</div>
            <div class="is-size-3">{`${tripType} by ${schedule.time} on ${
              schedule.date
            }`}</div>
          </div>
        )}
      </div>
    );
  }
}

export default AllTrips;
