import React, { useState, useEffect } from "react";
import styles from "./SideBar.module.css";
import filterIcon from "../../assets/icon-board.svg";
import { NavLink, useNavigate, useLocation } from "react-router-dom";

import ImgHide from "../../assets/icon-hide-sidebar.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
// import { ReactComponent as ImgHide } from "../../assets/icon-hide-sidebar.svg";

interface SideBarProps {
  toggleSideBar: () => void;
  showSideBar: boolean;
}

const Sidebar: React.FC<SideBarProps> = ({ showSideBar, toggleSideBar }) => {
  const toggleClass = showSideBar ? styles.hidesidebar : styles.sidebar;
  const navigate = useNavigate();
  const location = useLocation();
  const activeTicket = useSelector((state: RootState) => state.activeTicket);
  const queryParams = new URLSearchParams(location.search);
  const filterValue = Number(queryParams.get("filter"));
  const [filter, setFilter] = useState(0);

  useEffect(() => {
    setFilter(filterValue);
  }, [filterValue]);

  const isFilterActive = (linkfilter: number) => {
    return linkfilter === filter || (linkfilter === 99 && filter === 0);
  };

  const filterClassName = (filter: number) => {
    return isFilterActive(filter) ? styles.activeFilter : "";
  };

  return (
    <div className={toggleClass}>
      <div className={styles["filter-container"]}>
        <p className={styles.filtertitle}>ФИЛТЪР ПО СТАТУС:</p>
        {activeTicket.cobjTicket !== 0 && (
          <button
            className={`${styles.filter} ${styles.activeTicket}`}
            onClick={() => {
              navigate(`/tickets/${activeTicket.cobjTicket}`);
            }}
          >
            <img src={filterIcon} alt="filterIcon" />
            <p>Текущ работен тикет</p>
          </button>
        )}
        <NavLink
          to="/tickets"
          className={`${styles.filter} ${filterClassName(99)}`}
        >
          <img src={filterIcon} alt="filterIcon" />
          <p>Всички</p>
        </NavLink>
        <NavLink
          to="/tickets?filter=1"
          className={`${styles.filter} ${filterClassName(1)}`}
        >
          <img src={filterIcon} alt="filterIcon" />
          <p>Очакват приемане</p>
        </NavLink>
        <NavLink
          to="/tickets?filter=2"
          className={`${styles.filter} ${filterClassName(2)}`}
        >
          <img src={filterIcon} alt="filterIcon" />
          <p>Приети за изпълнение</p>
        </NavLink>
        <NavLink
          to="/tickets?filter=3"
          className={`${styles.filter} ${filterClassName(3)}`}
        >
          <img src={filterIcon} alt="filterIcon" />
          <p>Изпълнен - За одобрение</p>
        </NavLink>
        <NavLink
          to="/tickets?filter=11"
          className={`${styles.filter} ${filterClassName(11)}`}
        >
          <img src={filterIcon} alt="filterIcon" />
          <p>Приключени</p>
        </NavLink>
        <NavLink
          to="/tickets?filter=12"
          className={`${styles.filter} ${filterClassName(12)}`}
        >
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
