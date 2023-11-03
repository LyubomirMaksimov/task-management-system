import { useState, useEffect, useRef } from "react";
import user from "../services/authService.js";
import { UserType } from "../types/user.js";

export interface FetchProps {
  stringService: string;
  flag: boolean;
  params: (number | string)[];
  data: UserType | null;
  loading: boolean;
  error: Error | null;
  fetchData: () => void;
  abortFetch: () => void;
}

const useAuth = ({ stringService, flag, params }: FetchProps) => {
  const [data, setData] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null>(null);

  const abortControllerRef = useRef<AbortController | null>(null);

  const abortFetch = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
      setLoading(false);
      setError(new Error("Request aborted"));
      setData(null);
    }
  };

  const fetchData = async () => {
    setLoading(true);
    setError(null);
    setData(null);

    abortControllerRef.current = new AbortController();

    const timeoutId = setTimeout(() => {
      abortFetch();
    }, 60000);

    switch (stringService) {
      case "LOGIN":
        await user
          .login(
            String(params[0]),
            String(params[1]),
            abortControllerRef.current.signal
          )
          .then((jsonData: UserType) => {
            clearTimeout(timeoutId);

            if (jsonData) {
              setData(jsonData as UserRequestData);
            } else {
              throw new Error("Invalid response data");
            }

            setLoading(false);
          })
          .catch((error: Error) => {
            clearTimeout(timeoutId);

            if (error.name === "AbortError") {
              console.log("Fetch aborted");
            } else {
              console.error("Error fetching data:", error);
              setLoading(false);
              setError(error);
            }
          });
        break;

      default:
        if (abortControllerRef.current) {
          abortControllerRef.current.abort();
          setLoading(false);
          setError(new Error("Invalid Request"));
          setData(null);
        }

        break;
    }
  };

  useEffect(() => {
    if (flag) {
      fetchData();
    }

    return () => {
      abortFetch();
    };
  }, []);

  return { data, loading, error, fetchData, abortFetch };
};

export default useAuth;
