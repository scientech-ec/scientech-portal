import { TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { articleSchema } from "../../../constants/calculatorUI";
import { useCalculator } from "../../../hooks/useCalculator";
import { ArticlesTableHeaderSchema } from "../../../interfaces/calculatorApp";
import CustomButton from "../../atoms/apps/CustomButton";
import ArticleCell from "./ArticleCell";

interface Props {
  rowIndex: number;
}

const ArticleRow: React.FC<Props> = ({ rowIndex }) => {
  const { calculatorInputs, calculatorOutputs, deleteRow } = useCalculator();

  const getCellValue = (column: ArticlesTableHeaderSchema) => {
    const { field, name } = column;
    if (field === "input") {
      return calculatorInputs.articles[rowIndex][name];
    } else {
      return calculatorOutputs[rowIndex][name];
    }
  };

  return (
    <>
      {articleSchema.map((column) => (
        <ArticleCell
          index={rowIndex}
          key={column.name}
          schema={column}
          value={getCellValue(column)}
        />
      ))}
      <CustomButton
        className="col-span-2 justify-center"
        onClick={() => deleteRow(rowIndex)}
        variant="danger"
        icon={<TrashIcon className="h-5 w-5" />}
      >
        Borrar
      </CustomButton>
    </>
  );
};

export default ArticleRow;
