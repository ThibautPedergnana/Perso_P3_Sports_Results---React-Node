import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";

function App() {
  return (
    <>
      <div>
        <NavBar />
      </div>
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <Outlet />
      </div>
    </>
  );
}

export default App;
