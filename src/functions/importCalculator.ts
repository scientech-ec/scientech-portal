import { roundTo } from "../helpers/roundNumber";
import type {
  ArticleData,
  CalculationValues,
  Calculator,
} from "../interfaces/calculatorApp";

type ArticlesType = ArticleData & CalculationValues;

const getSafeNumber = (value: any): number => {
  return isNaN(value) ? 0 : value;
};

export const calculateImportation = (values: Calculator) => {
  const ISDTax = 0.04;
  const fodinfaTax = 0.005;

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

  const bankExpensesSafe = getSafeNumber(bankExpenses);
  const customsAgentSafe = getSafeNumber(customsAgent);
  const importFleetPerLibreSafe = getSafeNumber(importFleetPerLibre);
  const importProcedureSafe = getSafeNumber(importProcedure);
  const localFleetSafe = getSafeNumber(localFleet);
  const originFleetSafe = getSafeNumber(originFleet);
  const originTaxesSafe = getSafeNumber(originTaxes);

  let totalWeight = 0;
  let totalFOB = 0;

  articles.forEach((row) => {
    const rowWeight = row.qty * row.unitWeight;
    row.rowWeight = getSafeNumber(rowWeight);

    const EXW = (row.qty * row.unitPrice * (100 + originTaxesSafe)) / 100;
    row.EXW = getSafeNumber(EXW);

    if (row.EXW > 0) {
      totalWeight += row.rowWeight;
    }
  });

  // Calculate aux lot variables
  const internationalFleet = totalWeight * importFleetPerLibreSafe;
  const baseCourier =
    importProcedureSafe + internationalFleet + customsAgentSafe;

  articles.forEach((row) => {
    row.weightFraction =
      row.EXW > 0 && totalWeight > 0 ? row.rowWeight / totalWeight : 0;

    // Calculate aux FOB item values
    row.FOB = originFleetSafe * row.weightFraction + row.EXW;
    row.ISD = row.FOB * ISDTax;

    // Calculate aux CIF item values
    row.CIF = (row.FOB + internationalFleet * row.weightFraction) * 1.01;
    row.FODINFA = row.CIF * fodinfaTax;
    const tariffRate = getSafeNumber(row.tariffRate);
    row.tariff = (row.CIF * tariffRate) / 100;

    // Asign values to lot variables
    totalFOB += row.FOB;
  });

  articles.forEach((row) => {
    const originCosts =
      totalFOB > 0 ? row.FOB + (bankExpensesSafe * row.FOB) / totalFOB : 0;
    const itemTaxes = row.ISD + row.FODINFA + row.tariff;
    const importCost = baseCourier * row.weightFraction;
    const localFleetCost = localFleetSafe * row.weightFraction;

    const itemCost = originCosts + itemTaxes + importCost + localFleetCost;
    const margin = !isNaN(row.margin) && row.margin > 0 ? row.margin : 0;
    const profit =
      margin < 100
        ? itemCost / (1 - margin / 100) - itemCost
        : (itemCost * margin) / 100;
    const itemFinalPrice = profit + itemCost;

    row.bunchCost = roundTo(itemCost);
    row.unitProfit =
      row.qty > 0 && !isNaN(row.qty) ? roundTo(profit / row.qty) : 0;
    row.unitFinalPrice =
      row.qty > 0 && !isNaN(row.qty) ? roundTo(itemFinalPrice / row.qty) : 0;
  });

  return articles;
};
