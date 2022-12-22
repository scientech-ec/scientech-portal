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

export type ArticleInputs = {
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

export type CalculatorInputs = {
  lot: LotCost;
  articles: ArticleInputs[];
  _id?: BSON.ObjectID;
};

export type ArticlesHeader = {
  name: string;
  type: string;
  title: string;
  initialValue: number | string;
  field: "input" | "span";
  startSymbol?: string;
  endSymbol?: string;
};

export type CalculationOutputs = {
  rowWeight: number;
  EXW: number;
  weightFraction: number;
  FOB: number;
  ISD: number;
  CIF: number;
  FODINFA: number;
  tariff: number;
  bunchCost: number;
  unitProfit: number;
  unitFinalPrice: number;
};

export type DocumentHeader = {
  name: string;
  description: string;
  documentData_Id?: BSON.ObjectID;
  articlesQty: number;
  timestamp?: number;
  _id?: BSON.ObjectID;
};

export type LotSchema = {
  title: string;
  values: {
    name: string;
    value: string;
    endSymbol: string;
    startSymbol?: string;
    endSymbol?: string;
  }[];
};
