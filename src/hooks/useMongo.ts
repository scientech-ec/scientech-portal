import { useRealmApp } from "./useRealmApp";

interface CollectionConfig {
  cluster: string;
  db: string;
  collection: string;
}

export const useMongo = ({ cluster, db, collection }: CollectionConfig) => {
  const { currentUser } = useRealmApp();

  return (
    currentUser &&
    currentUser.mongoClient(cluster).db(db).collection(collection)
  );
};
