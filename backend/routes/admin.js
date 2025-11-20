import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ======================================================================
   1. ADMIN TRANSACTION LOG
   ====================================================================== */
router.get("/transactions", async (req, res) => {
  try {
    const query = `
      SELECT 
        s.studentid,
        s.studentname,
        c.courseid,
        c.coursename,
        c.credits,
        p.amount_paid,
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
      WHERE p.amount_paid > 0
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
<<<<<<< Updated upstream
   2. GET STUDENTS ENROLLED IN A SECTION (FOR ADMIN GRADE UI)
=======
   2. GET ENROLLED STUDENTS FOR A COURSE
   ====================================================================== */
router.get("/courses/:courseId/students", async (req, res) => {
  const { courseId } = req.params;

  try {
    const query = `
      SELECT DISTINCT
        s.StudentID AS studentId,
        s.StudentName AS name
      FROM Enrollments e
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      JOIN Student s ON s.StudentID = e.StudentID
      WHERE c.CourseID = $1
        AND e.Enrollment_status = 'Enrolled'
      ORDER BY s.StudentName;
    `;

    const results = await pool.query(query, [courseId]);
    res.json(results.rows);

  } catch (err) {
    console.error("[ADMIN] Error fetching enrolled students:", err);
    res.status(500).json({ error: err.message });
  }
});

/* ======================================================================
   3. UPDATE SECTION (Open/Close + Add Seats)
>>>>>>> Stashed changes
   ====================================================================== */
router.get("/students", async (req, res) => {
  const { sectionId } = req.query;

  if (!sectionId) {
    return res.status(400).json({ error: "sectionId required" });
  }

  try {
    const result = await pool.query(
      `
      SELECT 
        e.studentid,
        s.studentname,
        e.grade
      FROM Enrollments e
      JOIN Student s ON s.studentid = e.studentid
      WHERE e.sectionid = $1
      ORDER BY s.studentname;
      `,
      [sectionId]
    );

    res.json({ students: result.rows });
  } catch (err) {
    console.error("[ADMIN] Fetch students error:", err);
    res.status(500).json({ error: "Failed to fetch students" });
  }
});


/* ======================================================================
<<<<<<< Updated upstream
   3. CONCURRENCY SAFE SECTION UPDATE
=======
   4. POST GRADES FOR ALL STUDENTS IN A SECTION
>>>>>>> Stashed changes
   ====================================================================== */
router.post("/sections/update", async (req, res) => {
  const { sectionId, capacity, status } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const secRes = await client.query(
      `SELECT * FROM Section WHERE SectionID = $1 FOR UPDATE`,
      [sectionId]
    );

    if (secRes.rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Section not found" });
    }

    const section = secRes.rows[0];
    let newStatus = section.status;
    let newCapacity = section.capacity;

    if (capacity !== undefined) newCapacity = capacity;
    if (status !== undefined) newStatus = status;

    if (section.enrolledcount >= newCapacity) {
      newStatus = "Closed";
    }

    if (section.enrolledcount < newCapacity && status !== "Closed") {
      newStatus = "Open";
    }

    await client.query(
      `
      UPDATE Section
      SET Capacity = $1,
          Status = $2
      WHERE SectionID = $3
      `,
      [newCapacity, newStatus, sectionId]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Section updated with concurrency control",
      updated: { sectionId, capacity: newCapacity, status: newStatus }
    });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[ADMIN] Section Update Error:", err);
    res.status(500).json({ error: err.message });

  } finally {
    client.release();
  }
});


/* ======================================================================
   4. POST GRADES + GPA + CREDITS UPDATE (FULL FEATURE)
   ====================================================================== */
router.post("/grades/post", async (req, res) => {
  const { sectionId, grades } = req.body;

  if (!sectionId || !grades || grades.length === 0) {
    return res.status(400).json({ error: "Missing sectionId or grades" });
  }

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Lock to prevent enrollment changes while grading
    await client.query(
      `SELECT 1 FROM Section WHERE SectionID = $1 FOR UPDATE`,
      [sectionId]
    );

    // Update each grade
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

    /* ------------------------------------------------------
       GPA + Total Credits recompute for every student graded
    ------------------------------------------------------- */
    await client.query(`
      UPDATE Student s
      SET 
        Total_Credits = sub.total_credits,
        GPA = sub.gpa
      FROM (
        SELECT 
          e.StudentID,
          SUM(c.Credits) FILTER (WHERE e.Grade IS NOT NULL) AS total_credits,
          CASE
            WHEN SUM(c.Credits) = 0 THEN 0
            ELSE ROUND(
              SUM(
                c.Credits *
                CASE e.Grade
                  WHEN 'A'  THEN 4.0
                  WHEN 'A-' THEN 3.7
                  WHEN 'B+' THEN 3.3
                  WHEN 'B'  THEN 3.0
                  WHEN 'B-' THEN 2.7
                  WHEN 'C+' THEN 2.3
                  WHEN 'C'  THEN 2.0
                  WHEN 'C-' THEN 1.7
                  WHEN 'D'  THEN 1.0
                  WHEN 'F'  THEN 0.0
                  ELSE 0
                END
              ) 
              / SUM(c.Credits), 3
            )
          END AS gpa
        FROM Enrollments e
        JOIN Section s2 ON s2.SectionID = e.SectionID
        JOIN Course c ON c.CourseID = s2.CourseID
        GROUP BY e.StudentID
      ) AS sub
      WHERE s.StudentID = sub.StudentID;
    `);

    await client.query("COMMIT");

    res.json({ success: true, message: "Grades + GPA updated successfully" });

  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[ADMIN] Grade Update Error:", err);
    res.status(500).json({ error: err.message });

  } finally {
    client.release();
  }
});


export default router;
