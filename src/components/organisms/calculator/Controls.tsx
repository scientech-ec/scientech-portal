import React from "react";
import AppButton from "../../atoms/apps/AppButton";

const Controls: React.FC = () => {
  return (
    <header className="flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
      <h4 className="">Calculadora de Importaciones</h4>
      <div className="grid grid-cols-4 gap-2">
        <AppButton>Calcular</AppButton>
        <AppButton>Nuevo</AppButton>
        <AppButton>Guardar</AppButton>
        <AppButton>Recuperar</AppButton>
      </div>
    </header>
  );
};

export default Controls;
