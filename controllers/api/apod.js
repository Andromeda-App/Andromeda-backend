const express = require("express");
const router = express.Router();
const { User, Event } = require("../models");
const tokenAuth = require("../middleware/tokenAuth");
const isMyEvent = require("../middleware/isMyEvent");
const title = document.querySelector("#title");
const copyright = document.querySelector("#copyright");
const mediaSection = document.querySelector("#media-section");
const information = document.querySelector("#description");

// function getApod () {


//     const apiKey = "m6Wr9MihDDvs5EkySGkFdMXckAHmh3vUi40nganr"
//     const baseUrl = "https://api.nasa.gov/planetary/apod?api_key="
//     var 
// }

function fetchData() {
    const apiKey = "m6Wr9MihDDvs5EkySGkFdMXckAHmh3vUi40nganr"
    const baseUrl = "https://api.nasa.gov/planetary/apod?api_key="

    try {
        fetch(baseUrl + apiKey)
            .then(response => response.json())
            .then(json => {
                console.log(json)
                diplaydata(json)
            })
    } catch (error) {
        console.log(error)
    }
}
fetchData()

function displaydata(data) {
    title.innerHTML = data.title;
    if (data.hasOwnProperty("copyright")) {
        copyright.innerHTML = data.copyright;
    } else {
        copyright.innerHTML = ""
    }
    if (data.media_type == "video") {
        mediaSection.innerHTML = videoSection;
        document.getElementById("videoLink").src = data.url;

    } else {
        mediaSection.innerHTML = imageSection;
        document.getElementById("hdimg").href = data.hdurl;
        document.getElementById("image_of_the_day").src = data.url;
    }
}

module.exports = fetchData