import { PlusCircleIcon } from "@heroicons/react/outline";
import React from "react";
import { articlesHeader } from "../../../constants/calculator";
import { useCalculator } from "../../../hooks/useCalculator";
import CustomButton from "../../atoms/apps/CustomButton";
import ArticleRow from "../../molecules/calculator/ArticleRow";

const ArticlesDetails: React.FC = () => {
  const { calculatorInputs, addRow, totalWeight } = useCalculator();

  return (
    <section className="w-full rounded-md border p-4">
      <div className="flex justify-between">
        <h5>Detalle de Artículos</h5>

        <p>
          Peso total: {totalWeight} {totalWeight === 1 ? "libra" : "libras"}
        </p>
      </div>

      <div className="mt-2 grid grid-cols-24 gap-1">
        {articlesHeader.map((column) => (
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

        {calculatorInputs.articles.map((article, idx) => (
          <ArticleRow article={article} index={idx} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesDetails;
