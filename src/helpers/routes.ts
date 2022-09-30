import { RouteObject } from "../interfaces/routesInterface";

type ClientRoutes = {
  home: RouteObject;
  products: RouteObject;
  contact: RouteObject;
  underConstruction: RouteObject;
  [key: string]: RouteObject;
};

type EmployeeRoutes = {
  login: RouteObject;
  dashboard: RouteObject;
  [key: string]: RouteObject;
};

type AppsRoutes = {
  calculator: RouteObject;
  [key: string]: RouteObject;
};

export const clientRoutes: ClientRoutes = {
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
  underConstruction: {
    title: "Esperanos | Scientech Ecuador",
    name: "Contacto",
    target: "/under-construction",
  },
};

export const employeeRoutes: EmployeeRoutes = {
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
};

export const appsRoutes: AppsRoutes = {
  calculator: {
    title: "Calculadora de Importaciones | Scientech Ecuador",
    name: "Calculadora",
    target: "/dashboard/calculadora",
  },
};
