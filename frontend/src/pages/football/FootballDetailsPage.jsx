import { useParams } from "react-router-dom";
import { useOutletContext } from "react-router-dom";
// import MatchCard from "../../components/MatchCard"; // Assure-toi d'importer la carte de match

export default function FootballDetailsPage() {
  const { nationalLeagues, worldLeagues, matches } = useOutletContext();
  const { leagueId, matchId } = useParams();

  if (typeof matches !== "object" || Array.isArray(matches)) {
    return (
      <div>
        Les données des matchs ne sont pas disponibles ou mal formatées.
      </div>
    );
  }

  const leagueMatches = matches[leagueId];
  if (!Array.isArray(leagueMatches)) {
    return <div>Aucun match trouvé pour cette ligue.</div>;
  }

  if (leagueMatches.length === 0) {
    return <div>Chargement des données du match...</div>;
  }

  const league = [...nationalLeagues, ...worldLeagues].find((league) => {
    return league.league.id === parseInt(leagueId);
  });

  if (!league) return <div>Ligue non trouvée</div>;

  const match = leagueMatches.find((m) => m.fixture.id === parseInt(matchId));
  if (!match) return <div>Match non trouvé</div>;

  return (
    <div className="p-4">
      <div className="relative z-10 text-center mb-4">
        <h1 className="text-3xl font-bold">{league.name}</h1>
        <img
          src={league.league.logo}
          alt={league.league.name}
          className="mx-auto my-2 w-24 h-24"
        />
        <div>
          <img
            src={league.country.flag}
            alt={league.country.name}
            className="w-8 h-8 mx-auto"
          />
          <p>{league.league.name}</p>
        </div>
      </div>

      <div className="flex justify-center gap-8 items-center">
        <div className="flex flex-col items-center">
          <img
            src={match.teams.home.logo}
            alt={match.teams.home.name}
            className="w-20 h-20"
          />
          <p>{match.teams.home.name}</p>
        </div>
        <div className="text-xl font-bold">VS</div>
        <div className="flex flex-col items-center">
          <img
            src={match.teams.away.logo}
            alt={match.teams.away.name}
            className="w-20 h-20"
          />
          <p>{match.teams.away.name}</p>
        </div>
      </div>

      <div className="text-center mt-6">
        <p>Date du match : {new Date(match.fixture.date).toLocaleString()}</p>
        <p>Stade : {match.fixture.venue.name}</p>
        <p>
          Score : {match.score.fulltime.home} - {match.score.fulltime.away}
        </p>
      </div>
    </div>
  );
}
