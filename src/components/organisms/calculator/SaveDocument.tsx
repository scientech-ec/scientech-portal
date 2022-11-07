import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";

interface Props {
  handleClose: VoidFunction;
}

const SaveDocument: React.FC<Props> = ({ handleClose }) => {
  const { updateDocumentHeader, documentInfo, saveAs, update } =
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
      <div>
        <div>
          <label htmlFor="name">Referencia:</label>
          <input
            type="text"
            id="name"
            name="name"
            value={documentInfo.name}
            onChange={updateDocumentHeader}
          />
        </div>
        <div>
          <label htmlFor="description">Descripción:</label>
          <input
            type="text"
            id="description"
            name="description"
            value={documentInfo.description}
            onChange={updateDocumentHeader}
          />
        </div>
      </div>

      <div>
        <CustomButton onClick={handleSaveAs}>Guardar como</CustomButton>
        <CustomButton variant="success" onClick={handleSave}>
          Guardar
        </CustomButton>
        <CustomButton variant="danger" onClick={handleClose}>
          Cancelar
        </CustomButton>
      </div>
    </>
  );
};

export default SaveDocument;
