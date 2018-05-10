import React, { Component } from "react";
import "./Form.css";

import DatePicker from "react-datepicker";
import moment from "moment";

import "react-datepicker/dist/react-datepicker.css";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startDate: moment(),
      originStn: "12th St. Oakland City Center",
      destinationStn: "12th St. Oakland City Center",
      arriveBy: true
    };
  }

  handleDateChange(date) {
    this.setState({
      startDate: date
    });
  }

  handleOriginChange(e) {
    this.setState({
      originStn: e.target.value
    });
  }

  handleDestinationChange(e) {
    this.setState({
      destinationStn: e.target.value
    });
  }

  handleArriveByChange(e) {
    this.setState({
      arriveBy: !this.state.arriveBy
    });
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
                    {Object.keys(stnList).map(stn => (
                      <option key={stn}>{stn}</option>
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
                    {Object.keys(stnList).map(stn => (
                      <option key={stn}>{stn}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
          </div>
        </div>

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
                checked={!this.state.arriveBy}
              />
              Leave By
            </label>
          </div>
        </div>

        <div>
          <label class="label">Date and Time</label>
          <DatePicker
            selected={this.state.startDate}
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
            <button class="button is-link">Submit</button>
          </div>
        </div>
      </div>
    );
  }
}

export default Form;
