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

// ===== ROUTES =====

// nhẹ (baseline)
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// 🔥 CPU-bound nặng hơn (~300ms)
app.get("/heavy", (req, res) => {
  const start = Date.now();

  while (Date.now() - start < 300) {}

  res.json({ status: "heavy ok" });
});

// ===== START SERVER =====
async function start() {
  try {
    // ❗ chỉ chạy DB ở local
    if (process.env.NODE_ENV !== "production") {
      await initializeDatabase();
    }

    const PORT = process.env.PORT || env.port;

    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
    });
  } catch (err) {
    console.error("❌ Failed to start server:", err);
    process.exit(1);
  }
}

start();