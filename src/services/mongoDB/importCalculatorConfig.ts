export interface mongoDBDatabaseID {
  cluster: string;
  db: string;
  collection: string;
}

export const importCalculatorData: mongoDBDatabaseID = {
  cluster: import.meta.env.VITE_CLUSTER_NAME,
  db: import.meta.env.VITE_DB_IMPORT_CALCULATOR,
  collection: import.meta.env.VITE_IMPORT_CALCULATOR_DATA,
};

export const importCalculatorHeader: mongoDBDatabaseID = {
  cluster: import.meta.env.VITE_CLUSTER_NAME,
  db: import.meta.env.VITE_DB_IMPORT_CALCULATOR,
  collection: import.meta.env.VITE_IMPORT_CALCULATOR_HEADER,
};
