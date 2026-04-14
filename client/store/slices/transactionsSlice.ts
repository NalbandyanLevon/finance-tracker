import { createSlice, PayloadAction } from "@reduxjs/toolkit";


export interface IFilters {
  type: "expense" | "income" | null;
  category: string | null;
  startDate: string | null;
  endDate: string | null;
}
interface TransactionState {
  filters: IFilters;
  selectedTransactionId: string | null;
  isModalOpen: boolean;
}

export const initialState: TransactionState = {
  filters: {
    type: null,
    category: null,
    startDate: null,
    endDate: null,
  },
  selectedTransactionId: null,
  isModalOpen: false,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    setFilters: (state, { payload }: PayloadAction<Partial<IFilters>>) => {
      state.filters = { ...state.filters, ...payload };
    },

    clearFilters: (state) => {
      state.filters = initialState.filters;
    },

    setSelectedTransaction: (
      state,
      { payload }: PayloadAction<string | null>,
    ) => {
      state.selectedTransactionId = payload;
    },

    openModal: (state) => {
      state.isModalOpen = true;
    },

    closeModal: (state) => {
      state.isModalOpen = false;
    },
  },
});

export const {
  setFilters,
  clearFilters,
  setSelectedTransaction,
  openModal,
  closeModal,
} = transactionsSlice.actions;

export const transactionReducer = transactionsSlice.reducer;
