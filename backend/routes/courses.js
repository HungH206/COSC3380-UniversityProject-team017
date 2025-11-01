// backend/routes/courses.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// GET /api/courses
router.get("/", async (req, res) => {
  try {
    const { department, semester, availability } = req.query;
    let query = "SELECT * FROM courses";
    const params = [];

    const filters = [];
    if (department) {
      filters.push(`department = $${params.length + 1}`);
      params.push(department);
    }
    if (semester) {
      filters.push(`semester = $${params.length + 1}`);
      params.push(semester);
    }
    if (availability === "open") {
      filters.push(`enrolled < capacity`);
    }

    if (filters.length > 0) {
      query += " WHERE " + filters.join(" AND ");
    }

    query += " ORDER BY code";

    const result = await pool.query(query, params);
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching courses:", err);
    res.status(500).json({ error: "Internal server error" });
  }
});

export default router;
