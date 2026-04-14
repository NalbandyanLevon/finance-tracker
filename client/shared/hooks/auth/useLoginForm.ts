"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { useLoginMutation } from "@/store/api/authApi";
import { setCredentials, IUserJwt } from "@/store/slices/authSlice";
import { IApiError } from "@/types/types";

export const useLoginForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [login, { isLoading }] = useLoginMutation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      const data = await login({ email, password }).unwrap();

      const user = jwtDecode<IUserJwt>(data.accessToken);

      dispatch(
        setCredentials({
          user,
          accessToken: data.accessToken,
        }),
      );

      router.push("/");
    } catch (err) {
      setError((err as IApiError).data?.message || "Login failed");
    }
  };

  return {
    email,
    password,
    setEmail,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  };
};
