import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { transactionsApi } from "./api/transactionsApi";
import { categoriesApi } from "./api/categoriesApi";
import { authReducer } from "./slices/authSlice";
import { transactionReducer } from "./slices/transactionsSlice";

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [transactionsApi.reducerPath]: transactionsApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    auth: authReducer,
    transactions: transactionReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(
      authApi.middleware,
      transactionsApi.middleware,
      categoriesApi.middleware,
    );
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
