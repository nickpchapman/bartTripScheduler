import React from "react";

const OneLeg = ({ destStn, leg, originStn, stnLookup }) => {
  const arriveTime = leg["@destTimeMin"];
  const bartLine = stnLookup[leg["@trainHeadStation"]];
  const departTime = leg["@origTimeMin"];
  const hasTransfer = leg["@transfercode"].length > 0;

  return (
    <div>
      <div className="columns">
        <div className="column has-text-centered">
          <div className="has-text-weight-bold is-size-5-desktop ">
            {departTime}
          </div>
          <div>{originStn}</div>
        </div>
        <div className="column has-text-centered">
          {`${bartLine} bound train`}
        </div>
        <div className="column has-text-centered">
          <div className="has-text-weight-bold is-size-5-desktop">
            {arriveTime}
          </div>
          <div>{destStn}</div>
        </div>
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
