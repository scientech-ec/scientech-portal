import React from "react";
import { articlesHeader } from "../../../constants/calculator";
import { useCalculator } from "../../../hooks/useCalculator";
import ArticleRow from "../../molecules/calculator/ArticleRow";

const ArticlesDetails: React.FC = () => {
  const { values } = useCalculator();
  return (
    <section className="w-full rounded-md border p-2">
      <h5>Detalle de Artículos</h5>

      <div className="grid grid-cols-24">
        {articlesHeader.map((column) => (
          <p
            className={`${
              column.name === "name" ? "col-span-6" : "col-span-2"
            }`}
            key={column.name}
          >
            {column.title}
          </p>
        ))}
        <button className="col-span-2">Add row</button>

        {values.articles.map((article, idx) => (
          <ArticleRow article={article} index={idx} key={idx} />
        ))}
      </div>
    </section>
  );
};

export default ArticlesDetails;
