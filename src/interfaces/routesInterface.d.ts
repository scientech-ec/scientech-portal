export type RouteObject = {
  name: string;
  title: string;
  target: string;
};

export type RoutesInterface = {
  client: {
    [key: string]: RouteObject;
  };
  employee: {
    [key: string]: RouteObject;
  };
};
