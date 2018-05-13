import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import DropDown from "./DropDown.js";
import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tripDate: moment(),
      originStn: false,
      destinationStn: false,
      arriveBy: true,
      alert: false
    };

    this.handleOriginChange = this.handleOriginChange.bind(this);
    this.handleDestinationChange = this.handleDestinationChange.bind(this);
    this.handleArriveByChange = this.handleArriveByChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.handleFormSubmit = this.handleFormSubmit.bind(this);
  }

  //set default stations for origin and destination
  static getDerivedStateFromProps(nextProps, prevState) {
    if (!prevState.originStn) {
      prevState.originStn = nextProps.stnList[0];
    }
    if (!prevState.destinationStn) {
      prevState.destinationStn = nextProps.stnList[0];
    }
    return prevState;
  }

  handleDateChange(date) {
    this.setState({
      tripDate: date
    });
  }

  handleOriginChange(e) {
    this.setState({
      originStn: JSON.parse(e.target.value)
    });
  }

  handleDestinationChange(e) {
    this.setState({
      destinationStn: JSON.parse(e.target.value)
    });
  }

  handleArriveByChange() {
    this.setState(prevState => ({
      arriveBy: !prevState.arriveBy
    }));
  }

  handleFormSubmit() {
    const type = this.state.arriveBy ? "arrive" : "depart";
    const start = this.state.originStn.abbr;
    const end = this.state.destinationStn.abbr;
    const date = this.state.tripDate.format("MM/DD/YYYY");
    const time = this.state.tripDate.format("h:mm+a");

    //set alert message if origin/destination station the same
    if (start === end) {
      this.setState({ alert: true });
    } else {
      this.setState({ alert: false });
      this.props.getNewSchedule(type, start, end, date, time);
    }
  }

  render() {
    const { stnList } = this.props;
    return (
      <div>
        <div className="field">
          <label className="label has-text-left">Depart</label>
          <DropDown handleChange={this.handleOriginChange} stnList={stnList} />
        </div>
        <div className="field">
          <label className="label has-text-left">Arrive</label>
          <DropDown
            handleChange={this.handleDestinationChange}
            stnList={stnList}
          />
        </div>
        <label className="label has-text-left">Date and Time</label>
        <div className="control">
          <label className="radio">
            <input
              type="radio"
              name="arriveBy"
              onChange={this.handleArriveByChange}
              checked={this.state.arriveBy}
            />
            Arrive by
          </label>
          <label className="radio">
            <input
              type="radio"
              name="arriveBy"
              onChange={this.handleArriveByChange}
            />
            Depart by
          </label>
        </div>
        <div className="field date-picker">
          <DatePicker
            selected={this.state.tripDate}
            onChange={this.handleDateChange}
            showTimeSelect
            timeFormat="hh:mm"
            timeIntervals={30}
            dateFormat="LLL"
            timeCaption="time"
          />
        </div>
        {this.state.alert ? (
          <div className="has-text-danger">
            Cannot Leave and Arrive From Same Station
          </div>
        ) : (
          <div />
        )}
        <div className="field is-grouped">
          <div className="control">
            <button className="button is-link" onClick={this.handleFormSubmit}>
              Get Schedule
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
