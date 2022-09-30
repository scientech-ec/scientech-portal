import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { clientRoutes } from "../../helpers/routes";
import NavBar from "../molecules/NavBar";

const ClientHead: React.FC = () => {
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    Object.keys(clientRoutes).map((key) => {
      if (clientRoutes[key].target === pathname) {
        document.title = clientRoutes[key].title;
      }
    });
  }, [pathname]);

  // todo: when dev is over, remove the following useEffect
  useEffect(() => {
    navigate(clientRoutes.underConstruction.target, { replace: true });
  }, []);

  return <NavBar pages={clientRoutes} />;
};

export default ClientHead;
