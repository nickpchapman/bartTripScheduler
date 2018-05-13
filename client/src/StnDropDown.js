import React from "react";

const StnDropDown = ({ list, onChange, title }) => {
  return (
    <div className="field">
      <label className="label has-text-left">{title}</label>
      <div className="control">
        <div className="select is-info">
          <select name="station" onChange={onChange}>
            {list.map(item => (
              <option key={item.abbr} value={JSON.stringify(item)}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default StnDropDown;
