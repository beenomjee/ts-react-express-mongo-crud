import React from "react";
import styles from "./ErrorPage.module.css";
import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <h1>Oops!</h1>
        <p>Something went wrong. Please try again later.</p>
        <button onClick={() => navigate("/", { replace: true })}>
          Go Home
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
