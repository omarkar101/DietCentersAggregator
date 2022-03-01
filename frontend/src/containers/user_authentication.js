import { createContainer } from "unstated-next";

const KEY = "token";

const useToken = () => {
  const setToken = (token) => {
    localStorage.setItem(KEY, JSON.stringify({ 'token': token }));
  };

  const attachToken = (request) => {
    const token = JSON.parse(localStorage.getItem(KEY));
    request.setRequestHeader('x-access-token', token);
  };
  return { setToken, attachToken };
};

const Authentication = createContainer(useToken);

export default Authentication;
