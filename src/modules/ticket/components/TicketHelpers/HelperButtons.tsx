import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import styles from "./HelperButtons.module.css";
import ConfirmButtonModal from "../../../../components/Buttons/ConfirmButtonModal";
import useChangeHelperTicketStatus from "../../hooks/useChangeHelperTicketStatus";
import { RootState } from "../../../../app/Store";

interface HelperButtonsProps {
  ticketStatus: number; // Статус на тикета.
  nHelperRow?: number; // ред на помощника (ако се показват бутони на помищник)
  changeHelpStatus: (nHelperRow: number, newStatus: number) => void;
}

const HelperButtons: React.FC<HelperButtonsProps> = ({
  ticketStatus,
  nHelperRow = 0,
  changeHelpStatus,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [newStatus, setNewStatus] = useState<number>(0);
  const user = useSelector((state: RootState) => state.user);
  const { id } = useParams();

  const { responseMessage, fetchChangeHelperTicketStatus } =
    useChangeHelperTicketStatus({
      params: [
        user.nUser,
        id?.split("-")[1] as string,
        newStatus,
        nHelperRow,
        user.userAccToken,
      ],
    });

  const ConfirmHandler = () => {
    setShowModal(false);

    fetchChangeHelperTicketStatus;

    changeHelpStatus(nHelperRow, newStatus);
    //TODO - Update Ticket  in Redux Store
    console.log(responseMessage);
  };

  const CancelButtonHandler = () => {
    setShowModal(false);
  };

  const ShowModal = (text: string) => {
    setQuestion(text);
    setShowModal(true);
  };

  const HelperButtons = (ticketStatus: number) => {
    let buttons: JSX.Element[] = [];
    switch (ticketStatus) {
      case 1: //Очаква приемане
      case 2: //Приет за изпълнение
        buttons = [
          <button
            key={1}
            className={styles.RedButton}
            onClick={() => {
              setNewStatus(12);
              ShowModal("Потвърдете ПРЕКРАТЯВАНЕТО на задачата на помощника:");
            }}
          >
            Прекрати
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
              ShowModal(
                "Потвърдете, че искате да върнете задачата на помощника ОБРАТНО ЗА ИЗПЪЛНЕНИЕ:"
              );
            }}
          >
            Върни за изпълнение
          </button>,
          <button
            key={2}
            className={styles.GreenButton}
            onClick={() => {
              setNewStatus(11);
              ShowModal("Потвърдете ПРИКЛЮЧВАНЕТО НА задачата на помощника:");
            }}
          >
            Приключи тикета
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
      {HelperButtons(ticketStatus) &&
        HelperButtons(ticketStatus).map((btn) => {
          return btn;
        })}
      <ConfirmButtonModal
        show={showModal}
        confirm={ConfirmHandler}
        cancel={CancelButtonHandler}
        text={question}
      />
    </div>
  );
};

export default HelperButtons;
