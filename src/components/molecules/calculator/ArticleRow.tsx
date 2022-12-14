import { TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { articlesHeader } from "../../../constants/calculator";
import { useCalculator } from "../../../hooks/useCalculator";
import type { ArticleData } from "../../../interfaces/calculatorApp";
import CustomButton from "../../atoms/apps/CustomButton";
import CustomInput from "../../atoms/apps/CustomInput";

interface Props {
  article: ArticleData;
  index: number;
}

const ArticleRow: React.FC<Props> = ({ article, index }) => {
  const { deleteRow } = useCalculator();

  return (
    <>
      {articlesHeader.map((column) =>
        column.field === "input" ? (
          <div
            key={column.name}
            className={`flex items-center justify-between gap-1 rounded-md  border px-2 ${
              column.name === "name" ? "col-span-6" : "col-span-2"
            }`}
          >
            <span className="text-xs text-gray-600">{column.startSymbol}</span>
            <CustomInput
              className="h-full w-full rounded-none border-none focus:outline-none"
              type={column.type}
              value={article[column.name]}
              name={`articles.${index}.${column.name}`}
            />
            <span className="text-xs text-gray-600">{column.endSymbol}</span>
          </div>
        ) : (
          <div
            key={column.name}
            className="col-span-2 flex items-center justify-between gap-1 rounded-md border bg-gray-100 px-2"
          >
            <span className="text-xs text-gray-600">{column.startSymbol}</span>
            <span className="grow">{article[column.name]}</span>
            <span className="text-xs text-gray-600">{column.endSymbol}</span>
          </div>
        )
      )}
      <CustomButton
        className="col-span-2 justify-center"
        onClick={() => deleteRow(index)}
        variant="danger"
        icon={<TrashIcon className="h-5 w-5" />}
      >
        Borrar
      </CustomButton>
    </>
  );
};

export default ArticleRow;
