import React, { useState } from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";
import Modal from "../../atoms/Modal";
import SaveDocument from "./SaveDocument";

const Controls: React.FC = () => {
  const { compute } = useCalculator();
  const [saveModal, setSaveModal] = useState(false);
  const [retrieveModal, setRetrieveModal] = useState(false);

  return (
    <React.Fragment>
      <header className="flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
        <h4 className="">Calculadora de Importaciones</h4>
        <div className="grid grid-cols-4 gap-2">
          <CustomButton onClick={compute}>Calcular</CustomButton>
          <CustomButton>Nuevo</CustomButton>
          <CustomButton onClick={() => setSaveModal(true)}>
            Guardar
          </CustomButton>
          <CustomButton onClick={() => setRetrieveModal(true)}>
            Recuperar
          </CustomButton>
        </div>
      </header>
      <Modal
        open={saveModal}
        handleClose={() => setSaveModal(false)}
        title="Guardar?"
      >
        <SaveDocument handleClose={() => setSaveModal(false)} />
      </Modal>

      <Modal
        open={retrieveModal}
        handleClose={() => setRetrieveModal(false)}
        title="Abrir"
      >
        here you can retrieve
      </Modal>
    </React.Fragment>
  );
};

export default Controls;
