import { useState, useEffect, useRef } from "react";
import { RequestTicketsData } from "../types/ticket.js";
import ticket from "../services/ticketService.js";
import { useDispatch } from "react-redux";
import { logout } from "../features/userSlice.js";

export interface useTicketProps {
  flag: boolean;
  params: (number | string)[];
  ticketsData: RequestTicketsData | null;
  loading: boolean;
  error: Error | null;
  fetchAllTickets: () => void;
  abortFetch: () => void;
}

const useTicket = ({ flag, params }: useTicketProps) => {
  const [ticketsData, setTicketsData] = useState<RequestTicketsData | null>(
    null
  );
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  const abortControllerRef = useRef<AbortController | null>(null);

  const abortFetch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      setError(new Error("Request aborted"));
      setTicketsData(null);
    }
  };

  const fetchAllTickets = async () => {
    setLoading(true);
    setError(null);
    setTicketsData(null);

    abortControllerRef.current = new AbortController();

    const timeoutId = setTimeout(() => {
      abortFetch();
    }, 60000);

    await ticket
      .getAllTickets(
        Number(params[0]),
        Number(params[1]),
        Number(params[2]),
        String(params[3]),
        abortControllerRef.current.signal
      )
      .then((jsonData: RequestTicketsData) => {
        clearTimeout(timeoutId);

        if (jsonData) {
          setTicketsData(jsonData as RequestTicketsData);
        } else {
          throw new Error("Invalid response data");
        }

        setLoading(false);
      })
      .catch((error: Error) => {
        clearTimeout(timeoutId);

        if (error.message === "Error: Неуспешна Аутентикация на потребителя!") {
          return dispatch(logout());
        }

        if (error.name === "AbortError") {
          console.log("Fetch aborted");
        } else {
          console.error("Error fetching data:", error);
          setLoading(false);
          setError(error);
        }
      });
  };

  useEffect(() => {
    if (flag) {
      fetchAllTickets();
    }

    return () => {
      abortFetch();
    };
  }, []);

  return { ticketsData, loading, error, fetchAllTickets, abortFetch };
};

export default useTicket;
