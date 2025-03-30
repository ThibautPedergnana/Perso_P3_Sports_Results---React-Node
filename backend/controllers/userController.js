const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/User");

const updateEmail = async (req, res) => {
  try {
    const { newEmail } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    if (user.email === newEmail) {
      return res.status(400).json({
        message: "The new email address must be different from the old one.",
      });
    }

    user.email = newEmail;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({
      message: "Email address updated successfully.",
      token,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const user = await User.findById(req.userId);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const isMatch = await bcrypt.compare(oldPassword, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect old password." });
    }

    if (!newPassword || newPassword.length < 2) {
      return res.status(400).json({
        message: "The new password must be at least 6 characters long.",
      });
    }

    user.password = newPassword;
    await user.save();

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "24h",
    });

    res.status(200).json({ message: "Password updated.", token });
  } catch (error) {
    res.status(500).json({ message: "Server error.", error });
  }
};

module.exports = { updateEmail, updatePassword };
