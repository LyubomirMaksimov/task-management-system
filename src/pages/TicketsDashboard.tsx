import React, { useState } from "react";
import TasksContainer from "../modules/ticket/components/TasksContainer";
import Sidebar from "../components/Navigation/SideBar";
import styles from "./TicketsDashboard.module.css";
import imgShow from "../assets/icon-show-sidebar.svg";

const TicketsDashboard: React.FC = () => {
  const [showSidebar, setShowSideBar] = useState(false);

  const toggleSideBar = () => {
    setShowSideBar((prevState) => !prevState);
  };

  const toggleClass = showSidebar ? styles.toggleBar : styles.hidetoggleBar;

  const containerStyles = {
    marginLeft: showSidebar ? "-260px" : "0px",
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

export default TicketsDashboard;
