import React from "react";

const DropDown = props => {
  return (
    <div className="field">
      <div className="control">
        <div className="select is-info">
          <select name="station" onChange={props.handleChange}>
            {props.stnList.map(stn => (
              <option key={stn.abbr} value={JSON.stringify(stn)}>
                {stn.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default DropDown;
