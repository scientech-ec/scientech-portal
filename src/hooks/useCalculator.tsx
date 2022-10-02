import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { calculatorInitialValues, newArticle } from "../constants/calculator";
import type { Calculator } from "../interfaces/calculatorApp";

interface Props {
  children: React.ReactNode;
}

interface Context {
  values: Calculator;
  reset: () => void;
  handleChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  addRow: () => void;
}

const CalculatorContext = createContext<Context>({} as Context);

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const [values, setValues] = useState(calculatorInitialValues);

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
        if (pathArray.length > 1) {
          draft.articles[parseInt(pathArray[1])][pathArray[0]] = value;
        }
        draft.lot[pathArray[0]] = value;
      })
    );
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

  const contextValue = {
    values,
    reset,
    handleChange,
    addRow,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
