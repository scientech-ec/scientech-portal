import React from "react";
import { RouteObject } from "../../interfaces/routesInterface";
import Scientech from "../atoms/logos/Scientech";
import NavButton from "../atoms/navbar/NavButton";

interface Props {
  pages: {
    [key: string]: RouteObject;
  };
}

const NavBar: React.FC<Props> = ({ pages }) => {
  return (
    <header>
      <nav className="flex justify-between bg-sky-500">
        <div className="flex">
          <Scientech />
          <div>
            {Object.keys(pages).map((k, i) => (
              <NavButton
                key={i}
                target={pages[k].target}
                caption={pages[k].name}
              />
            ))}
          </div>
        </div>
        <div>
          <a href="">Iniciar sesion</a>
        </div>
      </nav>
    </header>
  );
};

export default NavBar;
