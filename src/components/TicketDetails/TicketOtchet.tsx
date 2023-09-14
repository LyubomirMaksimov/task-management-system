import React from "react";
import styles from "./TicketOtchet.module.css";
import { otchet } from "../../types/ticket";

interface TicketOtchetProps {
  otcheti: otchet[];
}

const TicketOtchet: React.FC<TicketOtchetProps> = ({ otcheti }) => {
  return (
    <div className={styles.container}>
      <h2>Отчетено по задачата</h2>
      {otcheti.map((otchet) => {
        return (
          <div>
            <p>{otchet.otchetCharacter}</p>
            <p>{`${otchet.otchetDate} ${otchet.otchetTime}`}</p>
          </div>
        );
      })}
      {!otcheti && <p>Все още отчети по тази задача</p>}
    </div>
  );
};

export default TicketOtchet;
