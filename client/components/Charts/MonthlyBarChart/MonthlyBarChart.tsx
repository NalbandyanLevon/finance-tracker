"use client";

import { IMonthlyData } from "@/types/chartTypes";
import { FC } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

import styles from "./MonthlyBarChart.module.css";

interface IProps {
  data: IMonthlyData[];
}

const MonthlyBarChart: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Monthly Income & Expense</h3>

      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="month" />
          <YAxis />
          <Tooltip />
          <Legend />

          <Bar dataKey="income" fill="#10B981" />
          <Bar dataKey="expense" fill="#EF4444" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default MonthlyBarChart;
