const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const router = express.Router();
const tokenAuth = require("../middleware/tokenAuth")
const { User, Event } = require("../models");
const getLocation = require("./api/zipCode");
require("dotenv").config();

//user signup route
router.post("/signup", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  }).then((foundUser)=>{
    if(foundUser) {
      res.status(403).send("User exists - please login instead.")
    } else {
      User.create({
        user_name: req.body.user_name,
        email: req.body.email,
        password: req.body.password,
        zipCode: req.body.zipCode,
        lat: "47",
        long: "122",
      })
        .then((newUser) => { 
          //     // TODO
          //     // Call zipCode API here and assign a latitude and longitude to the user data
          //     // if (newUser.zipCode.length == 5 && /^[0-9]+$/.test(zipcode)){
          //     //   getLocation(newUser);
          //     // }
          res.json(newUser);
        })
        .catch((err) => {
          console.log(err);
          res.status(500).json({ err });
        });
    }
  }).catch((err) => {
    console.log(err);
    res.status(500).json({ err });
  });



  // console.log(req)
  // User.create({
  //   user_name: req.body.user_name,
  //   email: req.body.email,
  //   password: req.body.password,
  //   zipCode: req.body.zipCode,
  //   lat: "47",
  //   long: "122",
  // })
  //   .then(newUser => {
  //     res.json(newUser);
  //     // TODO
  //     // Call zipCode API here and assign a latitude and longitude to the user data
  //     // if (newUser.zipCode.length == 5 && /^[0-9]+$/.test(zipcode)){
  //     //   getLocation(newUser);
  //     // }
  //   })
  //   .catch(err => {
  //     console.log(err);
  //     res.status(500).json({ err });
  //   });
});

//user login route
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email
    }
  })
    .then(foundUser => {
      if (!foundUser) {
        //encrypting the data so the hacker does not know if it's email or password
        res.status(401).send("incorrect email or password")
      }
      else if (bcrypt.compareSync(req.body.password, foundUser.password)) {
        const token = jwt.sign({
          email: foundUser.email,
          id: foundUser.id
        },
          process.env.JWT_SECRET
          , {
            expiresIn: "2h"
          })
        res.json({
          token: token,
          user: foundUser
        });
      }
      else {
        res.status(401).send("incorrect email or password")
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err });
    });
});


router.get("/secretclub", tokenAuth, (req, res) => {
  res.send(`welcome to the club, ${req.user.email}`)
})

router.get("/profile", tokenAuth, (req, res) => {
  User.findByPk(req.user.id).then(foundUser => {
    res.json(foundUser)
  })
})

router.get("/api/users/:id/events", (req, res) => {
  User.findByPk(req.params.id, { include: [Event] }).then(foundUser => {
    res.json(foundUser)
  })
})


module.exports = router;