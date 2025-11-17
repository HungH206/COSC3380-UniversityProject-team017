// admin-sql-server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { Pool } from "pg";
import fs from "fs";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5050;

// PostgreSQL connection
const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "finaluniversitydb",
  password: "2006hung",
  port: 5432,
});

// Middleware
app.use(express.json());
app.use(express.static(__dirname));

// --- 1. Serve GUI page ---
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "admin-sql.html"));
});

// --- 2. Run SQL script (full DB setup) ---
app.post("/api/setup", async (req, res) => {
  const { sql } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");
    await client.query(sql);
    await client.query("COMMIT");

    res.json({ message: "Setup completed successfully" });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

// --- 3. Run a single SQL query ---
app.post("/api/query", async (req, res) => {
  const { sql } = req.body;

  try {
    const result = await pool.query(sql);
    res.json({
      command: result.command,
      rowCount: result.rowCount,
      rows: result.rows,
    });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// --- 4. Run transactions (payment simulation) ---
app.post("/api/transaction", async (req, res) => {
  const { commands } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const sql of commands) {
      await client.query(sql);
    }

    await client.query("COMMIT");
    res.json({ message: "Transaction committed" });
  } catch (e) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

app.listen(port, () =>
  console.log(`🔵 Admin SQL GUI running at: http://localhost:${port}`)
);
