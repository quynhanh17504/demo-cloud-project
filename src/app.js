require("dotenv").config();

const path = require("path");
const express = require("express");
const { initializeDatabase } = require("./config/db");
const env = require("./config/env");
const asyncHandler = require("./middleware/asyncHandler");
const logger = require("./middleware/logger");
const authRoutes = require("./routes/authRoutes");
const foodRoutes = require("./routes/foodRoutes");
const metricsRoutes = require("./routes/metricsRoutes");
const processRoutes = require("./routes/processRoutes");

const app = express();
const DATABASE_MAX_ATTEMPTS = 10;
const DATABASE_RETRY_DELAY_MS = 3000;

app.use(express.json());
app.use(logger);
app.use(express.static(path.join(__dirname, "..", "public")));

app.get("/health", asyncHandler(async (req, res) => {
  try {
    await initializeDatabase();
    return res.json({ status: "ok" });
  } catch (error) {
    return res
      .status(500)
      .json({ status: "error", message: "Database unavailable" });
  }
}));

app.use("/metrics", metricsRoutes);
app.use("/auth", authRoutes);
app.use("/foods", foodRoutes);
app.use("/process", processRoutes);

app.get("/", (req, res) => {
  return res.sendFile(path.join(__dirname, "..", "public", "index.html"));
});

app.use((req, res) => {
  return res.status(404).json({ message: "Route not found" });
});

app.use((error, req, res, next) => {
  console.error("Unhandled error:", error);
  return res.status(500).json({ message: "Internal server error" });
});

function wait(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function connectWithRetry() {
  for (let attempt = 1; attempt <= DATABASE_MAX_ATTEMPTS; attempt += 1) {
    try {
      await initializeDatabase();
      return;
    } catch (error) {
      if (attempt === DATABASE_MAX_ATTEMPTS) {
        throw error;
      }

      console.log(
        `Waiting for database... (${attempt}/${DATABASE_MAX_ATTEMPTS})`
      );
      await wait(DATABASE_RETRY_DELAY_MS);
    }
  }
}

async function startServer() {
  try {
    await connectWithRetry();

    app.listen(env.port, () => {
      console.log(`Server running on port ${env.port}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error.message);
    process.exit(1);
  }
}

startServer();
