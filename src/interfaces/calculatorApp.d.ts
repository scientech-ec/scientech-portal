export type LotCost = {
  originTaxes: number;
  originFleet: number;
  importFleetPerLibre: number;
  importProcedure: number;
  customsAgent: number;
  localFleet: number;
  bankExpenses: number;
  [key: string]: number;
};

export type ArticleData = {
  [key: string]: number | string;
  qty: number;
  name: string;
  tariffRate: number;
  unitWeight: number;
  unitPrice: number;
  margin: number;
  bunchCost: number;
  unitProfit: number;
  unitFinalPrice: number;
};

export type Calculator = {
  lot: LotCost;
  articles: ArticleData[];
  _id?: BSON.ObjectID;
};

export type ArticlesHeader = {
  name: string;
  type: string;
  title: string;
  initialValue: number | string;
};

export type CalculationValues = {
  itemWeight: number;
  EXW: number;
  weightFraction: number;
  FOB: number;
  ISD: number;
  CIF: number;
  FODINFA: number;
  tariff: number;
};

export type DocumentHeader = {
  name: string;
  description: string;
  documentData_Id?: BSON.ObjectID;
  articlesQty: number;
  timestamp?: number;
  _id?: BSON.ObjectID;
};
