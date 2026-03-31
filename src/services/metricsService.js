const startedAt = Date.now();

const metrics = {
  totalRequests: 0,
  totalResponseTimeMs: 0
};

function recordRequest(responseTimeMs) {
  metrics.totalRequests += 1;
  metrics.totalResponseTimeMs += responseTimeMs;
}

function getMetrics() {
  const averageResponseTime =
    metrics.totalRequests === 0
      ? 0
      : Number((metrics.totalResponseTimeMs / metrics.totalRequests).toFixed(2));

  return {
    totalRequests: metrics.totalRequests,
    averageResponseTimeMs: averageResponseTime,
    uptimeSeconds: Number(((Date.now() - startedAt) / 1000).toFixed(2))
  };
}

module.exports = {
  recordRequest,
  getMetrics
};
