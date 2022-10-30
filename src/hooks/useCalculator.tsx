import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { setInitialValues } from "../constants/calculator";
import { calculateImportation } from "../functions/importCalculator";
import { loadFromLocalStorage } from "../helpers/loadFromLocalStorage";
import type { Calculator, DocumentHeader } from "../interfaces/calculatorApp";
import { importCalculatorConfig } from "../services/mongoDB/importCalculatorConfig";
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
  save: VoidFunction;
  documentInfo: DocumentHeader;
}

const CalculatorContext = createContext<Context>({} as Context);

// todo: Add total weight auto compute
// todo: 0 total weight constriction
// todo: min value 1 for qty

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const mongo = useMongo(importCalculatorConfig);

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

  /**
   * Saves the current calculations in the cloud
   */
  const save = async () => {
    // const existing = await mongo.find({ _id: values._id });
    // if (existing.length === 0) {
    //   try {
    //     await mongo.insertOne(values);
    //     reset();
    //   } catch (error) {
    //     console.error(error);
    //   }
    // } else {
    //   try {
    //     await mongo.updateOne(
    //       { _id: values._id },
    //       { $set: { articles: values.articles, lot: values.lot } }
    //     );
    //   } catch (error) {
    //     console.error(error);
    //   }
    // }
    // return;
  };

  const contextValue = {
    values,
    handleChange,
    updateDocumentHeader,
    deleteRow,
    compute,
    save,
    documentInfo,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
