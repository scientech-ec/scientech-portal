import * as Realm from "realm-web";

const config = {
  id: import.meta.env.VITE_REALM_APP,
};

const app = new Realm.App(config);

export { app, Realm };
