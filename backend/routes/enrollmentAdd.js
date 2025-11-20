// backend/routes/enrollmentAdd.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.post("/", async (req, res) => {
  const { studentId, sectionId } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // 1. Section must be open
    const { rows: sec } = await client.query(
      `SELECT Status FROM Section WHERE SectionID = $1`,
      [sectionId]
    );

    if (sec.length === 0 || sec[0].status.trim() !== "Open") {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Class not open." });
    }

    // 2. Prevent duplicate enrollment
    const { rows: exists } = await client.query(
      `SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2`,
      [studentId, sectionId]
    );

    if (exists.length > 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Cannot add class twice." });
    }

    // 3. Insert Enrollment Pending
    await client.query(
      `
      INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
      VALUES ($1, $2, 'Pending')
      `,
      [studentId, sectionId]
    );

    // 4. Make Payment row if missing
    await client.query(
      `
      INSERT INTO Payment(StudentID, Amount_due)
      SELECT $1, 0
      WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1)
      `,
      [studentId]
    );

    // 5. Add cost to Amount_due
    await client.query(
      `
      UPDATE Payment
      SET Amount_due = Amount_due + c.Cost
      FROM Course c 
      JOIN Section s ON c.CourseID = s.CourseID
      WHERE Payment.StudentID = $1 AND s.SectionID = $2
      `,
      [studentId, sectionId]
    );

    await client.query("COMMIT");

    res.json({ success: true, message: "Class added (Pending)" });
  } catch (err) {
    await client.query("ROLLBACK");
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;
