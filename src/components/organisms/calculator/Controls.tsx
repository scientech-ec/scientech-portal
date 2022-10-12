import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";

const Controls: React.FC = () => {
  const { reset } = useCalculator();
  return (
    <header className="flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
      <h4 className="">Calculadora de Importaciones</h4>
      <div className="grid grid-cols-4 gap-2">
        <CustomButton>Calcular</CustomButton>
        <CustomButton onClick={reset}>Nuevo</CustomButton>
        <CustomButton>Guardar</CustomButton>
        <CustomButton>Recuperar</CustomButton>
      </div>
    </header>
  );
};

export default Controls;
