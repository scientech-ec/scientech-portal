import React, { useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { publicRoutes } from "../../helpers/routes";
import PublicFooter from "../organisms/PublicFooter";
import PublicHeader from "../organisms/PublicHeader";

const PublicWrapper: React.FC = () => {
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

  return (
    <>
      <PublicHeader />
      <Outlet />
      <PublicFooter />
    </>
  );
};

export default PublicWrapper;
