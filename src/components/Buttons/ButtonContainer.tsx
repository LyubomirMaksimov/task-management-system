import React, { useState } from "react";
import styles from "./ButtonCointainer.module.css";
import ConfirmButtonModal from "./ConfirmButtonModal";

interface ButtonsContainerProps {
  type: number; // 1 - Ръководител, 2- Помощник
  ticketStatus: number; // Статус на тикета.
  ticketLevel?: number; // Статус на тикета
}

const ButtonsContainer: React.FC<ButtonsContainerProps> = ({
  type,
  ticketStatus,
  ticketLevel = 0,
}) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const [question, setQuestion] = useState<string>("");
  const [newStatus, setNewStatus] = useState<number>(0);
  let buttons;

  const ConfirmButtonHandler = () => {
    setShowModal(false);
    console.log(`Status changed to ${newStatus}`);
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
              setNewStatus(1);
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
              setNewStatus(1);
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
              ShowButtonModal(
                "Потвърдете ПРЕКРАТЯВАНЕТО на задачата на помощника:"
              );
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
              setNewStatus(1);
              ShowButtonModal(
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
              ShowButtonModal(
                "Потвърдете ПРИКЛЮЧВАНЕТО НА задачата на помощника:"
              );
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

  switch (type) {
    case 1:
      buttons = LeaderButtons(ticketStatus, ticketLevel);
      break;
    case 2:
      buttons = HelperButtons(ticketStatus);
      break;
  }

  return (
    <div className="buttons-container">
      {buttons &&
        buttons.map((btn) => {
          return btn;
        })}
      <ConfirmButtonModal
        show={showModal}
        confirm={ConfirmButtonHandler}
        cancel={CancelButtonHandler}
        text={question}
      />
    </div>
  );
};

export default ButtonsContainer;
