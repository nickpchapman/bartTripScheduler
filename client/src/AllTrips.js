import React from "react";

import OneTrip from "./OneTrip.js";
import TripsHeader from "./TripsHeader";

const AllTrips = ({ stnLookup, allTripsData }) => {
  const allTripsList = allTripsData.schedule.request.trip;
  const destStn = stnLookup[allTripsData.destination];
  const fare = allTripsData.schedule.request.trip[0]["@fare"];
  const originStn = stnLookup[allTripsData.origin];

  return (
    <div className="box has-text-centered is-info">
      <TripsHeader
        allTripsData={allTripsData}
        destStn={destStn}
        fare={fare}
        originStn={originStn}
      />
      {allTripsList.map(singleTrip => {
        return (
          <OneTrip
            key={singleTrip.leg[0]["@trainId"]}
            destStn={destStn}
            originStn={originStn}
            stnLookup={stnLookup}
            trip={singleTrip}
          />
        );
      })}
    </div>
  );
};

export default AllTrips;
