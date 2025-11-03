import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Add course to cart
router.post("/", async (req, res) => {
  const { student_id, course_id } = req.body;
  try {
    await pool.query(
      "INSERT INTO cart (student_id, course_id) VALUES ($1, $2) ON CONFLICT DO NOTHING",
      [student_id, course_id]
    );
    res.json({ message: "Course added to cart" });
  } catch (err) {
    console.error("Error adding to cart:", err);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});
// Get all cart items (default endpoint)
router.get("/", async (req, res) => {
  try {
    const result = await pool.query(`
      SELECT ct.cart_id AS id, c.code, c.name, c.credits, c.department, c.instructor, c.schedule,
             CASE 
               WHEN c.credits = 1 THEN 350
               WHEN c.credits = 3 THEN 1050
               WHEN c.credits = 4 AND c.department IN ('Physics', 'Biology', 'Chemistry') THEN 1400
               ELSE c.credits * 350
             END AS price
      FROM cart ct
      JOIN courses c ON ct.course_id = c.id
    `);

    res.json({ items: result.rows });
  } catch (err) {
    console.error("Error fetching all cart items:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// View cart items with course info
router.get("/:student_id", async (req, res) => {
  const { student_id } = req.params;
  try {
    const result = await pool.query(
      `SELECT c.id, c.code, c.name, c.credits, c.department, c.semester, c.instructor, c.cost
       FROM cart ct
       JOIN courses c ON ct.course_id = c.id
       WHERE ct.student_id = $1`,
      [student_id]
    );
    res.json(result.rows);
  } catch (err) {
    console.error("Error fetching cart:", err);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

export default router;
