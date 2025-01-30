import { useEffect, useState } from "react";
import { getFootballLeagues } from "../services/apiService";
import { Link } from "react-router-dom";

function FootballPage() {
  const [nationalLeagues, setNationalLeagues] = useState([]);
  const [worldLeagues, setWorldLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const allowedIds = [140, 78, 61, 135, 39, 2, 3];

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const leagues = await getFootballLeagues();
        if (leagues) {
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
        } else {
          setError(new Error("Données de ligues invalides reçues de l'API."));
        }
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeagues();
  }, []);

  if (loading) return <div>Chargement des ligues...</div>;
  if (error) return <div>Erreur : {error.message}</div>;
  if (nationalLeagues.length === 0 && worldLeagues.length === 0)
    return <div>Aucune ligue trouvée.</div>;

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-6xl flex">
        {/* Ligues Nationales */}
        <div className="flex-1 flex flex-wrap justify-center gap-4">
          <h2 className="w-full text-center mb-4">Ligues Nationales</h2>
          {nationalLeagues.map((league) => (
            <Link
              to={`/football/league/${league.league.id}`}
              key={league.league.id}
              className="text-center w-32"
            >
              <img
                src={league.league.logo}
                alt={league.league.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <div>{league.league.name}</div>
            </Link>
          ))}
        </div>

        {/* Séparateur */}
        <div className="border-l-2 border-gray-300 mx-8" />

        {/* Ligues Mondiales */}
        <div className="flex-1 flex flex-wrap justify-center gap-4">
          <h2 className="w-full text-center mb-4">Ligues Mondiales</h2>
          {worldLeagues.map((league) => (
            <Link
              to={`/football/league/${league.league.id}`}
              key={league.league.id}
              className="text-center w-32"
            >
              <img
                src={league.league.logo}
                alt={league.league.name}
                className="w-16 h-16 mx-auto mb-2"
              />
              <div>{league.league.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FootballPage;
