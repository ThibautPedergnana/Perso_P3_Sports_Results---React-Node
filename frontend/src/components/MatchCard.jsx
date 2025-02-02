import PropTypes from "prop-types";

const MatchCard = ({ match }) => {
  // Récupérer les scores
  const homeGoals = match.goals.home;
  const awayGoals = match.goals.away;

  // Déterminer le statut de chaque équipe
  const isDraw = homeGoals === awayGoals;
  const homeWin = homeGoals > awayGoals;
  const awayWin = awayGoals > homeGoals;

  return (
    <div className="flex items-center bg-white dark:bg-gray-800 shadow-md p-4 rounded-lg w-full max-w-lg mx-auto">
      {/* Équipe à domicile */}
      <div className="flex items-center space-x-2 w-1/3 justify-start">
        <img
          src={match.teams.home.logo}
          alt={match.teams.home.name}
          className="w-10 h-10"
        />
        <span className="font-bold truncate">{match.teams.home.name}</span>
      </div>

      {/* Score et statut - Bien aligné sans wrap */}
      <div className="flex items-center justify-center w-1/3 min-w-[100px] space-x-4">
        <span
          className={`text-lg font-bold ${
            isDraw
              ? "text-yellow-500"
              : homeWin
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {isDraw ? "N" : homeWin ? "W" : "L"}
        </span>
        <span className="text-lg font-semibold">
          {homeGoals} - {awayGoals}
        </span>
        <span
          className={`text-lg font-bold ${
            isDraw
              ? "text-yellow-500"
              : awayWin
              ? "text-green-500"
              : "text-red-500"
          }`}
        >
          {isDraw ? "N" : awayWin ? "W" : "L"}
        </span>
      </div>

      {/* Équipe à l'extérieur */}
      <div className="flex items-center space-x-2 w-1/3 justify-end">
        <span className="font-bold truncate">{match.teams.away.name}</span>
        <img
          src={match.teams.away.logo}
          alt={match.teams.away.name}
          className="w-10 h-10"
        />
      </div>
    </div>
  );
};

// ✅ PropTypes pour éviter les erreurs ESLint
MatchCard.propTypes = {
  match: PropTypes.shape({
    teams: PropTypes.shape({
      home: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
      }).isRequired,
      away: PropTypes.shape({
        name: PropTypes.string.isRequired,
        logo: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
    goals: PropTypes.shape({
      home: PropTypes.number.isRequired,
      away: PropTypes.number.isRequired,
    }).isRequired,
  }).isRequired,
};

export default MatchCard;
