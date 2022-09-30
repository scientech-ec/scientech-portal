import React from "react";
import { Outlet } from "react-router-dom";
import PublicFooter from "../organisms/PublicFooter";
import PublicHead from "../organisms/PublicHead";

const PublicWrapper: React.FC = () => {
  return (
    <>
      <PublicHead />
      <Outlet />
      <PublicFooter />
    </>
  );
};

export default PublicWrapper;
