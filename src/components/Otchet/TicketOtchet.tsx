import React, { useState, useEffect } from "react";
import styles from "./TicketOtchet.module.css";
import { otchet } from "../../types/ticket";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
import CreateOtchet from "../Otchet/CreateOtchet";

interface TicketOtchetProps {
  otcheti: otchet[];
  cobjTicket: number;
}

const TicketOtchet: React.FC<TicketOtchetProps> = ({ otcheti, cobjTicket }) => {
  const activeTicket = useSelector((state: RootState) => state.activeTicket);
  const [currOtchet, setCurrOtchet] = useState<otchet[]>(otcheti);
  const [showModal, setShowModal] = useState<boolean>(false);

  const AddOtchetHandler = (newOtchet: otchet) => {
    setCurrOtchet((prev) => {
      return [...prev, newOtchet];
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.createOtchet}>
        <button
          onClick={() => {
            setShowModal(true);
          }}
        >
          Създай друг вид отчет
        </button>
        {cobjTicket === activeTicket.cobjTicket && (
          <button>Приключи работа</button>
        )}
        {cobjTicket !== activeTicket.cobjTicket && (
          <button>Започни работа</button>
        )}
        <CreateOtchet
          show={showModal}
          setShow={setShowModal}
          addOtchet={AddOtchetHandler}
        />
      </div>
      <h3>Отчет на моята работа</h3>
      <div className={styles.otcheti}>
        {currOtchet.length > 0 ? (
          <div className={styles.container}>
            <br />
            {currOtchet.map((otchet) => {
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
    </div>
  );
};

export default TicketOtchet;
