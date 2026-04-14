"use client";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/store/api/categoriesApi";
import { useState } from "react";
import Loader from "@/shared/ui/Loader/Loader";
import CategoryCard from "@/components/Categories/CategoryCard/CategoryCard";
import CategoryModal from "@/components/Categories/CategoryModal";

import styles from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const { data: categories = [], isLoading } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [open, setOpen] = useState(false);

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  //TODO add edit logic
  const handleEdit = (id: string) => {
    console.log("edit:", id);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <div className={styles.titleBlock}>
          <h1>Categories</h1>
          <p>Manage your spending categories</p>
        </div>

        <div className={styles.rightPanel}>
          <div className={styles.count}>{categories.length} categories</div>

          <button onClick={() => setOpen(true)} className={styles.button}>
            + Add Category
          </button>
        </div>
      </div>
      {open && <CategoryModal onClose={() => setOpen(false)} />}
      <div className={styles.list}>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              onDelete={handleDelete}
              onEdit={handleEdit}
            />
          ))
        ) : (
          <div className={styles.empty}>
            <p>No categories found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default CategoriesPage;
