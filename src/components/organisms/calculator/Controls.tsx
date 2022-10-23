import React, { useState } from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";
import Modal from "../../atoms/Modal";

const Controls: React.FC = () => {
  const { reset, compute, save } = useCalculator();
  const [openSaveModal, setOpenSaveModal] = useState(false);
  return (
    <React.Fragment>
      <header className="flex w-full items-center justify-between rounded-md border p-2 shadow-sm">
        <h4 className="">Calculadora de Importaciones</h4>
        <div className="grid grid-cols-4 gap-2">
          <CustomButton onClick={compute}>Calcular</CustomButton>
          <CustomButton onClick={reset}>Nuevo</CustomButton>
          <CustomButton onClick={() => setOpenSaveModal(!openSaveModal)}>
            Guardar
          </CustomButton>
          <CustomButton>Recuperar</CustomButton>
        </div>
      </header>
      <Modal
        open={openSaveModal}
        onClose={() => setOpenSaveModal(false)}
        onConfirm={() => setOpenSaveModal(false)}
        title="Guardar?"
      >
        Here comes the content
      </Modal>
    </React.Fragment>
  );
};

export default Controls;
