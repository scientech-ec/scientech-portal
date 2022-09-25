export type RouteObject = {
  name: string;
  title: string;
  target: string;
};

export type RoutesInterface = {
  client: Record<string, RouteObject>;
  employee: Record<string, RouteObject>;
  apps: Record<string, RouteObject>;
};
