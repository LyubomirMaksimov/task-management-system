import React, { useState } from "react";
import NavBar from "./components/Navigation/NavBar";
import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TicketsLayout from "./pages/TicketsLayout";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import AuthGuard from "./guard/AuthGuard";
import NotificationsList from "./components/Notifications/NotificationsList";
import PageNotFound from "./pages/PageNotFound";

const App: React.FC = () => {
  const [darkTheme, setDarkTheme] = useState(true);

  const activeTheme = darkTheme ? "" : "light-mode";

  return (
    <>
      <NotificationsList />
      <main className={`${styles.app} ${styles[activeTheme]}`}>
        <NavBar darkTheme={darkTheme} changeTheme={setDarkTheme} />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/tickets"
            element={
              <AuthGuard>
                <TicketsLayout />
              </AuthGuard>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route
            path="/statistics"
            element={
              <AuthGuard>
                <Statistics />
              </AuthGuard>
            }
          />
          <Route
            path="/tickets/:id"
            element={
              <AuthGuard>
                <TicketsLayout />
              </AuthGuard>
            }
          />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <div className={styles.containers}></div>
      </main>
    </>
  );
};

export default App;
