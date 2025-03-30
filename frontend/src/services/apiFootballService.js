import axios from "axios";

const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day

const ALLOWED_LEAGUE_IDS = [140, 78, 61, 135, 39, 2, 3];
const STORAGE_KEY_LEAGUES = "cached_football_leagues";

export async function getFootballLeagues(signal) {
  try {
    const cachedData = localStorage.getItem(STORAGE_KEY_LEAGUES);
    const parsedData = cachedData ? JSON.parse(cachedData) : {};

    if (
      parsedData.leagues &&
      Date.now() - parsedData.timestamp < EXPIRATION_TIME
    ) {
      return parsedData.leagues;
    }

    const response = await axios.get("/football-api/leagues", {
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
      },
      signal,
    });

    if (!response.data || !response.data.response) {
      throw new Error("Invalid API response");
    }

    const filteredLeagues = response.data.response.filter((league) =>
      ALLOWED_LEAGUE_IDS.includes(league.league.id)
    );

    localStorage.setItem(
      STORAGE_KEY_LEAGUES,
      JSON.stringify({ leagues: filteredLeagues, timestamp: Date.now() })
    );

    return filteredLeagues;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
      return;
    }
    console.error("❌ Error while retrieving leagues:", error);
    throw error;
  }
}

const STORAGE_KEY_MATCHES = "cached_football_matches";

export async function getMatchesByLeague(leagueId, signal) {
  try {
    const cachedData = localStorage.getItem(STORAGE_KEY_MATCHES);
    const parsedData = cachedData ? JSON.parse(cachedData) : {};

    if (
      parsedData[leagueId] &&
      Date.now() - parsedData[leagueId].timestamp < EXPIRATION_TIME
    ) {
      return parsedData[leagueId].matches;
    }

    const season = 2022;
    const response = await axios.get(
      `/football-api/fixtures?league=${leagueId}&season=${season}`,
      {
        headers: {
          "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        },
        signal,
      }
    );

    const matches = response.data.response;

    localStorage.setItem(
      STORAGE_KEY_MATCHES,
      JSON.stringify({
        ...parsedData,
        [leagueId]: { matches, timestamp: Date.now() },
      })
    );

    return matches;
  } catch (error) {
    if (axios.isCancel(error)) {
      console.log("Request canceled:", error.message);
      return;
    }
    console.error("❌ Error while retrieving leagues:", error);
    throw error;
  }
}
