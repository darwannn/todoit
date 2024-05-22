import { redirect } from "react-router-dom";

import { getCookie } from "./cookie";

const isLoggedIn = () => {
  const token = getCookie("token");

  if (!token) {
    return redirect("/auth/login");
  }
  return null;
};

const isLoggedOut = () => {
  const token = getCookie("token");

  if (token) {
    return redirect("/calendar");
  }
  return null;
};

export { isLoggedIn, isLoggedOut };
