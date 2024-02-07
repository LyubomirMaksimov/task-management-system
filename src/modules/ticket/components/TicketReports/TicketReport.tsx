import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import styles from "./TicketReport.module.css";
import { otchet } from "../../types/ticket";
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/Store";
import CreateReport from "./CreateReport";
import ConfirmButtonModal from "../../../../components/Buttons/ConfirmButtonModal";
import usePostReport, { usePostReportProps } from "../../hooks/usePostReport";

interface TicketReportProps {
  otcheti: otchet[];
  cobjTicket: number;
  ticketStatus: number;
}

const TicketReport: React.FC<TicketReportProps> = ({
  otcheti,
  cobjTicket,
  ticketStatus,
}) => {
  const activeTicket = useSelector((state: RootState) => state.activeTicket);
  const [currOtchet, setCurrOtchet] = useState<otchet[]>(otcheti);
  const [showCreateModal, setShowCreateModal] = useState<boolean>(false);
  const [showModal, setShowModal] = useState<boolean>(false);
  const user = useSelector((state: RootState) => state.user);
  const { id } = useParams();
  const [params, setParams] = useState<(number | string)[]>([]);

  const objRequest: usePostReportProps = {
    params: params,
  };

  const { fetchPostReport } = usePostReport(objRequest);

  const AddOtchetHandler = (newOtchet: otchet) => {
    setCurrOtchet((prev) => {
      return [...prev, newOtchet];
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      await fetchPostReport();
    };

    if (params.length > 0) {
      fetchData();
    }
  }, [params]); // This useEffect will run whenever params change

  const startStopButton: JSX.Element = () => {
    const CancelButtonHandler = () => {
      setShowModal(false);
    };

    const ConfirmButtonHandler = () => {
      setShowModal(false);

      let newParams;

      if (cobjTicket === activeTicket.cobjTicket) {
        const ExcelDateToJSDate = (serial) => {
          const utc_days = Math.floor(serial - 25569);
          const utc_value = utc_days * 86400;
          const date_info = new Date(utc_value * 1000);

          const fractional_day = serial - Math.floor(serial) + 0.0000001;

          let total_seconds = Math.floor(86400 * fractional_day);

          const seconds = total_seconds % 60;

          total_seconds -= seconds;

          const hours = Math.floor(total_seconds / (60 * 60));
          const minutes = Math.floor(total_seconds / 60) % 60;

          return new Date(
            date_info.getFullYear(),
            date_info.getMonth(),
            date_info.getDate(),
            hours,
            minutes,
            seconds
          );
        };

        const excelDate = activeTicket.ticketStartWorkDate;
        const dateObject: Date = ExcelDateToJSDate(excelDate);
        const currentDate: Date = new Date();
        const timeDifferenceInMilliseconds = currentDate - dateObject;

        let timeDifferenceInMinutes =
          timeDifferenceInMilliseconds / (1000 * 60);
        if (timeDifferenceInMinutes > 480) {
          timeDifferenceInMinutes = 480;
        }

        newParams = [
          id?.split("-")[0] as string, // nUser
          id?.split("-")[1] as string, // cobjTicket
          "Приключена работа.", // otchetText
          timeDifferenceInMinutes, // otchetTime
          4, // otchetCharacter
          user.userAccToken,
        ];
      } else {
        newParams = [
          id?.split("-")[0] as string, // nUser
          id?.split("-")[1] as string, // cobjTicket
          "Започната работа.", // otchetText
          0, // timeValue, // otchetTime
          3, // otchetCharacter
          user.userAccToken,
        ];
      }

      setParams(newParams);
      console.log(params);

      // fetchPostReport();

      // AddOtchetHandler(newOtchet);
    };

    if (cobjTicket === activeTicket.cobjTicket) {
      return (
        <>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Приключи работа
          </button>
          <ConfirmButtonModal
            show={showModal}
            confirm={ConfirmButtonHandler}
            cancel={CancelButtonHandler}
            text={"Потвърдете ПРИКЛЮЧВАНЕТО на работата по този тикет:"}
          />
        </>
      );
    } else {
      return (
        <>
          <button
            onClick={() => {
              setShowModal(true);
            }}
          >
            Започни работа
          </button>
          <ConfirmButtonModal
            show={showModal}
            confirm={ConfirmButtonHandler}
            cancel={CancelButtonHandler}
            text={"Потвърдете ЗАПОЧВАНЕТО на работата по този тикет:"}
          />
        </>
      );
    }
  };

  return (
    <div className={styles.container}>
      {ticketStatus == 2 && (
        <div className={styles.CreateReport}>
          <button
            onClick={() => {
              setShowCreateModal(true);
            }}
          >
            Създай друг вид отчет
          </button>
          {startStopButton()}
          <CreateReport
            show={showCreateModal}
            setShow={setShowCreateModal}
            addOtchet={AddOtchetHandler}
          />
        </div>
      )}

      <h4>Отчет на моята работа</h4>
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
          <h5>Няма извършена работа по тази задача</h5>
        )}
      </div>
    </div>
  );
};

export default TicketReport;
