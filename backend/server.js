const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const { createProxyMiddleware } = require("http-proxy-middleware"); // Importez le middleware proxy

const authRoutes = require("./routes/authRoutes");
const favoriteRoutes = require("./routes/favoriteRoutes");

dotenv.config();
connectDB();

const app = express();

app.use(cors()); // Permet les requêtes CORS vers votre propre backend
app.use(bodyParser.json());

// Configuration du proxy pour l'API football
app.use(
  "/football-api",
  createProxyMiddleware({
    target: "https://v3.football.api-sports.io",
    changeOrigin: true,
    pathRewrite: { "^/football-api": "" },
    onProxyReq: (proxyReq, req, res) => {
      console.log("Proxy request path:", proxyReq.path); // Log pour vérifier
      proxyReq.setHeader(
        "x-rapidapi-key",
        process.env.FOOTBALL_API_KEY || " aa8b28f1bb21890f9cec6ebdc6f8c4ec"
      );
      proxyReq.setHeader(
        "x-rapidapi-host",
        process.env.FOOTBALL_API_HOST || "v3.football.api-sports.io"
      );
    },
    onProxyRes: (proxyRes, req, res) => {
      console.log("Proxy response status:", proxyRes.statusCode); // Log pour vérifier
    },
  })
);

app.use("/api", authRoutes);
app.use("/api", favoriteRoutes);

const PORT = process.env.PORT || 5000;

app
  .listen(PORT, () => console.log(`Serveur démarré sur le port ${PORT}`))
  .on("error", (err) =>
    console.error("Erreur lors du démarrage du serveur :", err)
  );
