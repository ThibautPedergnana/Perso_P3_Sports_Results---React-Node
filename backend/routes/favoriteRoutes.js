const express = require("express");
const router = express.Router();
const {
  getFavorites,
  addFavorite,
  removeFavorite,
} = require("../controllers/favoriteController");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/favorites", authMiddleware, getFavorites);
router.post("/favorites", authMiddleware, addFavorite);
router.delete("/favorites/:teamId", authMiddleware, removeFavorite);

module.exports = router;
