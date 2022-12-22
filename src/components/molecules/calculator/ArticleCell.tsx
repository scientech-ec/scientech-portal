import React from "react";
import { ArticlesTableHeaderSchema } from "../../../interfaces/calculatorApp";
import CustomInput from "../../atoms/apps/CustomInput";

interface Props {
  schema: ArticlesTableHeaderSchema;
  index: number;
  value: number | string;
}

const ArticleCell: React.FC<Props> = ({ schema, index, value }) => {
  const cellWide = () => {
    return schema.name === "name" ? "col-span-6" : "col-span-2";
  };

  const cellColor = () => {
    return schema.field === "input" ? "" : "bg-gray-100";
  };

  const plotCell = () => {
    if (schema.field === "input") {
      return (
        <CustomInput
          className="h-full w-full rounded-none border-none focus:outline-none"
          type={schema.type}
          value={value}
          name={`articles.${index}.${schema.name}`}
        />
      );
    } else {
      return <span className="grow">{value}</span>;
    }
  };

  const cellAlert = () => {
    return typeof value === "number" && isNaN(value) ? "bg-red-500" : "";
  };

  return (
    <div
      className={`flex items-center justify-between gap-1 rounded-md  border px-2 ${cellWide()} ${cellColor()}  ${cellAlert()}`}
    >
      <span className="text-xs text-gray-600">{schema.startSymbol}</span>
      {plotCell()}
      <span className="text-xs text-gray-600">{schema.endSymbol}</span>
    </div>
  );
};

export default ArticleCell;
