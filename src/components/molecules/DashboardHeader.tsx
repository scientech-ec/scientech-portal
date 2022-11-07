import React from "react";
import { Link } from "react-router-dom";
import { protectedRoutes } from "../../helpers/routes";
import { useRealmApp } from "../../hooks/useRealmApp";
import Scientech from "../atoms/svg/Scientech";

const DashboardHeader: React.FC = () => {
  const { logOut } = useRealmApp();
  return (
    <header className="sticky flex items-center justify-between bg-scientech p-2">
      <Scientech variant="white" className="h-10" />

      <div className="flex gap-2 ">
        <Link
          className="rounded-md bg-black/20 py-2 px-4"
          to={protectedRoutes.dashboard.target}
        >
          Casita
        </Link>
        <button className="rounded-md bg-black/20 py-2 px-4" onClick={logOut}>
          Salir
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
