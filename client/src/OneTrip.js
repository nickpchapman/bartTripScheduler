import React from "react";

let OneTrip = ({ trip }) => {
  console.log(trip);
  return (
    <div className="box ">
      {trip.leg.map(leg => {
        return (
          <div>
            <div>{leg["@origTimeMin"]}</div>
            <div>{leg["@origin"]}</div>
            <div>{`${leg["@trainHeadStation"]} bound train`}</div>
            <div>{leg["@destTimeMin"]}</div>
            <div>{leg["@destination"]}</div>

            <div />
            <div>
              {leg["@transferCode"] === "" ? (
                <div>no transfer</div>
              ) : (
                <div>transfer</div>
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OneTrip;
