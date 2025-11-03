import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Make a payment (insert transaction + update bank)
router.post("/", async (req, res) => {
  const { studentid, cartItems, total, paymentMethod } = req.body;

  try {
    // 1/ Check student balance
    const result = await pool.query("SELECT balance FROM bankaccount WHERE studentid = 'S001'");
    if (result.rows.length === 0) return res.status(404).json({ error: "Bank account not found" });

    const balance = parseFloat(result.rows[0].balance);
    if (balance < total) return res.status(400).json({ error: "Insufficient balance" });

    // 2/ Deduct balance
    const newBalance = balance - total;
    await pool.query("UPDATE bankaccount SET balance = 10000.00, amountdue = 0.00 WHERE studentid = 'S001'");

    // 3/ Record transaction
    const transactionResult = await pool.query(
      "INSERT INTO transactions(studentid, amount, paymentmethod, status) VALUES('S001', 1500, 'Credit Card', 'Completed') RETURNING transactionid"
    );
    const transactionId = transactionResult.rows[0].transactionid;

    // 4/Optionally clear the student's cart
 //   await pool.query("DELETE FROM cart WHERE student_id = 1");

    console.log("Transaction completed:", transactionId);
    res.json({ 
      success: true, 
      transactionId, 
      newBalance,
      transaction: {
        id: transactionId,
        amount: total,
        paymentMethod,
        status: 'Completed'
      }
    });
  } catch (err) {
    console.error("Error processing payment:", err);
    res.status(500).json({ error: "Failed to process payment" });
  }
});

export default router;