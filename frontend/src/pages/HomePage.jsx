import { useNavigate } from "react-router-dom";
import MainBtn from "../components/MainBtn";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen space-y-6">
      <h1 className="text-3xl font-bold">Bienvenue sur MyApp</h1>
      <p className="text-gray-600">Sélectionnez un sport pour commencer</p>

      {/* Boutons des sports affichés uniquement sur la homepage */}
      <div className="flex space-x-6">
        {/* Football */}
        <MainBtn onClick={() => navigate("/football")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"
            />
          </svg>
        </MainBtn>

        {/* Basketball */}
        <MainBtn onClick={() => navigate("/basketball")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zM12 2v20M2 12h20"
            />
          </svg>
        </MainBtn>

        {/* League of Legends */}
        <MainBtn onClick={() => navigate("/lol")}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="2"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3 3h18v18H3zM6 6h12v12H6z"
            />
          </svg>
        </MainBtn>
      </div>
    </div>
  );
}

export default HomePage;
