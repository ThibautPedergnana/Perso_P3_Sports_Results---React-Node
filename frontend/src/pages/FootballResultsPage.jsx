import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchesByLeague } from "../services/apiService";
import MatchCard from "../components/MatchCard";

export default function FootballResultsPage() {
  const { leagueId } = useParams();
  const [matches, setMatches] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [visiblePast, setVisiblePast] = useState(12);
  const [visibleUpcoming, setVisibleUpcoming] = useState(12);

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

  const now = new Date();
  const pastMatches = matches.filter(
    (match) => new Date(match.fixture.date) < now
  );
  const upcomingMatches = matches.filter(
    (match) => new Date(match.fixture.date) >= now
  );

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-4">
          Matchs de la Ligue
        </h1>

        {loading && <p className="text-center">Chargement...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div className="flex gap-8">
            {/* Matchs passés */}
            <div className="w-1/2 flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Matchs passés
              </h2>
              {pastMatches.slice(0, visiblePast).map((match) => (
                <MatchCard key={match.fixture.id} match={match} />
              ))}
              {visiblePast < pastMatches.length && (
                <button
                  onClick={() => setVisiblePast((prev) => prev + 12)}
                  className="block w-full text-center mt-2 text-blue-500 hover:underline"
                >
                  Afficher plus...
                </button>
              )}
            </div>

            {/* Séparateur */}
            <div className="w-[2px] bg-gray-300"></div>

            {/* Matchs à venir */}
            <div className="w-1/2 flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Matchs à venir
              </h2>
              {upcomingMatches.slice(0, visibleUpcoming).map((match) => (
                <MatchCard key={match.fixture.id} match={match} />
              ))}
              {visibleUpcoming < upcomingMatches.length && (
                <button
                  onClick={() => setVisibleUpcoming((prev) => prev + 12)}
                  className="block w-full text-center mt-2 text-blue-500 hover:underline"
                >
                  Afficher plus...
                </button>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
