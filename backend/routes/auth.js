import express from "express";
import { pool } from "../db.js";

const router = express.Router();

/* ===========================
   POST /api/auth/login
   body: { studentId, password }
=========================== */
router.post("/login", async (req, res) => {
  const { studentId, password } = req.body;

  try {
    const result = await pool.query(
      `SELECT StudentID, StudentName
       FROM Student
       WHERE StudentID = $1 AND Password = $2`,
      [studentId, password]
    );

    if (result.rowCount === 0) {
      return res.status(401).json({ error: "Invalid Student ID or Password" });
    }

    const stu = result.rows[0];

    res.json({
      student: {
        studentId: stu.studentid,
        studentName: stu.studentname,
      },
    });
  } catch (err) {
    console.error("[AUTH] Login error:", err);
    res.status(500).json({ error: "Login failed" });
  }
});

/* ===========================
   POST /api/auth/signup
   body: { studentId, name, password, cardNo }
   Insert into Student + BankAccount in ONE transaction
=========================== */
router.post("/signup", async (req, res) => {
  const { studentId, name, password, cardNo } = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    await client.query(
      `INSERT INTO Student (StudentID, StudentName, Password)
       VALUES ($1, $2, $3)`,
      [studentId, name, password]
    );

    await client.query(
      `INSERT INTO BankAccount (StudentID, Balance, CardNo)
       VALUES ($1, 0, $2)`,
      [studentId, cardNo || "0000111122223333"]
    );

    await client.query("COMMIT");

    res.json({ success: true });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("[AUTH] Signup error:", err);
    res.status(400).json({ error: "Signup failed (maybe StudentID already exists)" });
  } finally {
    client.release();
  }
});


export default router;
