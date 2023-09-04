import React from "react";
import styles from "./Home.module.css";
import HeroSection from "../assets/HeroSection.png";
import { useNavigate } from "react-router-dom";

const Home: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className={styles.hero}>
      <div className={styles.heroContent}>
        <h1 className={styles.heroHeading}>
          Effortless Task Management System
        </h1>
        <p className={styles.heroSubheading}>
          Stay organized, boost productivity, and conquer your tasks.
        </p>
        <button
          className={styles.getStartedButton}
          onClick={() => {
            navigate("/login");
          }}
        >
          Get Started
        </button>
      </div>
      <div className={styles.heroImage}>
        <img src={HeroSection} alt="Task Management" />
      </div>
    </div>
  );
};

export default Home;
