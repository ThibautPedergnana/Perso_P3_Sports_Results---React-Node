import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100 dark:bg-gray-900">
      <NavBar />
      {/* Conteneur principal élargi */}
      <main className="flex flex-col items-center w-full max-w-6xl mx-auto p-4 flex-grow">
        <Outlet />
      </main>
    </div>
  );
}

export default App;
