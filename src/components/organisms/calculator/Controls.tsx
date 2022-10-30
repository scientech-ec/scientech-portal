import React, { useState } from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";
import Modal from "../../atoms/Modal";

const Controls: React.FC = () => {
  const { reset, compute, save } = useCalculator();
  const [saveModal, setSaveModal] = useState(false);

  const handleSave = () => {
    save();
    setSaveModal(false);
  };
  return (
    <React.Fragment>
      <header className="flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
        <h4 className="">Calculadora de Importaciones</h4>
        <div className="grid grid-cols-4 gap-2">
          <CustomButton onClick={compute}>Calcular</CustomButton>
          <CustomButton onClick={reset}>Nuevo</CustomButton>
          <CustomButton onClick={() => setSaveModal(true)}>
            Guardar
          </CustomButton>
          <CustomButton>Recuperar</CustomButton>
        </div>
      </header>
      <Modal
        open={saveModal}
        onClose={() => setSaveModal(false)}
        onConfirm={handleSave}
        title="Guardar?"
      >
        <div>
          <label htmlFor="documentName">Nombre:</label>
          <input
            type="text"
            name="documentName"
            id="documentName"
            placeholder="Escribe un nombre"
          />
        </div>
        <div>
          <label htmlFor="documentDescription">Descripcion:</label>
          <input
            type="text"
            name="documentDescription"
            id="documentDescription"
            placeholder="Escribe un nombre"
          />
        </div>
      </Modal>
    </React.Fragment>
  );
};

export default Controls;
