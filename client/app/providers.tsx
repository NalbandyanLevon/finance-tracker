"use client";

import { Provider } from "react-redux";
import { store } from "@/store/store";
import { FC, ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";
import { jwtDecode } from "jwt-decode";
import { IUserJwt, setCredentials } from "@/store/slices/authSlice";

interface IProps {
  children: ReactNode;
}

const InitAuth: FC<IProps> = ({ children }) => {
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      const user = jwtDecode<IUserJwt>(accessToken);

      dispatch(
        setCredentials({
          user,
          accessToken,
        }),
      );
    }
  }, [dispatch]);

  return <>{children}</>;
};

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <InitAuth>{children}</InitAuth>
    </Provider>
  );
}
