import React from "react";

let OneTrip = ({ trip }) => {
  console.log(trip);
  return (
    <div className="box ">
      {trip.leg.map(leg => {
        console.log("leg", leg);
        console.log("transfer", leg["@transfercode"] === "");
        return (
          <div>
            <div>{leg["@origTimeMin"]}</div>
            <div>{leg["@origin"]}</div>
            <div>{`${leg["@trainHeadStation"]} bound train`}</div>
            <div>{leg["@destTimeMin"]}</div>
            <div>{leg["@destination"]}</div>

            <div />
            <div>
              {leg["@transfercode"] === "" ? <div /> : <div>transfer</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OneTrip;
