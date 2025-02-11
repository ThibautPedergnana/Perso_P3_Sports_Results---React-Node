import PropTypes from "prop-types";

const MatchCardDetails = ({ match, league }) => {
  const homeGoals = match.goals.home;
  const awayGoals = match.goals.away;

  const isDraw = homeGoals === awayGoals;
  const homeWin = homeGoals > awayGoals;
  const awayWin = awayGoals > homeGoals;

  return (
    <div className="relative box-border w-full flex flex-row justify-between p-0 bg-white dark:bg-gray-800 overflow-hidden">
      <div className="relative flex-1 text-center flex flex-col justify-center text-xl font-bold overflow-hidden">
        {league && league.country && (
          <div className="absolute inset-0 z-0 opacity-30">
            {league?.country?.flag ? (
              <img
                src={league.country.flag}
                alt={`${match.teams.home.name} Flag`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-l from-gray-800/90 via-gray-800/60 to-transparent"></div>
          </div>
        )}
        <div className="relative m-6 z-10 flex flex-col items-center">
          <img
            src={match.teams.home.logo}
            alt={match.teams.home.name}
            className="w-20 h-20"
          />
          <p className="mt-2">{match.teams.home.name}</p>
          <span
            className={`text-lg font-bold ${
              isDraw
                ? "text-yellow-500"
                : homeWin
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {homeGoals}
          </span>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center px-4 bg-white dark:bg-gray-800 bg-opacity-90 backdrop-blur-md">
        <p className="text-5xl font-bold mb-5">
          {new Date(match.fixture.date).toLocaleTimeString("fr-FR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </p>
        <p className="text-lg">
          {new Date(match.fixture.date).toLocaleDateString("fr-FR", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}{" "}
        </p>

        <p className="text-lg font-semibold">
          Stade : {match.fixture.venue.name}
        </p>
      </div>

      <div className="relative flex-1 text-center flex flex-col justify-center text-xl font-bold overflow-hidden">
        {league && league.country && (
          <div className="absolute inset-0 z-0 opacity-30">
            {league?.country?.flag ? (
              <img
                src={league.country.flag}
                alt={`${match.teams.away.name} Flag`}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full bg-gray-700"></div>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-gray-800/90 via-gray-800/60 to-transparent"></div>
          </div>
        )}
        <div className="relative m-6 z-10 flex flex-col items-center">
          <img
            src={match.teams.away.logo}
            alt={match.teams.away.name}
            className="w-20 h-20"
          />
          <p className="mt-2">{match.teams.away.name}</p>
          <span
            className={`text-lg font-bold ${
              isDraw
                ? "text-yellow-500"
                : awayWin
                ? "text-green-500"
                : "text-red-500"
            }`}
          >
            {awayGoals}
          </span>
        </div>
      </div>
    </div>
  );
};

MatchCardDetails.propTypes = {
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
    fixture: PropTypes.shape({
      date: PropTypes.string.isRequired,
      venue: PropTypes.shape({
        name: PropTypes.string.isRequired,
      }).isRequired,
    }).isRequired,
  }).isRequired,
  league: PropTypes.shape({
    country: PropTypes.shape({
      flag: PropTypes.string,
    }),
  }),
};

export default MatchCardDetails;
