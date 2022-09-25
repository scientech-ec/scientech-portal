import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import routes from "../../helpers/routes";
import NavBar from "../molecules/NavBar";

const ClientHead: React.FC = () => {
  const { client } = routes;
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    Object.keys(client).map((key) => {
      if (client[key].target === pathname) {
        document.title = client[key].title;
      }
    });
  }, [pathname]);

  // todo: when dev is over, remove the following useEffect
  useEffect(() => {
    navigate(client.underConstruction.target, { replace: true });
  }, []);

  return <NavBar pages={client} />;
};

export default ClientHead;
