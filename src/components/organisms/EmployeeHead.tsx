import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";
import routes from "../../helpers/routes";
import NavBar from "../molecules/NavBar";

const EmployeeHead: React.FC = () => {
  const { apps } = routes;
  const { pathname } = useLocation();

  useEffect(() => {
    if (pathname.match(/dashboard$/gi)) {
      document.title = routes.employee.dashboard.title;
    }
    Object.keys(apps).map((key) => {
      if (apps[key].target === pathname) {
        document.title = apps[key].title;
        return;
      }
    });
  }, []);

  return <NavBar pages={apps} />;
};

export default EmployeeHead;
