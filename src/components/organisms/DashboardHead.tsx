import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { protectedRoutes } from "../../helpers/routes";
import NavBar from "../molecules/NavBar";

const DashboardHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.match(/dashboard$/gi)) {
      document.title = protectedRoutes.dashboard.title;
    }
    Object.keys(protectedRoutes).map((key) => {
      if (protectedRoutes[key].target === pathname) {
        document.title = protectedRoutes[key].title;
        return;
      }
    });
  }, []);

  return <NavBar pages={protectedRoutes} />;
};

export default DashboardHead;
