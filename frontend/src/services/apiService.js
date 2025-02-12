import axios from "axios";

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 jour

const STORAGE_KEY_LEAGUES = "cached_leagues";
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
      return parsedData.leagues;
    }

    // Si le cache est expiré ou inexistant, récupérer les ligues depuis l'API
    const response = await axios.get("/football-api/leagues", {
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
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

const STORAGE_KEY_MATCHES = "cached_matches";

export async function getMatchesByLeague(leagueId) {
  try {
    // Vérifier le cache
    const cachedData = localStorage.getItem(STORAGE_KEY_MATCHES);
    const parsedData = cachedData ? JSON.parse(cachedData) : {}; // Ajout d'une valeur par défaut

    if (
      parsedData[leagueId] &&
      Date.now() - parsedData[leagueId].timestamp < EXPIRATION_TIME
    ) {
      return parsedData[leagueId].matches;
    }

    // Si pas en cache ou expiré, récupérer les données depuis l'API
    const season = 2022;
    const response = await axios.get(
      `/football-api/fixtures?league=${leagueId}&season=${season}`,
      {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_FOOTBALL_API_KEY,
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

const STORAGE_KEY_TEAMS = "cached_teams";

export async function getTeamsById(teamId) {
  try {
    const cachedData = localStorage.getItem(STORAGE_KEY_TEAMS);
    const parsedData = cachedData ? JSON.parse(cachedData) : {}; // Ajout d'une valeur par défaut

    if (
      parsedData[teamId] &&
      Date.now() - parsedData[teamId].timestamp < EXPIRATION_TIME
    ) {
      return parsedData[teamId].team;
    }

    // Si le cache est expiré ou inexistant, récupérer les données depuis l'API
    const response = await axios.get(
      `https://v3.football.api-sports.io/teams?id=${teamId}`,
      {
        headers: {
          "x-apisports-key": import.meta.env.VITE_FOOTBALL_API_KEY,
        },
      }
    );
    if (
      !response.data ||
      !response.data.response ||
      response.data.response.length === 0
    ) {
      throw new Error("Aucune équipe trouvée pour cet ID");
    }
    // Extraire uniquement l'équipe
    const team = response.data.response[0];

    // Stocker en cache
    localStorage.setItem(
      STORAGE_KEY_TEAMS,
      JSON.stringify({
        ...parsedData,
        [teamId]: { team, timestamp: Date.now() },
      })
    );

    return team;
  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'équipe :", error);
    throw error;
  }
}
