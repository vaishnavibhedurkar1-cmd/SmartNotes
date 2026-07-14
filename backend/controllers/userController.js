const User = require("../models/User");
const Note = require("../models/Note");
const Category = require("../models/Category");

/*
GET PROFILE
*/

exports.getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    const totalNotes = await Note.countDocuments({
  userId: req.user._id,
});

const pinnedNotes = await Note.countDocuments({
  userId: req.user._id,
  isPinned: true,
});

const archivedNotes = await Note.countDocuments({
  userId: req.user._id,
  isArchived: true,
});

const totalCategories = await Category.countDocuments({
  userId: req.user._id,
});
    res.status(200).json({
      success: true,
      user,
      stats: {
        totalNotes,
        pinnedNotes,
        archivedNotes,
        totalCategories,
      },
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

/*
UPDATE PROFILE
*/

exports.updateProfile = async (req, res) => {
  try {
    const { name } = req.body;

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      {
        name,
      },
      {
        new: true,
      }
    ).select("-password");

    res.status(200).json({
      success: true,
      message: "Profile Updated",
      user: updatedUser,
    });
  } catch (error) {
    console.log(error);

    res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};