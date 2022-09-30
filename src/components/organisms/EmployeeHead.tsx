import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { appsRoutes, employeeRoutes } from "../../helpers/routes";
import NavBar from "../molecules/NavBar";

const EmployeeHead: React.FC = () => {
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.match(/dashboard$/gi)) {
      document.title = employeeRoutes.dashboard.title;
    }
    Object.keys(appsRoutes).map((key) => {
      if (appsRoutes[key].target === pathname) {
        document.title = appsRoutes[key].title;
        return;
      }
    });
  }, []);

  return <NavBar pages={appsRoutes} />;
};

export default EmployeeHead;
