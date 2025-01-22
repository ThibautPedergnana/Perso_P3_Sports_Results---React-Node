import { useEffect, useState } from "react";
import { getFootballLeagues } from "../services/apiService";

function FootballPage() {
  const [leagues, setLeagues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchLeagues = async () => {
      try {
        const data = await getFootballLeagues();
        if (data && data.response) {
          setLeagues(data.response);
        } else {
          setError(new Error("Données de ligues invalides reçues de l'API."));
          console.error("Données reçues :", data);
        }
      } catch (err) {
        setError(err);
        console.error("Erreur lors de la récupération des ligues :", err);
      } finally {
        setLoading(false);
      }
    };
    fetchLeagues();
  }, []);

  if (loading) {
    return <div>Chargement des ligues...</div>;
  }

  if (error) {
    return <div>Erreur : {error.message}</div>;
  }

  if (!leagues || leagues.length === 0) {
    return <div>Aucune ligue trouvée.</div>;
  }
  return (
    <div>
      <h1>Liste des Ligues</h1>
      <ul>
        {leagues.map((league) => (
          <li key={league.league.id}>
            {league.league.name} ({league.country.name}) -{" "}
            {league.seasons[0]?.year || "Année non disponible"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default FootballPage;
