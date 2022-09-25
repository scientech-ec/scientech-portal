import React from "react";
import { Outlet } from "react-router-dom";
import ClientFooter from "../organisms/ClientFooter";
import ClientHead from "../organisms/ClientHead";

const ClientWrapper: React.FC = () => {
  return (
    <>
      <ClientHead />
      <Outlet />
      <ClientFooter />
    </>
  );
};

export default ClientWrapper;
