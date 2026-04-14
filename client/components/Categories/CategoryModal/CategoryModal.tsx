import { FC, FormEvent, useState } from "react";
import { useCreateCategoryMutation } from "@/store/api/categoriesApi";
import { ChartBarStacked } from "lucide-react";

import Input from "@/shared/ui/Input";

import styles from "./CategoryModal.module.css";

interface IProps {
  onClose: () => void;
}

const CategoryModal: FC<IProps> = ({ onClose }) => {
  const [name, setName] = useState("");
  const [createCategory] = useCreateCategoryMutation();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!name) return;

    try {
      await createCategory({ name }).unwrap();
      setName("");
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.overlay}>
      <form onSubmit={handleSubmit} className={styles.modal}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <ChartBarStacked />
          </div>

          <h2 className={styles.title}>Add Category</h2>
          <p className={styles.subtitle}>Create a new spending category</p>
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

          <button type="submit" className={`${styles.btn} ${styles.submit}`}>
            Create Category
          </button>
        </div>
      </form>
    </div>
  );
};

export default CategoryModal;
