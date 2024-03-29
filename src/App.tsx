import React from "react";
import NavBar from "./components/Navigation/NavBar";
import styles from "./App.module.css";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import TicketsDashboard from "./pages/TicketsDashboard";
import Login from "./pages/Login";
import Statistics from "./pages/Statistics";
import AuthGuard from "./guard/AuthGuard";
import NotificationsList from "./components/Notifications/NotificationsList";
import PageNotFound from "./pages/PageNotFound";
import TicketDetailsPage from "./pages/TicketDetailsPage";
import { useSelector } from "react-redux";
import { RootState } from "./app/Store";

const App: React.FC = () => {
  const darkTheme = useSelector((state: RootState) => state.settings.darkMode);
  const activeTheme = darkTheme ? "" : "light-mode";

  return (
    <>
      <NotificationsList />
      <main className={`${styles.app} ${styles[activeTheme]}`}>
        <NavBar />
        <Routes>
          <Route path="/" element={<Home />} />

          <Route
            path="/tickets"
            element={
              <AuthGuard>
                <TicketsDashboard />
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
                <TicketDetailsPage />
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
