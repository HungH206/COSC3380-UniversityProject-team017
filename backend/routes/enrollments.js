import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Fetch all enrollments grouped by semester
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT e.enrollmentid, e.studentid, e.courseid, e.semester, e.enrolledat, e.status,
             c.code, c.name, c.credits, c.instructor, c.schedule
      FROM enrollments e
      JOIN courses c ON e.courseid = c.id
      ORDER BY e.enrolledat DESC
    `);

    const enrollmentsBySemester = result.rows.reduce((acc, row) => {
      const semester = row.semester || "Fall 2025";
      if (!acc[semester]) acc[semester] = [];
      acc[semester].push(row);
      return acc;
    }, {});

    res.json({ enrollments: enrollmentsBySemester });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Failed to fetch enrollments" });
  }
});

// Add new enrollments
router.post("/", async (req, res) => {
  try {
    const { student_id = "S001", courses } = req.body;

    if (!courses || courses.length === 0) {
      return res.status(400).json({ error: "No courses provided" });
    }

    const client = await pool.connect();
    await client.query("BEGIN");

    const inserted = [];
    for (const course of courses) {
      const { id: courseid, name, code } = course;

      const result = await client.query(
        `INSERT INTO enrollments (studentid, courseid, semester, status, enrolledat)
         VALUES ($1, $2, 'Fall 2025', 'enrolled', NOW())
         RETURNING *`,
        [student_id, courseid]
      );

      inserted.push(result.rows[0]);
    }

    await client.query("COMMIT");
    client.release();

    console.log(`[v0] Enrollments created: ${inserted.length} course(s) for ${student_id}`);
    res.json({ success: true, enrollments: inserted });
  } catch (error) {
    console.error("Error creating enrollments:", error);
    res.status(500).json({ error: "Failed to create enrollments" });
  }
});

export default router;
