import React, { useState, useEffect } from "react";
import styles from "./Login.module.css";
import useAuth, { FetchProps } from "../modules/user/hooks/useAuth.js";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../app/features/userSlice.js";
import { UserType } from "../modules/user/types/user.js";
import { useNavigate, Navigate } from "react-router-dom";
import { addNotification } from "../app/features/notificationSlice.js";
import { RootState } from "../app/Store.js";

const Login: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.user);

  if (user.isAuthenticated) {
    return <Navigate to="/tickets" />;
  }

  const objRequest: FetchProps = {
    stringService: "LOGIN",
    flag: false,
    params: [username, password],
    data: null,
    loading: false,
    error: null,
    fetchData: () => {},
    abortFetch: () => {},
  };

  const { data, error, loading, fetchData } = useAuth(objRequest);

  const handleUsernameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setUsername(event.target.value);

    if (event.target.value.length >= 5) {
      setUsernameError("");
    }
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);

    if (event.target.value.length >= 8) {
      setPasswordError("");
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (username.length < 5) {
      setUsernameError("Username must be at least 5 characters long");
    } else {
      setUsernameError("");
    }

    if (password.length < 8) {
      setPasswordError("Password must be at least 8 characters long");
    } else {
      setPasswordError("");
    }

    if (username.length >= 5 && password.length >= 8) {
      fetchData();
    }
  };

  useEffect(() => {
    if (data) {
      let fullName: string;
      if (Number(data.userType) === 1) {
        fullName = `${data.userFirstName} ${data.userSecondName} ${data.userLastName}`;
      } else {
        fullName = data.userFirmName;
      }

      const userData: UserType = {
        nUser: data.nUser,
        userType: data.userType,
        userWorkerType: data.userWorkerType,
        userFullName: fullName,
        userBULSTAT: data.userBULSTAT,
        userEmail: data.userEmail,
        accToken: data.accToken,
        refreshToken: data.refreshToken,
        expiresIn: data.expiresIn,
        isAuthenticated: true,
      };

      dispatch(login(userData));
      navigate("/tickets");
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: `Welcome, ${fullName}!`,
          type: "success",
        })
      );
    }

    if (error) {
      dispatch(
        addNotification({
          id: new Date().getTime(),
          message: error.message,
          type: error.name.toLowerCase(),
        })
      );
    }
  }, [error, data, loading, dispatch, navigate]);

  return (
    <div className={styles.background}>
      <form onSubmit={handleSubmit}>
        <div className={styles.inputBox}>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
          <span className={styles.error}>{usernameError}</span>
        </div>
        <div className={styles.inputBox}>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
          <span className={styles.error}>{passwordError}</span>
        </div>
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
