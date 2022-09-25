import { app, Realm } from "./mongoDB/realmApp";

export const loginUser = async (email: string, password: string) => {
  const credentials = Realm.Credentials.emailPassword(email, password);
  try {
    const user = await app.logIn(credentials);
    console.assert(user.id === app.currentUser?.id);
    return user;
  } catch (error) {
    console.error("Failed to log in", error);
  }
};
