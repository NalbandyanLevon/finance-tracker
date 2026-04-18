"use client";

import { useState } from "react";

import Loader from "@/shared/ui/Loader/Loader";
import CategoryCard from "@/components/Categories/CategoryCard";
import CategoryModal from "@/components/Categories/CategoryModal";
import ConfirmModal from "@/shared/ui/ConfirmModal";

import {
  useGetAllCategoriesQuery,
  useDeleteCategoryMutation,
} from "@/store/api/categoriesApi";
import { ICategory } from "@/types/categoryTypes";

import styles from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const { data: categories = [], isLoading } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [createOpen, setCreateOpen] = useState(false);

  const [confirmOpen, setConfirmOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleDeleteClick = (id: string) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (!selectedId) return;

    await deleteCategory(selectedId).unwrap();

    setConfirmOpen(false);
    setSelectedId(null);
  };

  if (isLoading) return <Loader />;

  return (
    <div className={styles.page}>
      <div className={styles.header}>
        <h1>Categories</h1>

        <button onClick={() => setCreateOpen(true)} className={styles.button}>
          + Add Category
        </button>
      </div>

      {createOpen && (
        <CategoryModal mode="create" onClose={() => setCreateOpen(false)} />
      )}

      {confirmOpen && (
        <ConfirmModal
          title="Delete category?"
          description="All related transactions will also be deleted."
          onClose={() => setConfirmOpen(false)}
          onConfirm={handleConfirmDelete}
        />
      )}

      <div className={styles.list}>
        {categories.map((cat: ICategory) => (
          <CategoryCard
            key={cat.id}
            id={cat.id}
            name={cat.name}
            onEdit={() => {}}
            onDelete={handleDeleteClick}
          />
        ))}
      </div>
    </div>
  );
};

export default CategoriesPage;
