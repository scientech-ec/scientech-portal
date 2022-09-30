import React from "react";
import { publicRoutes } from "../../helpers/routes";
import NavBar from "../molecules/NavBar";

const PublicHeader: React.FC = () => {
  return <NavBar pages={publicRoutes} />;
};

export default PublicHeader;
