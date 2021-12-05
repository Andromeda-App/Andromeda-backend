// const express = require("express");
// const router = express.Router();
// const { User, Event } = require("../../models");
// const tokenAuth = require("../../middleware/tokenAuth");
// const isMyEvent = require("../../middleware/isMyEvent");

// Set up event handlers
// Connect this api bit to the input form on the signup page
// want to create lat and long for each user as they're created
// almost as a hook on uesr creation
// where this api is called
// and then the rest of the user data is filled out
// Fetch Request that goes to the api
// API key: UbBlX8VdqNZL3wCFqqQxusDwxMmbyAp1bWzfrk1VKUxVzdsBsvzaTIvOWQXHcpWj


function getLocation(userData) {
    var userZip = userData.zipCode || "98107";
    const clientKey = "UbBlX8VdqNZL3wCFqqQxusDwxMmbyAp1bWzfrk1VKUxVzdsBsvzaTIvOWQXHcpWj";
    const URL = "https://www.zipcodeapi.com/rest/" + clientKey + "/info.json/" + userZip + "/degrees";

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

module.exports = getLocation
