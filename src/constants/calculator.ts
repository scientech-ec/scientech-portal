import type { ArticleData, Calculator } from "../interfaces/calculatorApp";

export const newArticle: ArticleData = {
  qty: 0,
  name: "",
  tariff: 0,
  unitWeight: 0,
  unitPrice: 0,
  margin: 0,
  bunchCost: 0,
  unitProfit: 0,
  unitFinalPrice: 0,
};

export const calculatorInitialValues: Calculator = {
  lot: {
    originTaxes: 0,
    originFleet: 0,
    importFleetPerLibre: 0,
    importProcedure: 0,
    customsAgent: 0,
    localFleet: 0,
    bankExpenses: 0,
  },
  articles: [newArticle],
};
