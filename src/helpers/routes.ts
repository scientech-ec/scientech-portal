import { RoutesInterface } from '../interfaces/routesInterface';

const routes: RoutesInterface = {
  client: {
    home: { title: 'Inicio | Scientech Ecuador', name: 'Inicio', target: '/' },
    products: {
      title: 'Catálogo | Scientech Ecuador',
      name: 'Productos',
      target: '/productos',
    },
    contact: {
      title: 'Contacto | Scientech Ecuador',
      name: 'Contacto',
      target: '/contacto',
    },
    'under-construction': {
      title: 'Esperanos | Scientech Ecuador',
      name: 'Contacto',
      target: '/en_construccion',
    },
  },
  employee: {
    login: {
      title: 'Contacto | Scientech Ecuador',
      name: 'Contacto',
      target: '/contacto',
    },
  },
};

export default routes;
