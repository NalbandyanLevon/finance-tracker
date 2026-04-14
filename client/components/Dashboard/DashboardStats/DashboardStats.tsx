import { FC } from "react";

import styles from "./DashboardStats.module.css";

interface IProps {
  totals: {
    income: number;
    expense: number;
    balance: number;
  };
}

const DashboardStats: FC<IProps> = ({ totals }) => {
  return (
    <div className={styles.statsGrid}>
      <div className={`${styles.card} ${styles.greenCard}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconBox} ${styles.greenIcon}`} />
          <p className={styles.greenText}>Total Income</p>
        </div>
        <h2>{totals.income.toLocaleString()}$</h2>
      </div>

      <div className={`${styles.card} ${styles.redCard}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconBox} ${styles.redIcon}`} />
          <p className={styles.redText}>Total Expense</p>
        </div>
        <h2>{totals.expense.toLocaleString()}$</h2>
      </div>

      <div className={`${styles.card} ${styles.purpleCard}`}>
        <div className={styles.cardHeader}>
          <div className={`${styles.iconBox} ${styles.purpleIcon}`} />
          <p className={styles.purpleText}>Balance</p>
        </div>
        <h2>{totals.balance.toLocaleString()}$</h2>
      </div>
    </div>
  );
};

export default DashboardStats;
