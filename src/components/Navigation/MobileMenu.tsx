import React from "react";
import ReactDOM from "react-dom";
import styles from "./MobileMenu.module.css";
import LinksContainer from "./LinksContainer";

interface MobileMenuProps {
  show: boolean;
  setShow: (show: boolean) => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ show, setShow }) => {
  if (!show) return null;

  const GoBackHandler = () => {
    setShow(false);
  };

  return ReactDOM.createPortal(
    <div className={styles.modal}>
      <div className={styles.overlay} onClick={GoBackHandler}></div>

      <div className={styles.content}>
        <LinksContainer mobile={true} onChoose={GoBackHandler} />
      </div>
    </div>,
    document.getElementById("modal-root") as HTMLElement
  );
};

export default MobileMenu;
