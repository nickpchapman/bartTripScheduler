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

  handleArriveByChange(e) {
    this.setState({
      arriveBy: !this.state.arriveBy
    });
  }

  handleFormSubmit() {
    let type = this.state.arriveBy ? "arrive" : "depart";
    let start = this.state.originStn.abbr;
    let end = this.state.destinationStn.abbr;
    let date = this.state.tripDate.format("MM/DD/YYYY");
    let time = this.state.tripDate.format("h:mm+a");

    //set alert message if origin/destination station the same
    if (start === end) {
      this.setState({ alert: true });
    } else {
      this.setState({ alert: false });
      this.props.getNewSchedule(type, start, end, date, time);
    }
  }

  render() {
    let { stnList } = this.props;
    return (
      <div class="box main-form">
        <div class="columns">
          <div class="column">
            <div class="field">
              <label class="label">Leaving From</label>
              <div class="control">
                <div class="select">
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
          <div class="column">
            <div class="field">
              <label class="label">Arriving At</label>
              <div class="control">
                <div class="select">
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
          <div class="has-text-danger">
            Cannot Leave and Arrive From Same Station
          </div>
        ) : (
          <div />
        )}
        <div class="field">
          <div class="control">
            <label class="radio">
              <input
                type="radio"
                name="arriveBy"
                onChange={this.handleArriveByChange.bind(this)}
                checked={this.state.arriveBy}
              />
              Arrive By
            </label>
            <label class="radio">
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
          <label class="label">Date and Time</label>
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
        <div class="field is-grouped">
          <div class="control">
            <button
              class="button is-link"
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
