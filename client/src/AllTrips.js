import React, { Component } from "react";

import OneTrip from "./OneTrip.js";
import "./AllTrips.css";

class AllTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTripInfo: false
    };
  }

  //only attempt to render trip info if props have been received
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.hasTripInfo && nextProps.currentTrips) {
      prevState.hasTripInfo = true;
    }
    return prevState;
  }

  render() {
    const { destination, origin, schedule, tripType } = this.props.currentTrips;
    const stnLook = this.props.stnLookup;
    return (
      <div>
        {!this.state.hasTripInfo ? (
          <div>select a new schedule</div>
        ) : (
          <div className="box trip-list-box">
            <div className="is-size-3 has-text-centered">
              {`${stnLook[origin]} to ${stnLook[destination]}`}
            </div>
            <div className="is-size-3">
              {`${tripType} by ${schedule.time} on ${schedule.date}`}
            </div>
            {schedule.request.trip.map(singleTrip => {
              return (
                <OneTrip
                  key={singleTrip.leg[0]["@trainId"]}
                  trip={singleTrip}
                  stnLook={stnLook}
                />
              );
            })}
          </div>
        )}
      </div>
    );
  }
}

export default AllTrips;
