import { TrashIcon } from "@heroicons/react/outline";
import React from "react";
import { articleSchema } from "../../../constants/calculatorUI";
import { useCalculator } from "../../../hooks/useCalculator";
import type { ArticleInputs } from "../../../interfaces/calculatorApp";
import CustomButton from "../../atoms/apps/CustomButton";
import ArticleCell from "./ArticleCell";

interface Props {
  article: ArticleInputs;
  index: number;
}

const ArticleRow: React.FC<Props> = ({ article, index }) => {
  const { deleteRow } = useCalculator();

  return (
    <>
      {articleSchema.map((column) => (
        <ArticleCell
          index={index}
          key={column.name}
          schema={column}
          value={article[column.name]}
        />
      ))}
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
