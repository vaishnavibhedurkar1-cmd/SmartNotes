const Category = require("../models/Category");

// ===============================
// Add Category
// ===============================
const createCategory = async (req, res) => {
  try {
    const { name } = req.body;

    if (!name || name.trim() === "") {
      return res.status(400).json({
        message: "Category name is required",
      });
    }

    const existingCategory = await Category.findOne({
      name: name.trim(),
      userId: req.user._id,
    });

    if (existingCategory) {
      return res.status(400).json({
        message: "Category already exists",
      });
    }

    const category = await Category.create({
      name: name.trim(),
      userId: req.user._id,
    });

    res.status(201).json({
      message: "Category added successfully",
      category,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Get All Categories
// ===============================
const getCategories = async (req, res) => {
  try {
    const categories = await Category.find({
      userId: req.user._id,
    }).sort({ createdAt: -1 });

    res.status(200).json(categories);
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Delete Category
// ===============================
const deleteCategory = async (req, res) => {
  try {
    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    await Category.findByIdAndDelete(req.params.id);

    res.status(200).json({
      message: "Category deleted successfully",
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });
  }
};

// ===============================
// Update Category
// ===============================
const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const category = await Category.findOne({
      _id: req.params.id,
      userId: req.user._id,
    });

    if (!category) {
      return res.status(404).json({
        message: "Category not found",
      });
    }

    category.name = name;

    await category.save();

    res.status(200).json({
      message: "Category Updated Successfully",
      category,
    });

  } catch (error) {

    console.log(error);

    res.status(500).json({
      message: "Server Error",
    });

  }
};

module.exports = {
  createCategory,
  getCategories,
  deleteCategory,
  updateCategory,
};