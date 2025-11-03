import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Make a payment (insert transaction + update bank)
router.post("/", async (req, res) => {
  const { student_id, cartItems, total, paymentMethod } = req.body;

  try {
    // 1/ Check student balance
    const result = await pool.query("SELECT balance FROM bankaccount WHERE studentid = $1", [student_id]);
    if (result.rows.length === 0) return res.status(404).json({ error: "Bank account not found" });

    const balance = parseFloat(result.rows[0].balance);
    if (balance < total) return res.status(400).json({ error: "Insufficient balance" });

    // 2/ Deduct balance
    const newBalance = balance - total;
    await pool.query("UPDATE bankaccount SET balance = $1, amountdue = 0 WHERE studentid = $2", [newBalance, student_id]);

    // 3/ Record transaction
    const transactionResult = await pool.query(
      "INSERT INTO transaction(student_id, totalamount, paymentMethod, transactionId) VALUES($1, $2, $3, 'completed', NOW()) RETURNING transactionid",
      [student_id, total, paymentMethod]
    );
    const transactionId = transactionResult.rows[0].transactionid;

    // 4/Optionally clear the student's cart
    await pool.query("DELETE FROM cart WHERE student_id = $1", [student_id]);

    console.log("💳 Transaction completed:", transactionId);
    res.json({ success: true, transactionId, newBalance });
  } catch (err) {
    console.error("Error processing payment:", err);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

export default router;