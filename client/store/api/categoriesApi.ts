import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import {
  CreateCategoryDTO,
  ICategory,
  UpdateCategoryDTO,
} from "@/types/categoryTypes";

export const categoriesApi = createApi({
  reducerPath: "categoriesApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Categories"],
  endpoints: (builder) => ({
    getAllCategories: builder.query<ICategory[], void>({
      query: () => "/categories",
      providesTags: ["Categories"],
    }),
    getCategoryById: builder.query<ICategory[], void>({
      query: (id) => `/categories/${id}`,
      providesTags: ["Categories"],
    }),
    createCategory: builder.mutation<ICategory, CreateCategoryDTO>({
      query: (body) => ({ url: "/categories", method: "POST", body }),
      invalidatesTags: ["Categories"],
    }),
    updateCategory: builder.mutation<ICategory, UpdateCategoryDTO>({
      query: ({ id, name }) => ({
        url: `/categories/${id}`,
        method: "PUT",
        body: { name },
      }),
      invalidatesTags: ["Categories"],
    }),
    deleteCategory: builder.mutation<void, string>({
      query: (id) => ({ url: `/categories/${id}`, method: "DELETE" }),
      invalidatesTags: ["Categories"],
    }),
  }),
});

export const {
  useGetAllCategoriesQuery,
  useGetCategoryByIdQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoriesApi;
