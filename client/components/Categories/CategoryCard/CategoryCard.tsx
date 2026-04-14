"use client";

import { FC } from "react";
import styles from "./CategoryCard.module.css";

import { Trash2, Pencil } from "lucide-react";

interface IProps {
  id: string;
  name: string;
  onDelete: (id: string) => void;
  onEdit: (id: string) => void;
}

const CategoryCard: FC<IProps> = ({ id, name, onDelete, onEdit }) => {
  return (
    <div className={styles.card}>
      <div className={styles.left}>
        <div className={styles.icon} />
        <span className={styles.name}>{name}</span>
      </div>

      <div className={styles.actions}>
        <button
          onClick={() => onEdit(id)}
          className={`${styles.btn} ${styles.edit}`}
        >
          <Pencil size={16} />
        </button>

        <button
          onClick={() => onDelete(id)}
          className={`${styles.btn} ${styles.delete}`}
        >
          <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
};

export default CategoryCard;
