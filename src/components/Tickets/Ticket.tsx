import React from "react";
import { ticketType } from "../../types/ticket";
import styles from "./Ticket.module.css";

type ticketProps = {
  key: number;
  ticket: ticketType;
};

const Ticket: React.FC<ticketProps> = ({ ticket }) => {
  return (
    <div className={styles.tickerWrapper}>
      <h3>{ticket.ticketTask}</h3>
    </div>
  );
};

export default Ticket;
