const Favorite = require("../models/Favorite");

const getFavorites = async (req, res) => {
  try {
    const favorites = await Favorite.find({ userId: req.userId });
    res.json(favorites);
  } catch (error) {
    res
      .status(500)
      .json({ error: "Erreur lors de la récupération des favoris." });
  }
};

const addFavorite = async (req, res) => {
  try {
    const { teamId } = req.body;

    // Ajoute l'équipe au tableau `teamIds`, évite les doublons
    const result = await Favorite.findOneAndUpdate(
      { userId: req.userId }, // Recherche par utilisateur
      { $addToSet: { teamIds: teamId } }, // Ajoute l'équipe si elle n'est pas déjà présente
      { upsert: true, new: true } // Crée un document s'il n'existe pas et retourne le document mis à jour
    );

    console.log("result", result);
    res.status(201).json({
      message: "Équipe ajoutée aux favoris.",
      favorites: result.teamIds,
    });
  } catch (error) {
    console.error("Erreur lors de l'ajout aux favoris :", error);
    res.status(500).json({ error: "Erreur lors de l'ajout aux favoris." });
  }
};

const removeFavorite = async (req, res) => {
  try {
    const { teamId } = req.params;

    // Supprime la teamId du tableau `teamIds`
    const result = await Favorite.findOneAndUpdate(
      { userId: req.userId }, // Recherche par userId
      { $pull: { teamIds: teamId } }, // Retire la teamId du tableau
      { new: true } // Retourne le document mis à jour
    );

    // Vérifie si le document existe
    if (!result) {
      return res
        .status(404)
        .json({ message: "Favori non trouvé pour cet utilisateur." });
    }

    res.status(200).json({
      message: "Équipe retirée des favoris.",
      favorites: result.teamIds, // Retourne la liste mise à jour des favoris
    });
  } catch (error) {
    console.error("Erreur lors de la suppression du favori :", error);
    res.status(500).json({ error: "Erreur lors de la suppression du favori." });
  }
};

module.exports = { getFavorites, addFavorite, removeFavorite };
