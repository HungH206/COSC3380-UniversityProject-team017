// backend/routes/enrollmentPay.js
import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ============================================================
   GET /api/enroll/pay
   → Return all PENDING courses for the student
============================================================ */
router.get("/", async (req, res) => {
  const studentId = req.query.studentId || "S001";

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
   → FULL PAYMENT + ENROLLMENT PROCESS
============================================================ */
router.post("/", async (req, res) => {
  const { student_id, cartItems } = req.body;

  if (!cartItems || cartItems.length === 0) {
    return res.status(400).json({ error: "No courses to pay for" });
  }

  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    for (const item of cartItems) {
      const sectionId = item.id;

      /* --------------------------------------------------------
         1. Get CourseID, Credits, Cost
      -------------------------------------------------------- */
      const result = await client.query(
        `
        SELECT c.CourseID, c.Credits, c.Cost
        FROM Course c
        JOIN Section s ON c.CourseID = s.CourseID
        WHERE s.SectionID = $1
        `,
        [sectionId]
      );

      if (result.rowCount === 0) throw new Error("Course not found");

      const courseId = result.rows[0].courseid;
      const credits = result.rows[0].credits;
      const cost = Number(result.rows[0].cost);

      /* --------------------------------------------------------
         2. Check Missing Prerequisites
      -------------------------------------------------------- */
      const prereqCheck = await client.query(
        `
        SELECT COUNT(*) AS missing
        FROM Prerequisite p
        LEFT JOIN Enrollments e
          ON e.StudentID = $1
         AND e.SectionID IN (
              SELECT SectionID FROM Section 
              WHERE CourseID = p.PrereCourseID
            )
         AND e.Grade IS NOT NULL
        WHERE p.CourseID = $2
          AND e.SectionID IS NULL
        `,
        [student_id, courseId]
      );

      if (Number(prereqCheck.rows[0].missing) > 0) {
        throw new Error("Missing prerequisites for " + item.code);
      }

      /* --------------------------------------------------------
         3. Check Balance
      -------------------------------------------------------- */
      const balanceQuery = await client.query(
        `SELECT Balance FROM BankAccount WHERE StudentID = $1`,
        [student_id]
      );

      if (balanceQuery.rowCount === 0)
        throw new Error("Bank account missing");

      const balance = Number(balanceQuery.rows[0].balance);

      if (balance < cost) throw new Error("Insufficient balance!");

      /* --------------------------------------------------------
         4. Deduct payment
      -------------------------------------------------------- */
      await client.query(
        `UPDATE BankAccount SET Balance = Balance - $2 WHERE StudentID = $1`,
        [student_id, cost]
      );

      /* --------------------------------------------------------
         5. Update Enrollment → Enrolled
      -------------------------------------------------------- */
      await client.query(
        `
        UPDATE Enrollments
        SET Enrollment_status = 'Enrolled'
        WHERE StudentID = $1 AND SectionID = $2
        `,
        [student_id, sectionId]
      );

      /* --------------------------------------------------------
         6. Update section count + close if full
      -------------------------------------------------------- */
      await client.query(
        `UPDATE Section SET EnrolledCount = EnrolledCount + 1 WHERE SectionID = $1`,
        [sectionId]
      );

      await client.query(
        `
        UPDATE Section
        SET Status = 'Closed'
        WHERE SectionID = $1
        AND EnrolledCount >= Capacity
        `,
        [sectionId]
      );

      /* --------------------------------------------------------
         7. Update student's total credits
      -------------------------------------------------------- */
      await client.query(
        `
        UPDATE Student
        SET Total_Credits = Total_Credits + $2
        WHERE StudentID = $1
        `,
        [student_id, credits]
      );

      /* --------------------------------------------------------
         8. Reduce Payment.Amount_due
      -------------------------------------------------------- */
      await client.query(
  `
  UPDATE Payment
  SET 
      Amount_due = Amount_due - $2,
      Amount_paid = COALESCE(Amount_paid, 0) + $2,
      Pay_date = CURRENT_TIMESTAMP
  WHERE StudentID = $1
  `,
  [student_id, cost]
);
    }

    await client.query("COMMIT");

    res.json({
      success: true,
      message: "Payment successful",
      transactionId: "TX-" + Date.now(),
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("POST /api/enroll/pay error:", err);
    res.status(400).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;
