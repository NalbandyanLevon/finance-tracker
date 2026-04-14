import { FC } from "react";

import {
  ICategoryData,
  IIncomeExpenseData,
  IMonthlyData,
} from "@/types/chartTypes";

import IncomeExpenseChart from "@/components/Charts/IncomeExpenseChart";
import CategoryPieChart from "@/components/Charts/CategoryPieChart";
import MonthlyBarChart from "@/components/Charts/MonthlyBarChart";

import styles from "./DashboardCharts.module.css";

interface IProps {
  incomeExpenseData: IIncomeExpenseData[];
  categoryData: ICategoryData[];
  monthlyData: IMonthlyData[];
}

const DashboardCharts: FC<IProps> = ({
  incomeExpenseData,
  categoryData,
  monthlyData,
}) => {
  return (
    <>
      <div className={styles.chartsGrid}>
        <div className={styles.chartCard}>
          <h3>Income vs Expense</h3>
          <IncomeExpenseChart data={incomeExpenseData} />
        </div>

        <div className={styles.chartCard}>
          <h3>Categories</h3>
          <CategoryPieChart data={categoryData} />
        </div>
      </div>

      <div className={styles.fullChart}>
        <h3>Monthly Overview</h3>
        <MonthlyBarChart data={monthlyData} />
      </div>
    </>
  );
};

export default DashboardCharts;
