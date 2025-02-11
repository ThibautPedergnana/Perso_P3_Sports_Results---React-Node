import { useEffect, useState } from "react";
import {
  getFootballLeagues,
  getMatchesByLeague,
} from "../../services/apiService";
import { Outlet } from "react-router-dom";

export default function FootballPage() {
  const [nationalLeagues, setNationalLeagues] = useState([]);
  const [worldLeagues, setWorldLeagues] = useState([]);
  const [matches, setMatches] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const leagues = await getFootballLeagues();
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
            const data = await getMatchesByLeague(leagueId);
            allMatches[leagueId] = data;
          }
          setMatches(allMatches);
        } else {
          setError(new Error("Données de ligues invalides reçues de l'API."));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) return <div>Chargement des ligues et matchs...</div>;
  if (error) return <div>Erreur : {error.message}</div>;

  return <Outlet context={{ nationalLeagues, worldLeagues, matches }} />;
}
