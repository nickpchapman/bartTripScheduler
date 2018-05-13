import React from "react";

const OneTrip = ({ trip, stnLook }) => {
  return (
    <div className="box ">
      {trip.leg.map(leg => {
        return (
          <div key={leg["@trainId"]}>
            <div className="columns">
              <div className="column has-text-centered">
                <div className="is-size-5-desktop has-text-weight-bold">
                  {leg["@origTimeMin"]}
                </div>
                <div>{stnLook[leg["@origin"]]}</div>
              </div>
              <div className="column has-text-centered">
                {`${stnLook[leg["@trainHeadStation"]]} bound train`}
                <div>
                  {leg["@transfercode"] === "" ? (
                    <div />
                  ) : (
                    <div className="has-text-danger">transfer</div>
                  )}
                </div>
              </div>
              <div className="column has-text-centered">
                <div className="is-size-5-desktop has-text-weight-bold ">
                  {leg["@destTimeMin"]}
                </div>
                <div>{stnLook[leg["@destination"]]}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default OneTrip;
