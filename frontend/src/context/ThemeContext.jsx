import { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";

const ThemeContext = createContext(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Charger l'état du thème depuis localStorage ou utiliser le thème par défaut
    const savedTheme = localStorage.getItem("theme");
    return savedTheme ? savedTheme === "dark" : false;
  });

  useEffect(() => {
    // Appliquer la classe CSS correspondante au body
    document.body.classList.toggle("dark", isDarkMode);
    localStorage.setItem("theme", isDarkMode ? "dark" : "light");
  }, [isDarkMode]);

  // Basculer entre les thèmes
  const toggleTheme = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

// Validation des props
ThemeProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
