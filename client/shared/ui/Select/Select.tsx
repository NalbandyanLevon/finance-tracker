"use client";

import { FC } from "react";

import styles from "./Select.module.css";

interface Option {
  value: string;
  label: string;
}

interface IProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  options: Option[];
}

const Select: FC<IProps> = ({ label, options, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <select className={styles.select} {...props}>
        <option value="">Select...</option>
        {options.map((o) => (
          <option key={o.value} value={o.value}>
            {o.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;
