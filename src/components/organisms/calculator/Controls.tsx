import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";

const Controls: React.FC = () => {
  const { reset, compute, save } = useCalculator();
  return (
    <header className="flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
      <h4 className="">Calculadora de Importaciones</h4>
      <div className="grid grid-cols-4 gap-2">
        <CustomButton onClick={compute}>Calcular</CustomButton>
        <CustomButton onClick={reset}>Nuevo</CustomButton>
        <CustomButton onClick={save}>Guardar</CustomButton>
        <CustomButton>Recuperar</CustomButton>
      </div>
    </header>
  );
};

export default Controls;
