import React, { useEffect } from "react";
import styles from "./TicketDetailsPage.module.css";
import { useTicketDetailsProps } from "../hooks/useTicketDetails";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../app/Store";
import useTicketDetails from "../hooks/useTicketDetails";
import { useParams } from "react-router-dom";
import { addNotification } from "../features/notificationSlice";
import TicketOtchet from "../components/TicketDetails/TicketOtchet";
import TicketHelpers from "../components/TicketDetails/TicketHelpers";
import TicketDetails from "../components/TicketDetails/TicketDetails";

const TicketDetailsPage: React.FC = () => {
  const user = useSelector((state: RootState) => state.user);
  const { cobjTicket } = useParams();
  const dispatch = useDispatch();

  const objRequest: useTicketDetailsProps = {
    flag: true,
    params: [user.nUser, cobjTicket as string, user.accToken],
    ticketsData: null,
    loading: true,
    error: null,
    fetchTicketDetails: () => {},
    abortFetch: () => {},
  };

  const { ticketDetailsData, error } = useTicketDetails(objRequest);

  useEffect(() => {
    if (ticketDetailsData) {
      console.log(ticketDetailsData);
    }

    if (error) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: error.message,
          type: error.name.toLowerCase(),
        })
      );
    }
  }, [error, ticketDetailsData, dispatch]);

  return (
    <div className={styles.detailsContainer}>
      <TicketDetails />
      <TicketOtchet />
      <TicketHelpers />
    </div>
  );
};

export default TicketDetailsPage;
