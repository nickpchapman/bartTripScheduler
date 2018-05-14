const express = require("express");
const app = express();

const port = process.env.PORT || 3001;

const axios = require("axios");

app.use("/", express.static(`${__dirname}/client/build`));

//handle request for BART station list
app.get("/stnList", (req, res) => {
  const url =
    "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y";

  axios
    .get(url)
    .then(response => {
      const stnData = response.data.root.stations;

      //add station name abbreviation hash to stnData
      stnData.lookup = stnData.station.reduce((hash, stn) => {
        hash[stn.abbr] = stn.name;
        return hash;
      }, {});

      res.json(stnData);
    })
    .catch(function(error) {
      console.log(error);
    });
});

//handle request for schedule between two stations
app.get("/newSchedule", (req, res) => {
  const head = "http://api.bart.gov/api/sched.aspx?";
  const type = "cmd=" + req.query.type;
  const key = "&key=MW9S-E7SL-26DU-VV8V";
  const orig = "&orig=" + req.query.orig;
  const dest = "&dest=" + req.query.dest;
  const date = "&date=" + req.query.date;
  const time = "&time=" + req.query.time;
  const tail = "&b=3&a=1&json=y";
  const url = head + type + key + orig + dest + date + time + tail;

  axios
    .get(url)
    .then(response => {
      const tripData = response.data.root;

      //save request type with 'arrive' or 'depart' string
      tripData.tripType = req.query.type;

      res.json(tripData);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
