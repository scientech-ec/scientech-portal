import React from "react";
import { articlesHeader } from "../../../constants/calculator";
import { useCalculator } from "../../../hooks/useCalculator";
import type { ArticleData } from "../../../interfaces/calculatorApp";
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
      <button className="col-span-2" onClick={() => deleteRow(index)}>
        borrar
      </button>
    </>
  );
};

export default ArticleRow;
