const express = require("express");
const {
  updateEmail,
  updatePassword,
} = require("../controllers/userController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.put("/update-email", authMiddleware, updateEmail);
router.put("/update-password", authMiddleware, updatePassword);

module.exports = router;
