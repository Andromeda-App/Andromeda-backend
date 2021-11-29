const express = require("express");
const router = express.Router();
const { User, Event } = require("../models");
const tokenAuth = require("../middleware/tokenAuth");
const isMyEvent = require("../middleware/isMyEvent");

//get all events
router.get("/", (req, res) => {
  console.log("welcome")
  Event.findAll()
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//get all with user data
router.get("/users", (req, res) => {
  Event.findAll({
    include: [User]
  })
    .then(events => {
      res.json(events);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//find one
router.get("/:id", (req, res) => {
  Event.findByPk(req.params.id, { include: [User] })
    .then(foundEvent => {
      if (foundEvent) {
        res.json(foundEvent);
      } else {
        res.status(404).send("no such event");
      }
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//create event
router.post("/", tokenAuth, (req, res) => {
  Event.create({
    name: req.body.name,
    description: req.body.description,
    age: req.body.age,
    species: req.body.species,
    UserId: req.user.id
  })
    .then(newEvent => {
      res.json(newEvent);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

//edit event
router.put("/:id", tokenAuth, isMyEvent, (req, res) => {
  Event.update(
    {
      name: req.body.name,
      description: req.body.description,
      age: req.body.age,
      species: req.body.species
    },
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(updatedEvent => {
      res.json(updatedEvent);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});

// delete
router.delete("/:id", tokenAuth, isMyEvent, (req, res) => {
  Event.destroy(
    {
      where: {
        id: req.params.id
      }
    }
  )
    .then(delEvent => {
      res.json(delEvent);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({ err: err });
    });
});
module.exports = router;