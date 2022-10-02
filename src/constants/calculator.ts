import type {
  ArticleData,
  ArticlesHeader,
  Calculator,
} from "../interfaces/calculatorApp";

export const articlesHeader: ArticlesHeader[] = [
  { name: "qty", type: "number", title: "Cant.", initialValue: 0 },
  { name: "name", type: "text", title: "Descripción", initialValue: "" },
  { name: "tariff", type: "number", title: "Arancel", initialValue: 0 },
  {
    name: "unitWeight",
    type: "number",
    title: "Peso Unitario",
    initialValue: 0,
  },
  {
    name: "unitPrice",
    type: "number",
    title: "Precio Unitario",
    initialValue: 0,
  },
  { name: "margin", type: "number", title: "Margen", initialValue: 0 },
  { name: "bunchCost", type: "number", title: "Costo Lote", initialValue: 0 },
  {
    name: "unitProfit",
    type: "number",
    title: "Ganancia Unitaria",
    initialValue: 0,
  },
  {
    name: "unitFinalPrice",
    type: "number",
    title: "PVP Unitario",
    initialValue: 0,
  },
];

export const newArticle = () => {
  const newArticle: Record<string, string | number> = {};
  articlesHeader.forEach((column) => {
    newArticle[column.name] = column.initialValue;
  });
  return newArticle as ArticleData;
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
  articles: [newArticle()],
};
