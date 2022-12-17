import { BSON } from "realm-web";
import { DocumentHeader } from "../../interfaces/calculatorApp";

export class CalculatorStorage {
  #database: Realm.Services.MongoDB.MongoDBCollection<any>;

  constructor(mongoDBId: Realm.Services.MongoDB.MongoDBCollection<any>) {
    this.#database = mongoDBId;
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
