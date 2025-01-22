const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");

const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors());
app.use(bodyParser.json());

app.use("/api", authRoutes);
app.use("/api", favoriteRoutes);

const PORT = process.env.PORT || 5000;

app
  .listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))
  .on("error", (err) =>
    console.error("Erreur lors du démarrage du serveur :", err)
  );
