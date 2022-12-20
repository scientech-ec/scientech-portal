import { BSON, User } from "realm-web";
import { DocumentHeader } from "../../interfaces/calculatorApp";

export interface mongoDBDatabaseID {
  cluster: string;
  db: string;
  collection: string;
}

export const inputsDatabaseId: mongoDBDatabaseID = {
  cluster: import.meta.env.VITE_CLUSTER_NAME,
  db: import.meta.env.VITE_DB_IMPORT_CALCULATOR,
  collection: import.meta.env.VITE_IMPORT_CALCULATOR_DATA,
};

export const headerDatabaseId: mongoDBDatabaseID = {
  cluster: import.meta.env.VITE_CLUSTER_NAME,
  db: import.meta.env.VITE_DB_IMPORT_CALCULATOR,
  collection: import.meta.env.VITE_IMPORT_CALCULATOR_HEADER,
};

export class CalculatorStorage {
  #database: Realm.Services.MongoDB.MongoDBCollection<any>;

  constructor(user: User, { cluster, db, collection }: mongoDBDatabaseID) {
    this.#database =
      user && user.mongoClient(cluster).db(db).collection(collection);
  }

  getIndex = async (): Promise<DocumentHeader[]> => {
    return await this.#database.find({});
  };

  getDocument = async (id: string) => {
    const _id = new BSON.ObjectID(id);
    return await this.#database.findOne({ _id });
  };

  deleteDocument = async (id: string) => {
    const _id = new BSON.ObjectID(id);
    await this.#database.deleteOne({ _id });
  };

  saveNewDocument = async (data: any) => {
    await this.#database.insertOne(data);
  };

  updateDocument = async (id: any, data: any) => {
    const _id = new BSON.ObjectID(id);
    const updatedData = Object.assign({}, data, _id);
    await this.#database.findOneAndReplace({ _id }, updatedData);
  };
}
