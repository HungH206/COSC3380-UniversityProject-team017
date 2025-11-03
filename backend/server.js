import express from "express";
import cors from "cors";
import { pool } from "./db.js";
import cartRoutes from "./routes/cart.js";
import paymentRoutes from "./routes/payment.js";
import transactionsRoutes from "./routes/transactions.js";

const app = express();
app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

// Add this route
app.get("/", (_, res) => {
  res.send("Express server is running");
});

// General API route
app.get("/api", (_, res) => {
  res.json({ message: "API is running", endpoints: ["/api/test"] });
});

// Example test route
app.get("/api/test", async (_, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Connected to DB", time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get("/api/Courses", async (req, res) => {
  try {
    const result = await pool.query("SELECT * FROM Courses");
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.use("/api/cart", cartRoutes);

app.use("/api/payment", paymentRoutes);

app.use("/api/transactions", transactionsRoutes);

app.listen(3001, () => console.log("Server running at http://localhost:3001"));
