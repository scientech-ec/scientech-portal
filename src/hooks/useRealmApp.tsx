import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Realm from "realm-web";

interface Props {
  appId: string;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface ValueInterface extends Realm.App {
  currentUser: Realm.User;
  logIn: (credentials: Realm.Credentials) => Promise<void>;
  logOut: () => Promise<void>;
}

const realmAppContext = createContext({} as ValueInterface);

const createRealmApp = (id: string) => {
  return new Realm.App({ id });
};

export const RealmAppProvider: React.FC<Props> = ({ appId, children }) => {
  const [realmApp, setRealmApp] = useState<Realm.App>(createRealmApp(appId));
  const [currentUser, setCurrentUser] = useState(realmApp.currentUser);

  useEffect(() => {
    setRealmApp(createRealmApp(appId));
  }, [appId]);

  const logIn = useCallback(
    async (credentials: Realm.Credentials) => {
      await realmApp.logIn(credentials);
      setCurrentUser(realmApp.currentUser);
    },
    [realmApp]
  );

  const logOut = useCallback(async () => {
    await currentUser?.logOut();
    await realmApp.removeUser(currentUser as Realm.User);
    setCurrentUser(realmApp.currentUser);
  }, [realmApp, currentUser]);

  const value = useMemo(() => {
    return { ...realmApp, currentUser, logIn, logOut };
  }, [realmApp, currentUser, logIn, logOut]);

  return (
    <realmAppContext.Provider value={value as ValueInterface}>
      {children}
    </realmAppContext.Provider>
  );
};

export const useRealmApp = () => {
  return useContext(realmAppContext);
};
