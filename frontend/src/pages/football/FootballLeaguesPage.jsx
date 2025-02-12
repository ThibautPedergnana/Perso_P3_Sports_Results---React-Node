import { Link, useOutletContext } from "react-router-dom";

export default function FootballLeaguesPage() {
  const { nationalLeagues, worldLeagues } = useOutletContext();

  return (
    <div className="flex justify-center p-4">
      <div className="w-full max-w-6xl flex">
        <div className="flex-1 flex flex-wrap justify-center gap-4">
          <h2 className="w-full text-center mb-4 text-xl font-semibold">
            Ligues Nationales
          </h2>
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
              <div className="text-sm font-medium">{league.league.name}</div>
            </Link>
          ))}
        </div>

        <div className="border-l-2 border-gray-300 mx-8" />

        <div className="flex-1 flex flex-wrap justify-center gap-4">
          <h2 className="w-full text-center mb-4 text-xl font-semibold">
            Ligues Européennes
          </h2>
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
              <div className="text-sm font-medium">{league.league.name}</div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
