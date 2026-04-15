"use client";

import {
  useDeleteCategoryMutation,
  useGetAllCategoriesQuery,
} from "@/store/api/categoriesApi";
import { useState } from "react";
import Loader from "@/shared/ui/Loader/Loader";
import CategoryCard from "@/components/Categories/CategoryCard/CategoryCard";
import CategoryModal from "@/components/Categories/CategoryModal";
import { ICategory } from "@/types/categoryTypes";

import styles from "./CategoriesPage.module.css";

const CategoriesPage = () => {
  const { data: categories = [], isLoading } = useGetAllCategoriesQuery();
  const [deleteCategory] = useDeleteCategoryMutation();

  const [createModalOpen, setCreateModalOpen] = useState(false);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ICategory | null>(
    null,
  );

  const handleDelete = async (id: string) => {
    try {
      await deleteCategory(id).unwrap();
    } catch (err) {
      console.error(err);
    }
  };

  const handleEdit = (category: ICategory) => {
    setUpdateModalOpen(true);
    setSelectedCategory(category);
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

          <button
            onClick={() => setCreateModalOpen(true)}
            className={styles.button}
          >
            + Add Category
          </button>
        </div>
      </div>
      {createModalOpen && (
        <CategoryModal
          mode="create"
          onClose={() => setCreateModalOpen(false)}
        />
      )}
      {updateModalOpen && (
        <CategoryModal
          mode="update"
          categoryId={selectedCategory?.id}
          initialValue={selectedCategory?.name}
          onClose={() => setUpdateModalOpen(false)}
        />
      )}
      <div className={styles.list}>
        {categories.length > 0 ? (
          categories.map((cat) => (
            <CategoryCard
              key={cat.id}
              id={cat.id}
              name={cat.name}
              onDelete={handleDelete}
              onEdit={() => handleEdit(cat)}
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
