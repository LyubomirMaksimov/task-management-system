import React from "react";
import ReactDOM from "react-dom";
import styles from "./ConfirmButtonModal.module.css";

interface ConfirmButtonModalProps {
  confirm: () => void;
  cancel: () => void;
  show: boolean;
  text: string;
}

const ConfirmButtonModal: React.FC<ConfirmButtonModalProps> = ({
  confirm,
  cancel,
  show,
  text,
}) => {
  if (!show) return null;

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={cancel}></div>
      <div className={styles.content}>
        <p>{text}</p>
        <div className={styles.contentButtons}>
          <button onClick={confirm}>Потвърди</button>
          <button onClick={cancel}>Назад</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default ConfirmButtonModal;
