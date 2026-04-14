"use client";

import { ICategoryData } from "@/types/chartTypes";
import { FC } from "react";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";

import styles from "./CategoryPieChart.module.css";

interface IProps {
  data: ICategoryData[];
}

const COLORS = ["#34D399", "#FBBF24", "#3B82F6", "#F87171", "#A78BFA"];

const CategoryPieChart: FC<IProps> = ({ data }) => {
  return (
    <div className={styles.card}>
      <h3 className={styles.title}>Spending by Category</h3>

      <ResponsiveContainer width="100%" height={250}>
        <PieChart>
          <Pie
            data={data}
            dataKey="value"
            nameKey="name"
            outerRadius={80}
            fill="#8884d8"
            label
          >
            {data.map((entry, index) => (
              <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>

          <Tooltip />
          <Legend />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
};

export default CategoryPieChart;
