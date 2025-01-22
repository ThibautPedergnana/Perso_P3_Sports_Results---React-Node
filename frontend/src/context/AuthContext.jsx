import PropTypes from "prop-types";
import { createContext, useContext, useState, useEffect } from "react";

const AuthContext = createContext(undefined);

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const authContext = useContext(AuthContext);
  if (!authContext) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return authContext;
};

export const AuthProvider = ({ children }) => {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("authToken");
    if (storedToken) {
      setToken(storedToken);
    }
  }, []);

  const saveToken = (newToken) => {
    setToken(newToken);
    localStorage.setItem("authToken", newToken);
  };

  const removeToken = () => {
    setToken(null);
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider
      value={{ token, setToken: saveToken, logout: removeToken }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Validation des props
AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthProvider;
