// backend/routes/cart.js
import express from "express";

const router = express.Router();

// Mock cart data — in production, this would be a database table
let cartItems = [];

// GET - fetch all cart items
router.get("/", (req, res) => {
  try {
    res.json({ items: cartItems });
  } catch (error) {
    console.error("Error fetching cart:", error);
    res.status(500).json({ error: "Failed to fetch cart" });
  }
});

// POST - add a new item to cart
router.post("/", (req, res) => {
  try {
    const course = req.body;

    // check if course already exists in cart
    const existingIndex = cartItems.findIndex(
      (item) => item.course_id === course.course_id
    );

    if (existingIndex >= 0) {
      return res.status(400).json({ error: "Course already in cart" });
    }

    cartItems.push(course);
    console.log("✅ Added to cart:", course.course_code);

    res.json({ items: cartItems });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({ error: "Failed to add to cart" });
  }
});

// DELETE - remove a course by id
router.delete("/", (req, res) => {
  try {
    const courseId = req.query.id;

    if (!courseId) {
      return res.status(400).json({ error: "Course ID required" });
    }

    cartItems = cartItems.filter(
      (item) => String(item.course_id) !== String(courseId)
    );

    console.log("🗑️ Removed from cart:", courseId);
    res.json({ items: cartItems });
  } catch (error) {
    console.error("Error removing from cart:", error);
    res.status(500).json({ error: "Failed to remove from cart" });
  }
});

export default router;
