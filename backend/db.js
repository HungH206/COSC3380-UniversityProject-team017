// backend/db.js
import pkg from "pg";
import dotenv from "dotenv";
dotenv.config({ path: ".env.local" }); // load variables from .env.local

const { Pool } = pkg;

// Use DATABASE_URL from environment file
export const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
