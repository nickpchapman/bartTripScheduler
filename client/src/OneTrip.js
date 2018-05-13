import React from "react";

import OneLeg from "./OneLeg.js";

const OneTrip = ({ destStn, originStn, stnLookup, trip }) => {
  return (
    <div className="box">
      {trip.leg.map(leg => {
        return (
          <OneLeg
            destStn={destStn}
            key={leg["@trainId"]}
            leg={leg}
            originStn={originStn}
            stnLookup={stnLookup}
          />
        );
      })}
    </div>
  );
};

export default OneTrip;
