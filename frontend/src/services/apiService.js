import axios from "axios";

const STORAGE_KEY_LEAGUES = "cachedLeagues";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 jour

// Liste des ID des ligues qui t'intéressent
const ALLOWED_LEAGUE_IDS = [140, 78, 61, 135, 39, 2, 3];

export async function getFootballLeagues() {
  try {
    // Vérifier le cache
    const cachedData = localStorage.getItem(STORAGE_KEY_LEAGUES);
    const parsedData = cachedData ? JSON.parse(cachedData) : {};

    if (
      parsedData.leagues &&
      Date.now() - parsedData.timestamp < EXPIRATION_TIME
    ) {
      console.log("🔄 Chargement des ligues depuis le cache");
      return parsedData.leagues;
    }

    // Si le cache est expiré ou inexistant, récupérer les ligues depuis l'API
    console.log("🌐 Récupération des ligues depuis l'API...");
    const response = await axios.get("/football-api/leagues", {
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_FOOTBALL_API_HOST,
      },
    });

    if (!response.data || !response.data.response) {
      throw new Error("Réponse API invalide");
    }

    // Filtrer les ligues qui t'intéressent AVANT de les stocker
    const filteredLeagues = response.data.response.filter((league) =>
      ALLOWED_LEAGUE_IDS.includes(league.league.id)
    );

    // Stocker uniquement ces ligues dans le cache
    localStorage.setItem(
      STORAGE_KEY_LEAGUES,
      JSON.stringify({ leagues: filteredLeagues, timestamp: Date.now() })
    );

    return filteredLeagues;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération des ligues :", error);
    throw error;
  }
}

const STORAGE_KEY_MATCHES = "matches_cache";

export async function getMatchesByLeague(leagueId) {
  try {
    // Vérifier le cache
    const cachedData = localStorage.getItem(STORAGE_KEY_MATCHES);
    const parsedData = cachedData ? JSON.parse(cachedData) : {}; // Ajout d'une valeur par défaut

    if (
      parsedData[leagueId] &&
      Date.now() - parsedData[leagueId].timestamp < EXPIRATION_TIME
    ) {
      console.log(
        `🔄 Chargement des matchs depuis le cache pour la ligue ${leagueId}`
      );
      return parsedData[leagueId].matches;
    }

    // Si pas en cache ou expiré, récupérer les données depuis l'API
    console.log(
      `📡 Requête API pour récupérer les matchs de la ligue ${leagueId}`
    );
    const season = 2022;
    const response = await axios.get(
      `/football-api/fixtures?league=${leagueId}&season=${season}`,
      {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
          "x-rapidapi-host": import.meta.env.VITE_FOOTBALL_API_HOST,
        },
      }
    );

    const matches = response.data.response;

    // Mettre en cache les résultats
    localStorage.setItem(
      STORAGE_KEY_MATCHES,
      JSON.stringify({
        ...parsedData, // Assurer qu'on conserve les autres ligues en cache
        [leagueId]: { matches, timestamp: Date.now() },
      })
    );

    return matches;
  } catch (error) {
    console.error("Erreur lors de la récupération des matchs :", error);
    throw error;
  }
}
