import React from "react";
import { NavLink } from "react-router-dom";
import { protectedRoutes } from "../../helpers/routes";

const AppSelector: React.FC = () => {
  return (
    <nav className="flex flex-col border-r-2">
      {Object.keys(protectedRoutes).map(
        (key, i) =>
          key !== "dashboard" && (
            <NavLink
              className={({ isActive }: { isActive: boolean }) =>
                (isActive ? "bg-red-500" : "") + " border-b px-2 py-3"
              }
              key={i}
              to={protectedRoutes[key].target}
            >
              {protectedRoutes[key].name}
            </NavLink>
          )
      )}
    </nav>
  );
};

export default AppSelector;
