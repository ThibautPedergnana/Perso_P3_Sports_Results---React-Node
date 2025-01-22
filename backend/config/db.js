const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    // Utilisation de l'URI de MongoDB depuis les variables d'environnement
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB connecté !");
  } catch (error) {
    console.error("Erreur de connexion à MongoDB :", error);
    process.exit(1); // Arrêter le serveur si la connexion échoue
  }
};

module.exports = connectDB;
