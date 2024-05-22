import { createBrowserRouter } from "react-router-dom";

import { isLoggedIn, isLoggedOut } from "../helpers/auth";

import Login from "../pages/auth/Login";
import Register from "../pages/auth/Register";
import ForgotPassword from "../pages/auth/ForgotPassword";
import NewPassword from "../pages/auth/NewPassword";
import Calendar from "../pages/Calendar";
import LandingPage from "../pages/LandingPage";
import ErrorPage from "../pages/ErrorPage";
import App from "../App";
import Today from "../pages/Today";
import Upcoming from "../pages/Upcoming";
import Category from "../pages/Category";
import Settings from "../pages/Settings/Settings";
import Verification from "../pages/auth/Verification";

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    loader: isLoggedOut,
    element: <LandingPage />,
  },
  {
    path: "/",
    element: <App />,
    loader: isLoggedIn,
    children: [
      {
        path: "calendar",
        element: <Calendar />,
      },
      {
        path: "today",
        children: [
          {
            index: true,
            element: <Today />,
          },
          {
            path: ":taskId",
            element: <Today />,
          },
        ],
      },
      {
        path: "upcoming",
        children: [
          {
            index: true,
            element: <Upcoming />,
          },
          {
            path: ":taskId",
            element: <Upcoming />,
          },
        ],
      },
      {
        path: "/list/",
        children: [
          {
            path: ":categoryId",
            element: <Category />,
            children: [
              {
                path: ":taskId",
                element: <Category />,
              },
            ],
          },
        ],
      },

      {
        path: "/settings",
        element: <Settings />,
      },
    ],
  },

  {
    path: "auth",
    loader: isLoggedOut,
    children: [
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgot-password",
        element: <ForgotPassword />,
      },
      {
        path: "new-password/:token/:id",
        element: <NewPassword />,
      },
    ],
  },
  {
    path: ":action/:token/:email/:id",
    element: <Verification />,
  },
  {
    path: ":action/:token/:id",
    element: <Verification />,
  },
]);

export { router };
