import React from "react";
import { ticketType } from "../../types/ticket";
import styles from "./Ticket.module.css";
import { useNavigate } from "react-router-dom";

type ticketProps = {
  key: number;
  ticket: ticketType;
};

const Ticket: React.FC<ticketProps> = ({ ticket }) => {
  const navigate = useNavigate();

  const showticketDetailsHandler = () => {
    return navigate(`/tickets/${ticket.cobjTicket}`);
  };

  return (
    <div className={styles.tickerWrapper}>
      <h3 onClick={showticketDetailsHandler}>{ticket.ticketTask}</h3>
      <p>{ticket.contragent}</p>
      <br />
      <p>статус: {ticket.ticketStatus}</p>
      <p>начало: {ticket.ticketBegDate}</p>
      <br />
    </div>
  );
};

export default Ticket;
