import { CheckIcon, TrashIcon, XIcon } from "@heroicons/react/outline";
import React, { useEffect, useState } from "react";
import { toLocalDateAndTime } from "../../../helpers/date";
import { useCalculator } from "../../../hooks/useCalculator";
import { DocumentHeader } from "../../../interfaces/calculatorApp";
import CustomButton from "../../atoms/apps/CustomButton";

interface Props {
  handleClose: VoidFunction;
}

const SelectDocument: React.FC<Props> = ({ handleClose }) => {
  const { readIndex, open, deleteDocument } = useCalculator();

  const [documents, setDocuments] = useState<DocumentHeader[]>([]);

  useEffect(() => {
    const loadData = async () => {
      const docs = await readIndex();
      setDocuments(docs);
    };

    loadData();
  }, [documents]);

  const handleOpen = async (header: DocumentHeader) => {
    await open(header);
    handleClose();
  };

  const handleDelete = async (header: DocumentHeader) => {
    await deleteDocument(header);
    setDocuments((prevState) =>
      prevState.filter((doc) => doc._id !== header._id)
    );
  };

  return (
    <>
      <div className="grid grid-cols-12 gap-1 border-b px-4 py-6">
        <div className="rounded-md border bg-sky-500 text-center ">No.</div>
        <div className="col-span-2 rounded-md border bg-sky-500 text-center">
          Nombre
        </div>
        <div className="col-span-4 rounded-md border bg-sky-500 text-center">
          Descripción
        </div>
        <div className="col-span-1 rounded-md border bg-sky-500 text-center">
          Artículos
        </div>
        <div className="col-span-2 rounded-md border bg-sky-500 text-center">
          Fecha y Hora
        </div>
        <div className="col-span-2 rounded-md border bg-sky-500 text-center">
          Acción
        </div>

        {documents.map((doc, index) => (
          <React.Fragment key={doc._id}>
            <div className="flex items-center justify-center whitespace-nowrap rounded-md border px-1">
              {index + 1}
            </div>
            <div className="col-span-2 flex items-center whitespace-nowrap rounded-md border px-1">
              {doc.name}
            </div>
            <div className="col-span-4 flex items-center whitespace-nowrap rounded-md border px-1">
              {doc.description}
            </div>
            <div className="col-span-1 flex items-center whitespace-nowrap rounded-md border px-1">
              {doc.articlesQty}
            </div>
            <div className="col-span-2 flex items-center whitespace-nowrap rounded-md border px-1">
              {toLocalDateAndTime(doc.timestamp ?? Date.now())}
            </div>
            <CustomButton
              onClick={() => handleOpen(doc)}
              variant="success"
              icon={<CheckIcon className="h-4 w-4" />}
            >
              Cargar
            </CustomButton>
            <CustomButton
              onClick={() => handleDelete(doc)}
              variant="danger"
              icon={<TrashIcon className="h-4 w-4" />}
            >
              Borrar
            </CustomButton>
          </React.Fragment>
        ))}
      </div>
      <div className="flex justify-end gap-2 px-4 py-3">
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

export default SelectDocument;
