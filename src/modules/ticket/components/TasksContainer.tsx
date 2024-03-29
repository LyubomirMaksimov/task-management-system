import React, { useState, useEffect } from "react";
import styles from "./TasksContainer.module.css";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../../app/Store";
import useTicket, { useTicketProps } from "../hooks/useTicket";
import { addNotification } from "../../../app/features/notificationSlice";
import { update } from "../../../app/features/ticketSlice";
import Ticket from "./Ticket";
import { useLocation } from "react-router-dom";
import PageNavigation from "../../../components/Navigation/PageNavigation";

const TasksContainer: React.FC = () => {
  const dispatch = useDispatch();
  const user = useSelector((state: RootState) => state.user);
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const filterValue = Number(queryParams.get("filter"));
  const [page, setPage] = useState(1);

  const changePageHandler = (newPage: number) => {
    setPage(newPage);
  };

  const objRequest: useTicketProps = {
    params: [user.nUser, filterValue, page, user.userAccToken],
  };

  const { ticketsData, error, fetchAllTickets } = useTicket(objRequest);

  useEffect(() => {
    fetchAllTickets();
  }, [filterValue, page]);

  useEffect(() => {
    if (ticketsData) {
      dispatch(update(ticketsData.activeTicket));

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
    <div className={styles.container}>
      {Number(ticketsData?.brTickets) === 0 && (
        <h1 className={styles.noTickets}>Не са открити тикети от този вид</h1>
      )}
      <div className={styles.taskcontainer}>
        {ticketsData !== null &&
          ticketsData.tickets.map((ticket) => {
            return <Ticket key={ticket.id} ticket={ticket} />;
          })}
      </div>

      {ticketsData?.brTickets && (
        <div className={styles.pageNavContainer}>
          <PageNavigation
            activePage={page}
            pagesCount={Math.ceil(ticketsData.brTickets / 10)}
            setPage={changePageHandler}
          />
        </div>
      )}
    </div>
  );
};

export default TasksContainer;
