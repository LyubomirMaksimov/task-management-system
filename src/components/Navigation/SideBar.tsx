import React from "react";
import styles from "./SideBar.module.css";
import filterIcon from "../../assets/icon-board.svg";
import { NavLink } from "react-router-dom";

import ImgHide from "../../assets/icon-hide-sidebar.svg";
// import { ReactComponent as ImgHide } from "../../assets/icon-hide-sidebar.svg";

interface SideBarProps {
  toggleSideBar: () => void;
  showSideBar: boolean;
}

const Sidebar: React.FC<SideBarProps> = ({ showSideBar, toggleSideBar }) => {
  const toggleClass = showSideBar ? styles.hidesidebar : styles.sidebar;

  return (
    <div className={toggleClass}>
      <div className={styles["filter-container"]}>
        <p className={styles.filtertitle}>ФИЛТЪР ПО СТАТУС:</p>
        <NavLink to="/tickets" className={styles.filter}>
          <img src={filterIcon} alt="filterIcon" />
          <p>Всички</p>
        </NavLink>
        <NavLink to="/tickets" className={styles.filter}>
          <img src={filterIcon} alt="filterIcon" />
          <p>Очакват приемане</p>
        </NavLink>
        <NavLink to="/tickets" className={styles.filter}>
          <img src={filterIcon} alt="filterIcon" />
          <p>Приети за изпълнение</p>
        </NavLink>
        <NavLink to="/tickets" className={styles.filter}>
          <img src={filterIcon} alt="filterIcon" />
          <p>Изпълнен - За одобрение</p>
        </NavLink>
        <NavLink to="/tickets" className={styles.filter}>
          <img src={filterIcon} alt="filterIcon" />
          <p>Приключени</p>
        </NavLink>
        <NavLink to="/tickets" className={styles.filter}>
          <img src={filterIcon} alt="filterIcon" />
          <p>Прекратени/Отказани</p>
        </NavLink>
      </div>
      <div className={styles["hide-sidebar"]} onClick={toggleSideBar}>
        <img src={ImgHide} alt="Hide Sidebar" />
        {/* <ImgHide /> */}
        <p>Hide Sidebar</p>
      </div>
      <div className={styles["settings-container"]}></div>
    </div>
  );
};

export default Sidebar;
