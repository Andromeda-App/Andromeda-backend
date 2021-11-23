const express = require('express');
const router = express.Router();
//change routes
const userRoutes = require("./userRoutes");
const eventRoutes = require("./eventRoutes");

router.use(userRoutes)
router.use("/api/event", eventRoutes)

module.exports = router;