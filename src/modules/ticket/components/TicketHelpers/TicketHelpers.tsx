import React, { useState } from "react";
import styles from "./TicketHelpers.module.css";
import { helper } from "../../types/ticket";
import { returnStatusName } from "../../utils/utils";
import HelperButtons from "./HelperButtons";

interface TicketHelpersProps {
  helpers: helper[];
}

const TicketHelpers: React.FC<TicketHelpersProps> = ({ helpers }) => {
  const [currHelpers, setCurrHelpers] = useState<helper[]>(helpers);

  const ChangeHelerStatus = (nHelperRow: number, newStatus: number) => {
    const updatedHelpers = currHelpers.map((helper) => {
      if (helper.nHelperRow === nHelperRow) {
        return {
          ...helper,
          helperTaskStatus: newStatus,
        };
      } else {
        return helper;
      }
    });

    setCurrHelpers(updatedHelpers);
  };

  return (
    <div className={styles.container}>
      <h3>Помощници</h3>
      <br />

      <div className={styles.helperscontainer}>
        {currHelpers.map((helper) => {
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
                <p>
                  {" "}
                  изработено: <span>{helper.helperTaskSumTime}</span>
                </p>
              )}

              <p>
                статус: <span>{returnStatusName(helper.helperTaskStatus)}</span>
              </p>
              <HelperButtons
                ticketStatus={helper.helperTaskStatus}
                nHelperRow={helper.nHelperRow}
                changeHelpStatus={ChangeHelerStatus}
              />
              <hr />
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TicketHelpers;
