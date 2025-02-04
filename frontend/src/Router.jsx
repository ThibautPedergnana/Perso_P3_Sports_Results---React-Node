import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App";
import Route from "./components/Route";

import HomePage from "./pages/HomePage";
import NotFoundPage from "./pages/NotFoundPage";
import AuthPage from "./pages/AuthPage";
import FavoritesPage from "./pages/FavoritesPage";
import ProfilPage from "./pages/ProfilPage";

import FootballPage from "./pages/football/FootballPage";
import FootballLeaguesPage from "./pages/football/FootballLeaguesPage";
import FootballResultsPage from "./pages/football/FootballResultsPage";
import FootballDetailsPage from "./pages/football/FootballDetailsPage";

import BasketballPage from "./pages/BasketballPage";
import LolPage from "./pages/LolPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/register", element: <AuthPage /> },

      {
        path: "/football",
        element: <FootballPage />,
        children: [
          { index: true, element: <FootballLeaguesPage /> },
          { path: "league/:leagueId", element: <FootballResultsPage /> },
          {
            path: "/football/league/:leagueId/:matchId",
            element: <FootballDetailsPage />,
          },
        ],
      },

      { path: "/basketball", element: <BasketballPage /> },
      { path: "/lol", element: <LolPage /> },

      {
        path: "/favorites",
        element: (
          <Route isProtected>
            <FavoritesPage />
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
