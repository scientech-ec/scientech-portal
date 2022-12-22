import { PlusCircleIcon } from "@heroicons/react/outline";
import React from "react";
import { articleSchema } from "../../../constants/calculatorUI";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";

const ArticleTableHeader: React.FC = () => {
  const { addRow } = useCalculator();
  return (
    <>
      {articleSchema.map((column) => (
        <p
          className={`flex items-center justify-center rounded-md border border-sky-500 bg-sky-500 px-2 py-1 text-center font-bold ${
            column.name === "name" ? "col-span-6" : "col-span-2"
          }`}
          key={column.name}
        >
          {column.title}
        </p>
      ))}
      <CustomButton
        className="col-span-2"
        variant="success"
        onClick={addRow}
        icon={<PlusCircleIcon className="h-8 w-8" />}
      >
        Agregar ítem
      </CustomButton>
    </>
  );
};

export default ArticleTableHeader;
