import produce from "immer";
import React, { createContext, useContext, useEffect, useState } from "react";
import { calculatorInitialValues } from "../constants/calculator";
import { Calculator } from "../interfaces/calculatorApp";

interface Props {
  children: React.ReactNode;
}

interface Context {
  values: Calculator;
  reset: () => void;
  handleChange: () => void;
}

const CalculatorContext = createContext<Context>({} as Context);

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const [values, setValues] = useState(calculatorInitialValues);

  useEffect(() => {
    localStorage.setItem("calculator", JSON.stringify(values));
  }, [values]);

  const reset = () => {
    setValues(calculatorInitialValues);
  };

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

  const contextValue = {
    values,
    reset,
    handleChange,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
