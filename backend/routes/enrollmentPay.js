// backend/routes/enrollmentPay.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ============================================================
   GET /api/enroll/pay
   → Return all PENDING courses for the student
============================================================ */
router.get("/", async (req, res) => {
  const studentId = req.query.studentId;
  if (!studentId) {
  return res.status(400).json({ error: "Missing studentId" });
}


  try {
    const result = await pool.query(
      `
      SELECT 
        e.SectionID AS id,
        c.CourseID AS code,
        c.CourseName AS name,
        c.Credits AS credits,
        c.Cost AS price,
        i.InstructorName AS instructor,
        CONCAT(sch.DayOfWeek, ' ', sch.StartTime, '-', sch.EndTime) AS schedule
      FROM Enrollments e
      JOIN Section sec ON sec.SectionID = e.SectionID
      JOIN Course c ON c.CourseID = sec.CourseID
      JOIN Instructor i ON i.InstructorID = sec.InstructorID
      JOIN SectionSchedule ss ON ss.SectionID = sec.SectionID
      JOIN Schedule sch ON sch.ScheduleID = ss.ScheduleID
      WHERE e.StudentID = $1
      AND e.Enrollment_status = 'Pending'
      `,
      [studentId]
    );

    // Merge multi-day schedules into one row
    const items = Object.values(
      result.rows.reduce((acc, row) => {
        if (!acc[row.id]) {
          acc[row.id] = {
            id: row.id,
            code: row.code.trim(),
            name: row.name.trim(),
            credits: row.credits,
            price: Number(row.price),
            instructor: row.instructor,
            schedule: row.schedule,
          };
        } else {
          acc[row.id].schedule += " / " + row.schedule;
        }
        return acc;
      }, {})
    );

    res.json({ items });
  } catch (err) {
    console.error("GET /api/enroll/pay error:", err);
    res.status(500).json({ error: "Failed to load payment cart" });
  }
});

/* ============================================================
   POST /api/enroll/pay
   FULL PAYMENT + BATCH ENROLLMENT
============================================================ */
router.post("/", async (req, res) => {
  const { student_id, cartItems } = req.body;

  if (!student_id) return res.status(401).json({ error: "Not authenticated" });
  if (!cartItems?.length) return res.status(400).json({ error: "Cart is empty" });

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    let totalCharge = 0;
    const paidCourses = [];

    for (const item of cartItems) {
      const sectionId = item.id;

      // Get course pricing + credits
      const { rows: info } = await client.query(
        `SELECT c.CourseID, c.Credits, c.Cost
         FROM Course c 
         JOIN Section s ON c.CourseID = s.CourseID
         WHERE s.SectionID = $1`,
        [sectionId]
      );
      if (!info.length) throw new Error("Course not found");

      const { courseid, credits, cost } = info[0];
      totalCharge += Number(cost);

      // Deduct from bank
      await client.query(
        `UPDATE BankAccount 
         SET Balance = Balance - $2 
         WHERE StudentID = $1`,
        [student_id, cost]
      );

      // Confirm enrollment
      await client.query(
        `UPDATE Enrollments
         SET Enrollment_status = 'Enrolled'
         WHERE StudentID = $1 AND SectionID = $2`,
        [student_id, sectionId]
      );

      // Increase section count
      await client.query(
        `UPDATE Section 
         SET EnrolledCount = EnrolledCount + 1
             , Status = CASE WHEN EnrolledCount + 1 >= Capacity 
                             THEN 'Closed' ELSE 'Open' END
         WHERE SectionID = $1`,
        [sectionId]
      );

      // Add credits
      await client.query(
        `UPDATE Student 
         SET Total_Credits = Total_Credits + $2
         WHERE StudentID = $1`,
        [student_id, credits]
      );

      paidCourses.push(sectionId);
    }

    // ⬇⬇ THIS FIXES TRANSACTION LOG & AMOUNT DUE ⬇⬇
    await client.query(
      `UPDATE Payment
       SET Amount_due = 0,
           Amount_paid = COALESCE(Amount_paid,0) + $2,
           Pay_date = CURRENT_TIMESTAMP
       WHERE StudentID = $1`,
      [student_id, totalCharge]
    );

    await client.query("COMMIT");

    res.json({
      success: true,
      charged: totalCharge,
      paidCourses
    });

  } catch (err) {
    await client.query("ROLLBACK");
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});



export default router;
