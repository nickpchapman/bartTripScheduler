import React from "react";

import LegEndPoint from "./LegEndPoint.js";

const OneLeg = ({ destStn, leg, originStn, stnLookup }) => {
  const arriveTime = leg["@destTimeMin"];
  const bartLine = stnLookup[leg["@trainHeadStation"]];
  const departTime = leg["@origTimeMin"];
  const hasTransfer = leg["@transfercode"].length > 0;

  return (
    <div>
      <div className="columns has-text-centered">
        <LegEndPoint time={departTime} stn={originStn} />
        <div className="column">{`${bartLine} bound train`}</div>
        <LegEndPoint time={arriveTime} stn={destStn} />
      </div>
      {hasTransfer && (
        <div className="has-text-danger">
          <hr />
          transfer
          <hr />
        </div>
      )}
    </div>
  );
};

export default OneLeg;
