import ReactDOM from "react-dom/client";
import AuthProvider from "./context/AuthContext";
import { ThemeProvider } from "./context/ThemeContext";
import Router from "./Router";
import "./index.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <ThemeProvider>
      <Router />
    </ThemeProvider>
  </AuthProvider>
);
