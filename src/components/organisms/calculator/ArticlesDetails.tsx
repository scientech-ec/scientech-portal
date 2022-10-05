import React from "react";
import { articlesHeader } from "../../../constants/calculator";
import { useCalculator } from "../../../hooks/useCalculator";

const ArticlesDetails: React.FC = () => {
  const { values, handleChange, addRow, deleteRow } = useCalculator();
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
        <button className="col-span-2" onClick={addRow}>
          Add row
        </button>

        {values.articles.map((article, idx) => (
          <React.Fragment key={idx}>
            {articlesHeader.map((column) => (
              <input
                className={`${
                  column.name === "name" ? "col-span-6" : "col-span-2"
                }`}
                type={column.type}
                key={column.name}
                value={article[column.name]}
                name={`articles.${idx}.${column.name}`}
                onChange={handleChange}
              />
            ))}
            <button className="col-span-2" onClick={() => deleteRow(idx)}>
              borrar
            </button>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default ArticlesDetails;
