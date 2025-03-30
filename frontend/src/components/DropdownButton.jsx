import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import ThemeToggle from "./ThemeToggle";

const DropdownButton = () => {
  const { logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 dark:bg-gray-700 hover:bg-gray-300 dark:hover:bg-gray-600 transition"
      >
        <svg
          className="h-5 w-5 text-gray-700 dark:text-gray-300 transition"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M10 4a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 11a1.5 1.5 0 110-3 1.5 1.5 0 010 3zM10 18a1.5 1.5 0 110-3 1.5 1.5 0 010 3z"
            clipRule="evenodd"
          />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-lg bg-white dark:bg-gray-800 shadow-lg ring-1 ring-black ring-opacity-5 transition-opacity">
          <div className="py-2 flex flex-col">
            <button
              onClick={() => navigate("/profil")}
              className="px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-md transition"
            >
              Profile
            </button>
            <div className="flex justify-center py-2">
              <ThemeToggle />
            </div>

            <button
              onClick={logout}
              className="px-4 py-2 text-sm text-white bg-red-500 hover:bg-red-600 rounded-md w-24 mx-auto transition"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DropdownButton;
