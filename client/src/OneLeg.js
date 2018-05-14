import React from "react";

const TripEndPoint = ({ time, stn }) => {
  return (
    <div className="column has-text-centered">
      <div className="has-text-weight-bold is-size-5-desktop ">{time}</div>
      <div>{stn}</div>
    </div>
  );
};

const OneLeg = ({ destStn, leg, originStn, stnLookup }) => {
  const arriveTime = leg["@destTimeMin"];
  const bartLine = stnLookup[leg["@trainHeadStation"]];
  const departTime = leg["@origTimeMin"];
  const hasTransfer = leg["@transfercode"].length > 0;

  return (
    <div>
      <div className="columns">
        <TripEndPoint time={departTime} stn={originStn} />
        <div className="column has-text-centered">
          {`${bartLine} bound train`}
        </div>
        <TripEndPoint time={arriveTime} stn={destStn} />
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
