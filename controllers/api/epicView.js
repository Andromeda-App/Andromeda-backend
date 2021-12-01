const express = require("express");
const router = express.Router();
const { User, Event } = require("../models");
const tokenAuth = require("../middleware/tokenAuth");
const isMyEvent = require("../middleware/isMyEvent");

//NASA API KEY jInicASftzpsWW9xa25FsDOtP0Gn4aBrzXo7WdCE


function moonData(userData) {

    const URL = "https://www.mooncalc.org/#/" + userData.lat+","+userData.long 

    fetch(URL)
    .then(function (response) {
        return response.json();
      })
    .then(function(data) {
        console.log(data);
        userData.lat = data.lat;
        userData.long = data.long;
    });
};

module.exports = moonData
