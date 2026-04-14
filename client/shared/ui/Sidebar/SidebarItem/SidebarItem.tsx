"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import styles from "./SidebarItem.module.css";
import { ReactNode } from "react";

export default function SidebarItem({
  href,
  label,
  icon,
}: {
  href: string;
  label: string;
  icon: ReactNode;
}) {
  const pathname = usePathname();
  const isActive = pathname === href;

  return (
    <Link
      href={href}
      className={`${styles.item} ${isActive ? styles.active : styles.default}`}
    >
      {icon}
      <span className={styles.label}>{label}</span>
    </Link>
  );
}
