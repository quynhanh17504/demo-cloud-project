const env = {
  port: Number(process.env.PORT) || 3000,

  jwtSecret: process.env.JWT_SECRET || "change-me",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "1h",
};

// Ưu tiên DATABASE_URL (Render / Cloud)
if (process.env.DATABASE_URL) {
  env.databaseUrl = process.env.DATABASE_URL;
} else {
  const dbHost = process.env.DB_HOST || "localhost";
  const dbUser = process.env.POSTGRES_USER || "postgres";
  const dbPass = process.env.POSTGRES_PASSWORD || "postgres";
  const dbName = process.env.POSTGRES_DB || "food_demo";

  env.databaseUrl = `postgresql://${dbUser}:${dbPass}@${dbHost}:5432/${dbName}`;
}

module.exports = env;