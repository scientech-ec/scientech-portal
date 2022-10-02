import React from "react";
import { articlesHeader } from "../../../constants/calculator";
import { useCalculator } from "../../../hooks/useCalculator";

const ArticlesDetails: React.FC = () => {
  const { values, handleChange, addRow } = useCalculator();
  return (
    <section className="w-full rounded-md border p-2">
      <h5>Detalle de Artículos</h5>

      <div className="flex">
        {articlesHeader.map((column) => (
          <p key={column.name}>{column.title}</p>
        ))}
        <button onClick={addRow}>Add row</button>
      </div>

      <div>
        {values.articles.map((article, idx) => (
          <div key={idx}>
            {articlesHeader.map((column) => (
              <input
                type={column.type}
                key={column.name}
                value={article[column.name]}
                name={`articles.${idx}.${column.name}`}
                onChange={handleChange}
              />
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};

export default ArticlesDetails;
