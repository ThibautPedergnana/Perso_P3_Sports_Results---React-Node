import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getMatchesByLeague } from "../../services/apiService";
import { Link, useOutletContext } from "react-router-dom";
import MatchCard from "../../components/MatchCard";
import { Outlet } from "react-router-dom";

export default function FootballResultsPage() {
  const { leagueId } = useParams();
  const { nationalLeagues, worldLeagues } = useOutletContext();

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

  // Tri des matchs passés du plus récent au plus ancien
  const pastMatches = matches
    .filter((match) => new Date(match.fixture.date) < now)
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  // Tri des matchs à venir du plus ancien au plus récent
  const upcomingMatches = matches
    .filter((match) => new Date(match.fixture.date) >= now)
    .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));

  const league = [...nationalLeagues, ...worldLeagues].find(
    (l) => l.league.id.toString() === leagueId
  );
  const leagueName = league ? league.league.name : "Ligue inconnue";

  return (
    <div className="w-full max-w-6xl mx-auto p-4">
      <div className="p-4">
        <h1 className="text-2xl font-bold text-center mb-4">{leagueName}</h1>

        {loading && <p className="text-center">Chargement...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}

        {!loading && !error && (
          <div className="flex gap-8">
            <div className="w-1/2 flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Matchs passés
              </h2>
              {pastMatches.slice(0, visiblePast).map((match) => (
                <Link
                  to={`/football/league/${leagueId}/${match.fixture.id}`}
                  key={match.fixture.id}
                >
                  <MatchCard match={match} />
                </Link>
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

            <div className="w-[2px] bg-gray-300"></div>

            <div className="w-1/2 flex flex-col gap-4">
              <h2 className="text-xl font-semibold mb-2 text-center">
                Matchs à venir
              </h2>
              {upcomingMatches.slice(0, visibleUpcoming).map((match) => (
                <Link
                  to={`/football/league/${leagueId}/${match.fixture.id}`}
                  key={match.fixture.id}
                >
                  <MatchCard match={match} />
                </Link>
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

      <Outlet context={{ matches }} />
    </div>
  );
}
