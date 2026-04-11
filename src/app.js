const express = require("express");
const path = require("path");
require("dotenv").config();

const env = require("./config/env");
const { initializeDatabase } = require("./config/db");

const app = express();

// middleware
app.use(express.json());

// serve frontend
app.use(express.static(path.join(__dirname, "../public")));

// routes test
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// TODO: routes thật
// const foodRoutes = require("./routes/food.routes");
// app.use("/foods", foodRoutes);

async function start() {
  try {
    await initializeDatabase();

    app.listen(env.port, () => {
      console.log(`🚀 Server running on port ${env.port}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();