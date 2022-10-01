import React, { createContext, useContext, useEffect, useState } from "react";
import { calculatorInitialValues } from "../constants/calculator";
import { Calculator } from "../interfaces/calculatorApp";

interface Props {
  children: React.ReactNode;
}

interface Context {
  values: Calculator;
  reset: () => void;
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

  const contextValue = {
    values,
    reset,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
