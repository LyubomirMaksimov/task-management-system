import React from "react";
import styles from "./TicketHelpers.module.css";
import { helper } from "../../types/ticket";
import { returnStatusName } from "../../utils/utils";

interface TicketHelpersProps {
  helpers: helper[];
}

const TicketHelpers: React.FC<TicketHelpersProps> = ({ helpers }) => {
  return (
    <div className={styles.container}>
      <h2>Помощници</h2>
      {helpers.map((helper) => {
        return (
          <div>
            <p>{helper.nHelperName}</p>
            <p>{helper.helperTask}</p>
            <p>{helper.nHelperName}</p>
            <p>{helper.helperTaskEndDate}</p>
            <p>{helper.helperTaskSumTime}</p>
            <p>{returnStatusName(helper.helperTaskStatus)}</p>
          </div>
        );
      })}
    </div>
  );
};

export default TicketHelpers;
