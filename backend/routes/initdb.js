import express from "express";
import { pool } from "../db.js";
import fs from "fs";
import path from "path";

const router = express.Router();

// Helper: read SQL file and execute it
const executeSQLFile = async (filename) => {
  const filePath = path.resolve(`./SQLTable/${filename}`);
  const sql = fs.readFileSync(filePath, "utf8");
  await pool.query(sql);
};

// Initialize DB Tables
router.post("/", async (req, res) => {
  try {
    // Create tables in sequence
    await executeSQLFile("cart_test.sql");
    await executeSQLFile("bankaccount_test.sql");
    await executeSQLFile("transaction_test.sql");
    await executeSQLFile("enrollments_test.sql");
    await executeSQLFile("course_test.sql");
    await executeSQLFile("student_test.sql");

    res.json({ message: "Database tables created successfully ✅" });
  } catch (error) {
    console.error("Error initializing database:", error);
    res.status(500).json({ error: "Failed to create tables" });
  }
});

export default router;
