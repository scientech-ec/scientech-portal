import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { publicRoutes } from "../../helpers/routes";
import NavBar from "../molecules/NavBar";

const PublicHead: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    Object.keys(publicRoutes).map((key) => {
      if (publicRoutes[key].target === pathname) {
        document.title = publicRoutes[key].title;
      }
    });
  }, [pathname]);

  // todo: when dev is over, remove the following useEffect
  useEffect(() => {
    navigate(publicRoutes.underConstruction.target, { replace: true });
  }, []);

  return <NavBar pages={publicRoutes} />;
};

export default PublicHead;
