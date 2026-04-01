// env.js
const env = {
  port: Number(process.env.PORT) || 3000,
  dbHost: process.env.DB_HOST || "food-demo-db",
  dbUser: process.env.DB_USER || "food_demo_user",
  dbPass: process.env.DB_PASS || "secret123",
  dbName: process.env.DB_NAME || "food_demo",
  jwtSecret: process.env.JWT_SECRET || "change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};

env.databaseUrl =
  process.env.DATABASE_URL ||
  `postgresql://${env.dbUser}:${env.dbPass}@${env.dbHost}:5432/${env.dbName}`;

module.exports = env;