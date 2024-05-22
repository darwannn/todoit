import Cookie from "universal-cookie";

const cookies = new Cookie();

const setCookie = (key, value) => {
  cookies.set(key, value, { path: "/" });
};

const getCookie = (key) => {
  return cookies.get(key);
};

const removeCookie = (key) => {
  cookies.remove(key, { path: "/" });
};

export { setCookie, getCookie, removeCookie };
