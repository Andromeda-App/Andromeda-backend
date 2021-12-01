const express = require("express");
const router = express.Router();
const { User, Event } = require("../models");
const tokenAuth = require("../middleware/tokenAuth");
const isMyEvent = require("../middleware/isMyEvent");
var Xray = require('x-ray')
var x = Xray()

// Every day just after midnight, query moonCalc for the day's events
// Looking into this, I'm going to use the npm package xray to get specific divs out of mooncalc which only provides the worst most annoying map 
// https://www.npmjs.com/package/x-ray


function moonData(userData) {}

    // x("https://www.mooncalc.org/#/"+userData.lat+","+userData.long, '.Fenster_Inhalt', ['r']) [
    //     {
    //       title: 'show Moonrise',
    //       link: '.article-title@href'
    //     }
    //   ])
    //     .write('results.json')
    // }



    // $.ajax({
    //     url: 
    //   }).done(function ( data ) {
    //   // From the URL with that location, pull specfic information

    //   // span title="show Moonrise" contains moonrise for that day
    //       $(data).find("show Moonrise"));
    //     }
    //   });

module.exports = moonData
