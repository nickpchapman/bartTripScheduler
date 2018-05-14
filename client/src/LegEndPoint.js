import React from "react";

const LegEndPoint = ({ time, stn }) => {
  return (
    <div className="column">
      <div className="has-text-weight-bold is-size-5-desktop ">{time}</div>
      <div>{stn}</div>
    </div>
  );
};

export default LegEndPoint;
