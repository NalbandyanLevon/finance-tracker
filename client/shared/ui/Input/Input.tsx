import { FC, InputHTMLAttributes } from "react";

import styles from "./Input.module.css";

type TProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

const Input: FC<TProps> = ({ label, error, ...props }) => {
  return (
    <div className={styles.wrapper}>
      {label && <label className={styles.label}>{label}</label>}

      <input
        className={`${styles.input} ${error ? styles.inputError : ""}`}
        {...props}
      />

      {error && <p className={styles.error}>{error}</p>}
    </div>
  );
};

export default Input;
