import { req, url, fetchData } from "../../../config/request";

const ticket = {
  getAllTickets: (
    nUser: number,
    nFilterType: number,
    nPage: number,
    userAccToken: string,
    signal: AbortSignal
  ) => {
    return fetchData(url.TICKET_GETTICKETS, {
      method: req.METHOD_POST,
      headers: {
        ...req.HEADERS,
        Authorization: `Bearer ${userAccToken}`,
      },
      body: JSON.stringify({
        nUser,
        nFilterType,
        nPage,
      }),
      signal: signal,
    });
  },
  getTicketDetails: (
    nUser: number,
    nTicketUser: number,
    cobjTicket: number,
    userAccToken: string,
    signal: AbortSignal
  ) => {
    return fetchData(url.TICKET_DETAILS, {
      method: req.METHOD_POST,
      headers: {
        ...req.HEADERS,
        Authorization: `Bearer ${userAccToken}`,
      },
      body: JSON.stringify({
        nUser,
        nTicketUser,
        cobjTicket,
      }),
      signal: signal,
    });
  },

  postChangeTicketStatus: (
    nUser: number,
    nUserTicket: number,
    nNewStatus: number,
    userAccToken: string,
    signal: AbortSignal
  ) => {
    return fetchData(url.TICKET_CHANGETICKETSTAUTS, {
      method: req.METHOD_POST,
      headers: {
        ...req.HEADERS,
        Authorization: `Bearer ${userAccToken}`,
      },
      body: JSON.stringify({
        nUser,
        nUserTicket,
        nNewStatus,
      }),
      signal: signal,
    });
  },

  postChangeHelperTicketStatus: (
    nUser: number,
    nUserTicket: number,
    nHelperNewStatus: number,
    nHelperRow: number,
    userAccToken: string,
    signal: AbortSignal
  ) => {
    return fetchData(url.TICKET_CHANGEHELPERTICKETSTAUTS, {
      method: req.METHOD_POST,
      headers: {
        ...req.HEADERS,
        Authorization: `Bearer ${userAccToken}`,
      },
      body: JSON.stringify({
        nUser,
        nUserTicket,
        nHelperNewStatus,
        nHelperRow,
      }),
      signal: signal,
    });
  },

  postOtchet: (
    nUser: number,
    cobjTicket: number,
    otchetText: string,
    otchetTime: number,
    otchetCharacter: number,
    userAccToken: string,
    signal: AbortSignal
  ) => {
    return fetchData(url.TICKET_POSTOTCHET, {
      method: req.METHOD_POST,
      headers: {
        ...req.HEADERS,
        Authorization: `Bearer ${userAccToken}`,
      },
      body: JSON.stringify({
        nUser,
        cobjTicket,
        otchetText,
        otchetTime,
        otchetCharacter,
      }),
      signal: signal,
    });
  },
};

export default ticket;
