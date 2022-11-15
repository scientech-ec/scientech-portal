import jwtDecode from "jwt-decode";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import * as Realm from "realm-web";
import { getExpTime } from "../helpers/localStorage";

interface Props {
  appId: string;
  children: React.ReactNode;
}

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
interface ValueInterface extends Realm.App {
  currentUser: Realm.User;
  refreshToken: () => Promise<void>;
  isLoggedIn: () => boolean;
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

      const sessionTime = 12 * 60 * 60 * 1000; // 12 hours session time
      const expTime = Date.now() + sessionTime;
      localStorage.setItem("expTime", expTime.toString());
    },
    [realmApp]
  );

  const refreshToken = async () => {
    if (currentUser && currentUser?.accessToken) {
      const { exp } = jwtDecode(currentUser.accessToken) as { exp: number };
      const isExpired = Date.now() >= exp * 1000;

      if (isExpired) {
        currentUser.refreshCustomData();
      }
    }
  };

  const isLoggedIn = (): boolean => {
    if (currentUser && currentUser.isLoggedIn && currentUser.accessToken) {
      const expTime = getExpTime();

      if (expTime && Date.now() <= expTime) {
        return true;
      }
    }

    return false;
  };

  const logOut = useCallback(async () => {
    await currentUser?.logOut();
    localStorage.removeItem("expTime");
    await realmApp.removeUser(currentUser as Realm.User);
    setCurrentUser(realmApp.currentUser);
  }, [realmApp, currentUser]);

  const value = useMemo(() => {
    return {
      ...realmApp,
      currentUser,
      logIn,
      logOut,
      refreshToken,
      isLoggedIn,
    };
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
