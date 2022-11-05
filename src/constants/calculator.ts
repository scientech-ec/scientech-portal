import { BSON } from "realm-web";
import type {
  ArticleData,
  ArticlesHeader,
  Calculator,
  DocumentHeader,
} from "../interfaces/calculatorApp";

export const articlesHeader: ArticlesHeader[] = [
  { name: "qty", type: "number", title: "Cant.", initialValue: 1 },
  { name: "name", type: "text", title: "Descripción", initialValue: "" },
  {
    name: "unitWeight",
    type: "number",
    title: "Peso Unitario",
    initialValue: 1,
  },
  {
    name: "unitPrice",
    type: "number",
    title: "Precio Unitario",
    initialValue: 0,
  },
  { name: "tariffRate", type: "number", title: "Arancel", initialValue: 0 },
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

export const lotSchema = [
  {
    title: "Costos en Origen",
    values: [
      { name: "Impuestos en origen:", value: "originTaxes" },
      { name: "Flete en origen:", value: "originFleet" },
    ],
  },
  {
    title: "Costos de Importación",
    values: [
      { name: "Costo de flete [USD/lb]:", value: "importFleetPerLibre" },
      { name: "Trámite de importación:", value: "importProcedure" },
      { name: "Agente aduanero:", value: "customsAgent" },
    ],
  },
  {
    title: "Costos Locales",
    values: [
      { name: "Flete y movilización:", value: "localFleet" },
      { name: "Tarifas bancarias:", value: "bankExpenses" },
    ],
  },
];
export type LotSchema = typeof lotSchema;

export const addArticle = () => {
  const newArticle: Record<string, string | number> = {};
  articlesHeader.forEach((column) => {
    newArticle[column.name] = column.initialValue;
  });
  return newArticle as ArticleData;
};

export const setInitialValues = () => {
  const docId = new BSON.ObjectID();
  const calculator: Calculator = {
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
    _id: docId,
  };

  const header: DocumentHeader = {
    _id: new BSON.ObjectID(),
    name: "",
    description: "",
    articlesQty: 0,
    documentData_Id: docId,
  };

  return { calculator, header };
};
