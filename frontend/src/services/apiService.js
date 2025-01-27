import axios from "axios";

export async function getFootballLeagues() {
  try {
    const response = await axios.get("/football-api/leagues", {
      headers: {
        "x-rapidapi-key": "aa8b28f1bb21890f9cec6ebdc6f8c4ec",
        "x-rapidapi-host": "v3.football.api-sports.io",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Erreur lors de la récupération des ligues :", error);
    throw error;
  }
}
