// backend/routes/enrollments.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ============================================================
   GET /api/enrollments
============================================================ */
router.get("/", async (req, res) => {
  const studentId = req.query.studentId;

  if (!studentId) {
    return res.status(401).json({ error: "Student not authenticated" });
  }

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

    // Merge duplicate schedule rows
    const unified = {};
    for (const row of result.rows) {
      const key = row.sectionid;
      if (!unified[key]) {
        unified[key] = { ...row, schedule: row.schedule };
      } else {
        unified[key].schedule += " / " + row.schedule;
      }
    }

    // Group by semester
    const grouped = {};
    Object.values(unified).forEach((course) => {
      if (!grouped[course.semester]) grouped[course.semester] = [];
      grouped[course.semester].push({
        id: course.sectionid,
        code: course.code.trim(),
        name: course.name.trim(),
        credits: course.credits,
        price: Number(course.price),
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
   → Enrollment only (payment handled separately)
   ACID protected
============================================================ */
router.post("/", async (req, res) => {
  const { student_id, courses } = req.body;

  if (!student_id) return res.status(401).json({ error: "Student not authenticated" });
  if (!courses || courses.length === 0)
    return res.status(400).json({ error: "No courses provided" });

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const inserted = [];

    for (const course of courses) {
      const sectionId = course.id;

      /* Check & lock section for concurrency */
      const seatCheck = await client.query(
        `SELECT EnrolledCount, Capacity 
         FROM Section 
         WHERE SectionID = $1 
         FOR UPDATE`,
        [sectionId]
      );

      if (seatCheck.rowCount === 0) throw new Error("Section not found");

      const { enrolledcount, capacity } = seatCheck.rows[0];
      if (enrolledcount >= capacity)
        throw new Error("Class is full");

      /* Prerequisite validation */
      const prereqs = await client.query(
        `
        SELECT PreReCourseID FROM Prerequisite
        WHERE CourseID = (SELECT CourseID FROM Section WHERE SectionID = $1)
        `,
        [sectionId]
      );

      for (const prereq of prereqs.rows) {
        const check = await client.query(
          `
          SELECT 1 FROM Enrollments e
          JOIN Section sec ON sec.SectionID = e.SectionID
          WHERE e.StudentID = $1
          AND sec.CourseID = $2
          AND e.Grade IS NOT NULL
          `,
          [student_id, prereq.prerecourseid]
        );

        if (check.rowCount === 0)
          throw new Error(`Missing prerequisite: ${prereq.prerecourseid}`);
      }

      /* Insert or update enrollment status */
      const result = await client.query(
        `
        INSERT INTO Enrollments (StudentID, SectionID, Enrollment_status)
        VALUES ($1, $2, 'Enrolled')
        ON CONFLICT (StudentID, SectionID)
        DO UPDATE SET Enrollment_status = 'Enrolled'
        RETURNING *
        `,
        [student_id, sectionId]
      );

      /* Update enrolled count */
      await client.query(
        `UPDATE Section 
         SET EnrolledCount = EnrolledCount + 1
         WHERE SectionID = $1`,
        [sectionId]
      );

      inserted.push(result.rows[0]);
    }

    await client.query("COMMIT");
    res.json({ success: true, enrollments: inserted });

  } catch (error) {
    await client.query("ROLLBACK");
    console.error("Enroll error:", error);
    res.status(400).json({ error: error.message || "Failed to enroll" });
  } finally {
    client.release();
  }
});

export default router;
