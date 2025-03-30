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
    <nav className="relative flex items-center justify-between bg-white dark:bg-gray-800 shadow-md p-4">
      <button
        className="text-xl font-bold text-gray-700 dark:text-white"
        onClick={() => handleNavigation("/")}
      >
        Sports-Results
      </button>

      {!isHomePage && (
        <div className="absolute left-1/2 transform -translate-x-1/2 flex space-x-6">
          <MainBtn
            labelItem="football"
            onClick={() => handleNavigation("/football")}
          />
          <MainBtn
            labelItem="basketball"
            onClick={() => handleNavigation("/basketball")}
          />
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
