import React from "react";
import styles from "./TicketOtchet.module.css";
import { otchet } from "../../types/ticket";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";

interface TicketOtchetProps {
  otcheti: otchet[];
}

const TicketOtchet: React.FC<TicketOtchetProps> = ({ otcheti }) => {
  const activeTicket = useSelector((state: RootState) => state.activeTicket);

  console.log(activeTicket.id);
  return (
    <div className={styles.container}>
      <div className={styles.otcheti}>
        {otcheti.length > 0 ? (
          <div className={styles.container}>
            <h3>Отчет на моята работа</h3>
            <br />
            {otcheti.map((otchet) => {
              return (
                <div key={otchet.otchetID}>
                  <p>
                    дата: <span>{otchet.otchetDate}</span>
                  </p>
                  <p>
                    описание: <span>{otchet.otchetText}</span>
                  </p>
                  {otchet.otchetTime !== "0 мин." && (
                    <p>
                      продължителност: <span>{otchet.otchetTime}</span>
                    </p>
                  )}
                  <hr />
                </div>
              );
            })}
          </div>
        ) : (
          <h3>Няма извършена работа по тази задача</h3>
        )}
      </div>
      <div className={styles.createOtchet}>Създаване на нов отчет</div>
    </div>
  );
};

export default TicketOtchet;
