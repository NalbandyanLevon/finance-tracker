"use client";

import { FC, FormEvent, useEffect, useState } from "react";
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
} from "@/store/api/categoriesApi";
import { ChartBarStacked } from "lucide-react";

import Input from "@/shared/ui/Input";
import styles from "./CategoryModal.module.css";

interface IProps {
  mode: "create" | "update";
  onClose: () => void;
  initialValue?: string;
  categoryId?: string;
}

const CategoryModal: FC<IProps> = ({
  mode,
  onClose,
  initialValue = "",
  categoryId,
}) => {
  const [name, setName] = useState(initialValue);

  const [createCategory, { isLoading: isCreating }] =
    useCreateCategoryMutation();
  const [updateCategory, { isLoading: isUpdating }] =
    useUpdateCategoryMutation();

  const isLoading = isCreating || isUpdating;

  useEffect(() => {
    setName(initialValue);
  }, [initialValue]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name.trim()) return;

    try {
      if (mode === "create") {
        await createCategory({ name }).unwrap();
      } else {
        if (!categoryId) return;
        await updateCategory({ id: categoryId, name }).unwrap();
      }

      setName("");
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const title = mode === "create" ? "Add Category" : "Update Category";

  const subtitle =
    mode === "create" ? "Create a new spending category" : "Edit your category";

  const buttonText = mode === "create" ? "Create Category" : "Save Changes";

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <ChartBarStacked />
          </div>

          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>

        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="e.g., Groceries, Entertainment"
        />

        <div className={styles.actions}>
          <button
            type="button"
            className={`${styles.btn} ${styles.cancel}`}
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            type="submit"
            className={`${styles.btn} ${styles.submit}`}
            disabled={isLoading}
          >
            {isLoading ? "Saving..." : buttonText}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryModal;
