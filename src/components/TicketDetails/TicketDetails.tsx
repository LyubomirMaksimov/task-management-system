import React from "react";
import styles from "./TicketDetails.module.css";
import { ticketFullInfo } from "../../types/ticket";
import { returnStatusName } from "../../utils/utils.tsx";

interface TicketDetailsProps {
  ticket: ticketFullInfo;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  return (
    <div className={styles.container}>
      <h2>Информация за задачата</h2>
      <br />
      <h3>{ticket.ticketTask}</h3>
      <p>{ticket.contragent}</p>
      <br />
      <p>от дата: {ticket.ticketBegDate}</p>
      <p>до дата: {ticket.ticketEndDate}</p>
      <p>планувани часове: {ticket.ticketPMSPlannedHours}</p>
      <p>дейност: {ticket.ticketPMSTaskName}</p>
      <br />
      <p>търговец/отговорник: {ticket.ticketPMSTrader}</p>
      <p>обект: {ticket.ticketPMSObject}</p>
      <p>лице за контакт: {ticket.ticketPMSContactPerson}</p>
      <p>телефон на лицето: {ticket.ticketPMSContactPhone}</p>
      <p>местоположение: </p>
      <br />
      <p>ръководител: {ticket.ticketTaskLeader}</p>
      <p>екип: {ticket.ticketTeam}</p>
      <br />
      <h4>статус: {returnStatusName(ticket.ticketStatus)}</h4>
    </div>
  );
};

export default TicketDetails;
