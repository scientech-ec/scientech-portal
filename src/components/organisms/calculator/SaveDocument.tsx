import {
  DocumentDuplicateIcon,
  RefreshIcon,
  XIcon,
} from "@heroicons/react/outline";
import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";
import CustomInput from "../../atoms/apps/CustomInput";

interface Props {
  handleClose: VoidFunction;
}

const SaveDocument: React.FC<Props> = ({ handleClose }) => {
  const { updateDocumentHeader, calculatorHeader, saveAs, update } =
    useCalculator();

  const handleSaveAs = () => {
    saveAs();
    handleClose();
  };

  const handleSave = () => {
    update();
    handleClose();
  };
  return (
    <>
      <div className="grid grid-cols-6 gap-y-6 border-b px-4 py-6">
        <label htmlFor="name">Referencia*:</label>
        <CustomInput
          className="col-span-5 w-full rounded-none border-x-0 border-t-0"
          placeholder="Escriba un nombre para guardar"
          type="text"
          id="name"
          name="name"
          value={calculatorHeader.name}
          onChange={updateDocumentHeader}
        />

        <label htmlFor="description">Descripción*:</label>

        <CustomInput
          className="col-span-5 w-full rounded-none border-x-0 border-t-0"
          placeholder="Agregue una descripción "
          type="text"
          id="description"
          name="description"
          value={calculatorHeader.description}
          onChange={updateDocumentHeader}
        />
      </div>

      <div className="flex justify-end gap-2 px-4 py-3">
        <CustomButton
          onClick={handleSaveAs}
          icon={<DocumentDuplicateIcon className="h-5 w-5" />}
        >
          Guardar una copia
        </CustomButton>
        <CustomButton
          variant="success"
          onClick={handleSave}
          icon={<RefreshIcon className="h-5 w-5" />}
        >
          Actualizar
        </CustomButton>
        <CustomButton
          variant="danger"
          onClick={handleClose}
          icon={<XIcon className="h-5 w-5" />}
        >
          Cancelar
        </CustomButton>
      </div>
    </>
  );
};

export default SaveDocument;
