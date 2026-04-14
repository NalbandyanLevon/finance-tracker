import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_AUTH_URL,
    prepareHeaders: (headers) => {
      const accessToken =
        typeof window !== "undefined"
          ? localStorage.getItem("accessToken")
          : null;
      if (accessToken) headers.set("Authorization", `Bearer ${accessToken}`);
      return headers;
    },
  }),
  tagTypes: ["Auth"],
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (body) => ({ url: "/login", method: "POST", body }),
    }),
    register: builder.mutation({
      query: (body) => ({ url: "/register", method: "POST", body }),
    }),
    refresh: builder.mutation({
      query: (body) => ({ url: "/refresh", method: "POST", body }),
    }),
    logout: builder.mutation({
      query: (body) => ({ url: "/logout", method: "POST", body }),
    }),
  }),
});

export const {
  useLoginMutation,
  useRegisterMutation,
  useRefreshMutation,
  useLogoutMutation,
} = authApi;
