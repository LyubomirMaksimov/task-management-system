import React, { useState } from "react";
import NavBar from "./components/Navigation/NavBar";
import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TicketsLayout from "./pages/TicketsLayout";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";

const App: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const activeTheme = darkTheme ? "" : "light-mode";

  return (
    <div className={`${styles.app} ${styles[activeTheme]}`}>
      <NavBar darkTheme={darkTheme} changeTheme={setDarkTheme} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/tickets" element={<TicketsLayout />} />
        <Route path="/login" element={<Login />} />
        <Route path="/statistics" element={<Statistics />} />
        <Route path="/tickets/:id" element={<Home />} />
      </Routes>
      <div className={styles.containers}></div>
    </div>
  );
};

export default App;
