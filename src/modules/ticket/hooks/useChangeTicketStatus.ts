import { useState, useEffect, useRef } from "react";
import ticket from "../services/ticketService.js";
import { useDispatch } from "react-redux";
import { logout } from "../../../app/features/userSlice.js";

export interface useChangeTicketStatusProps {
  params: (number | string)[];
}

export interface postOtchetResponse {
  message: string;
}

const useChangeTicketStatus = ({ params }: useChangeTicketStatusProps) => {
  const [responseMessage, setResponseMessage] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);
  const dispatch = useDispatch();

  const abortControllerRef = useRef<AbortController | null>(null);

  const abortFetch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      setError(new Error("Request aborted"));
      setResponseMessage("");
    }
  };

  const fetchChangeTicketStatus = async () => {
    setLoading(true);
    setError(null);
    setResponseMessage("");

    abortControllerRef.current = new AbortController();

    const timeoutId = setTimeout(() => {
      abortFetch();
    }, 60000);

    await ticket
      .postChangeTicketStatus(
        Number(params[0]), // nUser
        Number(params[1]), // nUserTicket
        Number(params[2]), // nNewStatus
        String(params[3]), // userAccToken
        abortControllerRef.current.signal
      )
      .then((jsonData: postOtchetResponse) => {
        clearTimeout(timeoutId);

        const { message } = { ...jsonData };

        if (message) {
          setResponseMessage(message);
        } else {
          throw new Error("Invalid response data");
        }

        setLoading(false);
      })
      .catch((error: Error) => {
        clearTimeout(timeoutId);

        if (
          error.message === '{"error":"Неуспешна Аутентикация на потребителя!"}'
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
    return () => {
      abortFetch();
    };
  }, []);

  return {
    responseMessage,
    loading,
    error,
    fetchChangeTicketStatus,
    abortFetch,
  };
};

export default useChangeTicketStatus;
