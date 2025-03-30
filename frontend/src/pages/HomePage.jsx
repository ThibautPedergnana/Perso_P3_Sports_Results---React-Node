import { useNavigate } from "react-router-dom";
import HomeCard from "../components/HomeCard";
function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center flex-grow">
      <h1 className="text-3xl font-bold">Bienvenue sur Sports-Results</h1>

      <div className="flex space-x-6 mt-6">
        <HomeCard labelItem="football" onClick={() => navigate("/football")} />
        <HomeCard
          labelItem="basketball"
          onClick={() => navigate("/basketball")}
        />
      </div>
    </div>
  );
}

export default HomePage;
