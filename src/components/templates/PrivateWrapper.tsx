import React, { useEffect } from "react";
import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { protectedRoutes } from "../../helpers/routes";
import { useRealmApp } from "../../hooks/useRealmApp";
import Scientech from "../atoms/logos/Scientech";
import AppSelector from "../molecules/AppSelector";

const PrivateWrapper: React.FC = () => {
  const { currentUser, logOut } = useRealmApp();
  const { pathname } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser || !currentUser.isLoggedIn) {
      navigate("/login");
    }
  }, [currentUser]);

  useEffect(() => {
    Object.keys(protectedRoutes).map((key) => {
      if (protectedRoutes[key].target === pathname) {
        document.title = protectedRoutes[key].title;
        return;
      }
    });
  }, [pathname]);
  return (
    <>
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
      <main className="flex">
        <AppSelector />
        <Outlet />
      </main>
    </>
  );
};

export default PrivateWrapper;
