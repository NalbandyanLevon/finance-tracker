import { FC } from "react";

import styles from "./DashboardHeader.module.css";

interface IProps {
  onAddCategory: () => void;
  onAddTransaction: () => void;
}

const DashboardHeader: FC<IProps> = ({ onAddCategory, onAddTransaction }) => {
  return (
    <div className={styles.header}>
      <div className={styles.titleBlock}>
        <h1>Dashboard</h1>
        <p>Overview of your financial health</p>
      </div>

      <div className={styles.actions}>
        <button
          className={`${styles.btn} ${styles.btnGreen}`}
          onClick={onAddCategory}
        >
          Add Category
        </button>

        <button
          className={`${styles.btn} ${styles.btnPurple}`}
          onClick={onAddTransaction}
        >
          Add Transaction
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
