import React from "react";
import { useRealmApp } from "../../hooks/useRealmApp";

const CalculatorApp: React.FC = () => {
  const { logOut } = useRealmApp();

  return (
    <div>
      CalculatorApp
      <button onClick={logOut}>Log out</button>
    </div>
  );
};

export default CalculatorApp;
