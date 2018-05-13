import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import RadioBtnPair from "./RadioBtnPair.js";
import StnDropDown from "./StnDropDown.js";
import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      arriveBy: true,
      tripDate: moment(),
      destStn: false,
      hasSameStns: false,
      originStn: false
    };

    this.handleArriveByChange = this.handleArriveByChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  //set default stations for origin and destination
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.originStn && nextProps.stnList) {
      prevState.originStn = nextProps.stnList[0];
    }
    if (!prevState.destStn && nextProps.stnList) {
      prevState.destStn = nextProps.stnList[0];
    }
    return prevState;
  }

  handleArriveByChange() {
    this.setState(prevState => ({
      arriveBy: !prevState.arriveBy
    }));
  }

  handleDateChange(date) {
    this.setState({
      tripDate: date
    });
  }

  handleDestinationChange(e) {
    this.setState({
      destStn: JSON.parse(e.target.value)
    });
  }

  handleOriginChange(e) {
    this.setState({
      originStn: JSON.parse(e.target.value)
    });
  }

  handleFormSubmit() {
    const date = this.state.tripDate.format("MM/DD/YYYY");
    const destStn = this.state.destStn.abbr;
    const originStn = this.state.originStn.abbr;
    const time = this.state.tripDate.format("h:mm+a");
    const type = this.state.arriveBy ? "arrive" : "depart";

    //check origin/destination stations are different before request
    if (originStn === destStn) {
      this.setState({ hasSameStns: true });
    } else {
      this.setState({ hasSameStns: false });
      this.props.getNewSchedule(date, destStn, originStn, time, type);
    }
  }

  render() {
    return (
      <div>
        <StnDropDown
          list={this.props.stnList}
          onChange={this.handleOriginChange}
          title="Depart"
        />
        <StnDropDown
          list={this.props.stnList}
          onChange={this.handleDestinationChange}
          title="Arrive"
        />
        <RadioBtnPair
          btn1=" Arrive by"
          btn2=" Depart by"
          changeFunc={this.handleArriveByChange}
          title="Date and Time"
          toggle={this.state.arriveBy}
        />
        <div className="field">
          <DatePicker
            className="input is-info field"
            dateFormat="LLL"
            onChange={this.handleDateChange}
            selected={this.state.tripDate}
            showTimeSelect
            timeCaption="time"
            timeIntervals={30}
          />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.handleFormSubmit}>
              Get Schedule
            </button>
          </div>
        </div>
        {this.state.hasSameStns && (
          <div className="has-text-danger">
            Cannot depart and arrive at same station!
          </div>
        )}
      </div>
    );
  }
}

export default Form;
