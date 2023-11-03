import React, { useState } from "react";
import styles from "./NavBar.module.css";
import TMSLogo from "../../assets/logo-mobile.svg";
import { NavLink, useNavigate } from "react-router-dom";
import imgLight from "../../assets/icon-light-theme.svg";
import imgDark from "../../assets/icon-dark-theme.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
import { useDispatch } from "react-redux";
import { logout } from "../../app/features/userSlice";
import { addNotification } from "../../app/features/notificationSlice";
import { GiHamburgerMenu } from "react-icons/gi";
import MobileMenu from "./MobileMenu";

interface NavBarProps {
  darkTheme: boolean;
  changeTheme: React.Dispatch<React.SetStateAction<boolean>>;
}

const NavBar: React.FC<NavBarProps> = ({ darkTheme, changeTheme }) => {
  const [showModal, setShowModal] = useState<boolean>(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

  const changeThemeModeHandler = () => {
    changeTheme((prevState: boolean) => !prevState);
  };

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(
      addNotification({
        id: new Date().getTime(),
        message: "User Logged Out",
        type: "success",
      })
    );
    navigate("/");
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.logo}>
        <img
          src={TMSLogo}
          alt="logo"
          onClick={() => {
            navigate("/");
          }}
        />
        <p
          onClick={() => {
            navigate("/");
          }}
        >
          Task Management System
        </p>
      </div>

      <div className={styles.links}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
        >
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/tickets"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            Tickets
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            to="/statistics"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          >
            Statistics
          </NavLink>
        )}
        {isAuthenticated && (
          <p className={styles.loginlink} onClick={logoutHandler}>
            Log Out
          </p>
        )}
        {!isAuthenticated && (
          <NavLink className={styles.loginlink} to="/login">
            Log In
          </NavLink>
        )}
      </div>
      <div className={styles.modeChange} onClick={changeThemeModeHandler}>
        {darkTheme ? (
          <img src={imgLight} alt="light" />
        ) : (
          <img src={imgDark} alt="dark" />
        )}
      </div>
      <div className={styles.hamburger}>
        <GiHamburgerMenu
          onClick={() => {
            setShowModal(true);
          }}
        />
      </div>
      <MobileMenu show={showModal} setShow={setShowModal} />
    </div>
  );
};

export default NavBar;
