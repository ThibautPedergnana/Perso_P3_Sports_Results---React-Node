const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  let token = req.headers.authorization;
  if (!token) return res.status(403).json({ error: "Unauthorized access." });

  token = token.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token." });
  }
};

module.exports = authMiddleware;
