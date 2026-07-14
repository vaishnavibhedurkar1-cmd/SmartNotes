const express = require("express");
const router = express.Router();

const {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
} = require("../controllers/categoryController");

const authMiddleware = require("../middleware/authMiddleware");

// =============================
// Category Routes
// =============================

// Get All Categories
router.get("/", authMiddleware, getCategories);

// Add Category
router.post("/", authMiddleware, createCategory);

// Delete Category
router.delete("/:id", authMiddleware, deleteCategory);

// Update Category
router.put("/:id", authMiddleware, updateCategory);

module.exports = router;