import { createContainer } from "unstated-next";

const KEY = "token";

const useToken = () => {
  const setToken = (token) => {
    localStorage.setItem(KEY, JSON.stringify(token));
  };

  const getToken = () => {
    return JSON.parse(localStorage.getItem(KEY));
  };
  return { setToken, getToken };
};

const Authentication = createContainer(useToken);

export default Authentication;
