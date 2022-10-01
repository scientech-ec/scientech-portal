import React from "react";
import { useCalculator } from "../../../hooks/useCalculator";

const ArticlesDetails: React.FC = () => {
  const { values, handleChange } = useCalculator();
  return (
    <section className="w-full rounded-md border p-2">
      <h5>Detalle de Artículos</h5>

      {values.articles.map((article, i) => (
        <div key={i}>
          <input
            type="text"
            name={`name.${i}`}
            value={article.name}
            onChange={handleChange}
          />
        </div>
      ))}
    </section>
  );
};

export default ArticlesDetails;
