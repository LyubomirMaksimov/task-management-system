import React from "react";
import styles from "./TicketHelpers.module.css";
import { helper } from "../../types/ticket";
import { returnStatusName } from "../../utils/utils";
import ButtonsContainer from "../Buttons/ButtonContainer";

interface TicketHelpersProps {
  helpers: helper[];
}

const TicketHelpers: React.FC<TicketHelpersProps> = ({ helpers }) => {
  return (
    <div className={styles.container}>
      <h3>Помощници</h3>
      <br />

      {helpers.map((helper) => {
        return (
          <div key={helper.nHelperRow}>
            <p>
              <span>{helper.nHelperName}</span>
            </p>
            <p>
              задача: <span>{helper.helperTask}</span>
            </p>
            <p>
              краен срок: <span>{helper.helperTaskEndDate}</span>
            </p>
            {helper.helperTaskSumTime !== "0 мин." && (
              <p> изработено: {helper.helperTaskSumTime}</p>
            )}

            <p>
              статус: <span>{returnStatusName(helper.helperTaskStatus)}</span>
            </p>
            <ButtonsContainer type={2} ticketStatus={helper.helperTaskStatus} />
            <hr />
          </div>
        );
      })}
    </div>
  );
};

export default TicketHelpers;
