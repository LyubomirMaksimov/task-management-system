import { req, url, fetchData } from "../config/request";


const auth = {
  login: (username: string, password: string, signal: AbortSignal)  => {
    return fetchData(url.AUTH_LOGIN, {
      method: req.METHOD_POST,
      headers: {
        ...req.HEADERS,
        Authorization: `Basic ${btoa(`${username}:${password}`)}`,
      },
      signal: signal,
    });
  },
};

export default auth;
