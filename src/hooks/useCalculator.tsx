import React, { createContext, useContext, useState } from "react";
import { calculatorInitialValues } from "../constants/calculator";

interface Props {
  children: React.ReactNode;
}

const CalculatorContext = createContext();

export const CalculatorProvider: React.FC<Props> = ({ children }) => {
  const [values, setValues] = useState(calculatorInitialValues);

  const contextValue = {
    values,
  };
  return (
    <CalculatorContext.Provider value={contextValue}>
      {children}
    </CalculatorContext.Provider>
  );
};

export const useCalculator = () => useContext(CalculatorContext);
