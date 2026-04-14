"use client";

import { FC } from "react";
import { Home, CreditCard, Layers, LogOut } from "lucide-react";

import { useDispatch } from "react-redux";

import { logout } from "@/store/slices/authSlice";

import { useRouter } from "next/navigation";

import SidebarItem from "./SidebarItem";

import styles from "./Sidebar.module.css";

interface IProps {
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Sidebar: FC<IProps> = ({ open, setOpen }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleOnLogout = () => {
    dispatch(logout());
    router.push("/login");
  };

  return (
    <>
      {open && (
        <div onClick={() => setOpen(false)} className={styles.overlay} />
      )}

      <aside
        className={`${styles.sidebar} ${
          open ? styles.sidebarOpen : styles.sidebarClosed
        }`}
      >
        <div>
          <div className={styles.top}>Finance</div>

          <div className={styles.items}>
            <SidebarItem href="/" label="Dashboard" icon={<Home size={20} />} />
            <SidebarItem
              href="/transactions"
              label="Transactions"
              icon={<CreditCard size={20} />}
            />
            <SidebarItem
              href="/categories"
              label="Categories"
              icon={<Layers size={20} />}
            />
          </div>
        </div>

        <div className={styles.bottom}>
          <button onClick={handleOnLogout} className={styles.logout}>
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </aside>
    </>
  );
};

export default Sidebar;
