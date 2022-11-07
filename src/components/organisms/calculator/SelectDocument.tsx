import React, { useEffect, useState } from "react";
import { toLocalDateAndTime } from "../../../helpers/date";
import { useCalculator } from "../../../hooks/useCalculator";
import { DocumentHeader } from "../../../interfaces/calculatorApp";
import CustomButton from "../../atoms/apps/CustomButton";

interface Props {
  handleClose: VoidFunction;
}

const SelectDocument: React.FC<Props> = ({ handleClose }) => {
  const { readIndex } = useCalculator();

  const [documents, setDocuments] = useState<DocumentHeader[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const docs = await readIndex();
      setDocuments(docs);
    };

    loadData();
  }, []);

  return (
    <>
      <div className="grid grid-cols-12">
        <div>No.</div>
        <div className="col-span-2">Nombre</div>
        <div className="col-span-5">Descripción</div>
        <div className="col-span-2">Fecha y Hora</div>
        <div className="col-span-2">Acción</div>

        {documents.map((doc, index) => (
          <React.Fragment key={doc._id}>
            <div>{index + 1}</div>
            <div className="col-span-2">{doc.name}</div>
            <div className="col-span-5">{doc.description}</div>
            <div className="col-span-2">
              {toLocalDateAndTime(doc.timestamp ?? Date.now())}
            </div>
            <button>load</button>
            <button>del</button>
          </React.Fragment>
        ))}
      </div>
      <div>
        <CustomButton variant="danger" onClick={handleClose}>
          Cancelar
        </CustomButton>
      </div>
    </>
  );
};

export default SelectDocument;
