function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function getSimulatedDelay() {
  return Math.floor(Math.random() * 501) + 300;
}

async function processWorkload(req, res) {
  const startedAt = Date.now();
  const simulatedDelay = getSimulatedDelay();

  await wait(simulatedDelay);

  const processingTimeMs = Date.now() - startedAt;
  console.log(`POST /process workload completed in ${processingTimeMs}ms`);

  return res.json({
    message: "Processing complete",
    processingTimeMs
  });
}

module.exports = {
  processWorkload
};
