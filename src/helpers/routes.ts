import { RouteObject } from "../interfaces/routesInterface";

type PublicRoutes = {
  home: RouteObject;
  products: RouteObject;
  contact: RouteObject;
  underConstruction: RouteObject;
  [key: string]: RouteObject;
};

type ProtectedRoutes = {
  dashboard: RouteObject;
  calculator: RouteObject;
  [key: string]: RouteObject;
};

export const login = {
  title: "Login | Scientech Ecuador",
  name: "Login",
  target: "/login",
};

export const publicRoutes: PublicRoutes = {
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

export const protectedRoutes: ProtectedRoutes = {
  dashboard: {
    title: "Dashboard | Scientech Ecuador",
    name: "Dashboard",
    target: "/dashboard",
  },
  calculator: {
    title: "Calculadora de Importaciones | Scientech Ecuador",
    name: "Calculadora",
    target: "/dashboard/calculadora",
  },
};
