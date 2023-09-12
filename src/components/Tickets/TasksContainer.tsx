import React, { useState, useEffect } from "react";
import styles from "./TasksContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../app/Store";
import useTicket, { useTicketProps } from "../../hooks/useTicket";
import { addNotification } from "../../features/notificationSlice";
import Ticket from "./Ticket";

const TasksContainer: React.FC = () => {
  const [nfilterType] = useState<number>(99);
  const [page] = useState<number>(1);
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);

  const objRequest: useTicketProps = {
    flag: true,
    params: [user.nUser, nfilterType, page, user.accToken],
    ticketsData: null,
    loading: false,
    error: null,
    fetchAllTickets: () => {},
    abortFetch: () => {},
  };

  const { ticketsData, error } = useTicket(objRequest);

  useEffect(() => {
    if (ticketsData) {
      console.log(ticketsData);

      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: `Tickets Fetched!`,
          type: "success",
        })
      );
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
  }, [error, ticketsData, dispatch]);

  return (
    <div className={styles.taskcontainer}>
      {ticketsData !== null &&
        ticketsData.tickets.map((ticket) => {
          return <Ticket key={ticket.id} ticket={ticket} />;
        })}
    </div>
  );
};

export default TasksContainer;
