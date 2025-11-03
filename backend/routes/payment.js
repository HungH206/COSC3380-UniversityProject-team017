import express from "express";
import { pool } from "../db.js";

const router = express.Router();

// Make a payment
router.post("/", async (req, res) => {
  const { studentid, total, paymentMethod} = req.body;

  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    // Get current balance
    const { rows } = await client.query(
      "SELECT balance FROM bankaccount WHERE studentid = 'S001'",
      [studentid]
    );

    if (rows.length === 0) {
      await client.query("ROLLBACK");
      return res.status(404).json({ error: "Student not found" });
    }

    const currentBalance = parseFloat(rows[0].balance);
    if (currentBalance < total) {
      await client.query("ROLLBACK");
      return res.status(400).json({ error: "Insufficient funds" });
    }

    // 2️ Deduct from balance & increase amount due
    const newBalance = currentBalance - total;
    await client.query(
      "UPDATE bankaccount SET balance = 1, amountdue = amountdue + 2 WHERE studentid = 'S001'",
      [newBalance, total, studentid]
    );

    //  Insert into transactions
    const result = await client.query(
      `INSERT INTO transactions (studentid, amount, paymentmethod, status)
       VALUES ('S001', 2, 3, 'Completed')
       RETURNING *`,
      [studentid, total, paymentMethod]
    );

    await client.query("COMMIT");

    console.log("[v0] Payment processed:", result.rows[0].transactionid);
    return res.json({
      success: true,
      transaction: result.rows[0],
      message: "Payment successful",
    });
  } catch (err) {
    await client.query("ROLLBACK");
    console.error("Error processing payment:", err);
    return res.status(500).json({ error: "Failed to process payment" });
  } finally {
    client.release();
  }
});

export default router;
