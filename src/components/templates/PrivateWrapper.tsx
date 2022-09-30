import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useRealmApp } from "../../hooks/useRealmApp";
import DashboardHead from "../organisms/DashboardHead";

const PrivateWrapper: React.FC = () => {
  const { currentUser } = useRealmApp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.isLoggedIn) {
      navigate("/login");
    }
  }, [currentUser]);

  return (
    <>
      <DashboardHead />
      <Outlet />
    </>
  );
};

export default PrivateWrapper;
