const express = require("express");
const app = express();
const port = process.env.PORT || 3001;

const axios = require("axios");

app.get("/", (req, res) => {
  res.send(res);
});

//handle request for current list of all Bart stations
app.get("/stnList", (req, res) => {
  axios
    .get(
      "http://api.bart.gov/api/stn.aspx?cmd=stns&key=MW9S-E7SL-26DU-VV8V&json=y"
    )
    .then(function(response) {
      let newList = response.data.root.stations.station.reduce((list, stn) => {
        list[stn.name] = stn;
        return list;
      }, {});

      res.json(newList);
    })
    .catch(function(error) {
      console.log(error);
    });
});

app.listen(port, () => console.log(`Listening on port: ${port}`));
