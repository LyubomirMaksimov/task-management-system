import React from "react";
import ReactDOM from "react-dom";
import styles from "./MobileMenu.module.css";

interface MobileMenuProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ show, setShow }) => {
  if (!show) return null;

  const GoBackHandler = () => {
    setShow(false);
  };

  const ConfirmPostHandler = () => {
    setShow(false);
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={GoBackHandler}></div>
      <div className={styles.content}>
        <h3>Създай нов отчет</h3>
        <div className={styles.contentButtons}>
          <button onClick={ConfirmPostHandler}>Изпрати отчета</button>
          <button onClick={GoBackHandler}>Назад</button>
        </div>
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default MobileMenu;
