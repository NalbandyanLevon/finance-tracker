"use client";

import Link from "next/link";
import { UserPlus } from "lucide-react";

import { useRegisterForm } from "@/shared/hooks/auth/useRegisterForm";
import Input from "@/shared/ui/Input";

import styles from "./RegisterPage.module.css";

const RegisterPage = () => {
  const { form, error, isLoading, onChange, onSubmit } = useRegisterForm();

  return (
    <div className={styles.container}>
      <div className={styles.card}>
        <div className={styles.header}>
          <div className={styles.iconWrapper}>
            <UserPlus />
          </div>

          <h1 className={styles.title}>Create Account</h1>
          <p className={styles.subtitle}>Start managing your finances</p>
        </div>

        {error && (
          <div className={styles.errorBox}>
            <p className={styles.errorText}>{error}</p>
          </div>
        )}

        <form onSubmit={onSubmit} className={styles.form}>
          <Input
            label="Email"
            type="email"
            value={form.email}
            onChange={(e) => onChange("email", e.target.value)}
          />

          <Input
            label="Password"
            type="password"
            value={form.password}
            onChange={(e) => onChange("password", e.target.value)}
          />

          <Input
            label="Confirm Password"
            type="password"
            value={form.confirmPassword}
            onChange={(e) => onChange("confirmPassword", e.target.value)}
          />

          <button className={styles.button} disabled={isLoading}>
            {isLoading ? "Creating account..." : "Create Account"}
          </button>
        </form>

        <p className={styles.footer}>
          Already have an account?
          <Link href="/login" className={styles.link}>
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
