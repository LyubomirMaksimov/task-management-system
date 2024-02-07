import { req, url, fetchData } from "../../../config/request";
import { UserRequestData } from "../types/user";

const auth = {
  login: (
    username: string,
    password: string,
    signal: AbortSignal
  ): Promise<UserRequestData> => {
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
