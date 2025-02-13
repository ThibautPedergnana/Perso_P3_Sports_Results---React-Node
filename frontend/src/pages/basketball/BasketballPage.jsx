import { useState, useEffect } from "react";
import DateSelector from "../../components/DateSelector";
import DateCarousel from "../../components/DateCarousel";
import { startOfWeek, getMonth, getYear } from "date-fns";
import { getNBAGames } from "../../services/apiBasketballService";
import MatchCard from "../../components/MatchCard";

export default function BasketballPage() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [displayMonth, setDisplayMonth] = useState(new Date());
  const [games, setGames] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const firstDayOfWeek = startOfWeek(selectedDate, { weekStartsOn: 1 });
    setDisplayMonth(
      new Date(getYear(firstDayOfWeek), getMonth(firstDayOfWeek), 1)
    );
  }, [selectedDate]);

  const handleWeekChange = (newDate) => {
    setSelectedDate(newDate);
  };

  const fetchNBAGames = async () => {
    try {
      setLoading(true);
      setError(null);

      const fetchedGames = await getNBAGames({
        season: 2023,
        league: "standard",
      });

      console.log(fetchedGames); // Debugging

      setGames(fetchedGames);
    } catch (err) {
      setError("Erreur lors de la récupération des matchs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNBAGames();
  }, []);

  return (
    <div>
      <div className="flex w-full p-4 bg-gray-100 dark:bg-gray-900 shadow-md">
        <DateSelector
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          displayMonth={displayMonth}
        />
        <DateCarousel
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          onMonthChange={setDisplayMonth}
          onWeekChange={handleWeekChange}
        />
      </div>

      <div className="mt-4">
        {loading && <p>Chargement des matchs...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div>
            <h2>Matchs NBA</h2>
            {games.length > 0 ? (
              <ul className="space-y-4">
                {games.map((game) => {
                  if (!game.teams?.home || !game.teams?.visitors) {
                    return (
                      <p key={game.id}>
                        Informations manquantes pour ce match.
                      </p>
                    );
                  }

                  return (
                    <MatchCard
                      key={game.id}
                      match={{
                        fixture: {
                          date: game.date.start,
                        },
                        teams: {
                          home: {
                            name: game.teams.home.name,
                            logo: game.teams.home.logo,
                          },
                          away: {
                            name: game.teams.visitors.name,
                            logo: game.teams.visitors.logo,
                          },
                        },
                        goals: {
                          home: game.scores.home.points ?? 0, // Assurez-vous que le score est défini
                          away: game.scores.visitors.points ?? 0,
                        },
                      }}
                    />
                  );
                })}
              </ul>
            ) : (
              <p>Aucun match trouvé.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
