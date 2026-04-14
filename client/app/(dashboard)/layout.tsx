"use client";

import Sidebar from "@/shared/ui/Sidebar/Sidebar";
import { FC, useState } from "react";
import { CircleDollarSign, Menu } from "lucide-react";

import styles from "./DashboardLayout.module.css";

const DashboardLayout: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className={styles.container}>
      <Sidebar open={sidebarOpen} setOpen={setSidebarOpen} />

      <div className={styles.wrapper}>
        <header className={styles.header}>
          <button
            onClick={() => setSidebarOpen((prev) => !prev)}
            className={styles.button}
          >
            <Menu />
          </button>

          <div className={styles.titleWrapper}>
            <div className={styles.logo}>
              <CircleDollarSign fill="white" />
            </div>

            <h1 className={styles.title}>Finance Dashboard</h1>
          </div>
        </header>

        <main className={styles.main}>{children}</main>
      </div>
    </div>
  );
};

export default DashboardLayout;
