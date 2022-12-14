import React from "react";
import { RoutesInterface } from "../../interfaces/routesInterface";
import NavButton from "../atoms/navbar/NavButton";
import Scientech from "../atoms/svg/Scientech";

interface Props {
  pages: RoutesInterface;
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
