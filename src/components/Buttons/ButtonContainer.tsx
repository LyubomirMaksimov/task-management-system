import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./ButtonCointainer.module.css";
import ConfirmButtonModal from "./ConfirmButtonModal";
import useChangeTicketStatus from "../../modules/ticket/hooks/useChangeTicketStatus";
import useChangeHelperTicketStatus from "../../modules/ticket/hooks/useChangeHelperTicketStatus";
import { RootState } from "../../app/Store";
interface ButtonsContainerProps {
  type: number; // 1 - Ръководител, 2- Помощник
  ticketStatus: number; // Статус на тикета.
  ticketLevel?: number; // Статус на тикета
  nHelperRow?: number; // ред на помощника (ако се показват бутони на помищник)
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
  type,
  ticketStatus,
  ticketLevel = 0,
  nHelperRow = 0,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [newStatus, setNewStatus] = useState<number>(0);

  const user = useSelector((state: RootState) => state.user);
  const { id } = useParams();

  const objRakRequest = {
    params: [
      user.nUser,
      // id?.split("-")[0] as string,
      id?.split("-")[1] as string,
      newStatus,
      user.userAccToken,

      // Number(params[0]), // nUser
      // Number(params[1]), // nUserTicket
      // Number(params[2]), // nNewStatus
      // String(params[3]), // userAccToken
    ],
  };

  const { responseMessage: responseRakMessage, fetchChangeTicketStatus } =
    useChangeTicketStatus(objRakRequest);

  let buttons;

  const ConfirmRakButtonHandler = () => {
    setShowModal(false);
    fetchChangeTicketStatus();
    console.log(responseRakMessage);
  };

  const CancelButtonHandler = () => {
    setShowModal(false);
  };

  const ShowButtonModal = (text: string) => {
    setQuestion(text);
    setShowModal(true);
  };

  const LeaderButtons = (ticketStatus: number, ticketLevel: number) => {
    let buttons: JSX.Element[] = [];
    switch (ticketStatus) {
      case 1: //Очаква приемане
        buttons = [
          <button
            key={1}
            className={styles.GreenButton}
            onClick={() => {
              setNewStatus(2);
              ShowButtonModal(
                "Потвърдете, че ПРИЕМАТЕ изпълнението на задачата:"
              );
            }}
          >
            Приеми за изпълнение
          </button>,
          <button
            key={2}
            className={styles.RedButton}
            onClick={() => {
              setNewStatus(13);
              ShowButtonModal(
                "Потвърдете, че ОТКАЗВАТЕ да изпълнявате задачата:"
              );
            }}
          >
            Откажи за изпълнение
          </button>,
        ];
        break;
      case 2: //Приет за изпълнение
        buttons = [
          ticketLevel === 1 ? (
            <button
              key={1}
              className={styles.GreenButton}
              onClick={() => {
                setNewStatus(11);
                ShowButtonModal(
                  "Потвърдете, че ПРИКЛЮЧВАТЕ изпълнението на задачата:"
                );
              }}
            >
              Приключи тикета
            </button>
          ) : (
            <button
              key={1}
              className={styles.YellowButton}
              onClick={() => {
                setNewStatus(3);
                ShowButtonModal(
                  "Потвърдете изпращането на задачата за ОДОБРЕНИЕ:"
                );
              }}
            >
              Прати за Одобрение
            </button>
          ),
          <button
            key={2}
            className={styles.RedButton}
            onClick={() => {
              setNewStatus(13);
              ShowButtonModal(
                "Потвърдете, че се ОТКАЗВАТЕ да изпълнявате задачата:"
              );
            }}
          >
            Откажи за изпълнение
          </button>,
        ];
        break;
      case 3: // Изпълнен за одобрение
        buttons = [
          <button
            key={1}
            className={styles.YellowButton}
            onClick={() => {
              setNewStatus(2);
              ShowButtonModal(
                "Потвърдете, че искате да върнете задачата обратно ЗА ИЗПЪЛНЕНИЕ:"
              );
            }}
          >
            Върни за изпълнение
          </button>,
        ];
        break;
      case 11: // Приключен
      case 12: // Прекратен
      case 13: // Отказан
        buttons = [];
        break;
      default:
        break;
    }
    return buttons;
  };

  return (
    <div className={styles[`buttons-container`]}>
      {LeaderButtons(ticketStatus, ticketLevel) &&
        LeaderButtons(ticketStatus, ticketLevel).map((btn) => {
          return btn;
        })}
      <ConfirmButtonModal
        show={showModal}
        confirm={ConfirmRakButtonHandler}
        cancel={CancelButtonHandler}
        text={question}
      />
    </div>
  );
};

export default ButtonsContainer;
