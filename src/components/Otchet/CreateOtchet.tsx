import React, { useState, useRef } from "react";
import ReactDOM from "react-dom";
import styles from "./CreateOtchet.module.css";
import { otchet } from "../../types/ticket";

interface ConfirmButtonModalProps {
  show: boolean;
  setShow: (show: boolean) => void;
  addOtchet: (newOtcher: otchet) => void;
}

const ConfirmButtonModal: React.FC<ConfirmButtonModalProps> = ({
  show,
  setShow,
  addOtchet,
}) => {
  const [work, setWork] = useState("");
  const timeRef = useRef<number>(0);

  const [character, setCharacter] = useState<number>(1);
  if (!show) return null;

  const GoBackHandler = () => {
    setShow(false);
  };

  const ConfirmPostHandler = () => {
    const timeValue = timeRef.current.value;

    const newOtchet: otchet = {
      otchetID: Math.ceil(Math.random() * 100),
      otchetDate: new Date().toString(),
      otchetText: work,
      otchetTime: `${timeValue} мин.`,
      otchetCharacter: character,
    };

    addOtchet(newOtchet);
    setShow(false);
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={GoBackHandler}></div>
      <div className={styles.content}>
        <h3>Създай нов отчет</h3>
        <p>Извършена работа:</p>
        <textarea
          value={work}
          onChange={(event) => setWork(event.target.value)}
          required
          minLength={1}
          className="textarea-ticket"
        ></textarea>
        <p>Работено време(мин.)</p>
        <input type="number" ref={timeRef} />
        <p>Характериситка:</p>
        <select
          value={character}
          onChange={(event) => setCharacter(Number(event.target.value))}
        >
          <option value={0}>Описание</option>
          <option value={1}>Важно</option>
          <option value={2}>Опит</option>
        </select>
        <div className={styles.contentButtons}>
          <button onClick={ConfirmPostHandler}>Изпрати отчета</button>
          <button onClick={GoBackHandler}>Назад</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ConfirmButtonModal;
