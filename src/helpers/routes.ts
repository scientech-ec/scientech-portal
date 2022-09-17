import { RoutesInterface } from '../interfaces/routesInterface';

const routes: RoutesInterface = {
  client: {
    home: { title: 'Inicio | Scientech', name: 'Inicio', target: '/' },
    products: {
      title: 'Catálogo | Scientech',
      name: 'Productos',
      target: '/productos',
    },
    contact: {
      title: 'Contacto | Scientech',
      name: 'Contacto',
      target: '/contacto',
    },
  },
  employee: {
    login: {
      title: 'Contacto | Scientech',
      name: 'Contacto',
      target: '/contacto',
    },
  },
};

export default routes;
