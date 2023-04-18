import styles from "./Dialog.module.css";
import React, { FC } from "react";

interface Props {
  title: string;
  message: string;
  clickHandler: (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isPermit: boolean
  ) => void;
  isOpen: boolean;
}

const Dialog: FC<Props> = ({ message, title, clickHandler, isOpen }) => {
  return (
    <div className={`${styles.container} ${isOpen ? styles.open : ""}`}>
      <div className={styles.dialog}>
        <div className={styles.top}>
          <h6>{title}</h6>
          <p>{message}</p>
        </div>
        <div className={styles.bottom}>
          <button onClick={(e) => clickHandler(e, false)}>Cancel</button>
          <button onClick={(e) => clickHandler(e, true)}>Okay</button>
        </div>
      </div>
    </div>
  );
};

export default Dialog;
