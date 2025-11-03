import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Perform checkout
router.post("/checkout", async (req, res) => {
  const { student_id } = req.body;
  const client = await pool.connect();

  try {
    await client.query("BEGIN");

    // 1 Get total from cart
    const cartTotal = await client.query(
      `SELECT SUM(c.credits * 350) AS total
       FROM cart ct
       JOIN courses c ON ct.course_id = c.id
       WHERE ct.student_id = $1`,
      [student_id]
    );

    const totalAmount = Number(cartTotal.rows[0].total || 0);
    if (totalAmount === 0) throw new Error("Cart is empty.");

    // Check bank balance
    const balanceCheck = await client.query(
      "SELECT balance FROM bankaccount WHERE student_id=$1",
      [student_id]
    );
    const balance = Number(balanceCheck.rows[0]?.balance || 0);

    if (balance < totalAmount)
      throw new Error("Insufficient funds in your account.");

    // Deduct balance
    await client.query(
      "UPDATE bankaccount SET balance = balance - $1 WHERE student_id = $2",
      [totalAmount, student_id]
    );

    // Record payment
    await client.query(
      "INSERT INTO payment (student_id, total_amount) VALUES ($1, $2)",
      [student_id, totalAmount]
    );

    // Clear cart
    await client.query("DELETE FROM cart WHERE student_id = $1", [student_id]);

    await client.query("COMMIT");
    res.json({ message: "Payment successful", totalAmount });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Transaction error:", err);
    res.status(500).json({ error: err.message });
  } finally {
    client.release();
  }
});

export default router;
