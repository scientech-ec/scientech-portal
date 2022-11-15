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
      {articlesHeader.map((column) => (
        <CustomInput
          className={`${column.name === "name" ? "col-span-6" : "col-span-2"}`}
          type={column.type}
          key={column.name}
          value={article[column.name]}
          name={`articles.${index}.${column.name}`}
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
