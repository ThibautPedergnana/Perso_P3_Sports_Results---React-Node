import { useTheme } from "../context/ThemeContext";

const ThemeToggle = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-md bg-gray-200 dark:bg-gray-800 dark:text-white"
    >
      {isDarkMode ? "Light Mode" : "Dark Mode"}
    </button>
  );
};

export default ThemeToggle;
