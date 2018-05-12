import React from "react";

const OneTrip = ({ trip, stnLook }) => {
  return (
    <div className="box ">
      {trip.leg.map(leg => {
        return (
          <div key={leg["@trainId"]}>
            <div>{leg["@origTimeMin"]}</div>
            <div>{stnLook[leg["@origin"]]}</div>
            <div>{`${stnLook[leg["@trainHeadStation"]]} bound train`}</div>
            <div>{leg["@destTimeMin"]}</div>
            <div>{stnLook[leg["@destination"]]}</div>

            <div />
            <div className="has-text-centered">
              {leg["@transfercode"] === "" ? <div /> : <div>transfer</div>}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OneTrip;
