import express from "express";
import pool from "../db.js"; // adjust import if you’re using pg.Pool

const router = express.Router();

// Get all transactions joined with student data
router.get("/transactions", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT 
        t.transaction_id,
        s.student_id,
        s.name AS student_name,
        t.amount,
        t.method,
        t.status,
        t.created_at
      FROM transaction t
      JOIN student s ON t.student_id = s.student_id
      ORDER BY t.created_at DESC;
    `);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching admin transactions:", err);
    res.status(500).json({ error: "Failed to load transactions" });
  }
});

// Quick stats for dashboard cards
router.get("/summary", async (req, res) => {
  try {
    const summary = await pool.query(`
      SELECT
        COUNT(*) FILTER (WHERE status='Success') AS successful,
        COUNT(*) FILTER (WHERE status='Pending') AS pending,
        COUNT(*) FILTER (WHERE status='Failed') AS failed,
        SUM(amount) AS total_amount
      FROM transaction;
    `);
    res.json(summary.rows[0]);
  } catch (err) {
    console.error("Error fetching summary:", err);
    res.status(500).json({ error: "Failed to load summary" });
  }
});

export default router;
