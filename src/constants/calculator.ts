import type {
  ArticleInputs,
  ArticleOutputs,
  CalculatorInputs,
  DocumentHeader,
} from "../interfaces/calculatorApp";
import { inputSchema, outputSchema } from "./calculatorUI";

export const addInputsRow = () => {
  const result: Record<string, string | number> = {};
  inputSchema.forEach((column) => {
    result[column.name] = column.initialValue;
  });
  return result as ArticleInputs;
};

export const addOutputsRow = () => {
  const result: Record<string, string | number> = {};
  outputSchema.forEach((column) => {
    result[column.name] = column.initialValue;
  });
  return result as ArticleOutputs;
};

export const inputsDefault = (): CalculatorInputs => ({
  lot: {
    originTaxes: 0,
    originFleet: 0,
    importFleetPerLibre: 0,
    importProcedure: 0,
    customsAgent: 0,
    localFleet: 0,
    bankExpenses: 0,
  },
  articles: [],
});

export const headerDefault = (): DocumentHeader => ({
  name: "",
  description: "",
  articlesQty: 0,
});
