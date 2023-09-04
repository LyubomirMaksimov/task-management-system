import React, { useState } from "react";
import TasksContainer from "../components/Tickets/TasksContainer";
import Sidebar from "../components/Navigation/SideBar";
import styles from "./TicketsLayout.module.css";
import imgShow from "../assets/icon-show-sidebar.svg";

const TicketsLayout: React.FC = () => {
  const [showSidebar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar((prevState) => !prevState);
  };

  const toggleClass = showSidebar ? styles.toggleBar : styles.hidetoggleBar;

  const containerStyles = {
    marginLeft: showSidebar ? "-250px" : "0px",
  };

  return (
    <div className={styles.container} style={containerStyles}>
      <Sidebar showSideBar={showSidebar} toggleSideBar={toggleSideBar} />
      <div className={toggleClass} onClick={toggleSideBar}>
        <img src={imgShow} alt="show" />
      </div>
      <TasksContainer />
    </div>
  );
};

export default TicketsLayout;
