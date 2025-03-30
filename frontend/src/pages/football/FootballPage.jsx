import { useEffect, useState } from "react";
import {
  getFootballLeagues,
  getMatchesByLeague,
} from "../../services/apiFootballService";
import { Outlet } from "react-router-dom";
import axios from "axios";

export default function FootballPage() {
  const [nationalLeagues, setNationalLeagues] = useState([]);
  const [worldLeagues, setWorldLeagues] = useState([]);
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async (signal) => {
    try {
      setLoading(true);

      const leagues = await getFootballLeagues(signal);
      if (leagues) {
        const allowedIds = [140, 78, 61, 135, 39, 2, 3];
        const filteredLeagues = leagues.filter(
          (league) =>
            allowedIds.includes(league.league.id) &&
            league.seasons.some((season) => season.current === true)
        );

        setNationalLeagues(
          filteredLeagues.filter((league) => league.country.name !== "World")
        );
        setWorldLeagues(
          filteredLeagues.filter((league) => league.country.name === "World")
        );

        const allMatches = {};
        for (let league of filteredLeagues) {
          const leagueId = league.league.id;
          const data = await getMatchesByLeague(leagueId, signal);
          allMatches[leagueId] = data;
        }
        setMatches(allMatches);
      } else {
        setError(new Error("Invalid league data received from the API."));
      }
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchData(signal);

    return () => controller.abort();
  }, []);

  if (loading) return <div>Loading leagues and matches...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return <Outlet context={{ nationalLeagues, worldLeagues, matches }} />;
}
