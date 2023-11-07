import React from "react";
import styles from "./LinksContainer.module.css";
import { NavLink, useNavigate } from "react-router-dom";
import imgLight from "../../assets/icon-light-theme.svg";
import imgDark from "../../assets/icon-dark-theme.svg";
import { useSelector } from "react-redux";
import { RootState } from "../../app/Store";
import { useDispatch } from "react-redux";
import { logout } from "../../app/features/userSlice";
import { addNotification } from "../../app/features/notificationSlice";
import { changeMode } from "../../app/features/settignsSlice";

interface props {
  mobile: boolean;
  onChoose: () => void;
}

const NavigationContainer: React.FC<props> = ({ onChoose }) => {
  const navigate = useNavigate();
  const darkTheme = useSelector((state: RootState) => state.settings.darkMode);

  const dispatch = useDispatch();
  const isAuthenticated = useSelector(
    (state: RootState) => state.user.isAuthenticated
  );

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
    onChoose();
  };

  return (
    <>
      <div className={styles.linksContainer}>
        <NavLink
          to="/"
          className={({ isActive }) => (isActive ? `${styles.active}` : "")}
          onClick={onChoose}
        >
          Home
        </NavLink>
        {isAuthenticated && (
          <NavLink
            to="/tickets"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            onClick={onChoose}
          >
            Tickets
          </NavLink>
        )}
        {isAuthenticated && (
          <NavLink
            to="/statistics"
            className={({ isActive }) => (isActive ? `${styles.active}` : "")}
            onClick={onChoose}
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
          <NavLink className={styles.loginlink} to="/login" onClick={onChoose}>
            Log In
          </NavLink>
        )}
        <div
          className={styles.modeChange}
          onClick={() => dispatch(changeMode())}
        >
          {darkTheme ? (
            <img src={imgLight} alt="light" />
          ) : (
            <img src={imgDark} alt="dark" />
          )}
        </div>
      </div>
    </>
  );
};

export default NavigationContainer;
