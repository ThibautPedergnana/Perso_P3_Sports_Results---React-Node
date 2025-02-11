import MainBtn from "./MainBtn";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import DropdownButton from "./DropdownButton";

const Navbar = () => {
  const { token } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleNavigation = (path) => {
    navigate(path);
  };

  const isHomePage = location.pathname === "/";

  return (
    <nav className="flex items-center justify-between bg-white shadow-md p-4">
      <button
        className="text-xl font-bold text-gray-700"
        onClick={() => handleNavigation("/")}
      >
        MyApp
      </button>

      {!isHomePage && (
        <div className="flex space-x-6">
          <MainBtn onClick={() => handleNavigation("/football")}>
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
          <MainBtn onClick={() => handleNavigation("/basketball")}>
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
          <MainBtn onClick={() => handleNavigation("/lol")}>
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
      )}

      <div className="flex space-x-4">
        {token ? (
          <DropdownButton />
        ) : (
          <button
            className="flex items-center justify-center px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
            onClick={() => handleNavigation("/register")}
          >
            Login
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
