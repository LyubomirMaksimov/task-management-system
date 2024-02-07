export const req = {
  API_URL: `${import.meta.env.VITE_SERVER_URL}`,
  METHOD_GET: "GET",
  METHOD_POST: "POST",
  METHOD_PUT: "PUT",
  METHOD_DELETE: "DELETE",
  MODE: "cors",
  CREDENTIALS_INCLUDE: "include",
  HEADERS: {
    "Content-Type": "application/json",
  },
};

export const url = {
  AUTH_LOGIN: `${req.API_URL}/account/login`,
  TICKET_GETTICKETS: `${req.API_URL}/returnTickets`,
  TICKET_DETAILS: `${req.API_URL}/ticket/getData`,
  TICKET_CHANGETICKETSTAUTS: `${req.API_URL}/ticket/changeStatus`,
  TICKET_CHANGEHELPERTICKETSTAUTS: `${req.API_URL}/ticket/changeHelperStatus`,
  TICKET_POSTOTCHET: `${req.API_URL}/ticket/postOtchet`,
};

export const fetchData = (url: string, options = {}) => {
  return fetch(url, options).then((resp) => {
    if (!resp.ok) {
      return resp.text().then((text) => {
        throw new Error(text);
      });
    }

    if (resp.status !== 200) {
      return resp.json().then((text) => {
        throw new Error(`Error: ${text.error}`);
      });
    }

    return resp.json();
  });
};
