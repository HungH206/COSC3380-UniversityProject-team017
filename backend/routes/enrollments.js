// backend/routes/enrollments.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ============================================================
   GET /api/enrollments
   → Returns all ENROLLED courses grouped by semester
============================================================ */
router.get("/", async (req, res) => {
  const studentId = req.query.studentId || "S001";

  try {
    const result = await pool.query(
      `
      SELECT 
        e.EnrollmentID,
        e.StudentID,
        e.SectionID,
        e.Enrollment_status,
        sem.Term || ' ' || sem.Year AS semester,

        c.CourseID AS code,
        c.CourseName AS name,
        c.Credits,
        c.Cost AS price,

        i.InstructorName AS instructor,

        CONCAT(sch.DayOfWeek, ' ', sch.StartTime, '-', sch.EndTime) AS schedule
      FROM Enrollments e
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      JOIN Instructor i ON i.InstructorID = sec.InstructorID
      JOIN Semester sem ON sem.SemesterID = sec.SemesterID
      JOIN SectionSchedule ss ON ss.SectionID = sec.SectionID
      JOIN Schedule sch ON sch.ScheduleID = ss.ScheduleID
      WHERE e.StudentID = $1
      AND e.Enrollment_status = 'Enrolled'
      ORDER BY sem.Year, sem.Term
      `,
      [studentId]
    );

    // Merge multiple schedule rows per section
    const unified = {};

    for (const row of result.rows) {
      const key = row.sectionid;

      if (!unified[key]) {
        unified[key] = {
          id: row.sectionid,
          code: row.code.trim(),
          name: row.name.trim(),
          credits: row.credits,
          price: Number(row.price),
          instructor: row.instructor,
          schedule: row.schedule,
          semester: row.semester,
        };
      } else {
        unified[key].schedule += " / " + row.schedule;
      }
    }

    // Group by semester
    const grouped = {};

    Object.values(unified).forEach((course) => {
      if (!grouped[course.semester]) grouped[course.semester] = [];
      grouped[course.semester].push({
        id: course.id,
        code: course.code,
        name: course.name,
        credits: course.credits,
        price: course.price,
        instructor: course.instructor,
        schedule: course.schedule,
      });
    });

    res.json({ enrollments: grouped });
  } catch (error) {
    console.error("Error fetching enrollments:", error);
    res.status(500).json({ error: "Failed to fetch enrolled courses" });
  }
});

/* ============================================================
   POST /api/enrollments
   → Optionally add enrollments manually (used by Payment Page)
============================================================ */
router.post("/", async (req, res) => {
  const { student_id = "S001", courses } = req.body;

  if (!courses || courses.length === 0)
    return res.status(400).json({ error: "No courses provided" });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    const inserted = [];

    for (const course of courses) {
      const sectionId = course.id;

      const result = await client.query(
        `
        UPDATE Enrollments
        SET Enrollment_status = 'Enrolled'
        WHERE StudentID = $1
        AND SectionID = $2
        RETURNING *
        `,
        [student_id, sectionId]
      );

      if (result.rowCount > 0) {
        inserted.push(result.rows[0]);
      }
    }

    await client.query("COMMIT");

    res.json({ success: true, enrollments: inserted });
  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Error creating enrollments:", error);
    res.status(500).json({ error: "Failed to update enrollments" });
  } finally {
    client.release();
  }
});

export default router;
