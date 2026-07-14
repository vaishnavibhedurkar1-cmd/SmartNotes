const Note = require("../models/Note");

// Create Note
const createNote = async (req, res) => {
  try {
    const { title, content, categoryId } = req.body;

    const note = await Note.create({
      title,
      content,
      categoryId,
      userId: req.user._id,
    });

    res.status(201).json({
      success: true,
      message: "Note Created Successfully",
      note,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Get All Notes of Logged-in User
const getNotes = async (req, res) => {
  try {

    const notes = await Note.find({
      userId: req.user._id,
    }).populate("categoryId");

    res.status(200).json({
      success: true,
      notes,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Notes by Category
const getNotesByCategory = async (req, res) => {

  try {

    const notes = await Note.find({
      categoryId: req.params.categoryId,
      userId: req.user._id,
    });

    res.status(200).json({
      success: true,
      notes,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Get Single Note
const getSingleNote = async (req, res) => {

  try {

    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note Not Found",
      });
    }

    res.status(200).json({
      success: true,
      note,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Update Note
const updateNote = async (req, res) => {

  try {

    const note = await Note.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true }
    );

    res.status(200).json({
      success: true,
      message: "Note Updated",
      note,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

// Delete Note
const deleteNote = async (req, res) => {

  try {

    await Note.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: "Note Deleted Successfully",
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

const togglePinNote = async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);

    if (!note) {
      return res.status(404).json({
        success: false,
        message: "Note not found",
      });
    }

    note.isPinned = !note.isPinned;

    await note.save();

    res.status(200).json({
      success: true,
      message: note.isPinned
        ? "Note Pinned"
        : "Note Unpinned",
      note,
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      message: error.message,
    });

  }
};

module.exports = {
  createNote,
  getNotes,
  getNotesByCategory,
  getSingleNote,
  updateNote,
  deleteNote,
  togglePinNote,
};