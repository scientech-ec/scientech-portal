import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BSON } from "realm-web";
import {
  addArticle,
  headerDefault,
  inputsDefault,
} from "../constants/calculator";
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
  CalculatorStorage,
  headerDatabaseId,
  inputsDatabaseId,
} from "../services/mongoDB/storeCalculatorData";
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
  calculatorHeader: DocumentHeader;
  totalWeight: number;
}

const CalculatorContext = createContext<Context>({} as Context);

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const { refreshToken, currentUser } = useRealmApp();

  /* Connect to mongodb collection */
  const headersDatabase = new CalculatorStorage(currentUser, headerDatabaseId);
  const inputsDatabase = new CalculatorStorage(currentUser, inputsDatabaseId);

  /* Load data from local storage if possible */
  const inputsInitialValue: Calculator =
    loadFromLocalStorage("inputs") ?? inputsDefault();
  const headerInitialValue: DocumentHeader =
    loadFromLocalStorage("header") ?? headerDefault();

  /* Initialize state */
  const [totalWeight, setTotalWeight] = useState(0);
  const [calculatorInputs, setCalculatorInputs] =
    useState<Calculator>(inputsInitialValue);
  const [calculatorHeader, setCalculatorHeader] =
    useState<DocumentHeader>(headerInitialValue);

  /** Stores in  local storage to prevent calculator data lost */
  useEffect(() => {
    storeInLocalStorage("inputs", calculatorInputs);
  }, [calculatorInputs]);
  useEffect(() => {
    storeInLocalStorage("header", calculatorHeader);
  }, [calculatorHeader]);

  /**
   * Updates the data in the calculator object
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

    setCalculatorHeader((prevState) => ({ ...prevState, [name]: value }));
  };

  /**
   * Add a new row to the current calculation
   */
  const addRow = () => {
    setCalculatorInputs((prevState) => ({
      ...prevState,
      articles: [...prevState.articles, addArticle()],
    }));

    setCalculatorHeader(
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

    setCalculatorHeader(
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

    // todo: split outputs
    const articles = calculateImportation(calculatorInputs);

    if (articles) {
      setCalculatorInputs({ ...calculatorInputs, articles: [...articles] });
    }
  };

  /**
   * Reset current document values
   */
  const reset = () => {
    setCalculatorInputs(inputsDefault());
    setCalculatorHeader(headerDefault());
  };

  /**
   * Save the current calculations in the cloud
   */
  const saveAs = async () => {
    const headerId = new BSON.ObjectID();
    const dataId = new BSON.ObjectID();

    const newHeaderData: DocumentHeader = {
      ...calculatorHeader,
      _id: headerId,
      documentData_Id: dataId,
      timestamp: Date.now(),
    };

    const newInputsData = { ...calculatorInputs, _id: dataId };

    try {
      await refreshToken();
      await inputsDatabase.saveNewDocument(newInputsData);
      await headersDatabase.saveNewDocument(newHeaderData);

      setCalculatorInputs(newInputsData);
      setCalculatorHeader(newHeaderData);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Update the existant document in the cloud
   */
  const update = async () => {
    if (!("documentData_Id" in calculatorHeader)) {
      saveAs();
      return;
    }

    const headerID = new BSON.ObjectID(calculatorHeader._id);
    const inputsID = new BSON.ObjectID(calculatorHeader.documentData_Id);

    const newHeader: DocumentHeader = {
      ...calculatorHeader,
      timestamp: Date.now(),
    };

    try {
      await refreshToken();
      await inputsDatabase.updateDocument(inputsID, calculatorInputs);
      await headersDatabase.updateDocument(headerID, newHeader);
    } catch (error) {
      console.error(error);
    }
  };

  /**
   * Fetch headers from database
   * @returns Document headers array
   */
  const readIndex = async () => {
    return await headersDatabase.getIndex();
  };

  /**
   * Loads the selected document from database
   * @param header Document header information
   */
  const open = async (header: DocumentHeader) => {
    const { _id: headerID, documentData_Id: inputsID } = header;

    const downloadedInputs = await inputsDatabase.getDocument(inputsID);
    const downloadedHeader = await headersDatabase.getDocument(headerID);

    setCalculatorHeader(downloadedHeader);
    setCalculatorInputs(downloadedInputs);
  };

  /**
   * Deletes the selected document from database
   * @param header Document header information
   */
  const deleteDocument = async (header: DocumentHeader) => {
    const { _id: headerID, documentData_Id: inputsID } = header;

    inputsDatabase.deleteDocument(inputsID);
    headersDatabase.deleteDocument(headerID);
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
    calculatorHeader,
    totalWeight,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
