import React from "react";
import { Link } from "react-router-dom";
import styles from "./PageNotFound.module.css";

const PageNotFound: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404 - Page Not Found</h1>
      <p className={styles.message}>
        Sorry, the page you are looking for does not exist.
      </p>
      <Link className={styles.link} to="/">
        Go back to the homepage
      </Link>
    </div>
  );
};

export default PageNotFound;
