import React, { Component } from "react";

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
    return (
      <div>
        {!this.state.hasRecievedTrips ? (
          <div>select a new schedule</div>
        ) : (
          <div>schedule goes here</div>
        )}
      </div>
    );
  }
}

export default AllTrips;
