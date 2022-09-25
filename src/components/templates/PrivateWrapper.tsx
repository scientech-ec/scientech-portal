import React from "react";
import { Outlet } from "react-router-dom";
import EmployeeHead from "../organisms/EmployeeHead";

const PrivateWrapper: React.FC = () => {
  return (
    <>
      <EmployeeHead />
      <Outlet />
    </>
  );
};

export default PrivateWrapper;
