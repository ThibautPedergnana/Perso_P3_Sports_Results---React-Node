import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
import MatchCardDetails from "../../components/MatchCardDetails";

export default function FootballDetailsPage() {
  const { nationalLeagues, worldLeagues, matches } = useOutletContext();
  const { leagueId, matchId } = useParams();

  // Vérifier si les matchs existent
  if (!matches || Object.keys(matches).length === 0) {
    return <div>Les données des matchs ne sont pas disponibles.</div>;
  }

  // Vérification si la ligue existe
  const league = [...nationalLeagues, ...worldLeagues].find(
    (l) => l.league.id === parseInt(leagueId)
  );

  if (!league) {
    return <div>Ligue non trouvée</div>;
  }

  // Récupérer les matchs de la ligue en cours
  const leagueMatches = matches[leagueId] || [];
  const match = leagueMatches.find((m) => m.fixture.id === parseInt(matchId));

  if (!match) {
    return <div>Match non trouvé</div>;
  }

  const homeTeamId = match.teams.home.id;
  const awayTeamId = match.teams.away.id;

  // 🔹 **Récupérer tous les matchs de toutes les ligues**
  const allMatches = Object.values(matches).flat(); // Transforme en un seul grand tableau de matchs

  // 🔹 **Filtrer les matchs entre les mêmes équipes, toutes ligues confondues**
  const previousMatches = allMatches
    .filter(
      (m) =>
        (m.teams.home.id === homeTeamId && m.teams.away.id === awayTeamId) ||
        (m.teams.home.id === awayTeamId && m.teams.away.id === homeTeamId)
    )
    .filter((m) => m.fixture.id !== match.fixture.id) // Exclure le match actuel
    .sort((a, b) => new Date(b.fixture.date) - new Date(a.fixture.date)); // Trier du plus récent au plus ancien

  return (
    <div className="p-4 w-full">
      <div className="relative z-10 text-center mb-4">
        <h1 className="text-3xl font-bold">{league.league.name}</h1>
      </div>

      <div className="flex justify-center">
        <MatchCardDetails match={match} league={league} />
      </div>

      {/* 🔹 **Afficher les rencontres précédentes toutes ligues confondues** */}
      <div className="mt-8">
        <h2 className="text-xl font-bold">Rencontres précédentes</h2>
        <div className="mt-4 space-y-4">
          {previousMatches.map((prevMatch) => {
            // Trouver la ligue du match précédent
            const prevLeague = [...nationalLeagues, ...worldLeagues].find(
              (l) => l.league.id === prevMatch.league.id
            );

            return (
              <div key={prevMatch.fixture.id}>
                <p className="text-sm text-gray-500">
                  {prevLeague
                    ? `Compétition : ${prevLeague.league.name}`
                    : "Ligue inconnue"}
                </p>
                <MatchCardDetails match={prevMatch} league={prevLeague} />
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
