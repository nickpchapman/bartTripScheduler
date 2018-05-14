import React from "react";

const TripsHeader = ({ originStn, destStn, allTripsData, fare }) => {
  return (
    <div>
      <div className="columns is-size-4-tablet">
        <div className="column is-5 has-text-weight-bold">{originStn}</div>
        <div className="column is-2">to</div>
        <div className="column is-5 has-text-weight-bold">{destStn}</div>
      </div>

      <div className="is-size-5-tablet">
        {`${allTripsData.tripType} by ${allTripsData.schedule.time} on ${
          allTripsData.schedule.date
        }`}
      </div>
      <div className="is-size-5-tablet">{`fare: $${fare}`}</div>
    </div>
  );
};

export default TripsHeader;
