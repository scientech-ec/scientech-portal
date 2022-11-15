import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginRoute, protectedRoutes } from "../../helpers/routes";
import { useRealmApp } from "../../hooks/useRealmApp";
import Scientech from "../atoms/svg/Scientech";

const DashboardHeader: React.FC = () => {
  const { logOut } = useRealmApp();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logOut();
    navigate(loginRoute.target);
  };
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
        <button
          className="rounded-md bg-black/20 py-2 px-4"
          onClick={handleLogout}
        >
          Salir
        </button>
      </div>
    </header>
  );
};

export default DashboardHeader;
