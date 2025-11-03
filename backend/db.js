// backend/db.js
import pkg from "pg";
import dotenv from "dotenv";

dotenv.config();
const { Pool } = pkg;

export const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "universitydb",  // or your custom DB (coursedb)
  user: "postgres",
  password: "2006hung",
});
