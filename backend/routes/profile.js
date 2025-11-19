import express from "express";
import { pool } from "../db.js";

const router = express.Router();

router.get("/:studentId", async (req, res) => {
  const studentId = req.params.studentId;

  try {
    // ============ 1. STUDENT INFO =============
    const studentQuery = await pool.query(
      `SELECT 
          studentid,
          studentname AS name,
          gpa,
          total_credits
       FROM Student
       WHERE studentid = $1`,
       [studentId]
    );

    if (studentQuery.rowCount === 0)
      return res.status(404).json({ error: "Student not found" });

    const student = studentQuery.rows[0];

    // ============ 2. BANK ACCOUNT + AMOUNT DUE =============
    const bankQuery = await pool.query(
      `SELECT 
          COALESCE(b.balance, 0) AS balance,
          COALESCE(p.amount_due, 0) AS amount_due
       FROM BankAccount b
       LEFT JOIN Payment p ON p.studentid = b.studentid
       WHERE b.studentid = $1`,
       [studentId]
    );

    const bank = bankQuery.rows[0] || { balance: 0, amount_due: 0 };

    // ============ 3. CURRENT SEMESTER COURSES =============
    const currentQuery = await pool.query(`
      SELECT
        c.CourseID AS code,
        c.CourseName AS name,
        c.Credits,
        c.Cost AS price,
        CONCAT(sch.DayOfWeek, ' ', sch.StartTime, '-', sch.EndTime) AS schedule,
        sem.Term || ' ' || sem.Year AS semester
      FROM Enrollments e
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      JOIN SectionSchedule ss ON ss.SectionID = sec.SectionID
      JOIN Schedule sch ON sch.ScheduleID = ss.ScheduleID
      JOIN Semester sem ON sem.SemesterID = sec.SemesterID
      WHERE e.StudentID = $1
      AND e.Enrollment_status = 'Enrolled';
    `, [studentId]);

    const currentCourses = mergeSchedules(currentQuery.rows);
    const currentSemester =
      currentCourses.length > 0 ? currentCourses[0].semester : "Fall 2025";

    // ============ 4. NEXT SEMESTER COURSES =============
    const nextQuery = await pool.query(`
      SELECT
        c.CourseID AS code,
        c.CourseName AS name,
        c.Credits,
        c.Cost AS price,
        CONCAT(sch.DayOfWeek, ' ', sch.StartTime, '-', sch.EndTime) AS schedule,
        sem.Term || ' ' || sem.Year AS semester
      FROM Enrollments e
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      JOIN SectionSchedule ss ON ss.SectionID = sec.SectionID
      JOIN Schedule sch ON sch.ScheduleID = ss.ScheduleID
      JOIN Semester sem ON sem.SemesterID = sec.SemesterID
      WHERE e.StudentID = $1
      AND e.Enrollment_status = 'Enrolled'
    `, [studentId]);

    const upcomingCourses = mergeSchedules(nextQuery.rows);
    const nextSemester =
      upcomingCourses.length > 0 ? upcomingCourses[0].semester : "Spring 2026";

    // ============ 5. COURSE HISTORY =============
    const historyQuery = await pool.query(`
      SELECT
        c.CourseID AS code,
        c.CourseName AS name,
        c.Credits,
        e.Grade,
        sem.Term || ' ' || sem.Year AS semester
      FROM Enrollments e
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      JOIN Semester sem ON sem.SemesterID = sec.SemesterID
      WHERE e.StudentID = $1
      AND e.Grade IS NOT NULL
      ORDER BY sem.Year DESC, sem.Term DESC
    `, [studentId]);

    const completedCourses = mergeBySemester(historyQuery.rows);

    // ============ RETURN ALL DATA ============
    res.json({
      student,
      bank,
      currentSemester,
      currentCourses,
      nextSemester,
      upcomingCourses,
      completedCourses
    });

  } catch (err) {
    console.error("PROFILE ERROR:", err);
    res.status(500).json({ error: "Failed to load profile" });
  }
});

// Utility: merge duplicate schedules
function mergeSchedules(rows) {
  const map = {};
  for (const r of rows) {
    if (!map[r.code]) map[r.code] = { ...r };
    else map[r.code].schedule += " / " + r.schedule;
  }
  return Object.values(map);
}

// Utility: group by semester
function mergeBySemester(rows) {
  const out = {};
  rows.forEach((r) => {
    if (!out[r.semester]) out[r.semester] = [];
    out[r.semester].push(r);
  });
  return out;
}

export default router;
