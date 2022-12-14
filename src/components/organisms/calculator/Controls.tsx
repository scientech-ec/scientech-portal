import {
  CalculatorIcon,
  CloudDownloadIcon,
  CloudUploadIcon,
  DocumentAddIcon,
} from "@heroicons/react/outline";
import React, { useState } from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";
import Modal from "../../atoms/Modal";
import SaveDocument from "./SaveDocument";
import SelectDocument from "./SelectDocument";

const Controls: React.FC = () => {
  const { compute, reset } = useCalculator();
  const [saveModal, setSaveModal] = useState(false);
  const [retrieveModal, setRetrieveModal] = useState(false);

  const closeSave = () => setSaveModal(false);
  const closeRetrieve = () => setRetrieveModal(false);

  return (
    <React.Fragment>
      <header className="flex w-full items-center justify-between rounded-md border p-4 shadow-sm">
        <h4 className="">Calculadora de Importaciones</h4>
        <div className="flex gap-2">
          <CustomButton
            onClick={compute}
            className="text-xl"
            icon={<CalculatorIcon className="h-6 w-6" />}
          >
            Calcular
          </CustomButton>
          <CustomButton
            onClick={reset}
            className="text-xl"
            icon={<DocumentAddIcon className="h-6 w-6" />}
          >
            Nuevo
          </CustomButton>
          <CustomButton
            onClick={() => setSaveModal(true)}
            className="text-xl"
            icon={<CloudUploadIcon className="h-6 w-6" />}
          >
            Guardar
          </CustomButton>
          <CustomButton
            onClick={() => setRetrieveModal(true)}
            className="text-xl"
            icon={<CloudDownloadIcon className="h-6 w-6" />}
          >
            Recuperar
          </CustomButton>
        </div>
      </header>
      <Modal open={saveModal} handleClose={closeSave} title="Guardar?">
        <SaveDocument handleClose={closeSave} />
      </Modal>

      <Modal
        open={retrieveModal}
        handleClose={closeRetrieve}
        title="Abrir"
        modalClasses="w-[80%]"
      >
        <SelectDocument handleClose={closeRetrieve} />
      </Modal>
    </React.Fragment>
  );
};

export default Controls;
