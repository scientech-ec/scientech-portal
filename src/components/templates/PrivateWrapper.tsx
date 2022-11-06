import jwtDecode from "jwt-decode";
import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { protectedRoutes } from "../../helpers/routes";
import { useRealmApp } from "../../hooks/useRealmApp";
import AppSelector from "../molecules/AppSelector";
import DashboardHeader from "../molecules/DashboardHeader";

const PrivateWrapper: React.FC = () => {
  const { currentUser } = useRealmApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      if (!currentUser) {
        navigate("/login");
      }

      if (currentUser.accessToken) {
        const { exp } = jwtDecode(currentUser.accessToken);
        const isExpired = Date.now() >= exp * 1000;

        if (isExpired) {
          navigate("/login");
        }
      }
    };

    verifyToken();
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
