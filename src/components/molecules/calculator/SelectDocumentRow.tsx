import { CheckIcon, TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { toLocalDateAndTime } from "../../../helpers/date";
import { DocumentHeader } from "../../../interfaces/calculatorApp";
import CustomButton from "../../atoms/apps/CustomButton";

interface Props {
  document: DocumentHeader;
  index: number;
  handleOpen: (arg: DocumentHeader) => void;
  handleDelete: (arg: DocumentHeader) => void;
}

const SelectDocumentRow: React.FC<Props> = ({
  document,
  index,
  handleDelete,
  handleOpen,
}) => {
  const whitespaceLimit = 40;

  return (
    <React.Fragment key={document._id}>
      <p className="flex items-center justify-center whitespace-nowrap rounded-md border px-1">
        {index + 1}
      </p>
      <p className="col-span-2 flex items-center whitespace-nowrap rounded-md border px-1">
        {document.name}
      </p>
      <p className="col-span-4 flex items-center whitespace-pre rounded-md border px-1">
        {document.description.length > whitespaceLimit
          ? document.description.slice(0, whitespaceLimit) + "..."
          : document.description}
      </p>
      <p className="col-span-1 flex items-center whitespace-nowrap rounded-md border px-1">
        {document.articlesQty}
      </p>
      <p className="col-span-2 flex items-center whitespace-nowrap rounded-md border px-1">
        {toLocalDateAndTime(document.timestamp ?? Date.now())}
      </p>
      <CustomButton
        onClick={() => handleOpen(document)}
        variant="success"
        icon={<CheckIcon className="h-4 w-4" />}
      >
        Cargar
      </CustomButton>
      <CustomButton
        onClick={() => handleDelete(document)}
        variant="danger"
        icon={<TrashIcon className="h-4 w-4" />}
      >
        Borrar
      </CustomButton>
    </React.Fragment>
  );
};

export default SelectDocumentRow;
