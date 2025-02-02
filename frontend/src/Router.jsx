import { createBrowserRouter, RouterProvider } from "react-router-dom";

import App from "./App";
import Route from "./components/Route";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilPage from "./pages/ProfilPage";

import FootballPage from "./pages/FootballPage";
import FootballResultsPage from "./pages/FootballResultsPage";
import BasketballPage from "./pages/BasketballPage";
import LolPage from "./pages/LolPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      {
        path: "/register",
        element: <AuthPage />,
      },
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/football",
        element: <FootballPage />,
      },
      {
        path: "/football/league/:leagueId",
        element: <FootballResultsPage />,
      },
      {
        path: "/basketball",
        element: <BasketballPage />,
      },
      {
        path: "/lol",
        element: <LolPage />,
      },
      {
        path: "/favorites",
        element: (
          <Route isProtected>
            <FavoritesPage />/
          </Route>
        ),
      },
      {
        path: "/profil",
        element: (
          <Route isProtected>
            <ProfilPage />
          </Route>
        ),
      },
    ],
  },
]);

const Router = () => <RouterProvider router={router} />;

export default Router;
