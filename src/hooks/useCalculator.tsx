import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { BSON } from "realm-web";
import { setInitialValues } from "../constants/calculator";
import { calculateImportation } from "../functions/importCalculator";
import { loadFromLocalStorage } from "../helpers/loadFromLocalStorage";
import type { Calculator, DocumentHeader } from "../interfaces/calculatorApp";
import {
  importCalculatorData,
  importCalculatorHeader,
} from "../services/mongoDB/importCalculatorConfig";
import { useMongo } from "./useMongo";

interface Props {
  children: React.ReactNode;
}

interface Context {
  values: Calculator;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  updateDocumentHeader: (event: React.ChangeEvent<HTMLInputElement>) => void;
  deleteRow: (index: number) => void;
  compute: VoidFunction;
  saveAs: VoidFunction;
  documentInfo: DocumentHeader;
}

const CalculatorContext = createContext<Context>({} as Context);

// todo: Add total weight auto compute
// todo: 0 total weight constriction
// todo: min value 1 for qty

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const dataMongo = useMongo(importCalculatorData);
  const headerMongo = useMongo(importCalculatorHeader);

  const { calculator, header } = setInitialValues();
  const [values, setValues] = useState<Calculator>(
    loadFromLocalStorage("calculator", calculator)
  );
  const [documentInfo, setDocumentInfo] = useState<DocumentHeader>(
    loadFromLocalStorage("header", header)
  );

  /** Stores in  local storage to prevent calculator data lost */
  useEffect(() => {
    localStorage.setItem("calculator", JSON.stringify(values));
  }, [values]);

  /**
   * Stores the data in the calculator object
   * @param event Input event handler
   */
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;
    const pathArray = name.split(".");

    setValues(
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
   * Updates document information for referrence
   * @param event Input event handler
   */
  const updateDocumentHeader = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value, name } = event.target;

    setDocumentInfo({ ...documentInfo, [name]: value });
  };

  /**
   * Method used to delete an entire article information
   * @param index index number of the article to delete
   */
  const deleteRow = (index: number) => {
    const articles = values.articles.slice();
    articles.splice(index, 1);

    setValues({ ...values, articles });
  };

  /**
   * Compute articles prices based on given inputs
   */
  const compute = () => {
    if (values.articles.length === 0 || Object.keys(values.lot).length === 0)
      return;

    const articles = calculateImportation(values);

    if (articles) {
      setValues({ ...values, articles: [...articles] });
    }
  };

  const reset = () => {
    const { calculator, header } = setInitialValues();
    setValues(calculator);
    setDocumentInfo(header);
  };

  /**
   * Saves the current calculations in the cloud
   */
  const saveAs = async () => {
    const newDocId = new BSON.ObjectId();

    setDocumentInfo((prevState) => ({
      ...prevState,
      documentData_ID: newDocId,
    }));
    setValues((prevState) => ({ ...prevState, _id: newDocId }));

    try {
      await headerMongo.insertOne(documentInfo);
      await dataMongo.insertOne(values);
      reset();
    } catch (error) {
      console.error(error);
    }
  };

  const contextValue = {
    values,
    handleChange,
    updateDocumentHeader,
    deleteRow,
    compute,
    saveAs,
    documentInfo,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
