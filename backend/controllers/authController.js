const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Signup Function
const signup = async (req, res) => {
  try {

    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please fill all fields"
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "Email already exists"
      });
    }

    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new User({
      name,
      email,
      password: hashedPassword
    });

    await user.save();

    res.status(201).json({
      success: true,
      message: "Signup Successful",
      user
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }
};

// Login Function
const login = async (req, res) => {

  try {

    const { email, password } = req.body;

    if (!email || !password) {

      return res.status(400).json({
        message: "Please fill all fields"
      });

    }

    const user = await User.findOne({ email });

    if (!user) {

      return res.status(400).json({
        message: "User Not Found"
      });

    }

    const match = await bcrypt.compare(password, user.password);

    if (!match) {

      return res.status(400).json({
        message: "Wrong Password"
      });

    }

    const token = jwt.sign(
      {
        id: user._id
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "7d"
      }
    );

    res.status(200).json({

      success: true,

      message: "Login Successful",

      token,

      user

    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

};

module.exports = {
  signup,
  login
};