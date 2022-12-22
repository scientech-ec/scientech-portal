import { roundTo } from "../helpers/roundNumber";
import type {
  ArticleOutputs,
  CalculatorInputs,
} from "../interfaces/calculatorApp";

const getSafeNumber = (value: any): number => {
  return isNaN(value) ? 0 : value;
};

export const calculateImportation = (values: CalculatorInputs) => {
  const ISDTax = 0.04;
  const fodinfaTax = 0.005;
  const insuranceFraction = 1.01;

  const {
    articles,
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

  const outputs: ArticleOutputs[] = new Array(articles.length)
    .fill("")
    .map((_) => ({} as ArticleOutputs));

  const safeBankExpenses = getSafeNumber(bankExpenses);
  const safeCustomsAgent = getSafeNumber(customsAgent);
  const safeImportFleetPerLibre = getSafeNumber(importFleetPerLibre);
  const safeImportProcedure = getSafeNumber(importProcedure);
  const safeLocalFleet = getSafeNumber(localFleet);
  const safeOriginFleet = getSafeNumber(originFleet);
  const safeOriginTaxes = getSafeNumber(originTaxes);

  let totalWeight = 0;
  let totalFOB = 0;

  outputs.forEach((row, index) => {
    const { qty, unitWeight, unitPrice } = articles[index];
    row.rowWeight = getSafeNumber(qty * unitWeight);

    const EXW = (qty * unitPrice * (100 + safeOriginTaxes)) / 100;
    row.EXW = getSafeNumber(EXW);

    if (row.EXW > 0) {
      totalWeight += row.rowWeight;
    }
  });

  // Calculate aux lot variables
  const internationalFleet = totalWeight * safeImportFleetPerLibre;
  const baseCourier =
    safeImportProcedure + internationalFleet + safeCustomsAgent;

  outputs.forEach((row, index) => {
    const { EXW, rowWeight } = row;
    const { tariffRate } = articles[index];
    const weightFraction =
      EXW > 0 && totalWeight > 0 ? rowWeight / totalWeight : 0;
    row.weightFraction = weightFraction;

    // Calculate aux FOB item values
    row.FOB = safeOriginFleet * weightFraction + EXW;
    row.ISD = row.FOB * ISDTax;

    // Calculate aux CIF item values
    row.CIF =
      (row.FOB + internationalFleet * weightFraction) * insuranceFraction;
    row.FODINFA = row.CIF * fodinfaTax;
    row.tariff = (row.CIF * getSafeNumber(tariffRate)) / 100;

    // Asign values to lot variables
    totalFOB += row.FOB;
  });

  outputs.forEach((row, index) => {
    const { FOB, ISD, FODINFA, tariff, weightFraction } = row;
    const { margin, qty } = articles[index];
    const originCosts =
      totalFOB > 0 ? FOB + (safeBankExpenses * FOB) / totalFOB : 0;
    const itemTaxes = ISD + FODINFA + tariff;
    const importCost = baseCourier * weightFraction;
    const localFleetCost = safeLocalFleet * weightFraction;

    const itemCost = originCosts + itemTaxes + importCost + localFleetCost;
    const safeMargin = !isNaN(margin) && margin > 0 ? margin : 0;
    const profit =
      safeMargin < 100
        ? itemCost / (1 - safeMargin / 100) - itemCost
        : (itemCost * safeMargin) / 100;
    const itemFinalPrice = profit + itemCost;

    row.bunchCost = roundTo(itemCost);
    row.unitProfit = qty > 0 && !isNaN(qty) ? roundTo(profit / qty) : 0;
    row.unitFinalPrice =
      qty > 0 && !isNaN(qty) ? roundTo(itemFinalPrice / qty) : 0;
  });

  return outputs;
};
