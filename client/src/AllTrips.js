import React, { Component } from "react";

import OneTrip from "./OneTrip.js";

class AllTrips extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasTripInfo: false
    };
  }

  //only render trip data if props have been received
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.hasTripInfo && nextProps.currentTrips) {
      prevState.hasTripInfo = true;
    }
    return prevState;
  }

  render() {
    const propsPassed = this.state.hasTripInfo;
    const stnLookup = propsPassed && this.props.stnLookup;
    const allTripsData = propsPassed && this.props.currentTrips;
    const allTripsList = propsPassed && allTripsData.schedule.request.trip;
    const originStn = propsPassed && stnLookup[allTripsData.origin];
    const destStn = propsPassed && stnLookup[allTripsData.destination];
    const fare = propsPassed && allTripsData.schedule.request.trip[0]["@fare"];

    return (
      <div>
        {propsPassed && (
          <div className="box has-text-centered">
            <div className="columns is-size-4-tablet">
              <div className="column is-5 has-text-weight-bold">
                {originStn}
              </div>
              <div className="column is-2">to</div>
              <div className="column is-5 has-text-weight-bold">{destStn}</div>
            </div>
            <div className="is-size-5-tablet">
              {`${allTripsData.tripType} by ${allTripsData.schedule.time} on ${
                allTripsData.schedule.date
              }`}
            </div>
            <div className="is-size-5-tablet">{`fare: $${fare}`}</div>
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
