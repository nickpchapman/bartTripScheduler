import React from "react";

const RadioBtnPair = ({ btn1, btn2, changeFunc, title, toggle }) => {
  return (
    <div className="field">
      <label className="label">{title}</label>
      <div className="control">
        <label className="radio">
          <input
            checked={toggle}
            name={title}
            onChange={changeFunc}
            type="radio"
          />
          {btn1}
        </label>
        <label className="radio">
          <input name={title} onChange={changeFunc} type="radio" />
          {btn2}
        </label>
      </div>
    </div>
  );
};

export default RadioBtnPair;
