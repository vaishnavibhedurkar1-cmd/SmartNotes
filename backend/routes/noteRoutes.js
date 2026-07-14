const express = require("express");

const router = express.Router();

const protect = require("../middleware/authMiddleware");

const {
  createNote,
  getNotes,
  getNotesByCategory,
  getSingleNote,
  updateNote,
  deleteNote,
  togglePinNote,
} = require("../controllers/noteController");


router.put("/pin/:id", protect,togglePinNote);

// Create Note
router.post("/", protect, createNote);

// Get All Notes
router.get("/", protect, getNotes);

// Get Notes by Category
router.get("/category/:categoryId", protect, getNotesByCategory);

// Get Single Note
router.get("/:id", protect, getSingleNote);

// Update Note
router.put("/:id", protect, updateNote);

// Delete Note
router.delete("/:id", protect, deleteNote);



module.exports = router;

