import axios from "axios";

const STORAGE_KEY_NBA_GAMES = "cached_nba_games";
const EXPIRATION_TIME = 24 * 60 * 60 * 1000; // 1 day

export async function getNBAGames(
  { season = 2023, league = "standard" } = {},
  signal
) {
  try {
    const cachedData = localStorage.getItem(STORAGE_KEY_NBA_GAMES);
    const parsedData = cachedData ? JSON.parse(cachedData) : {};

    if (
      parsedData.games &&
      Date.now() - parsedData.timestamp < EXPIRATION_TIME
    ) {
      return parsedData.games;
    }

    const params = {
      season,
      league,
    };

    const response = await axios.get("https://v2.nba.api-sports.io/games", {
      headers: {
        "x-rapidapi-key": import.meta.env.VITE_API_KEY,
        "x-rapidapi-host": import.meta.env.VITE_BASKETBALL_API_HOST,
      },
      params,
      signal,
    });

    if (response.data && response.data.response) {
      const games = response.data.response;

      localStorage.setItem(
        STORAGE_KEY_NBA_GAMES,
        JSON.stringify({ games, timestamp: Date.now() })
      );

      return games;
    } else {
      throw new Error("No matches found.");
    }
  } catch (error) {
    console.error("❌ Error while retrieving leagues:", error);
    throw error;
  }
}
