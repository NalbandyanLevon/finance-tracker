"use client";

import { FC } from "react";
import { AlertTriangle } from "lucide-react";

import styles from "./ConfirmModal.module.css";

interface IProps {
  title?: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
  onClose: () => void;
  isLoading?: boolean;
}

const ConfirmModal: FC<IProps> = ({
  title = "Are you sure?",
  description = "This action cannot be undone.",
  confirmText = "Delete",
  cancelText = "Cancel",
  onConfirm,
  onClose,
  isLoading = false,
}) => {
  return (
    <div className={styles.overlay}>
      <div className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <AlertTriangle />
          </div>

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.description}>{description}</p>
        </div>

        <div className={styles.actions}>
          <button
            onClick={onClose}
            className={`${styles.btn} ${styles.cancel}`}
            disabled={isLoading}
          >
            {cancelText}
          </button>

          <button
            onClick={onConfirm}
            className={`${styles.btn} ${styles.confirm}`}
            disabled={isLoading}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmModal;
