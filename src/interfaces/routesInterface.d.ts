export type RouteObject = {
  name: string;
  title: string;
  target: string;
};

export type RoutesInterface = Record<string, RouteObject>;
