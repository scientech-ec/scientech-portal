import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { loginRoute, protectedRoutes } from "../../helpers/routes";
import { useRealmApp } from "../../hooks/useRealmApp";
import AppSelector from "../molecules/AppSelector";
import DashboardHeader from "../molecules/DashboardHeader";

const PrivateWrapper: React.FC = () => {
  const { currentUser, isLoggedIn } = useRealmApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(loginRoute.target);
    }
  }, []);

  useEffect(() => {
    if (!isLoggedIn()) {
      navigate(loginRoute.target);
    }
  }, [currentUser]);

  useEffect(() => {
    Object.keys(protectedRoutes).map((key) => {
      if (protectedRoutes[key].target === pathname) {
        document.title = protectedRoutes[key].title;
        return;
      }
    });
  }, [pathname]);
  return (
    <>
      <DashboardHeader />
      <main className="flex">
        <AppSelector />
        <Outlet />
      </main>
    </>
  );
};

export default PrivateWrapper;
