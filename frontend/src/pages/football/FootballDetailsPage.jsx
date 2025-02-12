import { useParams, Link } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import MatchCardDetails from "../../components/MatchCardDetails";
import MatchCard from "../../components/MatchCard";

export default function FootballDetailsPage() {
  const { nationalLeagues, worldLeagues, matches } = useOutletContext();
  const { leagueId, matchId } = useParams();

  if (!matches || Object.keys(matches).length === 0) {
    return <div>Les données des matchs ne sont pas disponibles.</div>;
  }

  const league = [...nationalLeagues, ...worldLeagues].find(
    (l) => l.league.id === parseInt(leagueId)
  );

  if (!league) {
    return <div>Ligue non trouvée</div>;
  }

  const leagueMatches = matches[leagueId] || [];
  const match = leagueMatches.find((m) => m.fixture.id === parseInt(matchId));

  if (!match) {
    return <div>Match non trouvé</div>;
  }

  const homeTeamId = match.teams.home.id;
  const awayTeamId = match.teams.away.id;

  const allMatches = Object.values(matches).flat();

  const teamMatches = allMatches.filter(
    (m) =>
      (m.teams.home.id === homeTeamId && m.teams.away.id === awayTeamId) ||
      (m.teams.home.id === awayTeamId && m.teams.away.id === homeTeamId)
  );

  const previousMatches = teamMatches
    .filter((m) => new Date(m.fixture.date) < new Date(match.fixture.date))
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date));

  const nextMatches = teamMatches
    .filter((m) => new Date(m.fixture.date) > new Date(match.fixture.date))
    .sort((a, b) => new Date(a.fixture.date) - new Date(b.fixture.date));

  return (
    <div className="p-4 w-full">
      <div className="relative z-10 text-center mb-4">
        <h1 className="text-3xl font-bold">{league.league.name}</h1>
      </div>

      <div className="flex justify-center">
        <MatchCardDetails match={match} league={league} />
      </div>

      <div className="mt-8">
        <h2 className="text-xl font-bold text-center mb-4">
          Autres rencontres
        </h2>

        <div className="flex justify-between">
          {/* Colonne des matchs précédents */}
          <div className="flex flex-col gap-2 w-1/2 pr-4">
            <h3 className="text-lg font-bold mb-2 text-center">
              Rencontres précédentes
            </h3>
            {previousMatches.length > 0 ? (
              previousMatches.map((prevMatch) => {
                const prevLeague = [...nationalLeagues, ...worldLeagues].find(
                  (l) => l.league.id === prevMatch.league.id
                );
                return (
                  <div key={prevMatch.fixture.id}>
                    <p className="text-sm text-gray-500 text-center">
                      {prevLeague ? prevLeague.league.name : "Ligue inconnue"}
                    </p>
                    <Link
                      to={`/football/league/${prevMatch.league.id}/${prevMatch.fixture.id}`}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <MatchCard match={prevMatch} />
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                Aucune rencontre précédente.
              </p>
            )}
          </div>

          {/* Séparateur vertical */}
          <div className="w-px bg-gray-300"></div>

          {/* Colonne des matchs suivants */}
          <div className="flex flex-col gap-2 w-1/2 pl-4">
            <h3 className="text-lg font-bold mb-2 text-center">
              Rencontres suivantes
            </h3>
            {nextMatches.length > 0 ? (
              nextMatches.map((nextMatch) => {
                const nextLeague = [...nationalLeagues, ...worldLeagues].find(
                  (l) => l.league.id === nextMatch.league.id
                );
                return (
                  <div key={nextMatch.fixture.id}>
                    <p className="text-sm text-gray-500 text-center">
                      {nextLeague ? nextLeague.league.name : "Ligue inconnue"}
                    </p>
                    <Link
                      to={`/football/league/${nextMatch.league.id}/${nextMatch.fixture.id}`}
                      className="block hover:opacity-80 transition-opacity"
                    >
                      <MatchCard match={nextMatch} />
                    </Link>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-500 text-center">
                Aucune rencontre suivante.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
