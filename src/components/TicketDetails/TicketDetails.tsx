import React from "react";
import styles from "./TicketDetails.module.css";
import { ticketFullInfo } from "../../types/ticket";
import { returnStatusName } from "../../utils/utils.tsx";
import directionLogo from "../../assets/DirectionLogo.png";
import ButtonsContainer from "../Buttons/ButtonContainer.tsx";

interface TicketDetailsProps {
  ticket: ticketFullInfo;
}

const TicketDetails: React.FC<TicketDetailsProps> = ({ ticket }) => {
  const GoogleMapsHandler = () => {
    const location = ticket?.ticketPMSPlaceLocation;
    if (location) {
      const googleMapsUrl = `https://www.google.com/maps/dir//${encodeURIComponent(
        location
      )}`;
      window.open(googleMapsUrl, "_blank");
    }
  };

  const PhoneDealHandler = () => {
    window.location.href = `tel:${ticket?.ticketPMSContactPhone}`;
  };

  return (
    <div className={styles.container}>
      <h3>Информация за задачата</h3>
      <br />
      <h2>{ticket.ticketTask}</h2>
      <p>{ticket.contragent}</p>
      <br />
      <p>
        от дата: <span>{ticket.ticketBegDate}</span>
      </p>
      <p>
        до дата: <span>{ticket.ticketEndDate}</span>
      </p>
      <p>
        планувани часове: <span>{ticket.ticketPMSPlannedHours} часа</span>
      </p>
      <p>
        статус: <span>{returnStatusName(ticket.ticketStatus)}</span>
      </p>
      <ButtonsContainer
        type={1}
        ticketStatus={ticket.ticketStatus}
        ticketLevel={ticket.ticketLevel}
      />
      <hr />
      <p>
        дейност: <span>{ticket.ticketPMSTaskName}</span>
      </p>
      <p>
        търговец/отговорник: <span>{ticket.ticketPMSTrader}</span>
      </p>
      <p>
        обект: <span>{ticket.ticketPMSObject}</span>
      </p>
      <p>
        лице за контакт: <span>{ticket.ticketPMSContactPerson}</span>
      </p>
      <p>
        телефон на лицето:{" "}
        <span className={styles.phoneDeal} onClick={PhoneDealHandler}>
          {ticket.ticketPMSContactPhone}
        </span>
      </p>
      <div className={styles.location}>
        <p>
          местоположение: <span>{ticket?.ticketPMSPlaceLocation}</span>
        </p>
        <img
          className={styles.directionLogo}
          src={directionLogo}
          alt="google-map-icon"
          onClick={GoogleMapsHandler}
        />
      </div>

      <p>
        ръководител: <span>{ticket.ticketTaskLeader}</span>
      </p>
      <p>
        екип: <span>{ticket.ticketTeam}</span>
      </p>
    </div>
  );
};

export default TicketDetails;
