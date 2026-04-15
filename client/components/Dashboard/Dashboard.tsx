import { useState } from "react";

import { useDashboardData } from "./hooks/useDashboard";

import DashboardHeader from "./DashboardHeader";
import DashboardStats from "./DashboardStats";
import DashboardCharts from "./DashboardCharts";
import TransactionModal from "../Transactions/TransactionsModal";
import CategoryModal from "../Categories/CategoryModal";

import styles from "./Dashboard.module.css";

const Dashboard = () => {
  const { incomeExpenseData, categoryData, monthlyData, totals } =
    useDashboardData();

  const [openCategoryModal, setOpenCategoryModal] = useState(false);
  const [openTransactionModal, setOpenTransactionModal] = useState(false);

  return (
    <div className={styles.container}>
      <DashboardHeader
        onAddCategory={() => setOpenCategoryModal(true)}
        onAddTransaction={() => setOpenTransactionModal(true)}
      />

      <DashboardStats totals={totals} />

      <DashboardCharts
        incomeExpenseData={incomeExpenseData}
        categoryData={categoryData}
        monthlyData={monthlyData}
      />

      {openCategoryModal && (
        <CategoryModal
          mode="create"
          onClose={() => setOpenCategoryModal(false)}
        />
      )}

      {openTransactionModal && (
        <TransactionModal
          mode="create"
          onClose={() => setOpenTransactionModal(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
