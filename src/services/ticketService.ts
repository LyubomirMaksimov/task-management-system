import { req, url, fetchData } from "../config/request";

const ticket = {
  getAllTickets: (
    nUser: number,
    nFilterType: number,
    nPage: number,
    accToken: string,
    signal: AbortSignal
  ) => {
    return fetchData(url.TICKET_GETTICKETS, {
      method: req.METHOD_POST,
      headers: {
        ...req.HEADERS,
        Authorization: `Bearer ${accToken}`,
      },
      body: JSON.stringify({
        nUser,
        nFilterType,
        nPage,
      }),
      signal: signal,
    });
  },
};

export default ticket;
