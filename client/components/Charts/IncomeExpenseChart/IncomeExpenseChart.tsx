"use client";

import { IIncomeExpenseData } from "@/types/chartTypes";
import { FC } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
} from "recharts";

import styles from "./IncomeExpenseChart.module.css";

interface IProps {
  data: IIncomeExpenseData[];
}

const IncomeExpenseChart: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Income vs Expense</h3>

      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="date" />
          <YAxis />
          <Tooltip />

          <Line type="monotone" dataKey="income" stroke="#10B981" />
          <Line type="monotone" dataKey="expense" stroke="#EF4444" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default IncomeExpenseChart;
