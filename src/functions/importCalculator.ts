import { roundTo } from "../helpers/roundNumber";
import type {
  ArticleData,
  CalculationValues,
  Calculator,
} from "../interfaces/calculatorApp";

type ArticlesType = ArticleData & CalculationValues;

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

  const articles: ArticlesType[] = articlesSource.map(
    (article) =>
      ({
        ...article,
      } as ArticlesType)
  );

  let totalWeight = 0;
  let totalFOB = 0;

  articles.forEach((item) => {
    item.itemWeight = item.qty * item.unitWeight;
    item.EXW = (item.qty * item.unitPrice * (100 + originTaxes)) / 100;

    if (item.EXW > 0) {
      totalWeight += item.itemWeight;
    }
  });

  // Calculate aux lot variables
  const internationalFleet = totalWeight * importFleetPerLibre;
  const baseCourier = importProcedure + internationalFleet + customsAgent;

  articles.forEach((item) => {
    item.weightFraction = item.EXW > 0 ? item.itemWeight / totalWeight : 0;

    // Calculate aux FOB item values
    item.FOB = originFleet * item.weightFraction + item.EXW;
    item.ISD = item.FOB * ISDTax;

    // Calculate aux CIF item values
    item.CIF = (item.FOB + internationalFleet * item.weightFraction) * 1.01;
    item.FODINFA = item.CIF * fodinfaTax;
    item.tariff = (item.CIF * item.tariffRate) / 100;

    // Asign values to lot variables
    totalFOB += item.FOB;
  });

  articles.forEach((item) => {
    const originCosts =
      totalFOB === 0 ? 0 : item.FOB + (bankExpenses * item.FOB) / totalFOB;
    const itemTaxes = item.ISD + item.FODINFA + item.tariff;
    const importCost = baseCourier * item.weightFraction;
    const localFleetCost = (localFleet / IVARate) * item.weightFraction;

    const itemCost = originCosts + itemTaxes + importCost;
    const profit = itemCost / (1 - item.margin / 100) - itemCost;
    const itemFinalPrice = profit + itemCost + localFleetCost;

    item.bunchCost = roundTo(itemCost);
    item.unitProfit = roundTo(profit / item.qty);
    item.unitFinalPrice = roundTo(itemFinalPrice / item.qty);
  });

  return articles;
};
