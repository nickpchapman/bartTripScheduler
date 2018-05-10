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
    .then(function(response) {
      res.json(response.data.root.stations.station);
    })
    .catch(function(error) {
      console.log(error);
    });
});

//handle request for a current schedule between two stations
app.get("/newSchedule", (req, res) => {
  const head = "http://api.bart.gov/api/sched.aspx?";
  const tail = "&b=2&a=2&json=y";
  const key = "&key=MW9S-E7SL-26DU-VV8V";
  let type = "cmd=" + "arrive";
  let orig = "&orig=" + "ASHB";
  let dest = "&dest=" + "CIVC";
  let date = "&date=" + "now";

  axios
    .get(head + type + key + orig + dest + date + tail)
    .then(function(response) {
      console.log(response.data);
      res.json(response.data.root);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
