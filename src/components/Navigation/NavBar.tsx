import React from "react";
import styles from "./NavBar.module.css";
import TMSLogo from "../../assets/logo-mobile.svg";
import { NavLink } from "react-router-dom";
import imgLight from "../../assets/icon-light-theme.svg";
import imgDark from "../../assets/icon-dark-theme.svg";

interface NavBarProps {
  darkTheme: boolean;
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ darkTheme, changeTheme }) => {
  const changeThemeModeHandler = () => {
    changeTheme((prevState: boolean) => !prevState);
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img src={TMSLogo} alt="logo" />
        <p>Task Management System</p>
      </div>
      <div className={styles.links}>
        <NavLink to="/">Home</NavLink>
        <NavLink to="/tickets">Tickets</NavLink>
        <NavLink to="/statistics">Statistics</NavLink>
        <NavLink className={styles.loginlink} to="/login">
          Logout
        </NavLink>
      </div>
      <div className={styles.modeChange} onClick={changeThemeModeHandler}>
        {darkTheme ? (
          <img src={imgLight} alt="light" />
        ) : (
          <img src={imgDark} alt="dark" />
        )}
      </div>
    </div>
  );
};

export default NavBar;
