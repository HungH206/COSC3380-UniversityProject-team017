// backend/test-connection.js
import { pool } from "./db.js";

(async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("✅ Connected to PostgreSQL at:", res.rows[0].now);
  } catch (err) {
    console.error("❌ Connection error:", err.message);
  } finally {
    pool.end();
  }
})();
