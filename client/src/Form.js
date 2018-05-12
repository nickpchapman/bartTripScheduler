import React, { Component } from "react";
import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";
import "./Form.css";

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
      <div className="box main-form">
        <div className="columns">
          <div className="column">
            <div className="field">
              <label className="label">Leaving From</label>
              <div className="control">
                <div className="select">
                  <select
                    name="station"
                    onChange={this.handleOriginChange.bind(this)}
                  >
                    {stnList.map(stn => (
                      <option key={stn.abbr} value={JSON.stringify(stn)}>
                        {stn.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
          <div className="column">
            <div className="field">
              <label className="label">Arriving At</label>
              <div className="control">
                <div className="select">
                  <select
                    name="station"
                    onChange={this.handleDestinationChange.bind(this)}
                  >
                    {stnList.map(stn => (
                      <option key={stn.abbr} value={JSON.stringify(stn)}>
                        {stn.name}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>
        {this.state.alert ? (
          <div className="has-text-danger">
            Cannot Leave and Arrive From Same Station
          </div>
        ) : (
          <div />
        )}
        <div className="field">
          <div className="control">
            <label className="radio">
              <input
                type="radio"
                name="arriveBy"
                onChange={this.handleArriveByChange.bind(this)}
                checked={this.state.arriveBy}
              />
              Arrive By
            </label>
            <label className="radio">
              <input
                type="radio"
                name="arriveBy"
                onChange={this.handleArriveByChange.bind(this)}
              />
              Leave By
            </label>
          </div>
        </div>
        <div>
          <label className="label">Date and Time</label>
          <DatePicker
            selected={this.state.tripDate}
            onChange={this.handleDateChange.bind(this)}
            showTimeSelect
            timeFormat="HH:mm"
            timeIntervals={30}
            dateFormat="LLL"
            timeCaption="time"
          />
        </div>
        <div className="field is-grouped">
          <div className="control">
            <button
              className="button is-link"
              onClick={this.handleFormSubmit.bind(this)}
            >
              Submit
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
