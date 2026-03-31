const express = require("express");
const { getApplicationMetrics } = require("../controllers/metricsController");

const router = express.Router();

router.get("/", getApplicationMetrics);

module.exports = router;
