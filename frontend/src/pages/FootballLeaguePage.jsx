import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchesByLeague } from "../services/apiService";

export default function LeagueMatchesPage() {
  const { leagueId } = useParams(); // Récupérer l'ID de la ligue depuis l'URL
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchMatches() {
      try {
        setLoading(true);
        const data = await getMatchesByLeague(leagueId);
        setMatches(data);
      } catch (err) {
        setError("Impossible de charger les matchs.", err);
      } finally {
        setLoading(false);
      }
    }
    fetchMatches();
  }, [leagueId]);

  // Trier les matchs (passés et futurs)
  const now = new Date();
  const pastMatches = matches.filter(
    (match) => new Date(match.fixture.date) < now
  );
  const upcomingMatches = matches.filter(
    (match) => new Date(match.fixture.date) >= now
  );

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Matchs de la Ligue</h1>

      {loading && <p>Chargement...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && !error && (
        <>
          <h2 className="text-xl mt-4 font-semibold">Matchs à venir</h2>
          {upcomingMatches.length > 0 ? (
            <ul>
              {upcomingMatches.map((match) => (
                <li key={match.fixture.id}>
                  {match.teams.home.name} vs {match.teams.away.name} -{" "}
                  {new Date(match.fixture.date).toLocaleDateString()}
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun match à venir.</p>
          )}

          <h2 className="text-xl mt-4 font-semibold">Matchs passés</h2>
          {pastMatches.length > 0 ? (
            <ul>
              {pastMatches.map((match) => (
                <li key={match.fixture.id}>
                  {match.teams.home.name} {match.goals.home} -{" "}
                  {match.goals.away} {match.teams.away.name} (
                  {new Date(match.fixture.date).toLocaleDateString()})
                </li>
              ))}
            </ul>
          ) : (
            <p>Aucun match passé.</p>
          )}
        </>
      )}
    </div>
  );
}
