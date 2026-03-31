const { getMetrics } = require("../services/metricsService");

function getApplicationMetrics(req, res) {
  return res.json(getMetrics());
}

module.exports = {
  getApplicationMetrics
};
