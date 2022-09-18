import React from 'react';
import underConstruction from '../../assets/under-construction.jpg';
import scientechLarge from '../../assets/scientechLargeBlue.png';
import { Link } from 'react-router-dom';
import routes from '../../helpers/routes';
import { FaUserCircle } from 'react-icons/fa';

const UnderConstruction: React.FC = () => {
  return (
    <main className="fixed inset-0 w-screen h-screen z-50 bg-white">
      <div className="flex h-screen flex-col items-center justify-center gap-6 md:flex-row">
        <div className="order-1 md:flex-1">
          <img src={underConstruction} alt="under-construction" />
        </div>
        <div className="flex flex-col items-center justify-center gap-6 p-10 md:flex-1">
          <h2 className="text-center text-lg font-bold md:text-3xl">
            Espera noticias de nosotros <br />
            MUY PRONTO!
          </h2>
          <img
            className="w-1/2 md:w-4/5"
            src={scientechLarge}
            alt="Scientech Logo"
          />
        </div>
        <div
          className="absolute top-2
      right-2 z-10 flex items-center"
        >
          <Link
            type="button"
            to={routes.employee.login.target}
            className="flex items-center space-x-2 rounded-full border py-1 px-2 text-gray-400 hover:text-gray-600 hover:outline-none hover:ring-2 hover:ring-white hover:ring-offset-2 hover:ring-offset-gray-800"
          >
            <span className="text-sm">Iniciar sesión</span>
            <FaUserCircle className="h-6 w-6" />
          </Link>
        </div>
      </div>
      En construcción
    </main>
  );
};

export default UnderConstruction;
