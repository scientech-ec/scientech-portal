import { roundTo } from "../helpers/roundNumber";
import type {
  ArticleData,
  CalculationValues,
  Calculator,
} from "../interfaces/calculatorApp";

export const calculateImportation = (values: Calculator) => {
  const ISDTax = 0.05;
  const fodinfaTax = 0.005;
  const IVARate = 1.12;

  const {
    articles: articlesSource,
    lot: {
      bankExpenses,
      customsAgent,
      importFleetPerLibre,
      importProcedure,
      localFleet,
      originFleet,
      originTaxes,
    },
  } = values;

  const articles: ArticleData[] = articlesSource.map((article) => ({
    ...article,
  }));

  const articlesCalculation = new Array(values.articles.length).fill(
    {}
  ) as CalculationValues[];

  let totalWeight = 0;
  let totalFOB = 0;

  articles.forEach((item, index) => {
    const current = articlesCalculation[index];

    current.itemWeight = item.qty * item.unitWeight;
    current.EXW = (item.qty * item.unitPrice * (100 + originTaxes)) / 100;

    totalWeight += current.itemWeight;
  });

  // Calculate aux lot variables
  const internationalFleet = totalWeight * importFleetPerLibre;
  const baseCourier = importProcedure + internationalFleet + customsAgent;

  articles.forEach((item, index) => {
    const current = articlesCalculation[index];

    current.weightFraction = current.itemWeight / totalWeight;

    // Calculate aux FOB item values
    current.FOB = current.EXW + originFleet * current.weightFraction;
    current.ISD = current.FOB * ISDTax;

    // Calculate aux CIF item values
    current.CIF =
      (current.FOB + internationalFleet * current.weightFraction) * 1.01;
    current.FODINFA = current.CIF * fodinfaTax;
    current.tariff = (current.CIF * item.tariffRate) / 100;

    // Asign values to lot variables
    totalFOB += current.FOB;
  });

  articles.forEach((item, index) => {
    const current = articlesCalculation[index];

    const originCosts =
      totalFOB === 0
        ? 0
        : current.FOB + (bankExpenses * current.FOB) / totalFOB;
    const itemTaxes = current.ISD + current.FODINFA + current.tariff;
    const importCost = baseCourier * current.weightFraction;
    const localFleetCost = (localFleet / IVARate) * current.weightFraction;

    const itemCost = originCosts + itemTaxes + importCost;
    const profit = itemCost / (1 - item.margin / 100) - itemCost;
    const itemFinalPrice = profit + itemCost + localFleetCost;

    item.bunchCost = roundTo(itemCost);
    item.unitProfit = roundTo(profit / item.qty);
    item.unitFinalPrice = roundTo(itemFinalPrice / item.qty);
  });

  return articles;
};
