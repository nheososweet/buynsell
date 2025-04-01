import { useUserStore } from "@/pages/authenticate/state";
import React from "react";
import { Navigate, useNavigate } from "react-router-dom";

const PrivatePage = ({ children }: React.PropsWithChildren) => {
  const nav = useNavigate();
  const storedType = localStorage.getItem("type");
  if (!storedType) {
    nav("/login");
  }
  return <>{children}</>;
};

export default PrivatePage;
