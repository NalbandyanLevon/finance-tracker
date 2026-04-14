"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";

import { useRegisterMutation } from "@/store/api/authApi";
import { setCredentials, IUserJwt } from "@/store/slices/authSlice";
import { IApiError } from "@/types/types";

export const useRegisterForm = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [register, { isLoading }] = useRegisterMutation();

  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");

  const onChange = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const validate = () => {
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!validate()) return;

    try {
      const data = await register({
        email: form.email,
        password: form.password,
      }).unwrap();

      const user = jwtDecode<IUserJwt>(data.accessToken);

      dispatch(
        setCredentials({
          user,
          accessToken: data.accessToken,
        }),
      );

      router.push("/");
    } catch (err) {
      setError((err as IApiError).data?.message || "Registration failed");
    }
  };

  return {
    form,
    error,
    isLoading,
    onChange,
    onSubmit,
  };
};
