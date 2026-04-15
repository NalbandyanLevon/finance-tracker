import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "./baseQuery";
import {
  CreateTransactionDTO,
  IResponseTransaction,
  UpdateTransactionDTO,
} from "@/types/transactionTypes";

export const transactionsApi = createApi({
  reducerPath: "transactionsApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["Transactions"],
  endpoints: (builder) => ({
    getTransactions: builder.query<
      IResponseTransaction[],
      { category?: string; type?: string }
    >({
      query: ({ category, type } = {}) => {
        let queryStr = "";
        if (category) queryStr += `category=${category}&`;
        if (type) queryStr += `type=${type}&`;
        return `/transactions?${queryStr}`;
      },
      providesTags: ["Transactions"],
    }),
    createTransaction: builder.mutation<
      IResponseTransaction,
      CreateTransactionDTO
    >({
      query: (body) => ({ url: "/transactions", method: "POST", body }),
      invalidatesTags: ["Transactions"],
    }),
    updateTransaction: builder.mutation<
      IResponseTransaction,
      UpdateTransactionDTO
    >({
      query: ({ id, amount, category_id, type }) => ({
        url: `/transactions/${id}`,
        method: "PUT",
        body: { amount, category_id, type },
      }),
      invalidatesTags: ["Transactions"],
    }),
    deleteTransaction: builder.mutation<void, string>({
      query: (id) => ({ url: `/transactions/${id}`, method: "DELETE" }),
      invalidatesTags: ["Transactions"],
    }),
  }),
});

export const {
  useGetTransactionsQuery,
  useCreateTransactionMutation,
  useUpdateTransactionMutation,
  useDeleteTransactionMutation,
} = transactionsApi;
