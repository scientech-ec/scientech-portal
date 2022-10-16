import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { calculatorInitialValues, newArticle } from "../constants/calculator";
import { calculateImportation } from "../functions/importCalculator";
import { loadFromLocalStorage } from "../helpers/loadFromLocalStorage";
import type { Calculator } from "../interfaces/calculatorApp";

interface Props {
  children: React.ReactNode;
}

interface Context {
  values: Calculator;
  reset: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addRow: () => void;
  deleteRow: (index: number) => void;
  compute: () => void;
}

const CalculatorContext = createContext<Context>({} as Context);

// todo: Add total weight auto compute
// todo: 0 total weight constriction
// todo: min value 1 for qty

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const [values, setValues] = useState<Calculator>(
    loadFromLocalStorage("calculator", calculatorInitialValues)
  );

  /** Stores in local storage to prevent data lost */
  useEffect(() => {
    localStorage.setItem("calculator", JSON.stringify(values));
  }, [values]);

  /**
   * Reset calculator
   */
  const reset = () => {
    localStorage.setItem("calculator", JSON.stringify(calculatorInitialValues));
    setValues(calculatorInitialValues);
  };

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
   * Method used to delete an entire article information
   * @param index index number of the article to delete
   */
  const deleteRow = (index: number) => {
    const articles = values.articles.slice();
    articles.splice(index, 1);

    setValues({ ...values, articles });
  };

  /**
   * Add a new article row
   */
  const addRow = () => {
    setValues((prevState) => ({
      ...prevState,
      articles: [...prevState.articles, newArticle()],
    }));
  };

  const compute = () => {
    if (values.articles.length === 0 || Object.keys(values.lot).length === 0)
      return;

    const articles = calculateImportation(values);

    if (articles) {
      setValues({ ...values, articles: [...articles] });
    }
  };

  const contextValue = {
    values,
    reset,
    handleChange,
    addRow,
    deleteRow,
    compute,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
