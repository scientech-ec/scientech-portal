import { RoutesInterface } from "../interfaces/routesInterface";

const routes: RoutesInterface = {
  client: {
    home: { title: "Inicio | Scientech Ecuador", name: "Inicio", target: "/" },
    products: {
      title: "Catálogo | Scientech Ecuador",
      name: "Productos",
      target: "/productos",
    },
    contact: {
      title: "Contacto | Scientech Ecuador",
      name: "Contacto",
      target: "/contacto",
    },
    "under-construction": {
      title: "Esperanos | Scientech Ecuador",
      name: "Contacto",
      target: "/under-construction",
    },
  },
  employee: {
    login: {
      title: "Login | Scientech Ecuador",
      name: "Login",
      target: "/login",
    },
    dashboard: {
      title: "Dashboard | Scientech Ecuador",
      name: "Dashboard",
      target: "/dashboard",
    },
  },
};

export default routes;
