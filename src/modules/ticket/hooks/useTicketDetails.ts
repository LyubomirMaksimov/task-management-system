import { useState, useEffect, useRef } from "react";
import { ticketFullInfo } from "../types/ticket.js";
import ticket from "../services/ticketService.js";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/features/userSlice.js";

export interface useTicketDetailsProps {
  flag: boolean;
  params: (number | string)[];
  ticketsData: ticketFullInfo | null;
  loading: boolean;
  error: Error | null;
  fetchTicketDetails: () => void;
  abortFetch: () => void;
}

const useTicketDetails = ({ flag, params }: useTicketDetailsProps) => {
  const [ticketDetailsData, setTicketDetailsData] =
    useState<ticketFullInfo | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  const abortControllerRef = useRef<AbortController | null>(null);

  const abortFetch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      setError(new Error("Request aborted"));
      setTicketDetailsData(null);
    }
  };

  const fetchTicketDetails = async () => {
    setLoading(true);
    setError(null);
    setTicketDetailsData(null);

    abortControllerRef.current = new AbortController();

    const timeoutId = setTimeout(() => {
      abortFetch();
    }, 60000);

    await ticket
      .getTicketDetails(
        Number(params[0]),
        Number(params[1]),
        Number(params[2]),
        String(params[3]),
        abortControllerRef.current.signal
      )
      .then((jsonData) => {
        clearTimeout(timeoutId);

        const { ticket } = { ...jsonData };

        if (ticket) {
          setTicketDetailsData(ticket);
        } else {
          throw new Error("Invalid response data");
        }

        setLoading(false);
      })
      .catch((error: Error) => {
        clearTimeout(timeoutId);

        if (
          error.message ===
          `"{"error":"Неуспешна Аутентикация на потребителя!"}"`
        ) {
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
      fetchTicketDetails();
    }

    return () => {
      abortFetch();
    };
  }, []);

  return { ticketDetailsData, loading, error, fetchTicketDetails, abortFetch };
};

export default useTicketDetails;
