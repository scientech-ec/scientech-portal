import React from "react";
import {
  calculateIvaTax,
  totalCustomTax,
} from "../../../functions/importCalculator";
import { roundTo } from "../../../helpers/numberHelpers";

import { useCalculator } from "../../../hooks/useCalculator";

const Report: React.FC = () => {
  const { calculatorOutputs, calculatorInputs } = useCalculator();

  return (
    <section className="w-full items-center justify-between rounded-md border p-4 shadow-sm">
      <h5>Reporte</h5>
      <div className="grid grid-cols-8">
        <div className="col-span-4">Nombre del artículo</div>
        <div>FODINFA</div>
        <div>Arancel</div>
        <div>IVA</div>
        <div>Total</div>

        {calculatorOutputs.map((article, index) => (
          <React.Fragment key={article.name}>
            <div className="col-span-4">
              {calculatorInputs.articles[index].name}
            </div>
            <div>{roundTo(article.FODINFA)}</div>
            <div>{roundTo(article.tariff)}</div>
            <div>{calculateIvaTax(article)}</div>
            <div>{totalCustomTax(article)}</div>
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default Report;
