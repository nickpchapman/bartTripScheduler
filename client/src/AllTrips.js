import React, { Component } from "react";

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
          <div className="box">
            <div className="columns is-size-4-desktop has-text-centered">
              <div className="column is-5 has-text-weight-bold">
                {stnLook[origin]}
              </div>
              <div className="column is-2">to</div>
              <div className="column is-5 has-text-weight-bold">
                {stnLook[destination]}
              </div>
            </div>
            <div className="is-size-5-desktop">
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
