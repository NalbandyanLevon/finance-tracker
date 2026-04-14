"use client";

import { FC } from "react";

import styles from "./Loader.module.css";

interface IProps {
  text?: string;
}

const Loader: FC<IProps> = ({ text = "Loading..." }) => {
  return (
    <div className={styles.overlay}>
      <div>
        <div className={styles.loader}></div>
        <p className={styles.text}>{text}</p>
      </div>
    </div>
  );
};

export default Loader;
