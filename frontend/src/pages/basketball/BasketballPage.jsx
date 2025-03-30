import { useState, useEffect } from "react";
import DateSelector from "../../components/DateSelector";
import DateCarousel from "../../components/DateCarousel";
import { startOfWeek, getMonth, getYear, format } from "date-fns";
import { getNBAGames } from "../../services/apiBasketballService";
import MatchCard from "../../components/MatchCard";
import axios from "axios";

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

  const fetchNBAGames = async (signal) => {
    try {
      setLoading(true);
      setError(null);

      const fetchedGames = await getNBAGames(
        {
          season: 2023,
          league: "standard",
        },
        signal
      );

      const sortedGames = fetchedGames.sort(
        (a, b) => new Date(b.date.start) - new Date(a.date.start)
      );

      setGames(sortedGames);
    } catch (err) {
      if (axios.isCancel(err)) {
        console.log("Request canceled:", err.message);
      } else {
        setError(err);
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    fetchNBAGames(signal);

    return () => controller.abort();
  }, []);

  const filteredGames = games.filter((game) => {
    const gameDate = format(new Date(game.date.start), "yyyy-MM-dd");
    const selectedDateFormatted = format(selectedDate, "yyyy-MM-dd");
    return gameDate === selectedDateFormatted;
  });

  return (
    <div>
      <div className="flex w-full p-4 bg-gray-100 dark:bg-gray-800 shadow-xl dark:shadow-xl dark:shadow-gray-900 rounded-lg">
        <DateSelector
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          displayMonth={displayMonth}
        />
        <DateCarousel
          selectedDate={selectedDate}
          onChange={setSelectedDate}
          onMonthChange={setDisplayMonth}
          onWeekChange={setSelectedDate}
        />
      </div>

      <div className="mt-4">
        {loading && <p>Loading games...</p>}
        {error && <p>{error}</p>}
        {!loading && !error && (
          <div>
            <h2 className="mb-3">
              NBA Games on {format(selectedDate, "dd MMMM yyyy")}
            </h2>
            {filteredGames.length > 0 ? (
              <ul className="space-y-4">
                {filteredGames.map((game) => (
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
                        home: game.scores.home.points ?? 0,
                        away: game.scores.visitors.points ?? 0,
                      },
                    }}
                  />
                ))}
              </ul>
            ) : (
              <p>No games found for this date.</p>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
