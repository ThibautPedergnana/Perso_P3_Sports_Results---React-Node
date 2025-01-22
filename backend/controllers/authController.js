const User = require("../models/User");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = new User({ email, password });
    await user.save();

    // Génération du token
    const token = jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "24h" } // Durée d'expiration
    );

    // Réponse avec le token
    res.status(201).json({
      message: "Utilisateur créé avec succès !",
      token, // Assurez-vous que le token est inclus dans la réponse
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la création de l'utilisateur." });
  }
};

module.exports = { registerUser };

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
    if (!user)
      return res.status(404).json({ error: "Utilisateur non trouvé." });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ error: "Mot de passe incorrect." });

    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    res.json({ token, userId: user._id });
  } catch (error) {
    res.status(500).json({ error: "Erreur lors de la connexion." });
  }
};

module.exports = { registerUser, loginUser };
