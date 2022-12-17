import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BSON } from "realm-web";
import { addArticle, setInitialValues } from "../constants/calculator";
import { calculateImportation } from "../functions/importCalculator";
import {
  loadFromLocalStorage,
  storeInLocalStorage,
} from "../helpers/localStorage";
import { roundTo } from "../helpers/roundNumber";
import type {
  ArticleData,
  Calculator,
  DocumentHeader,
} from "../interfaces/calculatorApp";
import {
  importCalculatorData,
  importCalculatorHeader,
} from "../services/mongoDB/importCalculatorConfig";
import { useMongo } from "./useMongo";
import { useRealmApp } from "./useRealmApp";

interface Props {
  children: React.ReactNode;
}

interface Context {
  calculatorInputs: Calculator;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateDocumentHeader: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addRow: VoidFunction;
  deleteRow: (index: number) => void;
  compute: VoidFunction;
  saveAs: VoidFunction;
  update: VoidFunction;
  reset: VoidFunction;
  readIndex: () => Promise<DocumentHeader[]>;
  open: (header: DocumentHeader) => Promise<void>;
  deleteDocument: (header: DocumentHeader) => Promise<void>;
  documentInfo: DocumentHeader;
  totalWeight: number;
}

const CalculatorContext = createContext<Context>({} as Context);

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const { refreshToken } = useRealmApp();
  const dataMongo = useMongo(importCalculatorData);
  const headerMongo = useMongo(importCalculatorHeader);
  const [totalWeight, setTotalWeight] = useState(0);
  const { calculator, header } = setInitialValues();
  const [calculatorInputs, setCalculatorInputs] = useState<Calculator>(
    loadFromLocalStorage("calculator", calculator)
  );

  const [documentInfo, setDocumentInfo] = useState<DocumentHeader>(
    loadFromLocalStorage("header", header)
  );

  /** Stores in  local storage to prevent calculator data lost */
  useEffect(() => {
    storeInLocalStorage("calculator", calculatorInputs);
  }, [calculatorInputs]);

  /** Stores in  local storage to prevent calculator data lost */
  useEffect(() => {
    storeInLocalStorage("header", documentInfo);
  }, [documentInfo]);

  /**
   * Stores the data in the calculator object
   * @param event Input event handler
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const pathArray = name.split(".");

    setCalculatorInputs(
      produce((draft) => {
        if (pathArray.includes("articles")) {
          draft.articles[parseInt(pathArray[1])][pathArray[2]] =
            pathArray[2] === "name" ? value : parseFloat(value);
        }
        if (pathArray.includes("lot")) {
          draft.lot[pathArray[1]] = parseFloat(value);
        }
      })
    );
  };

  /**
   * Calculate total weight on row modification
   * @returns totalWeight {number}
   */
  const calculateTotalWeight = () => {
    const calculateRowWeight = (previousValue: number, row: ArticleData) => {
      const qty = isNaN(row.qty) ? 0 : row.qty;
      const weight = isNaN(row.unitWeight) ? 0 : row.unitWeight;

      return previousValue + qty * weight;
    };
    return calculatorInputs.articles.reduce(calculateRowWeight, 0);
  };
  useEffect(() => {
    setTotalWeight(roundTo(calculateTotalWeight()));
  }, [calculatorInputs]);

  /**
   * Updates document information for referrence
   * @param event Input event handler
   */
  const updateDocumentHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setDocumentInfo({ ...documentInfo, [name]: value });
  };

  /**
   * Add a new row to the current calculation
   */
  const addRow = () => {
    setCalculatorInputs((prevState) => ({
      ...prevState,
      articles: [...prevState.articles, addArticle()],
    }));

    // todo: Increase article counter on header document

    setDocumentInfo(
      produce((draft) => {
        draft.articlesQty += 1;
      })
    );
  };

  /**
   * Method used to delete an entire article information
   * @param index index number of the article to delete
   */
  const deleteRow = (index: number) => {
    const articles = calculatorInputs.articles.slice();
    articles.splice(index, 1);

    setCalculatorInputs({ ...calculatorInputs, articles });

    setDocumentInfo(
      produce((draft) => {
        draft.articlesQty -= 1;
      })
    );
  };

  /**
   * Compute articles prices based on given inputs
   */
  const compute = () => {
    if (
      calculatorInputs.articles.length === 0 ||
      Object.keys(calculatorInputs.lot).length === 0
    )
      return;

    const articles = calculateImportation(calculatorInputs);

    if (articles) {
      setCalculatorInputs({ ...calculatorInputs, articles: [...articles] });
    }
  };

  /**
   * Reset current document values
   */
  const reset = () => {
    const { calculator, header } = setInitialValues();
    setCalculatorInputs(calculator);
    setDocumentInfo(header);
  };

  /**
   * Save the current calculations in the cloud
   */
  const saveAs = async () => {
    const headerId = new BSON.ObjectID();
    const dataId = new BSON.ObjectID();

    const newHeader: DocumentHeader = {
      ...documentInfo,
      _id: headerId,
      documentData_Id: dataId,
      timestamp: Date.now(),
    };

    const newData = { ...calculatorInputs, _id: dataId };

    try {
      await refreshToken();
      await headerMongo.insertOne(newHeader);
      await dataMongo.insertOne(newData);

      setCalculatorInputs(newData);
      setDocumentInfo(newHeader);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Update the existant document in the cloud
   */
  const update = async () => {
    if (!("documentData_Id" in documentInfo)) {
      saveAs();
      return;
    }

    const newHeader: DocumentHeader = {
      ...documentInfo,
      _id: new BSON.ObjectID(documentInfo._id),
      documentData_Id: new BSON.ObjectID(documentInfo.documentData_Id),
      timestamp: Date.now(),
    };

    const newData: Calculator = {
      ...calculatorInputs,
      _id: new BSON.ObjectID(calculatorInputs._id),
    };

    try {
      await refreshToken();
      await dataMongo.findOneAndReplace({ _id: newData._id }, calculatorInputs);
      await headerMongo.findOneAndReplace({ _id: newHeader._id }, newHeader);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Fetch headers from database
   * @returns Document headers array
   */
  const readIndex = async (): Promise<DocumentHeader[]> => {
    return await headerMongo.find({});
  };

  /**
   * Loads the selected document from database
   * @param header Document header information
   */
  const open = async (header: DocumentHeader) => {
    const { _id, documentData_Id } = header;
    const headerId = new BSON.ObjectID(_id);
    const dataId = new BSON.ObjectID(documentData_Id);

    const docHeader = await headerMongo.findOne({ _id: headerId });
    const docData = await dataMongo.findOne({ _id: dataId });

    setDocumentInfo(docHeader);
    setCalculatorInputs(docData);
  };

  /**
   * Deletes the selected document from database
   * @param header Document header information
   */
  const deleteDocument = async (header: DocumentHeader) => {
    const { _id, documentData_Id } = header;
    const headerId = new BSON.ObjectID(_id);
    const dataId = new BSON.ObjectID(documentData_Id);

    await headerMongo.deleteOne({ _id: headerId });
    await dataMongo.deleteOne({ _id: dataId });
  };

  const contextValue = {
    calculatorInputs,
    handleChange,
    updateDocumentHeader,
    addRow,
    deleteRow,
    compute,
    saveAs,
    update,
    reset,
    readIndex,
    open,
    deleteDocument,
    documentInfo,
    totalWeight,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
