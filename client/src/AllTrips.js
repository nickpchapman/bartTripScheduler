import React, { Component } from "react";

import OneTrip from "./OneTrip.js";
import TripsHeader from "./TripsHeader";

class AllTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTripInfo: false
    };
  }

  //only render trip data if allTripsInfo object was received
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.hasTripInfo && typeof nextProps.allTripsInfo === "object") {
      prevState.hasTripInfo = true;
    }
    return prevState;
  }

  render() {
    const propsPassed = this.state.hasTripInfo;
    const stnLookup = propsPassed && this.props.stnLookup;
    const allTripsData = propsPassed && this.props.allTripsInfo;
    const allTripsList = propsPassed && allTripsData.schedule.request.trip;
    const originStn = propsPassed && stnLookup[allTripsData.origin];
    const destStn = propsPassed && stnLookup[allTripsData.destination];
    const fare = propsPassed && allTripsData.schedule.request.trip[0]["@fare"];

    return (
      <div>
        {propsPassed && (
          <div className="box has-text-centered is-info">
            <TripsHeader
              originStn={originStn}
              destStn={destStn}
              allTripsData={allTripsData}
              fare={fare}
            />
            {allTripsList.map(singleTrip => {
              return (
                <OneTrip
                  destStn={destStn}
                  key={singleTrip.leg[0]["@trainId"]}
                  stnLookup={stnLookup}
                  trip={singleTrip}
                  originStn={originStn}
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
