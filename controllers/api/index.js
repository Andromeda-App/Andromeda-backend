const express = require('express');
const router = express.Router();

const userRoutes = require("./userController");
router.use("/users",userRoutes);

const eventRoutes = require("./eventController");
router.use("/events",eventRoutes);


module.exports = router;