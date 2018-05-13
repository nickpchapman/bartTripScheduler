const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const axios = require("axios");

app.get("/", (req, res) => {
  res.send(res);
});

//handle request for a current list of all Bart stations
app.get("/stnList", (req, res) => {
  axios
    .get(
      "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
    .then(response => {
      const stnInfo = response.data.root.stations;

      //add station abbr hash for station name lookup
      stnInfo.lookup = stnInfo.station.reduce((hash, stn) => {
        hash[stn.abbr] = stn.name;
        return hash;
      }, {});

      res.json(stnInfo);
    })
    .catch(function(error) {
      console.log(error);
    });
});

//handle request for a current schedule between two stations
app.get("/newSchedule", (req, res) => {
  const head = "http://api.bart.gov/api/sched.aspx?";
  const type = "cmd=" + req.query.type;
  const key = "&key=MW9S-E7SL-26DU-VV8V";
  const orig = "&orig=" + req.query.orig;
  const dest = "&dest=" + req.query.dest;
  const date = "&date=" + req.query.date;
  const time = "&time=" + req.query.time;
  const tail = "&b=3&a=1&json=y";

  axios
    .get(head + type + key + orig + dest + date + time + tail)
    .then(response => {
      const scheduleInfo = response.data.root;

      //add 'arrive' or 'depart' value to indicate request type
      scheduleInfo.tripType = req.query.type;

      res.json(scheduleInfo);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
