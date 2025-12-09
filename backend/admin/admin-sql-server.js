// admin-sql-server.js
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";
import pkg from "pg";

const { Pool } = pkg;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const port = 5050;

// --- PostgreSQL connection (same DB as your main app) ---
const pool = new Pool({
  host: "localhost",
  port: 5432,
  database: "finaluniversitydb",
  user: "postgres",
  password: "2006hung",
});

// --- Helper: append SQL to trace files ---
function logToFile(filename, sql, params = []) {
  const line =
    `-- ${new Date().toISOString()}\n` +
    `${sql.trim()}\n` +
    `-- params: ${JSON.stringify(params)}\n\n`;
  fs.appendFile(path.join(__dirname, filename), line, (err) => {
    if (err) console.error("Error writing trace", filename, err);
  });
}

// --- Middleware ---
app.use(express.json());
app.use(express.static(__dirname));

// --- Serve GUI ---
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "index.html"));
});

/**
 * 1) Initialize / reset dynamic data
 * - Truncate Enrollments + Payment
 * - Reset Section counters + status
 * - Reset Student GPA / total_credits
 */
app.post("/api/gui/init", async (req, res) => {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const sqls = [
      "TRUNCATE TABLE Enrollments RESTART IDENTITY CASCADE;",
      "TRUNCATE TABLE Payment RESTART IDENTITY CASCADE;",
      "UPDATE Section SET EnrolledCount = 0, Status = 'Open';",
      "UPDATE Student SET GPA = 0.000, Total_Credits = 0;",
    ];

    for (const sql of sqls) {
      logToFile("transaction.sql", sql);
      await client.query(sql);
    }

    await client.query("COMMIT");

    res.json({
      message:
        "Dynamic tables reset: Enrollments, Payment, section counters, student GPA/credits.",
      statements: sqls,
    });
  } catch (e) {
    await client.query("ROLLBACK");
    console.error("[GUI] init error:", e);
    res.status(500).json({ error: e.message });
  } finally {
    client.release();
  }
});

/**
 * 2) Batch enrollment transaction:
 * Simulates several students registering for the same section.
 * Each student gets its own transaction so you can see partial success.
 */
app.post("/api/gui/enroll-batch", async (req, res) => {
  const { sectionId, students } = req.body || {};
  if (!sectionId || !Array.isArray(students) || students.length === 0) {
    return res.status(400).json({
      error: "sectionId and students[] are required",
    });
  }

  const results = [];

  // Template of the SQL we use, for trace / explanation
  const mainSqlTemplate = `
BEGIN;

-- 1. Lock the section row
SELECT * FROM Section WHERE SectionID = $2 FOR UPDATE;

-- 2. Check duplicate enrollment
SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2;

-- 3. Check capacity (EnrolledCount < Capacity)
--    and status = 'Open'

-- 4. Ensure Payment row exists
INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
SELECT $1, 0, 0
WHERE NOT EXISTS (SELECT 1 FROM Payment WHERE StudentID = $1);

-- 5. Insert enrollment row (Pending)
INSERT INTO Enrollments(StudentID, SectionID, Enrollment_status)
VALUES ($1, $2, 'Enrolled');

-- 6. Update Section.EnrolledCount
UPDATE Section
SET EnrolledCount = EnrolledCount + 1
WHERE SectionID = $2;

COMMIT;
`;

  logToFile("transaction.sql", mainSqlTemplate, []);

  for (const studentId of students) {
    const client = await pool.connect();
    try {
      await client.query("BEGIN");

      // 1) Lock section
      const secRes = await client.query(
        "SELECT * FROM Section WHERE SectionID = $1 FOR UPDATE",
        [sectionId]
      );
      if (secRes.rowCount === 0) {
        throw new Error(`Section ${sectionId} not found`);
      }
      const sec = secRes.rows[0];

      if ((sec.status || "").trim().toLowerCase() !== "open") {
        throw new Error(`Section ${sectionId} is not open`);
      }

      if (sec.enrolledcount >= sec.capacity) {
        throw new Error(
          `Section ${sectionId} is full (${sec.enrolledcount}/${sec.capacity})`
        );
      }

      // 2) Duplicate check
      const dup = await client.query(
        "SELECT 1 FROM Enrollments WHERE StudentID = $1 AND SectionID = $2",
        [studentId, sectionId]
      );
      if (dup.rowCount > 0) {
        throw new Error(
          `Student ${studentId} already enrolled in section ${sectionId}`
        );
      }

      // 3) Ensure Payment row
      await client.query(
        `
        INSERT INTO Payment(StudentID, Amount_due, Amount_paid)
        SELECT $1, 0, 0
        WHERE NOT EXISTS (
          SELECT 1 FROM Payment WHERE StudentID = $1
        );
      `,
        [studentId]
      );

      // 4) Insert enrollment
      await client.query(
        `
        INSERT INTO Enrollments (StudentID, SectionID, Enrollment_status)
        VALUES ($1, $2, 'Enrolled');
      `,
        [studentId, sectionId]
      );

      // 5) Increase amount_due by course cost
      await client.query(
        `
        UPDATE Payment
        SET Amount_due = Amount_due + c.Cost
        FROM Course c
        JOIN Section s ON s.CourseID = c.CourseID
        WHERE Payment.StudentID = $1
          AND s.SectionID = $2;
      `,
        [studentId, sectionId]
      );

      // 6) Update Section.EnrolledCount and potentially close
      const updateSecRes = await client.query(
        `
        UPDATE Section
        SET EnrolledCount = EnrolledCount + 1
        WHERE SectionID = $1
        RETURNING EnrolledCount, Capacity;
      `,
        [sectionId]
      );
      const updated = updateSecRes.rows[0];
      if (updated.enrolledcount >= updated.capacity) {
        await client.query(
          "UPDATE Section SET Status = 'Closed' WHERE SectionID = $1",
          [sectionId]
        );
      }

      await client.query("COMMIT");

      results.push({
        studentId,
        success: true,
        message: "Enrolled successfully",
      });
    } catch (e) {
      await client.query("ROLLBACK");
      console.error("[GUI] enroll-batch error:", e);
      results.push({
        studentId,
        success: false,
        message: e.message,
      });
    } finally {
      client.release();
    }
  }

  res.json({
    sectionId,
    results,
    statements: ["See transaction.sql for the full transaction template."],
  });
});

/**
 * 3) Table browser
 *    SELECT * FROM <table> LIMIT 50
 */
const ALLOWED_TABLES = [
  "Student",
  "BankAccount",
  "Course",
  "Section",
  "Enrollments",
  "Payment",
  "Semester",
  "Schedule",
  "SectionSchedule",
  "Prerequisite",
];

app.get("/api/gui/table/:name", async (req, res) => {
  const { name } = req.params;
  if (!ALLOWED_TABLES.includes(name)) {
    return res.status(400).json({ error: "Table not allowed" });
  }

  const sql = `SELECT * FROM ${name} LIMIT 50;`;
  logToFile("query.sql", sql);

  try {
    const result = await pool.query(sql);
    const columns = result.fields.map((f) => f.name);
    res.json({
      sql,
      columns,
      rows: result.rows,
    });
  } catch (e) {
    console.error("[GUI] table error:", e);
    res.status(500).json({ error: e.message });
  }
});

/**
 * 4) Enrollment summary report
 */
app.get("/api/gui/report/enrollment-summary", async (req, res) => {
  const sql = `
    SELECT
      c.CourseID,
      c.CourseName,
      sec.SectionID,
      sec.Status,
      sec.Capacity,
      sec.EnrolledCount,
      sem.Term || ' ' || sem.Year AS Semester
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    ORDER BY Semester, c.CourseID, sec.SectionID;
  `;
  logToFile("query.sql", sql);

  try {
    const result = await pool.query(sql);
    const columns = result.fields.map((f) => f.name);
    res.json({
      sql,
      columns,
      rows: result.rows,
    });
  } catch (e) {
    console.error("[GUI] enrollment-summary error:", e);
    res.status(500).json({ error: e.message });
  }
});

/**
 * 5) Revenue summary report
 */
app.get("/api/gui/report/revenue-summary", async (req, res) => {
  const sql = `
    SELECT
      sem.Term || ' ' || sem.Year AS Semester,
      c.CourseID,
      c.CourseName,
      COUNT(DISTINCT e.StudentID) AS NumStudents,
      SUM(c.Cost) AS TuitionCharged,
      SUM(COALESCE(p.Amount_paid, 0)) AS AmountPaid
    FROM Section sec
    JOIN Course c ON c.CourseID = sec.CourseID
    JOIN Semester sem ON sem.SemesterID = sec.SemesterID
    JOIN Enrollments e ON e.SectionID = sec.SectionID
    LEFT JOIN Payment p ON p.StudentID = e.StudentID
    WHERE e.Enrollment_status = 'Enrolled'
    GROUP BY sem.Term, sem.Year, c.CourseID, c.CourseName
    ORDER BY Semester, c.CourseID;
  `;
  logToFile("query.sql", sql);

  try {
    const result = await pool.query(sql);
    const columns = result.fields.map((f) => f.name);
    res.json({
      sql,
      columns,
      rows: result.rows,
    });
  } catch (e) {
    console.error("[GUI] revenue-summary error:", e);
    res.status(500).json({ error: e.message });
  }
});

/**
 * 6) SQL console – SELECT / WITH only, logged to query.sql
 */
app.post("/api/gui/query", async (req, res) => {
  const { sql } = req.body || {};
  if (!sql || typeof sql !== "string") {
    return res.status(400).json({ error: "SQL string is required" });
  }

  const trimmed = sql.trim();
  const upper = trimmed.toUpperCase();

  // basic safety: only SELECT / WITH, no semicolons or dangerous words
  if (
    !(
      upper.startsWith("SELECT ") ||
      upper.startsWith("WITH ")
    ) ||
    upper.includes(";") ||
    upper.includes("INSERT") ||
    upper.includes("UPDATE") ||
    upper.includes("DELETE") ||
    upper.includes("DROP") ||
    upper.includes("ALTER")
  ) {
    return res.status(400).json({
      error: "Only simple SELECT/WITH queries without semicolons are allowed.",
    });
  }

  logToFile("query.sql", trimmed);

  try {
    const result = await pool.query(trimmed);
    const columns = result.fields.map((f) => f.name);
    res.json({
      sql: trimmed,
      columns,
      rows: result.rows,
    });
  } catch (e) {
    console.error("[GUI] query error:", e);
    res.status(500).json({ error: e.message });
  }
});



// --- Start server ---
app.listen(port, () => {
  console.log(`🔵 Admin SQL GUI running at: http://localhost:${port}`);
});
