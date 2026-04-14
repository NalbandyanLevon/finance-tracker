"use client";

import Link from "next/link";
import { Lock } from "lucide-react";

import { useLoginForm } from "@/shared/hooks/auth/useLoginForm";
import Input from "@/shared/ui/Input";

import styles from "./LoginPage.module.css";

const LoginPage = () => {
  const {
    email,
    password,
    setEmail,
    setPassword,
    error,
    isLoading,
    handleSubmit,
  } = useLoginForm();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <Lock />
          <h1>Welcome Back</h1>
          <p>Sign in to your account</p>
        </div>

        {error && <div className={styles.errorBox}>{error}</div>}

        <form onSubmit={handleSubmit} className={styles.form}>
          <Input
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button disabled={isLoading} className={styles.button}>
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <p className={styles.footer}>
          Don’t have an account? <Link href="/register">Create account</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
