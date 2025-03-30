import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="relative w-14 h-7 flex items-center bg-gray-300 dark:bg-gray-700 rounded-full p-1 transition"
    >
      {/* Icône Lune (visible seulement en mode sombre) */}
      <span
        className={`absolute left-2 text-sm text-gray-800 dark:text-gray-200 transition-opacity ${
          isDarkMode ? "opacity-100" : "opacity-0"
        }`}
      >
        🌙
      </span>

      {/* Icône Soleil (visible seulement en mode clair) */}
      <span
        className={`absolute right-2 text-sm text-gray-800 dark:text-gray-200 transition-opacity ${
          isDarkMode ? "opacity-0" : "opacity-100"
        }`}
      >
        ☀️
      </span>

      {/* Bouton glissant */}
      <div
        className={`w-6 h-6 bg-white dark:bg-gray-900 rounded-full shadow-md transform transition ${
          isDarkMode ? "translate-x-6" : "translate-x-0"
        }`}
      />
    </button>
  );
};

export default ThemeToggle;
