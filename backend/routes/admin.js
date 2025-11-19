import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Get all transactions joined with student data
router.get("/transactions", async (req, res) => {
  try {
    const query = `
      SELECT 
        s.studentid,
        s.studentname,
        c.courseid,
        c.coursename,
        c.credits,
        c.cost AS amount_paid,
        p.pay_date,
        e.enrollment_status
      FROM Payment p
      JOIN Enrollments e 
        ON p.studentid = e.studentid
      JOIN Student s
        ON s.studentid = p.studentid
      JOIN Section sec
        ON sec.sectionid = e.sectionid
      JOIN Course c
        ON c.courseid = sec.courseid
      WHERE e.enrollment_status = 'Enrolled'
      ORDER BY p.pay_date DESC;
    `;

    const results = await pool.query(query);
    res.json({ transactions: results.rows });

  } catch (err) {
    console.error("[ADMIN] Transaction Fetch Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================================
   2. UPDATE SECTION (Open/Close + Add Seats)
   ====================================================================== */
router.post("/sections/update", async (req, res) => {
  const { sectionId, capacity, status } = req.body;

  try {
    await pool.query(
      `
      UPDATE Section
      SET 
        Capacity = COALESCE($2, Capacity),
        Status = COALESCE($3, Status)
      WHERE SectionID = $1
      `,
      [sectionId, capacity, status]
    );

    res.json({ success: true, message: "Section updated successfully" });

  } catch (err) {
    console.error("[ADMIN] Section Update Error:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================================
   3. POST GRADES FOR ALL STUDENTS IN A SECTION
   ====================================================================== */
/* Body:
{
  "sectionId": "SEC001",
  "grades": [
    { "studentId": "S001", "grade": "A" },
    { "studentId": "S002", "grade": "B+" }
  ]
}
*/
router.post("/grades/post", async (req, res) => {
  const { sectionId, grades } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    for (const g of grades) {
      await client.query(
        `
        UPDATE Enrollments
        SET grade = $1
        WHERE studentid = $2 AND sectionid = $3
        `,
        [g.grade, g.studentId, sectionId]
      );
    }

    await client.query("COMMIT");
    res.json({ success: true, message: "Grades submitted successfully" });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[ADMIN] Grade Update Error:", err);
    res.status(500).json({ error: err.message });

  } finally {
    client.release();
  }
});

export default router;
