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
  tariff: number;
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
};

export type ArticlesHeader = {
  name: string;
  type: string;
  title: string;
  initialValue: number | string;
};
