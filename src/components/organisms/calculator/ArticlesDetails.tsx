import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";
import ArticleRow from "../../molecules/calculator/ArticleRow";
import ArticleTableHeader from "../../molecules/calculator/ArticleTableHeader";

const ArticlesDetails: React.FC = () => {
  const { calculatorInputs, totalWeight } = useCalculator();

  return (
    <section className="w-full rounded-md border p-4">
      <div className="flex justify-between">
        <h5>Detalle de Artículos</h5>

        <p>
          Peso total: {totalWeight} {totalWeight === 1 ? "libra" : "libras"}
        </p>
      </div>

      <div className="mt-2 grid grid-cols-24 gap-1">
        <ArticleTableHeader />

        {calculatorInputs.articles.map((_article, index) => (
          <ArticleRow rowIndex={index} key={index} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesDetails;
